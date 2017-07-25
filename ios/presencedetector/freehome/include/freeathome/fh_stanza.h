#ifndef FH_STANZA_H
#define FH_STANZA_H

#include <stdio.h>
#include <string>
#include <map>
#include <limits.h>
#include <limits>
#include "fh_cglobals.h"

namespace freeathome {


class CStanzaWriter
{
public:
    CStanzaWriter();
    ~CStanzaWriter();

    const char* Data() const { return m_Buf; }
    int Count() const { return m_BytesWritten; }
    void AllocBuffer(int size);
    void SetStackBuffer(char* buf, int size);
private:
    void Write(const char* str);
    void Write(const std::string& str);
    void WriteEscaped(const char* str, int len = -1);
    void WriteEscaped(const std::string& str);

    int m_BytesWritten = 0;
    int m_BufSize = 0;
    char* m_Buf = nullptr;
    bool m_HasStackBuffer = false;
    friend class CStanza;
};

template <int SIZE>
class CStackStanzaWriter
{
public:
    CStackStanzaWriter()
    {
        m_Writer.SetStackBuffer(m_Stack, SIZE);
    }

    operator CStanzaWriter&()
    {
        return m_Writer;
    }
    CStanzaWriter* operator ->()
    {
        return &m_Writer;
    }

private:
    char m_Stack[SIZE];
    CStanzaWriter m_Writer;
};

class CStanza
{
public:
    CStanza();
    CStanza(const std::string& name, const char** attributes = nullptr);
    ~CStanza();

    CStanza* FirstChild();
    const CStanza* FirstChild() const;
    CStanza* FirstChildByName(const std::string& name);
    const CStanza* FirstChildByName(const std::string& name) const;
    CStanza* Next();
    const CStanza* Next() const;
    CStanza* NextByName(const char* name);
    const CStanza* NextByName(const char* name) const;
    CStanza* Parent();

    void AddChild(CStanza* child);
    int CountChildren() const;

    void setText(const char* text, size_t length = std::numeric_limits<size_t>::max());
    void SetUnescapedText(const char* text);
    const char* Text() const { return m_ContentText; }

    const std::string& Name() const;
    void SetName(const std::string& name);

    const std::string& Type() const;
    void SetType(const std::string& type);

    const std::string& Namespace() const;
    void SetNamespace(const std::string& ns);

    const std::string& ID() const;
    void SetID(const std::string& _id);

    const std::string& Attribute(const std::string& name) const;
    void SetAttribute(const std::string& name, const std::string& value);

    void WriteXmlText(CStanzaWriter& writer) const;
private:
    void WriteXmlTextR(CStanzaWriter& writer) const;


    CStanza* m_FirstChild = nullptr;
    CStanza* m_LastChild = nullptr;
    CStanza* m_Next = nullptr;
    CStanza* m_Parent = nullptr;

    std::string m_Name;
    std::map<std::string, std::string> m_Attributes;

    // content text
    int m_ContentTextLength = 0;
    char* m_ContentText = nullptr;
};

}



#endif
