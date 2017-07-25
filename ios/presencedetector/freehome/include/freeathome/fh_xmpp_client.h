#ifndef FH_XMPP_CLIENT_H
#define FH_XMPP_CLIENT_H

#include "fh_cglobals.h"
#include <vector>
#include "fh_xmpp_stream.h"
#include "fh_common.h"
#include "fh_network.h"
#include "fh_xmpp_rpc.h"
#include "fh_stanza.h"
#include <openssl/bio.h>

namespace freeathome {

class CController;
class CXmppRPCCall;
class CStanza;
class CCryptoContext;
enum class XmppAuthMethode
{
    SCRAM_SHA1,
    EXTERNAL,
    OAUTH2,
};
enum class EPresenceSubscription
{
    NONE,
    TO,
    FROM,
    BOTH,
};
class CXmppContact
{
public:
    CXmppContact() {}
    bool IsPresent() const { return m_Present; }
    const std::string& FriendlyName() const { return m_FriendlyName; }
    const std::string& BareJID() const { return m_BareJID; }
    const std::string& Resource() const { return m_Resource; }
private:
    std::string m_FriendlyName;
    std::string m_BareJID;
    std::string m_Resource;
    EPresenceSubscription m_Subscription = EPresenceSubscription::NONE;
    bool m_Present = false;
    bool m_VCardReceived = false;
    friend class CXmppClient;
};
class CXmppConfig
{
public:
    static const int PUB_SUB_SUBSCRIBE_LOG_EVENTS = 1;
    static const int PUB_SUB_SUBSCRIBE_UPDATE_EVENTS = 2;
    static const int PUB_SUB_SUBSCRIBE_DIALOG_EVENTS = 4;
    static const int PUB_SUB_SUBSCRIBE_VBUS_EVENTS = 8;


    XmppAuthMethode m_AuthMethod;
    std::string m_Domain;
    std::string m_JID;
    std::string m_Password;
    std::string mOAuthToken;
    bool m_Cloud = false;
    bool m_ScannerMode = false;
    bool m_LogStream = false;
    fh_uint32 m_PubSubFlags = 0;
};
class CXmppClientDelegate
{
public:
    virtual ~CXmppClientDelegate() {}
    virtual void AuthFailed() {}
    virtual void NoSubscription() {}
    virtual void OnConnected() {}
    virtual void OnDisconnected(fh_error err, const std::string& errorDetail) { FH_UNUSED(err); FH_UNUSED(errorDetail); }

    virtual void OnNewContact(const CXmppContact& contact) { FH_UNUSED(contact); }
    virtual void OnContactRemoved(const CXmppContact& contact) { FH_UNUSED(contact); }

    virtual void OnContactOnline(const CXmppContact& contact) { FH_UNUSED(contact); }
    virtual void OnContactOffline(const CXmppContact& contact) { FH_UNUSED(contact); }

    virtual void OnPubsubEvent(const CStanza& stanza) { FH_UNUSED(stanza); }
    virtual void OnRPCResult(const CStanza& stanza) { FH_UNUSED(stanza); }
    virtual void OnStartTLS() {}

    virtual CXmppRPCCall* tunnelRpcCall(CXmppRPCCall* call) { return nullptr; }

};

class CXmppClient : public CXmppStream
{
public:
    enum class EState
    {
        // startup
        DISCONNECTED,
        INITIAL_STREAM_START,
        REQUEST_START_TLS,
        START_TLS,
        TLS_STREAM_START,

        // scram-sha-1 authentication
        SCRAM_SHA1_INIT,
        SCRAM_SHA1_FINISH,

        // anonymouse authentication
        REQUEST_SASL_EXTERNAL,

        // oauth2 authentication
        OAUTH2_AUTHENTICATION,

        // common states
        AUTHENTICATED_STREAM_START,
        BIND_REQUEST,
        START_SESSION,
        CONNECTED,
    };

    CXmppClient(CController& controller, const CXmppConfig& config, CXmppClientDelegate* delegate, FHSocket* sock);
    virtual ~CXmppClient();

    EState State() const { return m_State; }
    bool IsReceiving() const { return m_Receiving; }
    const std::string& LocalJID() const { return mLocalJID; }
    const std::string& Domain() const { return m_Config.m_Domain; }

    virtual void Receive(const void* data, int size) override;
    virtual void Send() override;
    void Send(const void* data, int length);
    void Send(const std::string& str);
    void SendStanza(const CStanza& stanza);

    CXmppContact* ContactByJID(const std::string& jid);
    const std::map<std::string, CXmppContact*>& ContactsByBareJID() const { return m_ContactsByBareJID; }


    virtual void HandleStreamStart(const char* name, const char** attributes) override;
    virtual void HandleStreamEnd() override;
    virtual void HandleStanza(const CStanza& stanza) override;

    bool Closed() const { return m_Closed; }
    fh_error ErrorCode() const { return m_ErrorCode; }

    void* QueryWorkBuffer(int size);
    void ReleaseWorkBuffer();

    void EnableTimeout(bool enable);

    bool SendRPCCall(CXmppRPCCall* call, const std::string& to, CXmppRPCCall::ESender sender);

    fh_error FindAndRemoveRpcCallForResult(const CStanza& stanza, CXmppRPCCall*& rpcCall);

    void sendPing();
    void setPingDestination(const std::string& jid) { mPingDestination = jid; }

    CCryptoContext*& CryptoContext() { return m_CryptoContext; }
#ifdef FH_VARIANT_APP
    void closeLockFile();
#endif
    fh_error isCloudConnectionLockedByApp();
    void createLockFile();
private:

    static void TimeoutTimer(FHSysTimer timer, fh_context* ctx, void* userPtr);
    void CheckSSLConnection();
    void CheckRPCTimeout();
    bool parsePrivateDataJson(fh_subscription_info& info, const std::string& json);
    void ErrorDisconnect(fh_error err, const std::string& errorDetail);
    void SetState(EState state);
    void FeedParser(const char* data, int len);
    void SendRaw(const void* data, int length);
    void CreateBIO();
    void SendStreamStart();
    void SendScramSha1Init();
    void SendStartTLS();
    void HandleIqPingStanza(const CStanza& stanza);
    void HandleIqPongStanza(const CStanza& stanza);
    void HandleIqQueryStanza(const CStanza& stanza);
    void HandleIqVCardStanza(const CStanza& stanza);
    void HandleIqErrorStanza(const CStanza& stanza);
    void HandleIQStanza(const CStanza& stanza);
    void HandlePresenceStanza(const CStanza& stanza);
    void HandleStreamFeatures(const CStanza& stanza);
    void HandleTLSProceed();
    void HandleScramSha1Challenge(const CStanza& stanza);
    void HandleRoster(const CStanza& stanza);
    void HandlePrivateData(const CStanza& stanza);
    void HandleSubscribeResult(const CStanza& stanza);
    void HandleStartPairingResult(const char* res);


    void SubscribeToPresence(const std::string& jid);
    
    static int BIO_Read(BIO* bio, char* out, int len);
    static int BIO_Write(BIO* bio, const char* in, int len);
    static int BIO_PutString(BIO* bio, const char* str);


    CController& m_Controller;
    CXmppConfig m_Config;
    CXmppClientDelegate* m_Delegate = nullptr;

    EState m_State = EState::DISCONNECTED;
    bool m_Closed = false;
    bool m_Receiving = false;
    fh_error m_ErrorCode = FH_ERR_OK;

    

    Buffer m_SendBuffer;
    Buffer m_RecvBuffer;

    std::string m_ScramSha1Init;

    BIO* m_BIO = nullptr; // openssl bio
    SSL* m_SSL = nullptr;
    bool m_SSLConnectionEstablished = false;
    bool m_ResetParser = false;

    std::string mLocalJID;
    std::map<std::string, CXmppContact*> m_ContactsByBareJID;


    CCryptoContext* m_CryptoContext = nullptr;

    bool m_WorkBufferInUse = false;
    int m_WorkBufferSize = 0;
    void* m_WorkBuffer = nullptr;

    fh_uint64 m_TimeoutTime = 20000; // milliseconds
    FHSysTimer m_TimeoutTimer = nullptr;
    uint64_t mLastTimoutTimerTime = 0;
    fh_uint64 m_LastReceiveTime = 0LL;
    std::string m_CurPingID;
    std::string mPingDestination;
    fh_int32 m_NextPingID = 1;
    fh_uint64 m_LastPingTime;

    // sequencial request ID
    fh_uint64 m_NextRPCCallID = 1;

    // xmpp call list
    std::vector<CXmppRPCCall*> m_RPCCalls;

#if defined(FH_VARIANT_APP) || defined(FH_VARIANT_WIDGET)
    std::string lockFileName() const;
#endif
#ifdef FH_VARIANT_APP
    LockFile* mCloudConnectionLockFile = nullptr;
#endif
};
} // freeathome

#endif
