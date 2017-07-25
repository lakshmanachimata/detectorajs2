#ifndef FH_CLOUDPROTO2_H
#define FH_CLOUDPROTO2_H

#include "fh_common.h"
#include <vector>
#include <string>
#include <set>
#include <sodium.h>

namespace freeathome {
class CController;
class CCryptoContext;
class CXmppClient;
class CXmppRPCCall;

class Nonce
{
public:
    uint8_t mData[24];
};

static_assert(sizeof(Nonce) == 24, "Nonce must be 24 bytes");

class CloudProto2
{
public:
    CloudProto2(CController* controller, const uint8_t* ourPrivateKey, const uint8_t* othersPublicKey, const std::string& sysAPJID);
    CloudProto2(CController* controller, const char* base64Data, const std::string& sysAPJID);
    virtual ~CloudProto2();

    void sendMessageNewSession();
    CXmppRPCCall* tunnelRpcCall(CXmppRPCCall* call);
    void dispatchMessage(CXmppRPCCall* call, CDataReader& rd);
    void handleUpdate(const char* base64String);
private:
    Buffer decryptSymmetric(const Buffer& encryptedData);
    void sendMessage(const void* data, size_t length);
    void sendMessage(const CDataWriter& wr);
    void buildMessageEncrypted(CDataWriter& encryptedMessage, const CDataWriter& message);
    void sendMessageEncrypted(const CDataWriter& message);
    void handleMessageNewSessionResult(CDataReader& rd);
    void handleMessageLoginResult(CDataReader& rd);
    void handleMessageRpcCallResult(CDataReader& rd);
    void handleMessageEncryptedContainer(CDataReader& rd);
    void sendMessageLogin();
    void dispatchDecryptedMessage(CDataReader& rd);

    CController* mController = nullptr;
    uint8_t mSharedKey[crypto_box_BEFORENMBYTES];
    std::string mSessionId;
    uint64_t mSessionCounter = 0;
    uint64_t mMessageCounter = 1;
    std::vector<Nonce> mOutstandingNonces;
    CXmppRPCCall* mCurCall = nullptr;

    std::string mSysAPJID;
    bool mHaveSymmetricKey = false;
    uint8_t mSymmetricKey[32];
    uint64_t mNextSymmetricMessageCounter = 0;
    std::set<uint64_t> mSkippedSymmetricSequences;
};


} // freeathome

#endif
