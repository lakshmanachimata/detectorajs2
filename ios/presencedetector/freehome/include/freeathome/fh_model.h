#ifndef FH_MODEL_H
#define FH_MODEL_H

#include "freeathome.h"
#include <libxml/parser.h>
#include <string>
#include <map>
#include <vector>
#include <functional>

namespace freeathome {

class DeviceChannelBase;

// usable as flags
enum class DataPointType : uint32_t
{
    input = 0x0000,
    output = 0x0001,
    both = 0x0002,
};

enum class FunctionID : uint32_t
{
    switchSensor = 0x0000,
    switchDimmingSensor = 0x0001,
    shutterSensor = 0x0002,
    blindSensor = 0x0003,
    stairCaseLightSensor = 0x0004,
    forceOnOffSensor = 0x0005,
    sceneSensor = 0x0006,
    switchingActuator = 0x0007,
    stairCaseLightActuator = 0x0008,
    shutterActuator = 0x0009,
    roomTemperatureControllerMaster = 0x000a,
    roomTemperatureControllerSlave = 0x000b,
    windAlarmSensor = 0x000c,
    frostAlarmSensor = 0x000d,
    rainAlarmSensor = 0x000e,
    windowDoorSensor = 0x000f,
    notificationSensor = 0x0010,
    movementDetector = 0x0011,
    dimmingActuator = 0x0012,
    notificationCenter = 0x0013,
    radiator = 0x0014,
    underfloorHeating = 0x0015,
    fanCoil = 0x0016,
    twoLevelController = 0x0017,
    pushButtonSensor = 0x0018,
    desDoorRingingSensor = 0x0019,
    doorOpenerActuator = 0x001a,
    doorOpenerSenor = 0x001b,
    fanCoilSensor = 0x001c,
    desLevelCallActuator = 0x001d,
    desLevelCallSensor = 0x001e,
    desLevelIndicatorSensor = 0x001f,
    desAutomaticDoorOpenerActuator = 0x0020,
    desLightActuator = 0x0021,
    unknownHVACActuator = 0x0022,
    roomTemperatureControllerMasterWithoutFan = 0x0023,
    cooling = 0x0024,
    ledBrightness = 0x0025,
    dateTime = 0x0026,
    heating = 0x0027,
    forceUpDowm = 0x0028,
    heatingCooling = 0x0029,
    heatingCoolingSensor = 0x002a,
    dateTimeActuator = 0x002b,
    saceShutterActuator = 0x002c,
    rgbwColorActuator = 0x002e,
    rgbColorActuator = 0x002f,
    panelSwitchSensor = 0x0030,
    panelDimmingSensor = 0x0031,
    panelShutterSensor = 0x0032,
    panelBlindSensor = 0x0033,
    panelStairCaseLightSensor = 0x0034,
    panelForceOnOffSensor = 0x0035,
    panelForceUpDownSensor = 0x0036,
    panelSceneSensor = 0x0037,
    panelRoomTemperatureControllerSlave = 0x0038,
    panelFanCoil = 0x0039,
    panelRGBWColorActuator = 0x003a,
    panelRGBColorActuator = 0x003b,
    panelWColorActuator = 0x003c,
    additationalHeating = 0x003d,
    radiatorActuatorMaster = 0x003e,

    wColorActuator = 0x0040,
    pulseSwitch = 0x0045,
    fancoilHeating = 0x0047,
    fancoilCooling = 0x0048,
    fancoilHeatingOrCooling = 0x0049,
    ancoilHeatingAndCooling = 0x004a,

    lightGroup = 0x4000,
    blindGroup = 0x4001,
    dimmerGroup = 0x4002,
    rgbwColorGroup = 0x4003,

    defaultScene = 0x4800,
    panicScene = 0x4801,
    allOffScene = 0x4802,
    allBindsUpScene = 0x4803,
    allBlindsDownScene = 0x4804,
    sceneEnd = 0x48ff,
    none = 0xffff,
};
enum class DataPointPairingID : uint16_t
{
    none = 0x0000,
    switchOnOff = 0x0001,
    timedStartStop = 0x0002,
    forced = 0x0003,
    sceneControl = 0x0004,
    doorOpener = 0x0005,
    timedPresence = 0x0006,
    relativeSetValueControl = 0x0010,
    absoluteSetValueControl = 0x0011,
    night = 0x0012,
    resetError = 0x0013,
    rgbValueSet = 0x0015,
    hueSetDimming = 0x001A,
    rgbValueInfo = 0x0117,
    colorTemperatureSet = 0x0016,
    colorTemperatureInfo = 0x0118,
    hueHSVSet = 0x0017,
    hueHSVInfo = 0x011b,
    hueIgnoreOnOff = 0x111d,
    hueColorModeInfo = 0x011d,
    sysAPHueColorModeInfo = 0x011e,
    nightActuatorForSysAP = 0x0014,
    moveUpDown = 0x0020,
    stopStepUpDown = 0x0021,
    dedicatedStop = 0x0022,
    setAbsolutePositionBlindsPercentage = 0x0023,
    setAbsolutePositionSlatsPercentage = 0x0024,
    windAlarm = 0x0025,
    frostAlarm = 0x0026,
    rainAlarm = 0x0027,
    forcedUpDown = 0x0028,
    actuatingValueHeating = 0x0030,
    currentFanStage = 0x0031,
    actuatingValueCooling = 0x0032,
    setPointTemperature = 0x0033,
    relativeSetPointTemperature = 0x0034,
    windowDoor = 0x0035,
    stateindication = 0x0036,
    fanManualOnOff = 0x0037,
    controllerOnOff = 0x0038,
    relativeSetPointTemperatureRequest = 0x0039,
    ecoOnOff = 0x003A,
    currentFanStageRequest = 0x0040,
    fanManualOnOffRequest = 0x0041,
    controllerOnOffRequest = 0x0042,
    infoOnOff = 0x0100,
    infoForce = 0x0101,
    sysAPInfoOnOff = 0x0105,
    sysAPInfoForce = 0x0106,
    infoActualDimmingValue = 0x0110,
    infoError = 0x0111,
    sysAPInfoActualDimmingValue = 0x0115,
    sysAPInfoError = 0x0116,
    infoMoveUpDown = 0x0120,
    infoPositionAbsoluteBlindsPercentage = 0x0121,
    infoPositionAbsoluteSlatsPercentage = 0x0122,
    validCurrentAbsolutePosition = 0x0123,
    sysAPInfoMoveUpDown = 0x0125,
    sysAPCurrentAbsolutePositionBlindsPercentage = 0x0126,
    sysAPCurrentAbsolutePositionSlatsPercentage = 0x0127,
    sysAPValidCurrentAbsolutePosition = 0x0128,
    measuredTemperature = 0x0130,
    infoValueHeating = 0x0131,
    infoValueCooling = 0x0132,
    resetoverload = 0x0133,
    rtcInfoError = 0x0134,
    rtcHeatingCooling = 0x0135,
    actuatingFanStage = 0x0136,
    actuatingFanManualOnOff = 0x0137,
    infoFanStage = 0x0138,
    infoFanManualOnOff = 0x0139,
    absoluteSetPointTemperature = 0x0140,
    notification = 0x0200,
    notificationStart = 0x0201,
    notificationEnd = 0x0202,
    notificationWindStart = 0x0203,
    notificationWindEnd = 0x0204,
    notificationFrostStart = 0x0205,
    notificationFrostEnd = 0x0206,
    notificationRainStart = 0x0207,
    notificationRainEnd = 0x0208,
    notificationDoorStart = 0x0209,
    notificationDoorEnd = 0x020A,
    notificationMovementStart = 0x020B,
    notificationMovementEnd = 0x020C,
    setoperatingMode = 0x0300,
    heatingCooling = 0x0301,
    outdoorTemperature = 0x0400,
    windForce = 0x0401,
    valueLux = 0x0403,
    windSpeed = 0x0404,
    mediaPlay = 0x0440,
    mediaPause = 0x0441,
    mediaNext = 0x0442,
    mediaPrevious = 0x0443,
    mediaPlayMode = 0x0444,
    mediaMute = 0x0445,
    mediaRelativeVolumeControl = 0x0446,
    mediaAbsoluteVolumeControl = 0x0447,
    mediaPlaybackStatus = 0x0460,
    mediaCurrentItemMetadata = 0x0461,
    mediaInfoMute = 0x0462,
    mediaInfoActualVolume = 0x0463,
    solarPowerProduction = 0x04A0,
    inverterOutputPower = 0x04A1,
    solarEnergyToday = 0x04A2,
    selfConsumption = 0x04A6,
    selfSufficiency = 0x04A7,
    batteryLevel = 0x04AC,
    batteryHealth = 0x04AD,
    homePowerConsumption = 0x04A8,
    consumedEnergyToday = 0x04AA,
    domusStatus = 0x0500,
    domusArmDisarm = 0x0501,
    domusDisarmCounter = 0x0502,
    domusIntrusionAlarm = 0x0504,
    domusSafetyAlarm = 0x0505,
    domusConfigurationStatus = 0x0507,
    timeofday = 0xf001,
    date = 0xf002,
    entitySwitch = 0xf101,
    infoEntitySwitch = 0xf102,
};

inline bool isSceneFunctionID(FunctionID funcID)
{
    return (uint32_t)funcID >= (uint32_t)FunctionID::defaultScene &&
            (uint32_t)funcID <= (uint32_t)FunctionID::sceneEnd;
}
inline bool isGroupFunctionID(FunctionID funcID)
{
    return (uint32_t)funcID >= (uint32_t)FunctionID::lightGroup &&
            (uint32_t)funcID <= (uint32_t)FunctionID::rgbwColorGroup;
}
class CController;

/*  <floor uid="00" name="special-snowflake" type="housefunctions" level="0" nameId="2c1">
      <room uid="00" name="special-snowflake" type="housefunctions" nameId="2c0"/>
    </floor>*/

class Model;


class Entity
{
public:
    virtual ~Entity();

    const Model* model() const { return mModel; }
    std::string mDebugName;
protected:
    Entity(const Model* model);
    const Model* mModel = nullptr;
};

class GeoLocationReporter : public Entity
{
public:

    bool present() const { return mPresent; }
    const std::string& deviceJID() const { return mDeviceJID; }

private:
    GeoLocationReporter(Model* model);
    bool mPresent = false;
    std::string mDeviceJID; // jabber id of the device's cloud certificate
    std::string mGeoState; // "present" or "absent"
    friend class ModelParser;
};

class GeoLocation : public Entity
{
public:
    virtual ~GeoLocation();

    const std::string& displayName() const { return mDisplayName; }
    const std::string& uid() const { return mUID; }

    double radius() const { return mRadius; }
    double longitude() const { return mLongitude; }
    double latitude() const { return mLatitude; }
    const std::vector<GeoLocationReporter*>& reporters() const { return mReporters; }
private:
    GeoLocation(Model* model, const std::string& uid);

    double mRadius = 0; // in kilometers
    double mLongitude = 0;
    double mLatitude = 0;
    std::string mUID;
    std::string mDisplayName;
    std::vector<GeoLocationReporter*> mReporters;

    friend class ModelParser;
};

class Icon : public Entity
{
public:
    uint32_t nameID() const { return mNameID; }
    uint32_t iconID() const { return mIconID; }
    const std::string& path() const { return mPath; }

private:
    Icon(const Model* model);

    uint32_t mNameID = 0;
    uint32_t mIconID = 0;
    std::string mPath;

    friend class ModelParser;
};

class Favorite : public Entity
{
public:

    const std::string& deviceChannelSerial() const { return mDeviceChannelSerial; }
private:
    Favorite(const Model* model);

    std::string mDeviceChannelSerial;
    friend class ModelParser;
};

class Favorites : public Entity
{
public:

    const std::string& ownerJID() const { return mOwnerJID; }

    size_t favoriteCount() const;

    const std::map<size_t, Favorite*>& favoritesByIndex() const { return mFavoritesByIndex; }

private:
    Favorites(const Model* model);
    ~Favorites();
    
    std::string mOwnerJID; // jid of owning user
    std::map<size_t, Favorite*> mFavoritesByIndex;

    friend class ModelParser;
    friend class Model;
};

class FloorRoomBase : public Entity
{
public:

    uint32_t uid() const { return mUID; }
    uint32_t nameID() const { return mNameID; }
    const std::string& name() const { return mName; }
    std::string displayName() const;

protected:
    FloorRoomBase(const Model* model) : Entity(model) {}

    uint32_t mUID = 0;
    uint32_t mNameID = 0;
    std::string mName;

    friend class ModelParser;
};

class Room : public FloorRoomBase
{
public:
    virtual ~Room();


private:
    Room(const Model* model);

    friend class ModelParser;
};
class Floor : public FloorRoomBase
{
public:
    ~Floor();
    const Room* roomByID(uint32_t uid) const;
    const std::map<uint32_t, Room*>& rooms() const { return mRoomByID; }

    int32_t level() const { return mLevel; }
private:
    Floor(const Model* model) : FloorRoomBase(model) {}
    void addRoom(Room* room);
    bool removeRoomByID(uint32_t uid);

    int32_t mLevel = 0;
    std::map<uint32_t, Room*> mRoomByID;
    friend class ModelParser;
    friend class Model;
};
class Function : public Entity
{
public:
    void setupFromDesc(Function& func);
    uint32_t functionID() const { return mFunctionID; }
    uint32_t sensorMatchCode() const { return mSensorMatchCode; }
    uint32_t actuatorMatchCode() const { return mActuatorMatchCode; }

    size_t iconIDCount() const { return mIconIDs.size(); }
    uint32_t iconID(size_t index) const { return mIconIDs[index]; }
private:
    Function(const Model* model, const DeviceChannelBase* parent) : Entity(model) {}
    const DeviceChannelBase* mParent = nullptr;
    uint32_t mFunctionID = 0;
    std::vector<uint32_t> mIconIDs;
    uint32_t mSensorMatchCode = 0;
    uint32_t mActuatorMatchCode = 0;
    bool mIsDefault = false;
    friend class ModelParser;
    friend class Model;
    friend class Channel;
};
class Channel;
class DataPoint : public Entity
{
public:
    void setupFromDesc(const DataPoint& dp);

    DataPointPairingID pairingID() const { return mPairingID; }
    uint32_t matchCode() const { return mMatchCode; }
    const std::string& value() const { return mValue; }

    // returns the full serial of the datapoint
    // device/channel/dpt (eg: ABB700C6696E/ch0003/idp0000)
    std::string fullSerial() const;
private:
    DataPoint(const Model* model, const Channel* parentChannel, DataPointType type);
    const Channel* mParentChannel = nullptr;
    DataPointType mType;
    uint32_t mIndex = 0;
    uint32_t mDataPointType = 0;
    uint32_t mMatchCode = 0;
    DataPointPairingID mPairingID = DataPointPairingID::none;
    uint16_t mAddress = 0;
    std::string mValue;
    friend class ModelParser;
    friend class Model;
    friend class Channel;
};
class ParameterOption
{
public:
    
    const std::string& key() const { return mKey; }
    fh_uint32 mask() const { return mMask; }

private:
    bool mIsDefault = false;
    std::string mKey;
    fh_uint32 mNameID = 0;
    fh_uint32 mMask = 0;

    friend class Parameter;
    friend class ModelParser;
    friend class Model;
};
class Parameter : public Entity
{
public:
    enum DataType {
        dtUnset,
        dtFloat,
        dtSigned,
        dtUnsigned,
        dtEnum,
    };

    const std::string& value() const { return mValue; }

    bool isChannelSelector() const { return mChannelSelector; }
    uint32_t parameterID() const { return mParameterID; }

    void setupFromDesc(const Parameter& param);

    size_t optionCount() const { return mOptions.size(); }
    const ParameterOption* optionByIndex(size_t index) const;
    const ParameterOption* selectedOption() const;
private:
    Parameter(const Model* model, const DeviceChannelBase* parent = nullptr) : Entity(model) {}
    const DeviceChannelBase* mParent = nullptr;
    DataType mDataType = DataType::dtUnset;
    uint32_t mParameterID = 0;
    uint32_t mMatchCode = 0;
    uint32_t mDataPointType = 0;
    uint32_t mNameID = 0;
    bool mVisible = false;
    bool mWritable = false;
    bool mWizardOnly = false;
    bool mChannelSelector = false;
    bool mDeviceChannelSelector = false;
    std::string mValue;
    std::vector<ParameterOption> mOptions;
    std::string mMinValue;
    std::string mMaxValue;
    std::string mDefaultValue;
    std::string mFactor;
    std::string mStepWidth;

    friend class ModelParser;
    friend class Model;
    friend class Channel;
};



class DeviceChannelBase : public Entity
{
public:
    std::string displayName() const;

    uint32_t functionID() const { return mFunctionID; };
    uint32_t iconID() const { return mIconID; }

    size_t parameterCount() const;
    const Parameter* parameterByID(uint32_t paramID) const;
    const Parameter* parameterByIndex(uint32_t index) const;

    uint32_t floorID() const { return mFloorID; }
    uint32_t roomID() const { return mRoomID; }

protected:
    DeviceChannelBase(const Model* model);
    virtual ~DeviceChannelBase();

    uint32_t mFloorID = 0;
    uint32_t mRoomID = 0;
    uint32_t mNameID = 0;
    uint32_t mFunctionID = 0;
    uint32_t mIconID = 0;
    std::string mDisplayName;

    std::vector<Parameter*> mParameters;

    friend class ModelParser;
    friend class Model;


};
class Device;
class Channel : public DeviceChannelBase
{
public:
    ~Channel();
    
    uint32_t index() const { return mIndex; }
    uint32_t serial() const { return mSerial; }
    uint32_t mask() const { return mMask; }
    bool isCombined() const { return mCombined; }
    bool isSameLocation() const { return mSameLocation; }

    const Function* functionByID(uint32_t functionID) const;


    uint32_t dataPointCount(DataPointType type) const;
    const DataPoint* dataPointByIndex(DataPointType type, uint32_t index) const;
    const DataPoint* dataPointByIndex(const std::string& index) const;
    const DataPoint* dataPointByPairingID(DataPointPairingID pairingID, uint32_t matchCode) const;


    // returns the full serial of the channel
    // device/channel (eg: ABB700C6696E/ch0003)
    std::string fullSerial() const;
private:
    Channel(const Model* model, const Device* parentDevice = nullptr);

    void setupFromDesc(const Channel& channelDesc);

    void addFunction(Function* func);
    bool removeFunctionByID(uint32_t functionID);

    void addParameter(Parameter* param);

    void addDataPoint(DataPoint* dp, DataPointType type);

    const Device* mParentDevice = nullptr;
    uint32_t mSerial = 0;
    uint32_t mIndex = 0;
    uint32_t mMask = 0;
    bool mCombined = false;
    bool mSameLocation = false;
    std::vector<Function*> mFunctions;
    std::vector<DataPoint*> mDataPoints[2]; // input/output


    friend class ModelParser;
    friend class Model;

};

class Device : public DeviceChannelBase
{
public:

    const Parameter* channelSelectorParameter() const;

    size_t channelCount() const { return mChannels.size(); }
    const Channel* channelBySerial(uint32_t serial) const;
    const Channel* channelBySerial(const std::string& serial) const;
    const Channel* channelByIndex(size_t index) const;
    const Channel* channelByIndex(const std::string& index) const;

    uint64_t serialNumber() const { return mSerialNumber; }
    std::string fullSerial() const;
    bool isUnresponsive() const { return mUnresponsive; }
private:
    Device(const Model* model);
    virtual ~Device();

    bool addChannel(Channel* channel);
    bool removeChannelBySerial(uint32_t serial);
    const std::vector<Channel*>& channels() const { return mChannels; }
    void addParameter(Parameter* param);

    std::vector<Channel*> mChannels;
    uint64_t mSerialNumber = 0;
    bool mUnresponsive = false;
    friend class ModelParser;

    friend class Model;
};


class Model
{
public:
    Model();
    ~Model();

    const Floor* floorByID(uint32_t uid) const;
    const std::map<uint32_t, Floor*>& floors() const { return mFloorByID; }

    // devices
    const Device* deviceBySerial(uint64_t serial) const;
    const Device* deviceBySerial(const std::string& serial) const;

    // channels
    const Channel* channelBySerial(const std::string& serial) const;

    const std::map<uint64_t, Device*>& devices() const { return mDeviceBySerial; }


    const DataPoint* dataPointBySerial(const std::string& fullSerial) const;

    const Icon* iconByID(uint32_t iconID) const;

    // favorites
    const Favorites* favoritesByUser(const std::string& userJID) const;

    std::string stringByID(uint32_t sid) const ;
    void dump();

    static std::string serialPart(const std::string& serial, size_t part);

    const std::map<std::string, GeoLocation*>& geoLocations() const { return mGeoLocationByUID; }

private:
    Function* functionDefByID(uint32_t functionID);
    Channel* channelDescBySerial(uint32_t serial);

    void addFloor(Floor* floor);
    bool removeFloorByID(uint32_t uid);

    void addDevice(Device* device);
    bool removeDeviceBySerial(uint64_t serial);

    void addChannelDesc(Channel* channel);
    void addFunctionDef(Function* func);
    void addString(uint32_t sid, const std::string& str);

    std::map<uint32_t, Floor*> mFloorByID;
    std::map<uint64_t, Device*> mDeviceBySerial;
    std::map<uint32_t, Channel*> mChannelDescBySerial;
    std::map<uint32_t, Function*> mFunctionDefByID;
    std::map<uint32_t, std::string> mStringByID;
    std::vector<Favorites*> mFavorites;
    std::map<uint32_t, Icon*> mIconByID;
    std::map<std::string, GeoLocation*> mGeoLocationByUID;
    
    friend class ModelParser;
};



enum class XmlAttribute
{
    uid,
    name,
    type,
    level,
    nameId,
    iconId,
    state,
    serialNumber,
    cid,
    functionId,
    parameterId,
    dpt,
    pairingId,
    i,
    actuatorMatchCode,
    sensorMatchCode,
    isDefault,
    key,
    matchCode,
    visible,
    writable,
    wizardOnly,
    channelSelector,
    deviceChannelSelector,
    minValue,
    maxValue,
    defaultValue,
    stepWidth,
    factor,
    channel,
    combined,
    sameLocation,
    mask,
    jid,
    lon, // longitude
    lat, // latitude
    radius, // radius
    displayName,
    geoState,
    appId,
    COUNT,
};
enum class EObjectState
{
    ADDED,
    MODIFIED,
    DELETED
};

enum class ModelEvent
{
    reset,
    beginFullState,
    beginUpdate,
    endUpdate,
    objectAdded,
    objectUpdated,
    objectRemoved,
    parsingError,
};

class ModelParser
{
public:
    ModelParser();
    ~ModelParser();

    bool parse(const char* xml);
    const Model* model() { return mModel; }

    typedef std::function<void (ModelEvent event, const Entity* ent)> ModelEventHandler;
    void setEventHandler(ModelEventHandler handler);

private:
    template <class T>
    T* objectAtDepth(int depth);

    uint16_t stringToUint16HexThrow(const char* str, const char* msg);
    uint32_t stringToUint32HexThrow(const char* str, const char* msg);
    uint32_t stringToUint32HexThrowAllowNull(const char* str, uint32_t defaultValue, const char* msg);
    uint64_t stringToUint64HexThrow(const char* str, const char* msg);
    uint32_t stringToIndexThrow(const char* str, const char* prefix, const char* msg);
    std::string stringToStdString(const char* str);
    bool stringToBoolThrow(const char* str, bool defaultValue = false);

    void parseError(const char* str, ...);
    void emitEvent(ModelEvent ev, const Entity* object);
    bool isPath(const char* path);
    const char* getAttribute(XmlAttribute att) const;
    void parseProject();
    void parseString();
    void postParseString();
    GeoLocation* parseGeoLocation();
    GeoLocationReporter* parseGeoLocationReporter(GeoLocation* geoLocatoin);
    Favorites* parseFavorites();
    Favorite* parseFavorite(Favorites* favorites);
    Room* parseRoom(Floor* parentFloor);
    Floor* parseFloor();
    Device* parseDevice();
    Channel* parseChannelDesc();
    Channel* parseChannel(Device* device);
    Function* parseFunctionDef();
    Function* parseFunctionDesc(Channel* channelDesc);
    DataPoint* parseDataPointDesc(Channel* channelDesc, bool input);
    DataPoint* parseDataPoint(Channel* channel, bool input);
    Parameter* parseChannelParameterDesc(Channel& channelDesc);
    Parameter* parseDeviceParameter(Device& device);
    Parameter* parseChannelParameter(Channel* channel);
    Icon* parseIcon();
    void parseParameterType(Parameter& param, const std::string& typeName);
    void parseOption(Parameter& param);
    void postParseDataPointValue(DataPoint& dp);
    void postParseDataPointAddress(DataPoint& dp);
    void parseAttribute();
    void postParseAttribute(DeviceChannelBase& devOrChannel);
    
    void saxStartElement(const xmlChar* name, const xmlChar** attributes);
    void saxEndElement(const xmlChar* name);
    void saxCharacters(const xmlChar* ch, int len);

    static void stubSaxStartElement(void* ctx, const xmlChar* name, const xmlChar** attributes);
    static void stubSaxEndElement(void* ctx, const xmlChar* name);
    static void stubSaxCharacters(void* ctx, const xmlChar* ch, int len);


    xmlSAXHandler mSaxHandler;
    xmlParserCtxtPtr mSaxParser = nullptr;


    struct Node
    {
        std::string mTagName;
        Entity* mObject = nullptr;
    };
    static const int MaxDepth = 64;
    int mDepth = 0;
    Node mPath[MaxDepth];
    std::string mPathName;

    bool mStoreText = false;
    std::string mText;

    std::string mCurAttributeTagName;
    EObjectState mCurAttributeTagObjectState;

    uint32_t mCurStringID;

    Model* mModel = nullptr;
    const xmlChar** mAttributes; //[(size_t)XmlAttribute::COUNT];


    ModelEventHandler mEventHandler = nullptr;
    uint32_t mDeletedFavorites = 0;

    std::string mErrorMessage;

};


}

#endif
