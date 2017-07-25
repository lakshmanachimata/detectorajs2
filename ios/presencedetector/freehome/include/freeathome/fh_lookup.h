#include "fh_common.h"
#include <functional>
#include <string>
#include <thread>
#include <mutex>
#include <list>
#include <vector>
#include <condition_variable>

namespace freeathome {

// domain to ip lookup in separate thread
// FIXME: exit thread
class CLookupService
{
public:
    CLookupService();
    ~CLookupService();

    bool Update();
    void Lookup(const std::string& domain, std::function<void(std::string)> resultFunc);
    void LookupSRVRecord(const std::string& domain, bool scanClient, std::function<void (const std::vector<SSrvRecord>&)> resultFunc);
    void AbortSRVRecordLookup();
private:
    enum EThread
    {
        ALOOKUP, // lookup ipv4 entries
        SRVLOOKUP, // lookup srv record for tcp client
        SRVLOOKUP2, // lookup srv record for scan client
        THREADCOUNT,
    };


    struct SLookupJob
    {
        SLookupJob(const std::string& domain, std::function<void(std::string)> resultFunc)
        : m_Domain(domain),
          m_ResultFunc(resultFunc)
        {
        }
        std::string m_Domain;
        std::string m_Address;
        std::function<void(std::string)> m_ResultFunc;
    };
    struct SSrvLookupJob
    {
        SSrvLookupJob(const std::string& domain, std::function<void (std::vector<SSrvRecord>&)> resultFunc)
        : m_Domain(domain),
          m_ResultFunc(resultFunc)
        {
        }

        std::string m_Domain;
        std::vector<SSrvRecord> m_Records;
        std::function<void(std::vector<SSrvRecord>&)> m_ResultFunc;
    };

    void ThreadFunc();
    void ThreadFuncSrv(int threadIndex);

    std::thread m_Thread[(int)THREADCOUNT];
    std::mutex m_Mutex[(int)THREADCOUNT];
    std::condition_variable m_Condition[(int)THREADCOUNT];
    std::list<SLookupJob*> m_Jobs;
    std::list<SLookupJob*> m_Results;
    std::list<SSrvLookupJob*> m_SrvJobs[2];
    std::list<SSrvLookupJob*> m_SrvResults[2];
    volatile bool m_Quit = false;
};


}