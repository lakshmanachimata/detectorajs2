#ifndef FH_XMPP_STREAM_H
#define FH_XMPP_STREAM_H

#include "fh_tcpcomponent.h"
#include <stdio.h>
#include <libxml/parser.h>
#include <string>

inline const char* xmlCharToChar(const xmlChar* str)
{
    return (const char*)str;
}

namespace freeathome {

class CStanza;
class VMBuffer;

// this is the base class for our xmpp client and server
class CXmppStream : public CTCPComponent
{
public:
    explicit CXmppStream(FHSocket* socket);
    virtual ~CXmppStream();

    virtual void HandleStreamStart(const char* name, const char** attributes) = 0;
    virtual void HandleStreamEnd() = 0;
    virtual void HandleStanza(const CStanza& stanza) = 0;
protected:
    static void SaxStartElement(void* ctx, const xmlChar* name, const xmlChar** attributes);
    static void SaxEndElement(void* ctx, const xmlChar* name);
    static void SaxCharacters(void* ctx, const xmlChar* ch, int len);
    void ResetParser();

    xmlSAXHandler m_SaxHandler;
    xmlParserCtxtPtr m_SaxParser = nullptr;
    int m_CurDepth = 0;
    CStanza* m_CurStanza = nullptr;
    size_t mContentTextSize = 0;
    VMBuffer* mContentText = nullptr;
};
    
}

#endif 
