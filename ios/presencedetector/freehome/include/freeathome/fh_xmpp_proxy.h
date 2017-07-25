#ifndef FH_XMPP_PROXY_H
#define FH_XMPP_PROXY_H

#include "fh_common.h"
#include "fh_xmpp_stream.h"
#include "fh_cglobals.h"
extern "C" {
#include <libxml/parser.h>
}
#include <string>
#include <map>

namespace freeathome {

class CHttpResponder;
class CController;
class CState;
class CXmppParameter;

class CXmppProxy : public CXmppStream
{
public:
    CXmppProxy(CController& controller, FHSocket* socket, const std::string& remoteJID, const std::string& password);
    ~CXmppProxy();

    bool Closed() const { return m_Closed; }


    void HandleClientBindRequest(const std::string& iqStanzaID, const char* desiredResourceName);
    void HandleSessionOpen(const std::string& iqStanzaID);
    void HandlePresence();
    void HandlePing(const std::string& queryID);
    void HandleRPCQuery(const CStanza& stanza); // takes ownership


    void SendModelState(const CState& state);
    void SendRPCResult(const std::string& queryID, const CXmppParameter& result);
protected:
    virtual void HandleStreamEnd() override;
    virtual void HandleStanza(const CStanza& stanza) override;
    void handleData(const void* data, size_t len);

    void login(const char* plainText);
    void acceptLogin();
    void rejectLogin();

    std::string ClientJID(bool withResource);
    void Error(const char* msg);
    void ReadMessage();
    void Accept();
    virtual void sendMessage(const void* data, size_t length) = 0;
    void sendMessage(const std::string& msg);


    CController& m_Controller;
    fh_uint64 m_NextExpectedUpdateID = 0LL;
    int m_XmlDepth = 0;

    std::string mPassword;
    std::string m_Domain; // xmpp domain (eg busch-jaeger.de)
    std::string m_ClientNode;
    std::string m_ClientResourceName;
    bool m_InBindStanza = false;
    bool m_StoreXmlText = false;
    std::string m_XmlText;
    std::string m_LastGetAllQueryID;

    bool m_ResetParser = false;
    bool m_CloseWhenAllDataSend = false;
    bool m_Closed = false;
    bool mAuthenticated = false;
};

class XmppWebSocketProxy : public CXmppProxy
{
public:
    XmppWebSocketProxy(CController& controller, FHSocket* socket, const std::string& remoteJID, const std::string& password);
    virtual ~XmppWebSocketProxy();

    // CTcpComponent overrides
    virtual void Send() override;
    virtual void Receive(const void* data, int size) override;

private:
    virtual void HandleStreamStart(const char* name, const char** attributes) override;
    void sendStreamOpenAndFeatures();
    void closeWebSocket();
    void doHandshake();
    void readMessage();
    virtual void sendMessage(const void* data, size_t length) override;


    bool mHandshakeDone = false;
    SWSParser* m_WebSocketParser = nullptr;
    SWSFrame* m_WebsocketFrame = nullptr;
    Buffer mRecvBuffer;
    Buffer mSendBuffer;
};

class XmppBoshProxy : public CXmppProxy
{
public:
    XmppBoshProxy(CController& controller, const std::string& remoteJID, const std::string& password);
    virtual ~XmppBoshProxy();

    void setConnection(CHttpResponder* connection, const Buffer& data);
    void connectionClosed(CHttpResponder* connection);

    virtual void Send() override;
    virtual void Receive(const void* data, int size) override;
private:
    virtual void HandleStreamStart(const char* name, const char** attributes) override;

    void sendHttpResponse(const void* data, size_t len);
    void sendCreationResponse();
    void sendCreationResponseAuthenticated();
    virtual void sendMessage(const void* data, size_t length) override;
    bool consume(size_t& pos, const char* str);
    void skipWhitespaces(size_t& pos);
    bool readAttribute(size_t& pos, std::string& attr, std::string& val);
    void parseBody();
    
    bool mHandshakeDone = false;
    std::vector<CHttpResponder*> mConnections;
    char* mBody = nullptr;
    size_t mBodyLength = 0;
    size_t mContentOffset = 0;
    size_t mContentLength = 0;
    std::map<std::string, std::string> mBodyAttributes;
    Buffer mSendBuffer;
};

}

#endif
