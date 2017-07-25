#ifndef FH_CONTROLLER_H
#define FH_CONTROLLER_H

#include "fh_common.h"
#include "fh_network.h"
#include "fh_xmpp_rpc.h"
#include "fh_lookup.h"
#include "freeathome.h"
#include "minijson.h"
#include <map>
#include <set>

typedef void CURL;
typedef void CURLM;
namespace freeathome {

class CXmppProxy;
class CStateManager;
class CState;
class CXmppParameter;
class CConfig;
class CFileManager;
class CHttpResponder;
class CmdQueue;
class ModelParser;
class CCryptoManager;
class CSimpleServiceDiscovery;
class CScanClient;
class CSysAPClient;
class CCurlTarget;
class CTCPComponent;
class CMessageManager;

class CController
{
public:
    enum class EConnectState
    {
        DISCONNECTED,
        CONNECTING,
        CONNECTED,
    };

    explicit CController(fh_config* cfg);
    CController(const CController&) = delete;
    ~CController();

    fh_context* FHContext();
    const fh_config& Config() const { return *m_Config; }
    void SetConnectConfig(fh_connect_config* cfg);
    const fh_connect_config& ConnectConfig() const { return *m_ConnectConfig;}
    const fh_sysap_info& SysAPInfo() const { return *m_SysAPInfo; }
    void Start(); // start the worker thread
    void Stop(); // stop the worker thread
    void DisableResume();

    void SetAborting();
    bool IsAborting() const { return m_Aborting; }

    CXmppProxy* Proxy() { return m_Proxy; }
    CStateManager& StateManager() { return *m_StateManager; }

    void SetSystemData(void* systemData);
    void* GetSystemData();

    // network callbacks
    void OnNetThreadStarted();
    void OnNetThreadFinished();
    void OnListenSocketAccept(FHSocket* sock, int newSocket);
    void OnFHSocketDataReceived(FHSocket* sock, const char* from, const fh_uint8* data, fh_uint32 size);
    void OnFHSocketOpened(FHSocket* sock);
    void OnFHSocketError(FHSocket* sock, FHSocketError err);
    void OnFHSocketClosed(FHSocket* sock);
    void OnFHSocketCanSend(FHSocket* sock);

    // callbacks from client
    void OnGetAllReceived(const char* xml);
    void OnUpdateReceived(const char* xml);
    void OnPairWithAppReceived(const CXmppParameter& result);
    void OnRPCResult(CXmppRPCCall::ESender sender, const std::string& queryID, const CXmppParameter& value);


    // callbacks from proxy
    void OnProxyReceivedGetAll(int mode);
    void OnProxyDisconnected();
    void OnProxyRPCCall(CXmppRPCCall* call); // takes ownership of call

    CFileManager& FileManager() { return *m_FileManager; }

    // callbacks from model
    void PushModelState(const CState& update, const std::string& extra);

    CmdQueue& CmdQueueToFHThread() { return *m_CQToFHThread; }
    CmdQueue& CmdQueeuFromFHThread() { return * m_CQFromFHThread; }
    void RunNextCommand();

    void EmitEvent(fh_event state, const fh_event_data* eventData);
    bool EmitNextEvent();
    void AddCurlHandle(CCurlTarget* target, CURL* curlEasyHandle);
    void addCurlHandle(CURL* curlEasyHandle, std::function<void (CURL* curlEasyHandle, CURLcode curlCode)> func);
    void RemoveCurlHandle(CURL* curlEasyHandle);

    // NOTE: these methods are called directly from the main thread
    bool StateEnum_Init();
    fh_result StateEnum_Next(fh_sysap_state& state);
    void StateEnum_Free();
    fh_result CopyState(fh_int64 stateID, fh_sysap_state& state);

    void StartXmppServer(const std::string& password);
    void StartHttpProxy();

    void startScanning(bool local, bool cloud);
    void stopScanning();

    CSysAPClient* SysAPClient() { return m_SysAPClient; }
    void Disconnect(fh_error errCode, const std::string& detail, bool keepState = false);
    void StoreState();

    CCryptoManager& CryptoManager() { return * m_CryptoManager; }

    void FrontendDownloadFinished(fh_error err, const std::string& errorDetail);
    bool HandleSettingsJson(const std::string& settingsJson);
    void QuerySettingsJson(std::function<void (const std::string& res)> resultFunc);

    const std::string& CurLocalJID() const { return m_CurLocalJID; }
    bool LookupJID(bool& initial);

    void CloseXmppConnectionSilently();
    bool IsInitialLogin() const { return m_InitialUserLogin; }

    void LookupIP(const std::string& domain, std::function<void (std::string)> resultFunc);
    void LookupSrvRecord(const std::string& domain, bool scanClient, std::function<void (const std::vector<SSrvRecord>&)> resultFunc);
    fh_uint32 NextRandomNumber();
    void DestroyScanClient();

    void setPingTime(uint32_t timeMilliseconds);
    uint32_t pingTime() const { return mPingTimeMilliseconds; }


#if defined(FH_VARIANT_APP)
    void closeLockfile();
#endif
private:
    static void CurlTimer(FHSysTimer timer, fh_context* ctx, void* userPtr);
    static void OnReconnectScannerTimer(FHSysTimer timer, fh_context* ctx, void* ptr);
    static void UpdateLookupServiceTimer(FHSysTimer timer, fh_context* ctx, void* userPtr);

    void DeleteScanClient();

    void DoDisconnect();
    bool StateEnum_CopyState(fh_int64 stateID);
    void CreateCertificate(const std::string& cloudUser, const std::string& cloudPassword, const fh_cert_info* certInfo);
    void RenewCertificate();
    std::string DownloadSettingsJson(const std::string& host);

    void querySysAPInfoCloud(const std::string& jid, int timeoutSeconds, int64_t userData);
    void querySysAPInfo(const std::string& host, int timeoutSeconds, int64_t userData);
    void StoreSrvRecords(const std::string& url, const std::vector<SSrvRecord>& records);
    bool LoadSrvRecords(const std::string& url, std::vector<SSrvRecord>& records, fh_int64& time);
    void SortSrvRecords(std::vector<SSrvRecord>& orderedVectors, const std::vector<SSrvRecord>& records);
    void LookupSrvRecords(bool scanClient, std::function<void (const std::vector<SSrvRecord>)> resultFunc);
    void ConnectNextXmppServer();
    void RealConnect();
    void Connect();
    void ScanClientConnectNextServer();
    void ConnectScanClient();
    void DestroySysAPClient();

    EConnectState m_ConnectState = EConnectState::DISCONNECTED;

    // user-data pointer for the system implementation
    void* m_SystemData = nullptr;

    // file manager for web content
    CFileManager* m_FileManager = nullptr;

    // socket listening for incoming connections from the app webview
    FHSocket* m_XmppListenSocket = nullptr;

    // listen socket for the http server
    FHSocket* m_HttpListenSocket = nullptr;

    // all tcp components
    std::map<FHSocket*, CTCPComponent*> m_TCPComponents;

    // socket connected to the xmpp client inside the webview
    bool m_ProxyConnected = false;

    // socket connected to the xmpp server on the sysap or in the 'cloud'
    FHSocket* m_SysAPClientSocket = nullptr;

    // xmpp client communicating with the xmpp server on the sysap or in the 'cloud'
    CSysAPClient* m_SysAPClient = nullptr;
    std::vector<SSrvRecord> m_OrderedSrvRecords;
    int m_NextSrvRecord = 0;


    // xmpp scan client
    FHSocket* m_ScanClientSocket = nullptr;
    CScanClient* m_ScanClient = nullptr;
    std::vector<SSrvRecord> m_ScanClientOrderedSrvRecords;
    int m_ScanClientNextSrvRecord = 0;


    // xmpp proxy to communicate with the xmpp client inside the webview
    CXmppProxy* m_Proxy = nullptr;
    std::string mXmppProxyPassword;

    // sysap state, responsible for caching and pushing sysap updates (full and relative)
    CStateManager* m_StateManager = nullptr;

    // command queues used for communication between user thread and library thread
    CmdQueue* m_CQToFHThread = nullptr;
    CmdQueue* m_CQFromFHThread = nullptr;


    fh_config* m_Config = nullptr;
    fh_connect_config* m_ConnectConfig = nullptr;
    std::string m_CurLocalJID;

    CURLM* m_CurlMulti = nullptr;
    std::map<CURL*, CCurlTarget*> m_CurlTargetsByHandle;
    std::map<CURL*, std::function<void (CURL* curlEasyHandle, CURLcode curlCode)>> mCurlResultFunctionsByHandle;
    FHSysTimer m_CurlTimer = nullptr;

    // state enumeration from the main thread
    int m_StateEnum_Index = -1;
    std::vector<fh_int64> m_StateEnum_IDs;
    fh_sysap_state m_MainThreadModelState = { 0, 0, NULL };
    VMBuffer* m_MainThreadModelStateXML = nullptr;

    fh_sysap_info* m_SysAPInfo = nullptr;
    std::string m_CachedSettingsJson;

    ModelParser* m_ModelParser = nullptr;

    CCryptoManager* m_CryptoManager = nullptr;

    CSimpleServiceDiscovery* m_SimpleServiceDiscovery = nullptr;

    bool m_LockDisconnect = false;
    bool m_DisconnectLater = false;
    bool m_KeepState = false;
    bool m_AwaitingGetAllFromFrontend = false;
    bool m_InitialUserLogin = false; // need to set password for the user
    fh_error m_DisconnectError = FH_ERR_OK;
    std::string m_DisconnectDetail;

    fh_int64 m_RestoredState = 0LL;
    FHSysTimer m_ReconnectScannerTimer = nullptr;
    fh_int64 m_NextExpectedProxyUpdateID = -1LL;

    CMessageManager* m_MessageManager = nullptr;

    FHSysTimer m_LookupTimer = nullptr;
    CLookupService* m_LookupService = nullptr;
    volatile bool m_Aborting = false;
    void* m_RandomGenerator = nullptr;

    uint32_t mPingTimeMilliseconds = 5000; // 0: no ping
    bool mStopping = false;
};

/**
 * Convenience function that simply casts this controller to the @ref fh_context.
 *
 * @return The @ref fh_context pointer associated with this context (which is actually the same
 *         pointer).
 **/
inline fh_context* CController::FHContext()
{
    return static_cast<fh_context*>(this);
}

}

#endif
