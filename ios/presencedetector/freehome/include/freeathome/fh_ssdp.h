#ifndef FH_SSDP_H
#define FH_SSDP_H

#include "fh_network.h"
#include "fh_common.h"
#include <string>
#include <map>

namespace freeathome {

class CController;

// implements ssdp, a protocol used by upnp to discover services in a network
class CSimpleServiceDiscovery
{
public:
    explicit CSimpleServiceDiscovery(CController& ctrl);
    virtual ~CSimpleServiceDiscovery();

    void Receive(const char* from, const void* data, int len);
    FHSocket* Socket() { return m_Socket; }
private:
    struct SSysAP
    {
        std::string m_Address;
        std::string m_UUID;
        bool m_Visible = false;
        fh_int64 m_BroadcastID;
        CURL* m_CurlHandle = nullptr;
        std::string m_SettingsJson;
    };
    void curlOpFinished(CURL* curlHandle, CURLcode curlResult);
    bool DownloadSettingsJson(SSysAP* sysAP);
    void RemoveSysAP(const std::string& uuid);
    void SysAPAnswered(const std::string& from, const std::string& uuid);
    void CreateSocket();
    void RemoveSysAPs();
    void SendSearch();
    static void Request_192_168_2_1(FHSysTimer timer, fh_context* ctx, void* userData);
    void OnTimer();
    static void TimerFunc(FHSysTimer timer, fh_context* ctx, void* userData);
    static size_t CurlWriteCallback(void *data, size_t size, size_t nmemb, void* userPtr);

    CController& m_Controller;
    FHSocket* m_Socket = nullptr;
    FHSysTimer m_Timer = nullptr;
    fh_int64 m_BroadCastID = 1;
    std::map<std::string, SSysAP*> m_SysAPsByUUID;
    SSysAP* m_192_168_2_1 = nullptr;
    FHSysTimer m_Timer_192_168_2_1 = nullptr;
};

} // freeathome

#endif
