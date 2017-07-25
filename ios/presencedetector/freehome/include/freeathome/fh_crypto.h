#include "freeathome.h"
#include <map>
#include <set>
#include <string>
#include <vector>
#include <sodium.h>

namespace freeathome {

class CController;

class CCryptoContext
{
public:
    CCryptoContext() {}

    bool m_Enabled = false;
    bool m_Active = false;
    int m_InvalidAuthCount = 0;
    std::string m_Name; // node of the jid
    std::string m_Serial; // sysap serial when known
    fh_uint64 m_UserData = 0LL;

    bool m_HasOthersPublicKey = false;
    uint8_t m_PrivateKey[crypto_box_SECRETKEYBYTES];
    uint8_t m_OurPublicKey[crypto_box_PUBLICKEYBYTES];
    uint8_t m_OthersPublicKey[crypto_box_PUBLICKEYBYTES];
    uint8_t m_PreparedBytes[crypto_box_BEFORENMBYTES] = {};
    uint64_t m_LastRemoteSessionCounter = 0LL;
    uint64_t m_LastRemoteMessageCounter = 0LL;
    uint64_t m_LocalSessionCounter = 1LL;
    uint64_t m_LocalMessageCounter = 1LL;

    static const int SYSAP_SALT_CHAR_LENGTH = 25;
#if defined(FH_SYSAP) || defined(FH_TESTING)
    char m_Salt[SYSAP_SALT_CHAR_LENGTH+1];
#endif
    friend class CCryptoManager;
};

class CCryptoManager
{
public:
    explicit CCryptoManager(CController& ctrl);
    ~CCryptoManager();

    fh_crypto_context_state CryptoContextState(const std::string& name);
    fh_error CreateCryptoContext(const std::string& name);
    fh_error DeleteCryptoContext(const std::string& name);
    fh_error RenameCryptoContext(const std::string& from, const std::string& to);
    fh_error DeleteAllCryptoContexts(const char** keepNames, int nameCount);
    fh_error EnableCryptoContext(const std::string& name);
    fh_error UnlockCryptoContext(const std::string& name);
#ifdef FH_SYSAP
    fh_error GetSalt(const std::string& name, std::string& salt) const;
#endif
    fh_error CreateAuthHash(const std::string& name, const std::string& salt, fh_uint8* hash, int hashLength);
    fh_error VerifyAuthHash(const std::string& name, const std::string& salt, const fh_uint8* hash, int hashLength, int* triesLeft);
    
    fh_error SetOthersPublicKey(const std::string& name, const fh_uint8* othersPublicKey, int publicKeyLength);
    fh_error GetOurPublicKey(const std::string& name, fh_uint8* publicKey, int publicKeyLength);

    fh_error SetUserData(const std::string& name, fh_uint64 userdata);
    fh_error GetUserData(const std::string& name, fh_uint64& userdata);
    std::string FindContextNameByUserData(fh_uint64 userdata);


    fh_error SetSerial(const std::string& name, const std::string& serial);
    fh_error GetSerial(const std::string& name, std::string& serial);

    fh_error UseCryptoContext(CCryptoContext** cctx, const std::string& name);
    fh_error UnuseCryptoContext(CCryptoContext* cctx);

    fh_error EncryptAsymmetric(CCryptoContext* cctx, const fh_uint8* input, int inputLength, fh_uint8* output, int* outputBufSize);
    fh_error DecryptAsymmetric(CCryptoContext* cctx, const fh_uint8* input, int inputLength, fh_uint8* output, int* outputBufSize);

    fh_error getCryptoContext(const std::string &name, CCryptoContext** cctx);
    fh_error encryptAsymmetric(CCryptoContext* cctx, const uint8_t* nonce, const uint8_t* input, int inputLength, uint8_t* output, int outputBufSize);
    fh_error decryptAsymmetric(CCryptoContext* cctx, const uint8_t* nonce, const uint8_t* input, int inputLength, uint8_t* output, int outputBufSize);

    // symmetric encryption
    fh_error CreateSymmetricKey();
    fh_error GetSymmetricKey(fh_uint8* key, int length);
    fh_error SetSymmetricKey(const fh_uint8* key, int length);
    fh_error EncryptSymmetric(const fh_uint8* input, int inputLength, fh_uint8* output, int* outputBufSize);
    fh_error DecryptSymmetric(const fh_uint8* input, int inputLength, fh_uint8* output, int* outputBufSize);

    std::string ListContexts();
private:
    std::string ProfileDir() const;
    fh_error SaveContext(const CCryptoContext& ctx);
    CCryptoContext* LoadContext(const char* filename);
    bool reloadContextFile(CCryptoContext& cryptoContext);
    void Load();
    fh_error CreateAsymmetricNonce(CCryptoContext& cryptoContext, fh_uint8* nonce);
    fh_error CreateSymmetricNonce(fh_uint8* nonce);

    bool CheckName(const std::string& name);
    fh_error CreateKeyPair(fh_uint8* privateKey, int privateKeyLen, fh_uint8* publicKey, int publicKeyLen);


    CController& m_Controller;
    std::map<std::string, CCryptoContext*> m_ContextsByName;

    bool m_HaveSymmetricKey = false;
    fh_uint8 m_SymmetricKey[FH_CRYPTO_SYMMETRIC_KEY_BYTE_LENGTH] = {};
    fh_uint64 m_SymmetricMessageCounter = 0LL;
    fh_uint64 m_LastSymmetricMessageRecvCounter = 0LL;
    std::set<fh_uint64> m_SkippedSymmetriceNonceSequences;
};

} // freeathome
