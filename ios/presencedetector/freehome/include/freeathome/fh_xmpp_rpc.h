#ifndef FH_XMPP_RPC_H
#define FH_XMPP_RPC_H

#include "fh_cglobals.h"
#include <string>
#include <vector>
#include <map>

// fix windows
#ifdef VOID
#undef VOID
#endif

namespace minijson
{
    class CObject;
}
namespace freeathome {

class CStanza;



class CXmppParameter
{
public:
    enum EType
    {
        INVALID = -1,
        VOID = 0,
        NIL,
        STRING,
        INT,
        I4,
        DOUBLE,
        BOOLEAN,
        BASE64,
        ARRAY,
        STRUCT,
    };
    CXmppParameter();
    CXmppParameter(const CXmppParameter& param);
    CXmppParameter(EType type, const std::string& stringValue = std::string());
    ~CXmppParameter();

    void Clear();

    static void ParamToJson(minijson::CObject& obj, const CXmppParameter& param);
    static void ParamFromJson(CXmppParameter& param, const minijson::CObject& obj);

    static void ParamToStanza(CStanza& stanza, const CXmppParameter& param);
    static void ParamFromStanza(CXmppParameter& param, const CStanza& stanza);


    EType Type() const { return m_Type; }
    const std::string& ToString() const { return m_String; }
    // void FromString(EType type, const std::string& val) { m_String = val; }

    void SetString(const std::string& val);
    void SetInt32(int val);
    void SetDouble(double val);
    void SetBool(bool val);
    void SetBinary(const void* data, int length);

    const std::string& StringValue() const;
    int IntValue() const;
    double DoubleValue() const;
    bool BoolValue() const;


    const std::vector<CXmppParameter*>& Array() const { return m_Array; }
    std::vector<CXmppParameter*>& Array() { return m_Array; }

    const std::map<std::string, CXmppParameter*>& Struct() const { return m_Struct; }
    std::map<std::string, CXmppParameter*>& Struct() { return m_Struct; }

    static EType TypeForName(const std::string& name);
    static const char* TypeName(EType type);

private:
    void operator = (const CXmppParameter&) = delete;

    EType m_Type = EType::INVALID;
    std::string m_String; // NIL, STRING, INT, BOOLEAN, BASE64
    std::vector<CXmppParameter*> m_Array; // ARRAY
    std::map<std::string, CXmppParameter*> m_Struct;  // STRUCT
    friend class CXmppRPCCall;
};
class CXmppRPCCall
{
public:
    enum class ESender
    {
        INTERN,
        PROXY,
        EXTERN,
        API,
    };
    static const fh_uint64 DEFAULT_TIMEOUT = 30000;
    static const fh_uint64 LONG_TIMEOUT = 40000; // used by getall

    CXmppRPCCall();
    explicit CXmppRPCCall(const std::string& methodName, CXmppParameter* call = nullptr);
    ~CXmppRPCCall();

    void SetSender(ESender sender) { m_Sender = sender; }
    void SetOriginalQueryID(const std::string& originalQueryID);
    ESender Sender() const { return m_Sender; }
    const std::string& OriginalQueryID() const { return m_OriginalQueryID; }

    bool FromStanza(const CStanza& stanza);
    CStanza* CreateStanza(const std::string& from, const std::string& to);

    minijson::CObject* ToJson() const;
    bool FromJson(const std::string& json);

    const std::string MethodName() const { return m_MethodName; }
    void SetMethodName(const std::string& methodName) { m_MethodName = methodName; }

    void AddParam(CXmppParameter* param);
    void AddParam(const std::string& type, const std::string& value);
    void AddParamInt32(int value);
    void AddParamUint64(fh_uint64 value);
    void AddParamDouble(double value);
    void AddParamString(const char* value);
    void AddParamBool(bool value);
    void AddParamBinaryData(const void* data, int length);


    void SetQueryID(const std::string& queryID);
    const std::string& QueryID() const { return m_QueryID; }

    void SetTunneledCall(CXmppRPCCall* call) { m_TunneledCall = call; }
    CXmppRPCCall* TunneledCall() { return m_TunneledCall; }

    fh_int64 SendTime() const { return m_SendTime; }
    void SetSendTime(fh_int64 sendTime) { m_SendTime = sendTime; }

    int ParamCount() const { return (int)m_Parameters->Array().size(); }
    CXmppParameter& Param(int index) { return *m_Parameters->Array()[index]; }
    const CXmppParameter& Param(int index) const { return *m_Parameters->Array()[index]; }

    fh_int64 Timeout() const { if (m_TunneledCall) return m_TunneledCall->Timeout(); return m_Timeout; }
    void SetLongTimeout() { m_Timeout = LONG_TIMEOUT; }
private:
    CXmppRPCCall(const CXmppRPCCall&) = delete;
    void operator = (const CXmppRPCCall&) = delete;
    void CreateParamStanza(CStanza& stanza, const CXmppParameter& param);

    std::string m_MethodName;
    std::string m_QueryID;
    CXmppParameter* m_Parameters = nullptr;

    std::string m_OriginalQueryID;
    ESender m_Sender = ESender::INTERN;

    CXmppRPCCall* m_TunneledCall = nullptr;
    fh_uint64 m_SendTime = 0LL; // in milliseconds
    fh_int64 m_Timeout = DEFAULT_TIMEOUT; // milliseconds
};


} // freeathome
#endif


