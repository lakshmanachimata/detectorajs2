#ifndef FH_JWT_H
#define FH_JWT_H

#include <string>
namespace freeathome {

class JsonWebToken
{
public:
    JsonWebToken(const std::string& token);
    ~JsonWebToken();

    bool isValid() const { return mValid; }

    bool verify(const std::string& publicKey); // as pem
private:
    bool parseHeader(const std::string& header);
    bool parsePayload(const std::string& payload);

    void parse(const std::string& token);
    
    bool mValid = false; // NOTE: valid is not verified
    std::string mHeader;
    std::string mPayload;
    std::string mSignature;

    std::string mHeaderTyp;
    std::string mHeaderAlg;
    std::string mPayloadSub;
    std::string mPayloadName;
};

} // freeathome

#endif
