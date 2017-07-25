//
//  fh_state.h
//  libfreeathome
//
//  Created by christoph on 27.01.15.
//  Copyright (c) 2015 christoph. All rights reserved.
//

#ifndef FH_STATE_H
#define FH_STATE_H

#include "fh_cglobals.h"
#include "fh_network.h"
#include "libxml/parser.h"
#include <map>
#include <string>
#include <mutex>
#include <vector>


namespace freeathome {

class CController;
class CStateManager;

class CState
{
public:
    enum class EMetaType
    {
        GETALL, // can be switching, runtime, getall, debug, sysap
        UPDATE,
        PATCH,
        EMPTY
    };

    explicit CState(const char* xml, const std::string& lang);
    ~CState();

    const std::string& Type() const { return m_Type; }
    EMetaType MetaType() const { return m_MetaType; }
    bool IsValid() const { return m_Valid; }
    fh_int64 SequenceID() const { return m_SequenceID; }
    fh_int64 ToSequenceID() const { return m_ToSequenceID; }
    fh_int64 OriginalSequenceID() const { return m_OriginalSequenceID; }
    uint32_t sessionID() const { return mSessionID; }
    const std::string& SysAPVersion() const { return m_SysAPVersion; }
    const char* Xml() const { return m_XML; }

    void ModifyPatch(fh_uint64 sequenceID);
    void ModifyUpdate(fh_uint64 sequenceID);
    void SetXmlSubText(int ofs, const std::string& text);

    void SetLanguage(const std::string& lang) { m_Language = lang; }
    const std::string& Language() const { return m_Language; }

    CState* Next() { return m_Next; }

    void setReadByClient() { mReadByClient = true; }
private:
    bool ParseProjectTag();

    bool m_Valid = false;
    bool mReadByClient = false;
    bool mReadByWebview = false;
    fh_int64 m_SequenceID = 0LL;
    uint32_t mSessionID = 0;
    fh_int64 m_OriginalSequenceID = 0LL;
    fh_int64 m_ToSequenceID = 0LL;
    char* m_XML = nullptr;
    CState* m_Next = nullptr;
    std::string m_SysAPVersion;
    EMetaType m_MetaType;
    std::string m_Type;
    std::string m_Language;

    friend class CStateManager;
};

class CStateManagerLocker
{
public:
    explicit CStateManagerLocker(CStateManager& model);
    ~CStateManagerLocker();
private:
    CStateManager& m_StateManager;
};

class CStateManager
{
public:
    explicit CStateManager(CController& controller);
    ~CStateManager();

    static void DeleteFullState(CController& controller);

    void Clear();
    bool Insert(CState* state);
    bool IsInitialized() const { return m_Initialized; } // true after the first getAll is inserted

    const CState* FullState() const { return m_FullState; }
    const std::map<fh_int64, CState*>& DeltaStates() const { return m_DeltaStates; }
    const CState* StateByID(fh_int64 stateID) const;
    CState* StateByID(fh_int64 stateID);
    fh_int64 NextExpectedIncomingSequenceID() const { return m_NextIncomingSequenceID; }
private:
    void SaveFullState();
    void LoadFullState();
    void Lock();
    void Unlock();
    static std::string fullStatePath(CController& controller);
    static void MissingUpdateTimeout(FHSysTimer timer, fh_context* ctx, void* data);

    struct STimeoutData
    {
        CStateManager* m_StateManager;
        fh_int64 m_Sequence;
        FHSysTimer m_Timer;
    };

    CController& m_Controller;
    bool m_Initialized = false; // true after the first getall in Insert(
    fh_int64 m_NextIncomingSequenceID = -1LL; // the id of the next INCOMING sequence id
    fh_int64 m_NextPushedSequenceID = -1LL;
    CState* m_FullState = nullptr;
    std::map<fh_int64, CState*> m_DeltaStates;
    std::map<fh_int64, STimeoutData*> m_MissingUpdateTimers;
    std::recursive_mutex m_Mutex;
    friend class CStateManagerLocker;
};
}

#endif /* defined(__libfreeathome__fh_state__) */
