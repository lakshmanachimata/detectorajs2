#ifndef LIBFREEATHOME_SSL_H
#define LIBFREEATHOME_SSL_H

#include <stdio.h>
#include <string>
#include <vector>
#include <functional>
#include "freeathome.h"

namespace freeathome {

class CController;

enum class ECertResult
{
    OK,
    ERR_AUTH, // digest authentication failed
    ERR_GENERIC,
    ERR_NOPRIVATEKEY,
    ERR_NOCERT,
    ERR_CERTEXPIRED,
    ERR_CERTNOJID,
    ERR_CERTINVALID
};

bool CreateP12(const char* pk12Path, const char* pemPrivateKeyPath, const char* pemCertPath, const char* pemRootCertPath);

bool CreatePrivateKey(const std::string& privateKeyPath);
bool CreateCSR(CController& controller, const std::string& csrPath, const fh_cert_info* certInfo);
ECertResult SignCSR(CController& controller, const char* csrPath, const char* user, const char* pwd, const fh_cert_info* certInfo);
ECertResult RenewCertificate(CController& controller, const std::string& curCertPath, const std::string& privateKeyPath, const std::string& newCertPath, const std::string& csrPath);
fh_error CheckCertificate(CController& controller, fh_cert_info** certInfo);
ECertResult RevokeCertificate(CController& controllerRevokeCertificate);
void SendDeviceInfo(CController& controller, const std::string& pushID, const std::string& softwareVersion, std::function<void (bool)> resultFunc);

// receivers: list of jid nodes of the apps that should receive the push notification
void SendPushNotification(CController& controller, const std::vector<std::string>& receivers, const std::string& message, const std::vector<std::string>& payload, std::function<void(bool)> resultFunc);
// recipients: list of email addresses
void SendEmailNotification(CController& controller, const std::vector<std::string>& recipients, const std::string& subject, const std::string& body, std::function<void(bool)> resultFunc);
// recipients: list of email addresses
void SendSMSNotification(CController& controller, const std::vector<std::string>& recipients, const std::string& subject, const std::string& body, std::function<void(bool)> resultFunc);
bool VerifySignature(const std::string& path, const std::string& signaturePath);

} // freeathome

#endif 
