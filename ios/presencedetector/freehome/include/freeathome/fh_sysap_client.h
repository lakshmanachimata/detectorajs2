#ifndef FH_SYSAP_CLIENT_H
#define FH_SYSAP_CLIENT_H

#include "fh_xmpp_client.h"

namespace freeathome {

class CloudProto2;

class CSysAPClient : public CXmppClientDelegate
{
public:
    CSysAPClient(CController& controller, FHSocket* sock, const std::string& deviceFriendlyName);
    ~CSysAPClient();

    bool IsClosed() const { return m_Closed; }
    bool CloseSilently() const { return m_CloseSilently; }
    fh_error ErrorCode() const { return m_ErrorCode; }
    const std::string& ErrorDetail() const { return m_ErrorDetail; }

    void UseSysAP(const std::string& jid);
    void SendShellCommand(const std::string& cmd);
    void SendGetAll(int mode = -1);
    void SendStoreState(fh_int64 lastUpdateID);
    void SendGetCloudUUID();
    const std::string& SysAPJID() const { return m_SysAPJID; }
    CXmppClient* XmppClient() { return m_XmppClient; }
    bool sendGetSettingsJson(const std::string& toJID, std::function<void (const std::string& result)> resultFunc);

    void PairingExchangeKeys(const std::string& sysapCloudUUID, int version);
    void PairingSendAuthCode(const std::string& sysapCloudUUID, const std::string& code);
    void DispatchRPCResult(CXmppRPCCall& call, const CXmppParameter& result);
    void readyForGetAll();
private:
    void handleEncryptedUpdateProto1(const char* base64String);
    void unpackTunneledCallProto1(CXmppRPCCall* originalCall, const CStanza& stanzaValue);
    void unpackTunneledCallProto2(CXmppRPCCall* originalCall, const CStanza& stanzaValue);

    void SendPairWithApp(const std::string& sysAPCloudUUID);
    void SendSetPassword();
    void Disconnect(fh_error err, const std::string& errorDetail);

    void HandleRPCPairingResult(CXmppRPCCall& call, const CXmppParameter& result);

    void DispatchRPCMethodNotFound(CXmppRPCCall& call);
    bool Decrypt(const fh_uint8* encryptedData, int encryptedDataLength, fh_uint8*& data, int& dataLength);

    
    // pubsub events
    void OnPubsubLog(const CStanza& stanza);
    void OnPubsubUpdate(const CStanza& stanza);
    void OnPubsubDialog(const CStanza& stanza);
    void OnPubsubVbus(const CStanza& stanza);
    CXmppRPCCall* tunnelRpcCallProto1(CXmppRPCCall* call);

    virtual void NoSubscription() override;
    virtual void OnConnected() override;
    virtual void OnDisconnected(fh_error err, const std::string& errorDetail) override;
    virtual void OnPubsubEvent(const CStanza& stanza) override;
    virtual void OnRPCResult(const CStanza& stanza) override;
    virtual void OnNewContact(const CXmppContact& contact) override;
    virtual void OnContactRemoved(const CXmppContact& contact) override;

    virtual void OnContactOnline(const CXmppContact& contact) override;
    virtual void OnContactOffline(const CXmppContact& contact) override;
    virtual void AuthFailed() override;

    virtual void OnStartTLS() override;
    virtual CXmppRPCCall* tunnelRpcCall(CXmppRPCCall* call) override;
    
    CController& m_Controller;

    // WARNING: *caller* has ownership of this object, this object does NOT delete this client!
    CXmppClient* m_XmppClient = nullptr;


    std::string m_SysAPJID;
    std::string m_DeviceFriendlyName;


    std::string m_PairingSessionID;

    bool m_HaveSymmetricKey = false;

    bool m_Closed = false;
    bool m_CloseSilently = false;
    fh_error m_ErrorCode = FH_ERR_OK;
    std::string m_ErrorDetail;

    bool m_StoringState = false; // true if the app is going to suspend
    std::map<std::string, std::function<void (const std::string&)>> m_SettingsJsonRequestsByXmppQueryID;

    // used by StartPairing
    std::string m_PairingUUID;
    std::string m_PairingCode;

    CloudProto2* mCloudProto2 = nullptr;

    // sequencial request ID
    fh_uint64 m_NextRPCCallID = 1;
    std::string m_CloudSessionID;



};

}

#endif
