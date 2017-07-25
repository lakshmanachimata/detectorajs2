#ifndef FH_HTTP_H
#define FH_HTTP_H

#include <stdio.h>
#include "fh_network.h"
#include "fh_common.h"
#include "fh_tcpcomponent.h"

namespace freeathome {

class CController;
class CFileInfo;


class CHttpResponder : public CTCPComponent
{
public:
    CHttpResponder(CController& controller, FHSocket* socket);
    virtual ~CHttpResponder();

    // handle incoming data
    virtual void Receive(const void* data, int len) override;
    virtual void Send() override;

    void sendResult(const void* data, size_t length, const char* header);
    void close();
private:
    void writeHeader(size_t contentLength);
    void HandleHeader(size_t headerLength);
    void HandleHeader();
    void SendFileNotFoundResponse();

    CController& m_Controller;
    Buffer m_Buffer;

    uint64_t mDebugID = 1;
    bool m_ReadyToSend = false;
    std::string m_Path;
    Buffer mSendBuffer;
    size_t mBytesSent = 0; // bytes sent: responseheader + SendFile
    bool mBoshRequest = false;
};

}

#endif
