#ifndef FH_MESSAGES_H
#define FH_MESSAGES_H

#include "minijson.h"
#include "fh_network.h"

namespace freeathome {

class CController;

class CMessageManager
{
public:
    CMessageManager(CController& ctrl, const std::string& messageFilePath);
    ~CMessageManager();

    void SendPushNotification(const std::vector<std::string>& receivers, const std::string& message, const std::vector<std::string>& payload, int severity);
    void SendEmail(const std::vector<std::string>& recipients, const std::string& subject, const std::string& body, int severity);
    void SendSMS(const std::vector<std::string>& recipients, const std::string& subject, const std::string& body, int severity);

private:
    static void OnTimer(FHSysTimer timer, fh_context* ctx, void* userData);
    void SendNextOutstandingMessage(bool save);
    void Load();
    void Save();
    CController& m_Controller;
    minijson::CObject* m_Json = nullptr;
    FHSysTimer m_Timer;
    std::string m_MessageFilePath;
    bool m_Sending = false;
};

} // freeathome
#endif
