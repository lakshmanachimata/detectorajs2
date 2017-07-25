#ifndef FH_SCAN_CLIENT_H
#define FH_SCAN_CLIENT_H

#include "fh_xmpp_client.h"
#include <set>

namespace freeathome {

// xmpp scan client
class CScanClient : public CXmppClientDelegate
{
public:
    CScanClient(CController& controller, FHSocket* sock);
    ~CScanClient();

    CXmppClient* XmppClient() { return m_XmppClient; }
    bool isClosed() const { return mClosed; }
private:
    void HandleRPCExchangeKeysResult(const std::string& from, CXmppRPCCall& call, const CXmppParameter& result);
    void SendGetSettingsJson(const std::string& jid);

    virtual void OnConnected() override;
    virtual void OnDisconnected(fh_error err, const std::string& errorDetail) override;

    virtual void OnNewContact(const CXmppContact& contact) override;
    virtual void OnContactRemoved(const CXmppContact& contact) override;

    virtual void OnContactOnline(const CXmppContact& contact) override;
    virtual void OnContactOffline(const CXmppContact& contact) override;

    virtual void OnRPCResult(const CStanza& stanza) override;


    CController& m_Controller;

    // WARNING: *caller* has ownership of this object, this object does NOT delete this client!
    CXmppClient* m_XmppClient = nullptr;

    std::set<std::string> m_OnlineContacts;
    bool mClosed = false;
};

} // freeathome

#endif
