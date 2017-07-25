#ifndef FH_FILEMANAGER_H
#define FH_FILEMANAGER_H

#include <stdio.h>
#include <string>
#include <map>
#include <set>
#include <vector>
#include "fh_common.h"

extern "C" {
#include "unzip/unzip.h"
}
namespace freeathome {

class CController;

class CFileInfo
{
public:
    ~CFileInfo();
    
    int Size() const { return m_Size; }
    const fh_uint8* Data() const { return (fh_uint8*)m_Data; }
    void SelectVersion(const char* version);
    const std::string& Path() const { return m_Path; }
private:
    std::string m_Path;
    int m_Size = 0;
    unz_file_pos m_PosInZipFile; 

    // memory storage
    int m_RefCount = 0;
    void* m_Data = nullptr;
    bool m_DeleteOnRelease = false;

    friend class CFileManager;
};

// The filemanger handles a single zip archive with the complete web content in producitve mode. For development it can
// additionally handle single web files downloaded via xmpp from a sysap.
class CFileManager : public CCurlTarget
{
public:
    enum class EDownloadFileType
    {
        NONE,
        ARCHIVE,
        ARCHIVE_SIGN,
        SPEECH,
        SPEECH_SIGN,
    };

    explicit CFileManager(CController& controller);
    ~CFileManager();

    void Init();
    bool SelectVersion(const std::string& version);
    bool DownloadFrontendFileIfNeeded(const std::string& sysAPVersion, const std::string& url, fh_error& err);
    void DownloadSpeechFile(const std::string& lang, int version);
    void AbortDownload();
    void DeletePackages(const std::set<std::string>& keepVersions);

    const CFileInfo* QueryFile(const char* relPath);
    void ReleaseFile(const CFileInfo* file);

    virtual void OnCurlOpFinished(CURL* curlHandle, CURLcode curlResult) override;

private:
    void OnCurlOpFinished_Frontend(CURL* curlHandle, CURLcode curlResult);
    void OnCurlOpFinished_Speech(CURL* curlHandle, CURLcode curlResult);

    static size_t CurlWriteCallback(void *ptr, size_t size, size_t nmemb, void *stream);
    std::string MakeArchivePath(const std::string& sysAPVersion, bool tmp, bool sign);
    std::string MakeSpeechPath(const std::string& lang, bool tmp, bool sign);
    void ReadAvailableVersions();
    bool DownloadFile(const std::string& url, EDownloadFileType type);
    bool OpenZipFile(const std::string& version);
    void CloseZipFile();
    bool UnpackZipFile(const std::string& zipPath, const std::string& path);

    CController& m_Controller;

    std::set<std::string> m_AvailableVersions;
    std::string m_CurDownloadSysAPVersion;
    std::string m_CurDownloadSpeechLang;

    unzFile m_ZipFile = nullptr;
    std::map<std::string, CFileInfo*> m_Files;
    std::string m_CurRequestID;
    //int m_FilesReceived = 0;
    CURL* m_CurlHandle = nullptr;
    FILE* m_CurlFile = nullptr;
    double m_CurlBytesWritten = 0.0;
    double m_PartialDownloadSize = 0.0;
    EDownloadFileType m_CurDownloadFileType = EDownloadFileType::NONE;
    std::string m_CurDownloadURL;
    int m_LastProgress = -1;
};

}

#endif
