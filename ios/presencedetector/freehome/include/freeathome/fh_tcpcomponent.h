#ifndef FH_TCPCOMPONENT_H
#define FH_TCPCOMPONENT_H

#include "fh_network.h"

namespace freeathome {

class CTCPComponent
{
public:
    explicit CTCPComponent(FHSocket* socket)
    {
        m_Socket = socket;
    }
    virtual ~CTCPComponent()
    {
        FHSocket_Close(m_Socket);
    }

    virtual void Send() = 0;
    virtual void Receive(const void* data, int len) = 0;

    FHSocket* Socket() { return m_Socket; }

protected:
    FHSocket* m_Socket = nullptr;
};
} // fh
#endif
