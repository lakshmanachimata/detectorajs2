#ifndef FH_COMMON_H
#define FH_COMMON_H

#include "fh_cglobals.h"
#include "freeathome.h"
#include <stdlib.h>
#include <atomic>
#include <string>
#include <vector>
#include <curl/curl.h>
#include <string.h>
#include <mutex>

// fix windows
#ifdef ERROR
#undef ERROR
#endif
namespace freeathome {

class Buffer;

template <class T>
struct SMallocDeleter
{
    void operator()(T *p) { free(p); }
};

// returns true on overflow
bool addWithOverflowCheck(size_t& res, size_t a, size_t b);

class CEventData
{
public:
    CEventData()
    {
        m_Data.m_error = FH_ERR_OK;
        m_Data.m_string = nullptr;
        m_Data.m_float = 0.0f;
        m_Data.m_int64 = 0LL;
        m_Data.m_pointer = nullptr;
    }

    fh_event_data* operator -> () { return &m_Data; }
    operator const fh_event_data* () { return &m_Data; }

    fh_event_data m_Data;
};

std::string replaceInString(const std::string& str, const std::string& find, const std::string& newText);
std::string Format(const char* str, ...)
#ifdef __GNUC__
    __attribute__((format(printf, 1, 2)))
#endif
    ;
std::string XmlEscape(const std::string& str);
int CmpVersions(const fh_uint32 ver[4], fh_uint32 major, fh_uint32 minor, fh_uint32 revision);

bool isStringIp(const std::string& host);
struct curl_slist* makeCurlHostlist(const std::string& hostIp);

bool FileExists(const char* path);
bool DirExists(const char* path);
bool readFileToMemory(const char* path, Buffer& buffer);
bool WriteFile(const char* path, const void* data, size_t size);
bool ReadRandomBytes(void* bytes, int len);
void GetDirFileList(const std::string& dir, std::vector<std::string>& files);
void* SetupRandomGenerator();
void FinishRandomGenerator(void* data);
fh_uint32 NextRandomNumber(void* data);

enum class FileLockType
{
    read,
    write,
    unlock
};

bool lockFile(FILE* f, FileLockType type);


void FHSingleShotTimer(int intervalMS, std::function<void ()> f, fh_context* ctx);

const char* DeviceTypeString(fh_uint32 flags);
const char* PlatformString(fh_uint32 flags);

// string helpers
char* AllocString(const char* str, int len = -1);
void FreeString(char* str);
int Utf8Compare(const char* s1, const char* s2, bool caseSensitive = true);
char* Utf8ToLower(const char* str);
void* Realloc(void* ptr, size_t size);
bool isStringEmpty(const char* str);

// time
fh_uint64 GetMonotonicMSTime();

// settings json
bool ParseSettingsJson(const std::string& json, fh_sysap_info& info);


// jid helpers
std::string BareJID(const std::string& jid);
std::string NodeFromJID(const std::string& jid);
std::string DomainFromJID(const std::string& jid);
std::string ResourceFromJID(const std::string& jid);

// path helper
std::string JoinPath(const std::string& a, const std::string& b);
std::string JoinPath(const std::string& a, const std::string& b, const std::string& c);

// url helper
std::string HostFromURL(const std::string& url);

// socket helper
bool Socket_GetPeerAddress(int sock, char* addrStr, uint32_t addrStrLen, fh_uint16* port); // addrStr should have at least 1024 bytes

// convert functions
bool ConvertStringToUint16(const char* str, fh_uint16& val);
bool ConvertStringToUint32(const char* str, fh_uint32& val);
bool ConvertStringToUint64(const char* str, fh_uint64& val);
bool ConvertStringToInt64(const char* str, fh_int64& val);
bool ConvertStringToUint8Hex(const char* str, fh_uint8& val);
bool ConvertStringToUint16Hex(const char* str, fh_uint16& val);
bool ConvertStringToUint32Hex(const char* str, fh_uint32& val);
bool ConvertStringToUint64Hex(const char* str, fh_uint64& val);
void ConvertInt64ToString(fh_int64 val, char* str);
void ConvertUint64ToString(fh_uint64 val, char* str);
bool convertStringToDouble(const char* str, double& val);
void SplitString(const std::string& str, std::vector<std::string>& tokens, const std::string& delimiters = " ", bool trimEmpty = false);


// srv record lookup
struct SSrvRecord
{
    std::string m_Server;
    int m_Port;
    int m_Priority;
    int m_Weight;
};
bool LookupSRVRecord(const char* domain, std::vector<SSrvRecord>& records, volatile bool* abort);


// websocket parser
enum class EWSMessageType { NONE, TEXT, BINARY, CLOSE, PING, PONG };
enum class EWSParserResult { MESSAGE, COMMAND, NEED_MORE_DATA, ERROR };
typedef struct _SWSParser SWSParser;

SWSParser* WSParser_Create(bool server);
void WSParser_Free(SWSParser* parser);
EWSParserResult WSParser_Parse(SWSParser* parser, const uint8_t* data, size_t length, size_t* read);
EWSMessageType WSParser_GetMessage(SWSParser* parser, uint8_t** data, size_t* length);


// websocket frame creation
typedef struct _SWSFrame SWSFrame;
enum class EWSOPCode { CONTINUE, TEXT, BINARY, CLOSE, PING, PONG };
const int SWS_MAX_FRAME_HEADER_SIZE = 14;
SWSFrame* WSFrame_Create();
void WSFrame_Free(SWSFrame* frame);
void WSFrame_CreateHeader(SWSFrame* frame, EWSMessageType type, int size, bool server, bool finalFragment);
int WSFrame_HeaderData(SWSFrame* frame, void* data); // data buffer should have at least SWS_MAX_FRAME_HEADER_SIZE bytes
void WSFrame_MaskData(SWSFrame* frame, uint8_t* dst, const uint8_t* src, int len);

// base64 encode/decode
size_t Base64_Encode(char** out, const fh_uint8* data, size_t length);
bool Base64_Decode(fh_uint8** out, size_t* outLen, const char* base64); // NOTE: adds a /0 to *out
bool Base64_Decode(char** out, size_t* outLen, const char* base64);
void Base64_Free(char* buf);

// sha1
const int FH_SHA1_SUM_LENGTH = 20;
const int FH_SHA1_SUM_HEX_LENGTH = 40;
const int FH_SHA256_SUM_LENGTH = 32;
const int FH_SHA256_SUM_HEX_LENGTH = 64;



void* FH_SHA1Init();
void FH_SHA1Update(void* ctx, const void* data, int len);
void FH_SHA1Finish(void* ctx, fh_uint8* sum);
std::string FH_SHA1FinishHex(void* ctx);
void FH_SHA1Sum(fh_uint8* sum, const void* data, int len);
std::string FH_SHA1SumHex(const void* data, int len);
std::string FH_SHA1HexSumForFile(const char* filepath);

void FH_SHA256Sum(uint8_t* sum, const void* data, size_t len);

bool DecryptPassword(const std::string& keyPassword, const std::string& encryptedData, std::string& out);
bool EncryptPassword(const std::string& keyPassword, const std::string& password, std::string& out);

std::string LookupIP(const std::string& domain);

// uuid
const int UUID_LENGTH = 36;
bool UUID_New(char* uuid, int bufLen);

class CException
{
public:
    CException(const char* msg, ...);

private:
};
enum class MemoryMode
{
    share,
    copy,
    takeOwnership,
};

class Buffer
{
public:
    Buffer();
    Buffer(size_t size, size_t reserve = 0, int fill = -1);
    Buffer(void* buffer, size_t length, MemoryMode mode);
    Buffer(Buffer&& buf);
    ~Buffer();

    const uint8_t* data() const { return mData; }
    uint8_t* data() { return mData; }
    size_t count() const { return mCount; }
    size_t allocSize() const { return mAllocSize; }
    void reset(); // resets only mCount
    void clear(); // deletes mData
    void fill(uint8_t val, size_t count, size_t ofs = 0);
    void resize(size_t count);
    void reserve(size_t count);
    void add(const void* data, size_t len);
    void remove(size_t count);
    void copyTo(void* data, size_t len, size_t ofs = 0) const;
    void copyFrom(const void* data, size_t len, size_t ofs = 0);
    Buffer right(size_t offset);

    static Buffer fromBase64(const std::string& base64);
    static Buffer fromBase64(const char* base64);

    inline uint8_t operator[] (size_t i) const { return mData[i]; }
    void operator = (Buffer&& buf);
    void operator = (const Buffer&) = delete;
    Buffer(const Buffer&) = delete;
private:
    bool mHasOwnership = true;
    size_t mAllocSize = 0;
    size_t mCount = 0;
    uint8_t* mData = nullptr;
};
class CDataReader
{
public:
    CDataReader(const void* data, size_t size);
    CDataReader(const Buffer& buffer);
    
    void SetNetworkByteOrder(bool nbo = true) { m_NetworkByteOrder = nbo; }

    bool HasError() const { return m_Error; }
    size_t BytesLeft() const;
    void Skip(int count);

    size_t ReadPosition() const { return m_Offset; }
    void SetReadPosition(size_t pos) { m_Offset =  pos; }
    
    void Read(void* buf, size_t len);
    bool ReadBool();

    fh_int8 ReadInt8();
    fh_int16 ReadInt16();
    fh_int32 ReadInt32();
    fh_int64 ReadInt64();
    fh_uint8 ReadUint8();
    fh_uint16 ReadUint16();
    fh_uint32 ReadUint32();
    fh_uint64 ReadUint64();
    float ReadFloat();
    void ReadString(std::string& value);
    void* ReadPointer();
    
    const void* CurPtr() const;
private:
    const fh_uint8* m_Data = nullptr;
    size_t m_Size = 0;
    size_t m_Offset = 0;
    bool m_Error = false;
    bool m_NetworkByteOrder = false;

};
class CDataWriter
{
public:
    CDataWriter(size_t preAlloc = 256);
    CDataWriter(void* data, size_t bufLength);
    ~CDataWriter();
    void SetNetworkByteOrder(bool nbo) { m_NetworkByteOrder = nbo; }
    bool HasError() const { return m_Error; }

    const void* Data() const { return m_Data; }
    void* CurPtr() { return m_Data + m_Offset; }
    size_t Count() const { return m_Offset; }
    size_t BytesLeft() const { return m_AllocSize - m_Offset; }

    void Write(const void* data, size_t len);
    void WriteBool(bool b);
    void WriteInt8(fh_int8 v);
    void WriteInt16(fh_int16 v);
    void WriteInt32(int v);
    void WriteInt64(fh_int64 v);
    void WriteUint8(fh_uint8 v);
    void WriteUint16(fh_uint16 v);
    void WriteUint32(fh_uint32 v);
    void WriteUint64(fh_uint64 v);
    void WriteFloat(float f);
    void WriteString(const std::string& str);
    void WriteString(const char* str);
    void WritePointer(void* ptr);
    
    void* TakeDataOwnership();
    CDataWriter(const CDataWriter&) = delete;
    void operator = (const CDataWriter&) = delete;
private:
    fh_uint8* m_Data;
    size_t m_Offset = 0;
    size_t m_AllocSize = 0;
    bool m_ExternalBuffer = false;
    bool m_Error = false;
    bool m_NetworkByteOrder = false;
};
enum class ECommand
{
    // to workthread
    START_SCANNING,
    STOP_SCANNING,
    CONNECT,
    DISCONNECT,
    STORE_STATE,
    QUERY_SYSAP_INFO,
    DELETE_FRONTEND_PACKAGES,
    SELECT_SYSAP,
    PAIR_EXCHANGE_KEYS,
    PAIR_SENDAUTH,
    EXEC,
    SET_PING_TIME,
    START_PROXY,
    CREATE_CLIENT_CERT,
    RENEW_CLIENT_CERT,
    REVOKE_CLIENT_CERT,
    SEND_DEVICE_INFO,
    SEND_PUSH_NOTIFICATION,
    SEND_EMAIL_NOTIFICATION,
    SET_DP_VALUE,
    DOWNLOAD_SPEECH_FILE,
    ABORT_SPEECH_FILE_DOWNLOAD,
    RPCCALL,
    SEND_SMS_NOTIFICATION,

    // from workthread
    EMIT_EVENT,
};

class CmdQueue
{
public:
    static const int MAX_COMMAND_SIZE = 4096;
    CmdQueue();
    ~CmdQueue();

    void addCommand(const void* data, size_t len);
    bool readCommand(size_t& size, void* data); // data buffer must be at least MAX_COMMAND_SIZE bytes
private:
    void grow();
    void write(const void* data, size_t len);
    void read(void* data, size_t len);


    size_t mAllocSize = 0;
    size_t mBytesInQueue = 0;
    size_t mReadPos = 0;
    size_t mWritePos = 0;
    uint8_t* mQueue = nullptr;
    std::mutex mMutex;
};
class CCurlTarget
{
public:
    virtual ~CCurlTarget() = default;
    virtual void OnCurlOpFinished(CURL* curlHandle, CURLcode curlResult) { FH_UNUSED(curlHandle); FH_UNUSED(curlResult); }
};

class FileModificationWatcher
{
public:
    FileModificationWatcher();
    ~FileModificationWatcher();

    void addFile(const std::string& path);
    bool hasModification(std::string& path);
private:
    struct File {
        std::string mPath;
        int mDescriptor = -1;
    };
    int mEventDescriptor = -1;
    std::vector<File*> mFiles;
};

class LockFile final
{
public:
    LockFile(const std::string& path);
    ~LockFile();

    static bool isLocked(const std::string& path, bool* exists);
private:
    int mFD = -1;
    bool mLocked = false;
};

// Memory buffer managed by low level virtual memory api. Will allocate allocSize bytes of
// virtual memory that is realized when a page is accessed. purge() will give back
// the last allocSize - keep bytes back to the system.
class VMBuffer final
{
public:
    explicit VMBuffer(size_t allocSize);
    ~VMBuffer();

    void purge(size_t keep);
    void* data();

private:
    size_t mAllocSize = 0;
    void* mData = nullptr;
};

}
#endif
