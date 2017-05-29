import {Injectable,EventEmitter} from '@angular/core';
import {Http,Headers,RequestOptions,RequestOptionsArgs,Response,RequestMethod} from '@angular/http';
import {LoggerService} from './logger.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import * as https from 'https';
import * as http from 'http';

export class SubMenuItem {
  constructor(public name: string, public navigation: string) { }
}

export class WriteData{
    constructor(public attrType: number, public attrValue: number[]) { }
}

export class HTTPCODES {
    static SUCCESS_START = 200;
    static SUCCESS_END = 299;
    static NOT_FOUND = 404;
    static NO_AUTH = 401;
    static FORBIDDN = 403;
    static BAD_REQUEST = 400;
    static METHOD_NOT_ALLOWED = 405;
    static PAYLAOD_HUGE = 413;
    static TOO_MANY_REQUESTS = 429;
    static SERVER_ERR_START = 500;
}

export class CloudObj {
    constructor() {}
    DetectorsObj:{};
    IdetectorsObj:{};
    ProfilesObj:{};
    DevicesArray:Array<any>;
    IDevicesArray:Array<any>;
    ProfilesArray:Array<any>;
    SelectedDevice:any;
    ISelectedDevice:any;
    DeviceData:any;
    IDeviceData:any;
}

 export class  SCCP_DATATYPES  { 
    static SCCP_TYPE_BOOL     = 0x01;
    static SCCP_TYPE_STRING   = 0x02;
    static SCCP_TYPE_ENUM8    = 0x03;
    static SCCP_TYPE_ENUM16   = 0x04;
    static SCCP_TYPE_TIME     = 0x05;
    static SCCP_TYPE_UINT8    = 0x08;
    static SCCP_TYPE_UINT16   = 0x09;
    static SCCP_TYPE_UINT32   = 0x0A;
    static SCCP_TYPE_UINT64   = 0x0B;
    static SCCP_TYPE_INT8     = 0x0C;
    static SCCP_TYPE_INT16    = 0x0D;
    static SCCP_TYPE_INT32    = 0x0E;
    static SCCP_TYPE_INT64    = 0x0F;
}

export class SCCP_ATTRIBUTES  {
    static FIRMWARE_VERSION                                        = 0x0000;
    static BT_DEVICE_NAME                                          = 0x0020;
    static ARTICLE_NUMBER                                          = 0x0021;
    static DEVICE_TYPE                                             = 0x0022;
    static POTENTIOMETER_MODE                                      = 0x0030;
    static BRIGHTNESS_THRESHOLD                                    = 0x0031;
    static BRIGHTNESS_THRESHOLD_MIN                                = 0x0032;
    static BRIGHTNESS_THRESHOLD_MAX                                = 0x0033;
    static CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        = 0x0034;
    static CONSTANT_LIGHT_CONTROL_ENABLE                           = 0x0038;
    static CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     = 0x0039;
    static CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 = 0x003A;
    static CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 = 0x003B;
    static CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE = 0x003C;
    static SHORT_TIME_PULSE_ENABLE                                 = 0x0040;
    static SWITCH_OFF_DELAY                                        = 0x0041;
    static SWITCH_OFF_DELAY_MIN                                    = 0x0042;
    static SWITCH_OFF_DELAY_MAX                                    = 0x0043;
    static OPERATION_MODE                                          = 0x0044;
    static SLAVE_MODE_ENABLE                                       = 0x0045;
    static OUTDOOR_APPLICATION_ENABLE                              = 0x0050;
    static PIR_SENSITIVITY0                                        = 0x0051;
    static PIR_SENSITIVITY1                                        = 0x0052;
    static PIR_SENSITIVITY2                                        = 0x0053;
    static PIR_SENSITIVITY3                                        = 0x0054;
    static BRIGHTNESS_CORRECTION_ENABLE                            = 0x0058;
    static BRIGHTNESS_CORRECTION_VALUE                             = 0x0059;
    static DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         = 0x005A;
    static CH1_CIRCUIT_LOGIC                                       = 0x0060;
    static CH1_PERMANENT_ON_DURATION                               = 0x0061;
    static CH1_PERMANENT_ON_DURATION_MIN                           = 0x0062;
    static CH1_PERMANENT_ON_DURATION_MAX                           = 0x0063;
    static CH1_PERMANENT_OFF_DURATION                              = 0x0064;
    static CH1_PERMANENT_OFF_DURATION_MIN                          = 0x0065;
    static CH1_PERMANENT_OFF_DURATION_MAX                          = 0x0066;
    static SOFT_ON_ENABLE                                          = 0x0067;
    static SOFT_ON_DURATION                                        = 0x0068;
    static SOFT_ON_DURATION_MIN                                    = 0x0069;
    static SOFT_ON_DURATION_MAX                                    = 0x006A;
    static SOFT_OFF_ENABLE                                         = 0x006B;
    static SOFT_OFF_DURATION                                       = 0x006C;
    static SOFT_OFF_DURATION_MIN                                   = 0x006D;
    static SOFT_OFF_DURATION_MAX                                   = 0x006E;
    static PHASE_CUT_MODE                                          = 0x006F;
    static CH1_MEMORY_FUNCTION_ENABLE                              = 0x0070;
    static DELIMIT_LIGHTING_LEVEL_ENABLE                           = 0x0071;
    static CH1_MIN_LEVEL_ENABLE                                    = 0x0072;
    static CH1_MIN_LEVEL                                           = 0x0073;
    static CH1_MAX_LEVEL_ENABLE                                    = 0x0074;
    static CH1_MAX_LEVEL                                           = 0x0075;
    static LEVEL_MIN                                               = 0x0076;
    static LEVEL_MAX                                               = 0x0077;
    static DALI_POWER_ON_LEVEL                                     = 0x0078;
    static COLOR_TEMPERATURE                                       = 0x007C;
    static COLOR_TEMPERATURE_MIN                                   = 0x007D;
    static COLOR_TEMPERATURE_MAX                                   = 0x007E;
    static BURN_IN_ENABLE                                          = 0x0080;
    static BURN_IN_MODE                                            = 0x0081;
    static BURN_IN_DURATION                                        = 0x0082;
    static BURN_IN_DURATION_MIN                                    = 0x0083;
    static BURN_IN_DURATION_MAX                                    = 0x0084;
    static BASIC_BRIGHTNESS_MODE                                   = 0x0088;
    static BASIC_BRIGHTNESS_LEVEL                                  = 0x0089;
    static BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           = 0x008A;
    static BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       = 0x008B;
    static BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       = 0x008C;
    static BASIC_BRIGHTNESS_START_TIME                             = 0x008D;
    static BASIC_BRIGHTNESS_END_TIME                               = 0x008E;
    static BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  = 0x008F;
    static NIGHT_LIGHT_FUNCTION_ENABLE                             = 0x0094;
    static NIGHT_LIGHT_START_TIME                                  = 0x0095;
    static NIGHT_LIGHT_END_TIME                                    = 0x0096;
    static NIGHT_LIGHT_LEVEL                                       = 0x0097;
    static STEPWISE_SWITCH_OFF_DELAY_ENABLE                        = 0x0098;
    static STEPWISE_SWITCH_OFF_DELAY                               = 0x0099;
    static STEPWISE_SWITCH_OFF_DELAY_MIN                           = 0x009A;
    static STEPWISE_SWITCH_OFF_DELAY_MAX                           = 0x009B;
    static STEPWISE_SWITCH_OFF_LEVEL                               = 0x009C;
    static PRESENCE_SIMULATION_ENABLE                              = 0x009D;
    static PRESENCE_SIMULATION_START_TIME                          = 0x009E;
    static PRESENCE_SIMULATION_END_TIME                            = 0x009F;
    static PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               = 0x00A0;
    static PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE_ID                = 0x00A5;
    static CH2_CIRCUIT_LOGIC                                       = 0x0100;
    static CH2_MODE                                                = 0x0101;
    static HVAC_DYNAMICAL_CONTROL_ENABLE                           = 0x0102;
    static HVAC_SWITCH_ON_DELAY                                    = 0x0103;
    static HVAC_SWITCH_ON_DELAY_MIN                                = 0x0104;
    static HVAC_SWITCH_ON_DELAY_MAX                                = 0x0105;
    static HVAC_SWITCH_OFF_DELAY                                   = 0x0106;
    static HVAC_SWITCH_OFF_DELAY_MIN                               = 0x0107;
    static HVAC_SWITCH_OFF_DELAY_MAX                               = 0x0108;
    static TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     = 0x00B0;
    static ENERGY_MONITOR_CONNECTED_LOAD                           = 0x00C0;
    static ENERGY_MONITOR_CONNECTED_LOAD_MIN                       = 0x00C1;
    static ENERGY_MONITOR_CONNECTED_LOAD_MAX                       = 0x00C2;
    static ENERGY_MONITOR_LIGHTING_DURATION                        = 0x00C3;
    static ENERGY_MONITOR_LIGHTING_DURATION_MIN                    = 0x00C4;
    static ENERGY_MONITOR_LIGHTING_DURATION_MAX                    = 0x00C5;
    static CONTACT                                                 = 0x00D0;
    static BUILDING                                                = 0x00D1;
    static ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    = 0x00E0;
    static ENABLE_USER_SET_SWITCH_OFF_DELAY                        = 0x00E1;
    static ENABLE_USER_ENERGY_MONITOR                              = 0x00E2;
    static ENABLE_USER_BASIC_BRIGHTNESS                            = 0x00E3;
    static ENABLE_USER_NIGHT_LIGHT_FUNCTION                        = 0x00E4;
    static ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            = 0x00E5;
    static CURRENT_BRIGHTNESS                                      = 0x1020;
    static IDENTIFYING_DEVICE                                      = 0x1021;
    static MOVEMENT                                                = 0x1040;
    static CH1_IDENTIFYING_LOAD                                    = 0x1060;
    static CH1_ON_OFF_STATE                                        = 0x1061;
    static CH1_CURRENT_LEVEL                                       = 0x1062;
    static CH2_IDENTIFYING_LOAD                                    = 0x10A0;
    static CH2_ON_OFF_STATE                                        = 0x10A1;
    static CH2_CURRENT_LEVEL                                       = 0x10A2;
    static TEST_MODE_ENABLE                                       = 0x10B0;
    static ACCESS_LEVEL                                            = 0x10E0;
    static TEST_BOOL                                               = 0x8001;
    static TEST_STRING                                             = 0x8002;
    static TEST_ENUM8                                              = 0x8003;
    static TEST_ENUM16                                             = 0x8004;
    static TEST_TIME                                               = 0x8005;
    static TEST_UINT8                                              = 0x8008;
    static TEST_UINT16                                             = 0x8009;
    static TEST_UINT32                                             = 0x800A;;
    static TEST_INT8                                               = 0x800C;
    static TEST_INT16                                              = 0x800D;
    static TEST_INT32                                              = 0x800E;
};


export class UIParams {

      constructor() {}
      public showHeader = false;
      public showFooter = false;
      public arrowState = -1;
      public devicesObj =  new CloudObj();
      public profileSwitch = true;
      public subMenuVal= 'none';
      public profile = 'none';
      public mainTitle = 'BJ DETECTOR';
      public smMainTitle = "";
      public otherparamTitle = '';
      arrowStateChange: EventEmitter<any> = new EventEmitter();
      public otherparam = '';
      public iparam = '';
      showOnlyCancel =  false;
      dialogTitle = '';
      dialogText = '';
      showModal = false;
      showEModal = false;
      profileName ='';
      showCDI = -1;
      eOptionText = 'save';
      eDevParamsChanged = 0;
      userLoggedIn =  false;
      lastSynced = '';
      subMenuComponent = undefined;
      autoSync = true;
      inputHint ='';
}

export class DeviceParams {
        constructor(){}
        public deviceName = '';
        public deviceType= '';
        public deviceAddress = '';
        public modelNumber= '';
        public contactName= '';
        public buildingName= '';
        public date= '';
        public fwupdate = false;
        public modelType= '';
        public firmwareVersion= '';
        jsonLoadEmitter: EventEmitter<any> = new EventEmitter();
        iJsonLoadEmitter: EventEmitter<any> = new EventEmitter();
        deviceConnected = false;
}

export class NetworkParams {
    constructor(){}
    public username = ''
    public password = ''
    public namespace = 'presence-detector-backup'
    public certDetectorHostName = 'api.my-staging.busch-jaeger.de';
    public detectorHostName = 'https://api.my-staging.busch-jaeger.de';
    public baseUrl = this.detectorHostName + '/api/user/key-value/'+ this.namespace;   
    public devicesPath = 'devices';
    public profilesPath = 'profiles';
    public devicesUrl = this.baseUrl+ '/'+ this.devicesPath;
    public profilesUrl = this.baseUrl+ '/'+ this.profilesPath;
    public deviceprefix = 'device-'
    public detectorsName = 'detectors'
    public deviceDataUrl =  this.baseUrl + '/'+ this.deviceprefix;
    public detectorPort = 443;
    public useCertAuth = true; 
    public certBasePath = '/api/user/key-value/'+ this.namespace;
    public certDevicesPath = this.certBasePath+'/'+this.devicesPath ;
    public certProfilesPath = this.certBasePath+'/'+this.devicesPath ;
    public certDeviceDataPath = this.certBasePath+'/'+this.deviceprefix;
    public certData:any;
    public keyData:any;
}

var bjCert ='-----BEGIN CERTIFICATE-----\
MIIEyDCCA7KgAwIBAgIIWBtzVrg9BD0wCwYJKoZIhvcNAQEFMIH7MQswCQYDVQQG\
EwJERTEcMBoGA1UECBMTTm9yZHJoZWluLVdlc3RmYWxlbjEdMBsGA1UEBxMUTXVl\
bGhlaW0gYW4gZGVyIFJ1aHIxJzAlBgNVBAoTHlE6bWFya2V0aW5nIEFrdGllbmdl\
c2VsbHNjaGFmdDEYMBYGA1UECxMPRGF0YWRldmVsb3BtZW50MUMwQQYDVQQDEzpB\
QkIvQnVzY2gtSmFlZ2VyIEVsZWt0cm8gSW50ZXJuZXQgU2VydmljZSBQbGF0Zm9y\
bSBSb290IENBMScwJQYJKoZIhvcNAQkBFhhhZG1pbkBkYXRhZGV2ZWxvcG1lbnQu\
ZGUwIhgPMjAxNzA1MTIwNTU2NTRaGA8yMDE5MDUxMjA1NTY1NFowMTELMAkGA1UE\
BhMCREUxIjAgBgNVBAMMGUJ1c2NoLUphZWdlciBFbGVrdHJvIEdtYkgwggEgMAsG\
CSqGSIb3DQEBAQOCAQ8AMIIBCgKCAQEA35A23Rc4cyR74ChxWWZkXNlx7bivJ3/G\
VgA9Iuy5bHQm3CCWN1ygtWMY1yTACeipvXDyIGF7IK7xVe7V5ygfAek9/x8gbxlS\
IAncTcZyOJiKpc3pHx6ufATlBVWuoqio1taHsz2OmMXdA2Gz7dFu9/v9d9hinyHe\
obcLPlNZxRunRkfT6ZZlWY+I7cIprxPKXUNscwcZHY3nzQPhAAwQhLVg7ihoSBls\
cT/ByzwETRWCNEL8PsYiVgZfgswuGyj5IUjqOsv4ByMwnwK6IfyJR/MaiMAKGoBf\
sWZjuoxWWf70nuYIqaTb5kNpYl8zsPh5GLVnPTEWZHBUo+LvLo1j+QIDAQABo4IB\
GTCCARUwCQYDVR0TBAIwADCB5gYDVR0RBIHeMIHbhlJodHRwczovL215LXN0YWdp\
bmcuYnVzY2gtamFlZ2VyLmRlL2FwaS9jbGllbnQvZjRmYWJiMDktZGMxYi00ZDFl\
LWExZDUtOTNjMzgwYmY1M2Q4oDEGBysSAAIEhg+gJhMkZjRmYWJiMDktZGMxYi00\
ZDFlLWExZDUtOTNjMzgwYmY1M2Q4oFIGCCsGAQUFBwgFoEYTRGY0ZmFiYjA5LWRj\
MWItNGQxZS1hMWQ1LTkzYzM4MGJmNTNkOEB4bXBwLm15LXN0YWdpbmcuYnVzY2gt\
amFlZ2VyLmRlMB8GA1UdIwQYMBaAFLmObDD6U5xzsml9CGOUbJneFYHFMAsGCSqG\
SIb3DQEBBQOCAQEAjcmUeHqVWCngMjiMEBvowRg3PikWbtvAhYBcvfMT47EW1M+Q\
KFiPfQMPGBKdRnk2cDNai2stf1ODuMG3iuIQbXoHV1hK4LqRwXPqUkcdmub1lQoA\
8+NFFmh4QBhl74LVMbtht6LA3P5NWTbV3oxV+e2eq2zKOQpt45Xly0kr4J0Kg5UR\
uZmUE6IiI6104ZabUPxBKW8XKtICq71a0T4zyLyvnfOzAWlW56rD6wEBVggJTOuq\
XaQd4seXnKkxgVaGgTCnX2Yo8NvdhTiUhn0FKbSTxmQXo0gdb3McdhkP5EbqwYM8\
OykaSStsjE5xlJOtDnM3jiofu5wp7f1e44s2fQ==\
-----END CERTIFICATE-----';

var bjKey ='-----BEGIN PRIVATE KEY-----\
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDfkDbdFzhzJHvg\
KHFZZmRc2XHtuK8nf8ZWAD0i7LlsdCbcIJY3XKC1YxjXJMAJ6Km9cPIgYXsgrvFV\
7tXnKB8B6T3/HyBvGVIgCdxNxnI4mIqlzekfHq58BOUFVa6iqKjW1oezPY6Yxd0D\
YbPt0W73+/132GKfId6htws+U1nFG6dGR9PplmVZj4jtwimvE8pdQ2xzBxkdjefN\
A+EADBCEtWDuKGhIGWxxP8HLPARNFYI0Qvw+xiJWBl+CzC4bKPkhSOo6y/gHIzCf\
Aroh/IlH8xqIwAoagF+xZmO6jFZZ/vSe5gippNvmQ2liXzOw+HkYtWc9MRZkcFSj\
4u8ujWP5AgMBAAECggEBALSld2+XP8nqhR5QD6dJkXdlTSXlwcKNANqlPsFlvz7f\
bDcbLcZ2VnW7KWtPCs327pFhHoUDv9ZdBi2F29n5FXUZ3zqzECY1s6Kn1RgTbmBF\
AmOPyvuWcy9LVTPGVGKjHirbFrPC3eKcn0YIQLe+L4i6WcnpU2d6msbZfYBTIYqe\
lw//J82pKnLtNSSJLMgT/doSDSz8G2vE+AeiINOoELf0WX31i2qM3Oc5LIPelSBv\
txmtg6ZMcg4UAnw1RLTGEHWK8e7xOpX8QjYha8Z25jH0ZQU3ltz4+de9pG1jnA2s\
CClynXSK2rxer+TXUshcpi8lJm5yntcP8jBFJfUiYbECgYEA86vaMIvhFPUAzuHT\
APzHh6l58vgOXzQohV14Oblz9GWxpdv9FMqMYlez38JAFxDYRRxBmIAitaYUMFfV\
VZwaFkTqW/J4WtX+9VrTpZC0BTyYHRbCIWQ4yv3OcuNyoVU8p9wc0t7w5eKYwBnD\
5VMj2Z0XYt4fnT9cQfEF7zNewR8CgYEA6t/p/n8ZJkHoWj5fbA9S02PAnzYMi2NQ\
DpaiVVFXVGkWtmZO8BlJyeazLTYow5G5Ib6qmYB9SmkHKXZhBQnYKDRazpZumc/T\
MKOOCMDWwREzs9xmOxCVUhA9GHxBg74BVDe9q93OZdy3Js0WQFlO+VeOrOTCAxXi\
sztYfkwpv+cCgYEA4AVzB4bSXE4TfCApuZKsbpDlSPe9XtG5H0ObsJZLgLmt5Wqm\
9mJxRkiTWnhgK9SUwJUFyYqkXpRdo0RdIePuJ+McA4ScGgb7696hDmpG1zmqL7Qo\
rkJR5G4LS5zIWoLezQSUi1nj57W38YS+kSsqnnrKcV79ebgyvX01k4CK8MkCgYAO\
H7rtf+0ePNZhHuEUGXPMnHIH4PMuKqG0zuAiK0sKG2uvOkXC8HJcftAFhv06jXfJ\
jLKrmmtuXxR8LM82w1nJSSSwyaELBNFZWmx/IEGJyKQIS9el86BXF/zkjQxPhMyF\
qPhx7lusCnLFFY4h/nzeR6KfyP3Vu6ovRwFSTvgvvwKBgH6ucYddeLS87ScSWH6M\
QhIauG/dDQCNte+6XPiEdN7ezcisqd+ElGOZYJj+lrACnrJsxPFEcQiUiuHohxvz\
D6hKP1sH08HE73fFJiraQt6mCh0hCYyIaew+i9iau02P4bmWDQ1qexU3QQivoXBH\
zTMmwS9ucX4JlYyqZqSzms69\
-----END PRIVATE KEY-----';



declare var setDataServiceCallBack;
declare var configureAttr;
declare var writeAttr;
declare var readAttr;
declare var connectDevice;
declare var disConnectDevice;
@Injectable()
export class DataService {

    scanneddata:any;
    profilesKey = 'profiles';
    uiParams:UIParams   =  new UIParams();
    deviceParams:DeviceParams   =  new DeviceParams();
    networkParams:NetworkParams =  new NetworkParams();
    setDataServiceCallBackObj:any;
    connectDeviceObj:any;
    disConnectDeviceObj:any;
    writeAttrObj:any;
    readAttrObj:any;
    configureAttrObj:any;
    public DeviceBuild = 1;
    activeComponent:any;
    iActiveComponent:any;
    headerComponent:any;
    readArray=[];
    readDoneArray=[];
    writeArray=[];
    writeDoneArray=[];
    readCount = 10;
    writeCount = 10;
    addData=[];
    sendData =  new Array<WriteData>();
    screenWidth;
    screenHeight;
    static dataService:DataService;
    debugLogs =  false;
    constructor(private http:Http,public logger: LoggerService) {
        if(this.DeviceBuild == 1)
            this.setDataServiceCallBackObj = new setDataServiceCallBack(this);
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        DataService.dataService = this;
        this.checkDeviceMode();
        this.setCertData('');
        this.setKeyData('')
    }

    checkDeviceMode(){
        let aindex =  navigator.platform.toLowerCase().indexOf('linux');
        let iindex = navigator.platform.toLowerCase().indexOf('iphone');
        if( aindex >=  0 ||
        iindex >= 0){
            this.DeviceBuild = 1;
        }else {
            this.DeviceBuild = 0;
        }
    }
    saveToLocalStorage(key,value){
        localStorage.setItem(key,value);
    }

    readFromLocalStorage(key){
        return localStorage.getItem(key);
    }

    setCertData(data){
        if(this.DeviceBuild == 1)
            this.networkParams.certData = Buffer.from(data, "binary");
        else{
             this.networkParams.certData = Buffer.from(bjCert, "binary");
        }
    }
    setKeyData(data){
        if(this.DeviceBuild ==1 )
            this.networkParams.keyData = Buffer.from(data, "binary");
        else{
            this.networkParams.keyData = Buffer.from(bjKey, "binary");
        }
    }

     str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint16Array(buf);
        for (var i=0, strLen=str.length; i<strLen; i++) {
            bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }

    getEOptionText(){
        return this.uiParams.eOptionText;
    }

     setEOptionText(text){
        this.uiParams.eOptionText = text;
    }
    setScannedData(scanned){
        this.scanneddata = scanned;
        this.activeComponent.setScannedData();
    }
    getScannedData() {
        return this.scanneddata;
    }

    setSMMainTitle(title) {
        this.uiParams.smMainTitle = title;
    }
    getSMMainTitle() {
        return this.uiParams.smMainTitle;
    }

    setMainTitle(title) {
        this.uiParams.mainTitle = title;
    }
    getMainTitle() {
        return this.uiParams.mainTitle;
    }
    public initDevices() {
        this.loadDevices().then((devs) => {
            if(this.DeviceBuild == 1)
                this.uiParams.devicesObj.DevicesArray = [];
             else 
                this.uiParams.devicesObj.DevicesArray = devs;
        });
    }
   
    loadDevices() {
        return new Promise<Array<any>>(resolve => {
        this.http.get('assets/detectorslist.json').subscribe(response => {
                resolve(response.json().detectors);
            });
        });
    }

    getEDevParamsState() {
        return this.uiParams.eDevParamsChanged;
    }
    setEDevParamsState(paramsChanged) {
        this.uiParams.eDevParamsChanged = paramsChanged;
    }
    getDevice(i,installed) {
        if(installed){
            return this.uiParams.devicesObj.IDevicesArray[i];
        }else {
            return this.uiParams.devicesObj.DevicesArray[i];
        }
    }
    addDevice(device,installed) {
        let foundDevice = false;
        if(installed){
            for(let i = 0; i< this.uiParams.devicesObj.IDevicesArray.length; i++){
                if(device.btAddress == this.uiParams.devicesObj.IDevicesArray[i].btAddress){
                    this.uiParams.devicesObj.IDevicesArray[i] = device;
                    foundDevice = true;
                    break;
                }
            }
            if(foundDevice == false)
                this.uiParams.devicesObj.IDevicesArray.push(device)
        }else {
             for(let i = 0; i< this.uiParams.devicesObj.DevicesArray.length; i++){
                if(device.btAddress == this.uiParams.devicesObj.DevicesArray[i].btAddress){
                    this.uiParams.devicesObj.DevicesArray[i] = device;
                    foundDevice = true;
                    break;
                }
            }
            if(foundDevice == false)
                this.uiParams.devicesObj.DevicesArray.push(device);
        }
    }
    setDevices(devices,installed) {
        if(installed){
            this.clearDevices(installed);
            this.uiParams.devicesObj.IDevicesArray = devices;
            for(let i = 0; i < this.uiParams.devicesObj.IDevicesArray.length; i++){
                if(this.uiParams.devicesObj.ISelectedDevice != undefined &&  this.uiParams.devicesObj.ISelectedDevice.btAddress == this.uiParams.devicesObj.IDevicesArray[i].btAddress){
                    this.uiParams.devicesObj.IDeviceData = this.uiParams.devicesObj.IDevicesArray[i];
                    break;
                }
            }
        }else {
            this.clearDevices(installed);
            this.uiParams.devicesObj.DevicesArray = devices;
            for(let i = 0; i < this.uiParams.devicesObj.IDevicesArray.length; i++){
                if( this.uiParams.devicesObj.SelectedDevice != undefined && this.uiParams.devicesObj.SelectedDevice.btAddress == this.uiParams.devicesObj.DevicesArray[i].btAddress){
                    this.uiParams.devicesObj.DeviceData = this.uiParams.devicesObj.DevicesArray[i];
                    break;
                }
            }
        }
    }
    clearDevices(installed) {
        if(installed ){
            if(this.uiParams.devicesObj.IDevicesArray != undefined)
                this.uiParams.devicesObj.IDevicesArray.splice(0,this.uiParams.devicesObj.DevicesArray.length);
        }else {
            if(this.uiParams.devicesObj.DevicesArray != undefined){
                this.uiParams.devicesObj.DevicesArray.splice(0,this.uiParams.devicesObj.DevicesArray.length);
            }
        }
    }
    getDevices(installed){
        if(installed) {
            if(this.uiParams.devicesObj.IDevicesArray && (this.uiParams.devicesObj.IDevicesArray.length > 0)) {
                return this.uiParams.devicesObj.IDevicesArray;
            }
            else {
                return [];
            }
        }else {
            if(this.uiParams.devicesObj.DevicesArray && (this.uiParams.devicesObj.DevicesArray.length > 0)) {
                return this.uiParams.devicesObj.DevicesArray;
            }
            else {
                return [];
            }
        }
    }
    setMenuArrow(menuState) {
      this.uiParams.arrowState =  menuState;
    }
    closeMenu() {
        this.arrowStateEmit();
    }
    getMenuArrow() {
      return this.uiParams.arrowState;
    }
    setFooter(footerState) {
      this.uiParams.showFooter =  footerState;
    }
    getFooter() {
      return this.uiParams.showFooter;
    }

    setHeader(headerState) {
      this.uiParams.showHeader =  headerState;
    }
    getHeader() {
      return this.uiParams.showHeader;
    }
    setProfile(in_profile) {
      this.uiParams.profile = in_profile;
    }
    getProfile(){
      return this.uiParams.profile;
    }

    getProfileSwitch() {
        return this.uiParams.profileSwitch;
    }
    setProfileSwitch(switchprofile) {
        this.uiParams.profileSwitch = switchprofile;
    }
    arrowStateEmit() {
        this.uiParams.arrowStateChange.emit(0);
    }
    subscribeArrowState(component, callback) {
        return this.uiParams.arrowStateChange.subscribe(data => callback(component, data));
    }
    setShowCDI(item) {
        this.uiParams.showCDI = item;
    }
    getShowCDI() {
        return this.uiParams.showCDI;
    }

    setSubMenuVal(submenuval) {
        this.uiParams.subMenuVal =  submenuval;
    }
    getSubMenuVal() {
        return this.uiParams.subMenuVal;
    }
    setOtherParam(item,itemTitle) {
         this.uiParams.otherparam = item;
         this.uiParams.otherparamTitle = itemTitle;
    }
    setShowOnlyCancel(cancel) {
        this.uiParams.showOnlyCancel = cancel;
    }
    showOnlyCancel() {
        return this.uiParams.showOnlyCancel;
    }
    getOtherParamTitle() {
        return this.uiParams.otherparamTitle;
    }
    getOtherParam(){
        return this.uiParams.otherparam;
    }
     setIParam(item,itemTitle) {
         this.uiParams.iparam = item;
         this.setSMMainTitle(itemTitle);
    }

    getIParam(){
        return this.uiParams.iparam;
    }
    setDialogTitle(item) {
        this.uiParams.dialogTitle = item;
    }   
    setDialogText(item) {
        this.uiParams.dialogText = item;
    }
    getDialogTitle() {
        return this.uiParams.dialogTitle;
    }
    getDialogText() {
        return this.uiParams.dialogText;
    }
    getShowModal() {
        return this.uiParams.showModal;
    }
    setShowModal(item) {
        this.uiParams.showModal = item;
    }
    getShowEModal() {
        return this.uiParams.showEModal;
    }
    setShowEModal(item) {
        this.uiParams.showEModal = item;
    }

    getEDialogInputHint(){
        return this.uiParams.inputHint;
    }

    setEDialogInputHint(hint){
        this.uiParams.inputHint = hint;
    }
    setProfileName(profilename){
        this.uiParams.profileName = profilename;
    }

    getProfileName(){
        return this.uiParams.profileName;
    }

    getSubMenuItems() {
        if(this.uiParams.profile == 'user') {
            let menuItems: Array<SubMenuItem> = [ 
                new SubMenuItem('Help','help'),
                new SubMenuItem('About Busch-Jaeger','about'), 
                new SubMenuItem('Switch mode','switch_mode'), 
            ];
            return menuItems;
        }else {
            let menuItems: Array<SubMenuItem> = [ 
                new SubMenuItem('Installed devices','installed_devices'),
                new SubMenuItem('User profiles','user_profiles'), 
                new SubMenuItem('Switch mode','switch_mode'), 
                new SubMenuItem('Help','help'),
                new SubMenuItem('Sync with myBUSCH-JAEGER','sync'),
                new SubMenuItem('About Busch-Jaeger','about'),
            ];
            return menuItems;
        }
    }
/****************  DEVICE INFO APIs specific to each device ******************/

    public setSelectedDevice(device,installed) {
        if(installed) {
            this.uiParams.devicesObj.ISelectedDevice = device;
        } else {
            this.uiParams.devicesObj.SelectedDevice =  device;
        }
    }
    public getSelectedDevice(installed) {
        if(installed) {
            return this.uiParams.devicesObj.ISelectedDevice;
        }else {
            return this.uiParams.devicesObj.SelectedDevice;
        }
    }
    subscribeJsonLoad(component, callback) {
        return this.deviceParams.jsonLoadEmitter.subscribe(data => callback(component, data));
    }
    public initDeviceData(installed){
    this.loadDeviceData(installed).then((data) => {
            if(installed) {
                this.uiParams.devicesObj.IDevicesArray = data;
                this.iJsonLoadEmit();
            }else {
             this.uiParams.devicesObj.DeviceData = data;
             this.jsonLoadEmit();
            }
        });
    }


 setHeaderComponent(component) {
        this.headerComponent = component;
    }

    getHeaderComponent() {
        if(this.headerComponent != undefined) {
            return this.headerComponent;
        }
    }

    setActiveComponent(component) {
        this.activeComponent = component;
    }

    setIActiveComponent(component){
        this.iActiveComponent = component;
    }
    

    notifyActiveComponentWithBLEdata() {
        if(this.activeComponent != undefined) {
            this.activeComponent.onBLEdata();
             this.setEDevParamsState(0)
        }
    }

    setBLEDataToService(data,responseType) {
        let indata = data.datas;
        switch (responseType){
            case 131:
                let readDoneData = [];
                for(let i =0 ; i < indata.length; i++) {
                    let atrType = indata[i].attrType;
                    let atrValue = indata[i].attrValue;
                    readDoneData.push(atrType);
                    this.setBLEdataOnDeviceData(atrType,atrValue);
                }
                if(this.readArray.length > this.readCount){
                    
                    this.readArray = this.readArray.slice(this.readCount,this.readArray.length);
                }
                else {
                    this.readArray = [];
                }  
                if(this.readArray.length > 0){
                    this.readData(this.readArray);
                }else {
                    this.putDevicesToCloud(false);
                    this.notifyActiveComponentWithBLEdata()
                }
            break;
            case 132:
                if(this.writeArray.length > this.writeCount){
                    this.writeArray = this.writeArray.slice(this.writeCount,this.writeArray.length);
                    this.sendData = this.sendData.slice(this.writeCount,this.sendData.length);
                    this.uiParams.devicesObj.DeviceData.last_updated=(new Date).getTime();
                }
                else {
                    this.writeArray = [];
                    this.sendData = [];
                }  
                
                if(this.writeArray.length > 0){
                    this.sendChangedParams();
                }else {
                    this.notifyActiveComponentWithBLEdata()
                    this.putDevicesToCloud(false);
                }
            break;
            default:
            break;
        }
    }

    connectDevice(btaddress){
        this.connectDeviceObj = new connectDevice(btaddress);
    }
    disConnectDevice(btAddress){
        this.disConnectDeviceObj = new disConnectDevice(btAddress)
    }
    onDeviceConnected(deviceAddress) {
        this.deviceParams.deviceConnected = true;
        if(this.activeComponent != undefined) {
            this.activeComponent.onDeviceConnected(deviceAddress);
        }
    }

    onDeviceDisconnected(deviceAddress){
        this.deviceParams.deviceConnected = false;
    }

    getDeviceConnectionState(){
        return this.deviceParams.deviceConnected;
    }

    readData(data) {
        if(this.DeviceBuild == 1){
            if(this.readArray.length == 0) {
                this.readArray = data;
            }
            if(this.readArray.length <= this.readCount) {
                this.readAttrObj =  new readAttr(this.readArray);
            }else {
                let partArray =  this.readArray.slice(0, this.readCount-1);
                this.readAttrObj =  new readAttr(partArray);
            }
        }else {

        }
    }

    configureData(data, length){
        this.configureAttrObj =  new configureAttr(data);
    }

    subscribeIJsonLoad(component, callback) {
        return this.deviceParams.iJsonLoadEmitter.subscribe(data => callback(component, data));
    }
    public getDevicedata(installed) {
        if(installed) {
            return this.uiParams.devicesObj.IDeviceData;
        }else {
            return this.uiParams.devicesObj.DeviceData;
        }
    }
    loadDeviceData(installed) {
        if(installed){
            this.getDevicesFromCloud()
        }else {
             return new Promise<Array<any>>(resolve => {
                this.http.get('assets/params.json').subscribe(response => {
                        resolve(response.json());
                    });
                });
        }
    }

    jsonLoadEmit() {
        this.deviceParams.jsonLoadEmitter.emit(0);
    }
    iJsonLoadEmit() {
        this.deviceParams.iJsonLoadEmitter.emit(0);
    }

    resetSendData() {
        this.sendData = [];
    }
    addToSendData(paramBytes) {
        this.setEDevParamsState(1)
        this.addData = [];
        for(let i =1; i < paramBytes.length; i++){
            this.addData.push(paramBytes[i]);
        }
        let mydata = new WriteData(paramBytes[0],this.addData);
        if(this.writeArray.length == 0) {
            this.writeArray.push(paramBytes[0])
            this.sendData.push(mydata);
        }else {
            let exisingindex = this.writeArray.indexOf(paramBytes[0]) 
            if(exisingindex > -1) {
                this.sendData[exisingindex] = mydata;
            } else {
                this.writeArray.push(paramBytes[0])
                this.sendData.push(mydata);
            }
        }
    }
    sendChangedParams() {
        if(this.writeArray.length > 0 && this.DeviceBuild == 1) {
            if(this.activeComponent != undefined){
                this.activeComponent.setLoadingDataDone(false);
            }
            let dataBytes = [];
            if(this.writeArray.length > this.writeCount) {
                for(let i = 0; i < this.writeCount; i++) {
                    let idata = this.sendData[i];
                    dataBytes.push(idata.attrType);
                    for(let j =0; j<idata.attrValue.length; j++){
                        dataBytes.push(idata.attrValue[j]);
                    }
                }
            }
            else {
                for(let i = 0; i < this.writeArray.length; i++) {
                    let idata = this.sendData[i];
                    dataBytes.push(idata.attrType);
                    for(let j =0; j<idata.attrValue.length; j++){
                        dataBytes.push(idata.attrValue[j]);
                    }
                }
            }
            this.writeAttrObj =  new writeAttr(dataBytes);
        }else {
            this.setEDevParamsState(0)
        }
    }

    resetReadArray(){
        this.readArray = [];
    }

    resetWriteArray(){
        this.writeArray = [];
    }

    getUTCDateFormat(){
        var date = new Date();
        return date.toISOString().split('.')[0];
    }

    handleGetIResponseData(data){
        if(data != undefined){
            let strFormat =  JSON.stringify(data);
            let Detectors = data.detectors;
            this.uiParams.userLoggedIn = true;
            this.uiParams.lastSynced = data._updated_at.split('+')[0];
            let localDate = this.getUTCDateFormat();
            let syncdate1 = new Date(localDate)
            let syncdate2 = new Date(this.uiParams.lastSynced)
            if(syncdate1 > syncdate2){
            }else if (syncdate1 < syncdate2){
            }else {
            }
            this.setDevices(Detectors,true);
            if(this.uiParams.subMenuComponent != undefined){
                this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
                this.iJsonLoadEmit();
            }
        }
    }


   getFormattedDate() {
        var date = new Date();
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        return str;
    }

    handleGetResponseData(data){
        if(data != undefined){
            let strFormat =  JSON.stringify(data);
            let Detectors = data.detectors;
            if(Detectors != undefined ){
                this.uiParams.userLoggedIn = true;
                this.uiParams.lastSynced = data._updated_at.split('+')[0];
                let localDate = this.getUTCDateFormat();
                let syncdate1 = new Date(localDate)
                let syncdate2 = new Date(this.uiParams.lastSynced)
                if(syncdate1 > syncdate2){
                }else if (syncdate1 < syncdate2){
                }else {
                }
                this.setDevices(Detectors,true);
                if(this.uiParams.subMenuComponent != undefined)
                    this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
            }
        }
    }
    handlePutResponseData(data){
        if(data != undefined){
        let strFormat =  JSON.stringify(data);
        let Detectors = data.detectors;
            if(Detectors != undefined ){
                this.uiParams.userLoggedIn = true;
                this.uiParams.lastSynced = data._updated_at.split('+')[0];
                let localDate = this.getUTCDateFormat();
                let syncdate1 = new Date(localDate)
                let syncdate2 = new Date(this.uiParams.lastSynced)
                if(syncdate1 > syncdate2){
                }else if (syncdate1 < syncdate2){
                }else {
                }
                this.setDevices(Detectors,true);
                if(this.uiParams.subMenuComponent != undefined)
                    this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
            }else {
                this.uiParams.userLoggedIn = true;
                this.uiParams.lastSynced = data._updated_at.split('+')[0];
                let localDate = this.getUTCDateFormat();
                let syncdate1 = new Date(localDate)
                let syncdate2 = new Date(this.uiParams.lastSynced)
                if(syncdate1 > syncdate2){
                }else if (syncdate1 < syncdate2){
                }else {
                }
                if(this.uiParams.subMenuComponent != undefined)
                    this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
            }
        }
    }

    loadInstalledDeviceInfo(item){
    }

    checkIfDeviceExistsinCloud(btAddress){
    }

    checkAndAddDeviceToInstalledDevices(){
        this.getDevicesFromCloudAndAdd()
    }
 

    loadProfilesData(){
        if(this.networkParams.useCertAuth){

        }else {
            if(this.uiParams.userLoggedIn){

            }
        }
    }

    pushProfilesData(){
        if(this.networkParams.useCertAuth){

        }else {
            if(this.uiParams.userLoggedIn){
                
            }
        }
    }

    syncProfiles(){
        this.getProfilesAndAddIfNeeded()
    }
    getProfilesAndAddIfNeeded(){
        if(this.networkParams.useCertAuth){
             let path =  this.networkParams.certProfilesPath;
            this.getDataAndAddProfileIfneededWithCert(path);
        }else {
            if(this.uiParams.userLoggedIn){
            let url = this.networkParams.profilesUrl;
            this.getDataAndAddProfileIfneeded(url);
            }
        }
    }
    getLastSyncedTime(){
        return this.uiParams.lastSynced;
    }
    isUserLoggedIn(){
        return this.uiParams.userLoggedIn;
    }
    handleResponseError(err){
        if(this.uiParams.subMenuComponent != undefined)
            this.uiParams.subMenuComponent.onErrorMessage(err.status)
    }
    handleIResponseError(err){
        if(this.uiParams.subMenuComponent != undefined)
            this.uiParams.subMenuComponent.onErrorMessage(err.status)  
    }

    setAutoSync(val){
        this.uiParams.autoSync = val;
    }
    getAutoSync(){
        return this.uiParams.autoSync;
    }

    setSubMenuComponent(component){
        this.uiParams.subMenuComponent = component;
    }
    syncDevicesFromCloud(uname, pwd,component){
        if(uname.length > 0)
            this.networkParams.username = uname;
        if(pwd.length > 0)
            this.networkParams.password = pwd;
        
        this.uiParams.subMenuComponent = component;
        this.getDevicesFromCloud();
    }
    syncDataNow(local){
        if(local){
            this.putDevicesToCloud(false);
        }
        else{
            this.getDevicesFromCloud();
        }
    }
     getDataAndAddProfileIfneededWithCert(httpPath){
        let httpOptions = this.makeCertHeaders();
        httpOptions.path = httpPath;
        httpOptions.method = 'GET';
        var req = https.request(httpOptions, function(res) {
            res.on('data', function(data) {
                this.handleGetDataAndAddDeviceWithCert(data);
            });
        });
        req.end();
        req.on('error', function(e) {
                this.handleResponseError(e)
        });
    }

    getDataAndAddProfileIfneeded(getUrl){
        let getData =  this.http.get(getUrl, this.makeHeaders()) 
            .map(res => {
                if(res.status < HTTPCODES.SUCCESS_START || res.status > HTTPCODES.SUCCESS_END) {
                    return res.status;
                } 
                else {
                    return res.json();
                }
            })
            .subscribe(
                (data) => {
                    this.handleGetDataAndAddProfile(data);
                }, 
                (err) => {
                    this.handleResponseError(err)
                }
            ); 
    }

    
    handleGetDataAndAddProfileWithCert(data){
        let strFormat =  JSON.stringify(data);
        let profiles = data.profiles;
        if(profiles != undefined ){
            this.uiParams.userLoggedIn = true;
            this.uiParams.lastSynced = data._updated_at.split('+')[0];
            let localDate = JSON.parse(this.readFromLocalStorage(this.profilesKey))._updated_at.split('+')[0];
            let syncdate1 = new Date(localDate)
            let syncdate2 = new Date(this.uiParams.lastSynced)
            if(syncdate1 > syncdate2){
                this.updateProfilesToCloud();
            }else if (syncdate1 < syncdate2){
                this.saveToLocalStorage(this.profilesKey,strFormat);
            }else {
            }
        }
    }

    handleGetDataAndAddProfile(data){
        let strFormat =  JSON.stringify(data);
        let profiles = data.profiles;
        if(profiles != undefined ){
            this.uiParams.userLoggedIn = true;
            this.uiParams.lastSynced = data._updated_at.split('+')[0];
            let localDate = JSON.parse(this.readFromLocalStorage(this.profilesKey))._updated_at.split('+')[0];
            let syncdate1 = new Date(localDate)
            let syncdate2 = new Date(this.uiParams.lastSynced)
            if(syncdate1 > syncdate2){
                this.updateProfilesToCloud();
            }else if (syncdate1 < syncdate2){
                 this.saveToLocalStorage(this.profilesKey,strFormat);
            }else {
            }
        }
    }

    updateProfilesToCloud(){
        if(this.networkParams.useCertAuth){
            this.uiParams.devicesObj.ProfilesObj = {
                'profiles':this.uiParams.devicesObj.ProfilesArray
            }
            let bodyString = JSON.stringify(this.uiParams.devicesObj.ProfilesObj);
            let path = this.networkParams.certProfilesPath;
            this.putDataWithCert(this.networkParams.certProfilesPath,bodyString)
        }else {
            if(this.uiParams.userLoggedIn){
                this.uiParams.devicesObj.ProfilesObj = {
                    'profiles':this.uiParams.devicesObj.ProfilesArray
                }
                let bodyString = JSON.stringify(this.uiParams.devicesObj.ProfilesObj);
                let url = this.networkParams.profilesUrl;
                this.putData(url,bodyString);
            }
        }
    }
    makeHeaders(){
        let headers      = new Headers({ 'Content-Type': 'application/json',
                'Authorization': 'Basic ' + new Buffer(this.networkParams.username + ':' + this.networkParams.password).toString('base64')
            }); 
            
        let options       = new RequestOptions({ headers: headers });
        return options;
    }

    makeCertHeaders(){
        let options = {
            hostname: this.networkParams.certDetectorHostName,
            port: this.networkParams.detectorPort,
            key : this.networkParams.keyData,
            cert: this.networkParams.certData,
            method:'',
            path:'',
        }
        return options;
    }
    
    static getDataService(){
       return DataService.dataService;
    }
    getIDataWithCert(httpPath){
        let httpOptions = this.makeCertHeaders();
        httpOptions.path = httpPath;
        httpOptions.method = 'GET';
        var req = https.request(httpOptions, function(res) {
            res.on('data', function(data) {
                DataService.getDataService().handleGetIResponseData(data);
            });
            res.on('error',function(data){
                DataService.getDataService().handleGetIResponseData(data);
            });
            res.on('finish',function(data){
                DataService.getDataService().handleGetIResponseData(data);
            });
            res.on('end',function(data){
                DataService.getDataService().handleGetIResponseData(data);
            });
        });
        req.end();
        req.on('error', function(e) {
            DataService.getDataService().handleIResponseError(e)
        });
        req.on('finish',function(e){
            DataService.getDataService().handleIResponseError(e);
        });
    }


    getDataWithCert(httpPath){
        let httpOptions = this.makeCertHeaders();
        httpOptions.path = httpPath;
        httpOptions.method = 'GET';
        var req = https.request(httpOptions, function(res) {
            res.on('data', function(data) {
                DataService.getDataService().handleGetResponseData(data);
            });
            res.on('error',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
            res.on('finish',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
             res.on('end',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
            res.emit('data', function(data) {
                DataService.getDataService().handleGetResponseData(data);
            });
            res.emit('error',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
            res.emit('finish',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
             res.emit('end',function(data){
                DataService.getDataService().handleGetResponseData(data);
            });
        });
        req.end();
        req.on('error', function(e) {
            DataService.getDataService().handleResponseError(e)
        });
        req.on('finish',function(e){
            DataService.getDataService().handleResponseError(e);
        });
        req.on('end',function(e){
            DataService.getDataService().handleResponseError(e);
        });
        req.emit('error', function(e) {
            DataService.getDataService().handleResponseError(e)
        });
        req.emit('finish',function(e){
            DataService.getDataService().handleResponseError(e);
        });
        req.emit('end',function(e){
            DataService.getDataService().handleResponseError(e);
        });
    }

    putDataWithCert(httpPath,bodyData){
        let httpOptions = this.makeCertHeaders();
        httpOptions.path = httpPath;
        httpOptions.method = 'PUT';
        var req = https.request(httpOptions, function(res) {
            res.on('data', function(data) {
                DataService.getDataService().handlePutResponseData(data);
            });
            res.on('error',function(data){
                DataService.getDataService().handlePutResponseData(data);
            });
            res.on('finish',function(data){
                DataService.getDataService().handlePutResponseData(data);
            });
             res.on('end',function(data){
                DataService.getDataService().handlePutResponseData(data);
            });
        });
        req.end(bodyData);
        req.on('error', function(e) {
            DataService.getDataService().handleResponseError(e)
        });
        req.on('finish', function(e) {
            DataService.getDataService().handleResponseError(e)
        });
    }


    getIData(getUrl){
        let getData =  this.http.get(getUrl, this.makeHeaders()) 
            .map(res => {
                if(res.status < HTTPCODES.SUCCESS_START || res.status > HTTPCODES.SUCCESS_END) {
                    return res.status;
                } 
                else {
                    return res.json();
                }
            })
            .subscribe(
                (data) => {
                    this.handleGetIResponseData(data);
                }, 
                (err) => {
                    this.handleIResponseError(err)
                }
            ); 
    }


    getData(getUrl){
        let getData =  this.http.get(getUrl, this.makeHeaders()) 
            .map(res => {
                if(res.status < HTTPCODES.SUCCESS_START || res.status > HTTPCODES.SUCCESS_END) {
                    return res.status;
                } 
                else {
                    return res.json();
                }
            })
            .subscribe(
                (data) => {
                    this.handleGetResponseData(data);
                }, 
                (err) => {
                    this.handleResponseError(err)
                }
            ); 
    }

    putData(putUrl,body){
        let putData = this.http.put(putUrl,body, this.makeHeaders()) 
            .map(res => {
                if(res.status < HTTPCODES.SUCCESS_START || res.status > HTTPCODES.SUCCESS_END) {
                    return res.status;
                } 
                else {
                    return res.json();
                }
            })
            .subscribe(
                (data) => {
                    this.handlePutResponseData(data);
                }, 
                (err) => {
                    this.handleResponseError(err)
                }
            ); 
    }


    getIDevicesFromCloud() {
            if(this.networkParams.useCertAuth){
                let path =  this.networkParams.certDevicesPath;
                this.getIDataWithCert(path);
            }else{
                let url = this.networkParams.devicesUrl;
                this.getIData(url);
            }
        }

    getDevicesFromCloud() {
        if(this.networkParams.useCertAuth){
            let path =  this.networkParams.certDevicesPath;
            this.getDataWithCert(path);
        }else{
            let url = this.networkParams.devicesUrl;
            this.getData(url);
        }
    }
    getDevicesFromCloudAndAdd() {
        if(this.networkParams.useCertAuth){
             let path =  this.networkParams.certDevicesPath;
            this.getDataAndAddDeviceIfneededWithCert(path);
        }else {
            if(this.uiParams.userLoggedIn){
            let url = this.networkParams.devicesUrl;
            this.getDataAndAddDeviceIfneeded(url);
            }
        }
    }

    getDataAndAddDeviceIfneededWithCert(httpPath){
        let httpOptions = this.makeCertHeaders();
        httpOptions.path = httpPath;
        httpOptions.method = 'GET';
        var req = https.request(httpOptions, function(res) {
            res.on('data', function(data) {
                this.handleGetDataAndAddDeviceWithCert(data);
            });
        });
        req.end();
        req.on('error', function(e) {
                this.handleResponseError(e)
        });
    }

    getDataAndAddDeviceIfneeded(getUrl){
        let getData =  this.http.get(getUrl, this.makeHeaders()) 
            .map(res => {
                if(res.status < HTTPCODES.SUCCESS_START || res.status > HTTPCODES.SUCCESS_END) {
                    return res.status;
                } 
                else {
                    return res.json();
                }
            })
            .subscribe(
                (data) => {
                    this.handleGetDataAndAddDevice(data);
                }, 
                (err) => {
                    this.handleResponseError(err)
                }
            ); 
    }

    
    handleGetDataAndAddDeviceWithCert(data){
        let strFormat =  JSON.stringify(data);
        let Detectors = data.detectors;
        if(Detectors != undefined ){
            this.uiParams.userLoggedIn = true;
            this.uiParams.lastSynced = data._updated_at.split('+')[0];
            let localDate = this.getUTCDateFormat();
            let syncdate1 = new Date(localDate)
            let syncdate2 = new Date(this.uiParams.lastSynced)
            if(syncdate1 > syncdate2){
            }else if (syncdate1 < syncdate2){
            }else {
            }
            this.setDevices(Detectors,true);
            if(this.uiParams.devicesObj.DeviceData != undefined){
                let isExists = false;
                for(let  i= 0; i < Detectors.length; i++ ){
                    if(Detectors[i].btAddress == this.uiParams.devicesObj.DeviceData.btAddress){
                        isExists =  true;
                    }
                }
                if(isExists == false){
                    this.addDevice(this.uiParams.devicesObj.DeviceData,true);
                    this.updateInstalledDevicesToCloud()
                }
            }
            if(this.uiParams.subMenuComponent != undefined)
                this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
        }
    }

    handleGetDataAndAddDevice(data){
        let strFormat =  JSON.stringify(data);
        let Detectors = data.detectors;
        if(Detectors != undefined ){
            this.uiParams.userLoggedIn = true;
            this.uiParams.lastSynced = data._updated_at.split('+')[0];
            let localDate = this.getUTCDateFormat();
            let syncdate1 = new Date(localDate)
            let syncdate2 = new Date(this.uiParams.lastSynced)
            if(syncdate1 > syncdate2){
            }else if (syncdate1 < syncdate2){
            }else {
            }
            this.setDevices(Detectors,true);
            if(this.uiParams.devicesObj.DeviceData != undefined){
                let isExists = false;
                for(let  i= 0; i < Detectors.length; i++ ){
                    if(Detectors[i].btAddress == this.uiParams.devicesObj.DeviceData.btAddress){
                        isExists =  true;
                    }
                }
                if(isExists == false){
                    this.addDevice(this.uiParams.devicesObj.DeviceData,true);
                    this.updateInstalledDevicesToCloud()
                }
            }
            if(this.uiParams.subMenuComponent != undefined)
                this.uiParams.subMenuComponent.onSucessfullSync(this.uiParams.lastSynced);
        }
    }
    updateInstalledDevicesToCloud(){
        if(this.networkParams.useCertAuth){
            this.uiParams.devicesObj.DetectorsObj = {
                'detectors':this.uiParams.devicesObj.IDevicesArray
            }
            let bodyString = JSON.stringify(this.uiParams.devicesObj.DetectorsObj);
            let path = this.networkParams.certDevicesPath;
            this.putDataWithCert(this.networkParams.certDevicesPath,bodyString)
        }else {
            if(this.uiParams.userLoggedIn){
                this.uiParams.devicesObj.DetectorsObj = {
                    'detectors':this.uiParams.devicesObj.IDevicesArray
                }
                let bodyString = JSON.stringify(this.uiParams.devicesObj.DetectorsObj);
                let url = this.networkParams.devicesUrl;
                this.putData(url,bodyString);
            }
        }
    }
    putDevicesToCloud(installed){
        if(this.networkParams.useCertAuth){
            for(let i = 0; i < this.uiParams.devicesObj.IDevicesArray.length; i++){
                    if(this.uiParams.devicesObj.DeviceData.btAddress == this.uiParams.devicesObj.IDevicesArray[i].btAddress){
                        this.uiParams.devicesObj.IDevicesArray[i] = this.uiParams.devicesObj.DeviceData;
                        break;
                    }
            }
            this.uiParams.devicesObj.DetectorsObj = {
                    'detectors':this.uiParams.devicesObj.IDevicesArray
                }
                let bodyString = JSON.stringify(this.uiParams.devicesObj.DetectorsObj);
                let path = this.networkParams.certDevicesPath;
                this.putData(path,bodyString);
        }else{
            if(this.uiParams.userLoggedIn){
                this.logger.log("BEFORE LENGTH " + this.uiParams.devicesObj.IDevicesArray.length);
                for(let i = 0; i < this.uiParams.devicesObj.IDevicesArray.length; i++){
                    if(this.uiParams.devicesObj.DeviceData.btAddress == this.uiParams.devicesObj.IDevicesArray[i].btAddress){
                        this.logger.log("BEFORE CHANGE" + JSON.stringify(this.uiParams.devicesObj.IDevicesArray))
                        this.uiParams.devicesObj.IDevicesArray[i] = this.uiParams.devicesObj.DeviceData;
                        this.logger.log("BEFORE CHANGE" + JSON.stringify(this.uiParams.devicesObj.IDevicesArray))
                        break;
                    }
                }
                this.logger.log("AFTER LENGTH " + this.uiParams.devicesObj.IDevicesArray.length);
                this.uiParams.devicesObj.DetectorsObj = {
                    'detectors':this.uiParams.devicesObj.IDevicesArray
                }
                let bodyString = JSON.stringify(this.uiParams.devicesObj.DetectorsObj);
                let url = this.networkParams.devicesUrl;
                this.putData(url,bodyString);
            }
        }
    }


    setBLEdataOnDeviceData(attrType,attrValue){
        switch(attrType) {
            case SCCP_ATTRIBUTES.FIRMWARE_VERSION                                        :
            break;
            case SCCP_ATTRIBUTES.BT_DEVICE_NAME                                          :
            break;
            case SCCP_ATTRIBUTES.ARTICLE_NUMBER                                          : 
            break;
            case SCCP_ATTRIBUTES.DEVICE_TYPE                                             : 
            break;
            case SCCP_ATTRIBUTES.POTENTIOMETER_MODE                                      : 
                this.uiParams.devicesObj.DeviceData.potentiometerMode = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD                                    : 
                this.uiParams.devicesObj.DeviceData.brightnessThreshold= attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN                                : 
                this.uiParams.devicesObj.DeviceData.brightnessThresholdMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX                                : 
                this.uiParams.devicesObj.DeviceData.brightnessThresholdMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        :
                this.uiParams.devicesObj.DeviceData.considerSlaveBrightnessEnable= attrValue;
            break; 
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE                           : 
                this.uiParams.devicesObj.DeviceData.constantLightControlEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     : 
                this.uiParams.devicesObj.DeviceData.constantLightBrightnessSetPoint= attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 : 
                this.uiParams.devicesObj.DeviceData.constantLightBrightnessSetPointMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 : 
                this.uiParams.devicesObj.DeviceData.constantLightBrightnessSetPointMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE : 
                this.uiParams.devicesObj.DeviceData.constantLightControlConsiderSlaveBrightnessEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE                                 : 
                this.uiParams.devicesObj.DeviceData.shortTimePulseEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY                                        :
                this.uiParams.devicesObj.DeviceData.switchOffDelay= attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN                                    : 
                this.uiParams.devicesObj.DeviceData.switchOffDelayMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX                                    : 
                this.uiParams.devicesObj.DeviceData.switchOffDelayMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.OPERATION_MODE                                          : 
                this.uiParams.devicesObj.DeviceData.operationMode= attrValue;
            break;
            case SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE                                       : 
                this.uiParams.devicesObj.DeviceData.slaveModeEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE                              : 
                this.uiParams.devicesObj.DeviceData.outdoorApplicationEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY0                                        : 
                this.uiParams.devicesObj.DeviceData.pirSensitivity0= attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY1                                        : 
                this.uiParams.devicesObj.DeviceData.pirSensitivity1= attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY2                                        : 
                this.uiParams.devicesObj.DeviceData.pirSensitivity2= attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY3                                        : 
                this.uiParams.devicesObj.DeviceData.pirSensitivity3= attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE                            : 
                this.uiParams.devicesObj.DeviceData.brightnessCorrectionEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE                             : 
                this.uiParams.devicesObj.DeviceData.brightnessCorrectionValue= attrValue;
            break;
            case SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         : 
                this.uiParams.devicesObj.DeviceData.DynamicSwitchOffDelayEnable = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC                                       : 
                this.uiParams.devicesObj.DeviceData.ch1CircuitLogic= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION                               : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOnDuration= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN                           : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOnDurationMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MAX                           : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOnDurationMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION                              : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOffDuration= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN                          : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOffDurationMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MAX                          : 
                this.uiParams.devicesObj.DeviceData.ch1PermanentOffDurationMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_ENABLE                                          : 
                this.uiParams.devicesObj.DeviceData.softOnEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION                                        :
                this.uiParams.devicesObj.DeviceData.softOnDuration= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN                                    :
                this.uiParams.devicesObj.DeviceData.softOnDurationMin= attrValue;
            break; 
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION_MAX                                    : 
                this.uiParams.devicesObj.DeviceData.softOnDurationMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_ENABLE                                         : 
                this.uiParams.devicesObj.DeviceData.softOffEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION                                       : 
                this.uiParams.devicesObj.DeviceData.softOffDuration= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN                                   : 
                this.uiParams.devicesObj.DeviceData.softOffDurationMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MAX                                   : 
                this.uiParams.devicesObj.DeviceData.softOffDurationMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.PHASE_CUT_MODE                                          : 
                this.uiParams.devicesObj.DeviceData.phaseCutMode= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE                              : 
                this.uiParams.devicesObj.DeviceData.ch1MemoryFunctionEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE                           : 
                this.uiParams.devicesObj.DeviceData.delimitLightingLevelEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE                                    : 
                this.uiParams.devicesObj.DeviceData.ch1MinLevelEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MIN_LEVEL                                           : 
                this.uiParams.devicesObj.DeviceData.ch1MinLevel= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE                                    : 
                this.uiParams.devicesObj.DeviceData.ch1MaxLevelEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MAX_LEVEL                                           : 
                this.uiParams.devicesObj.DeviceData.ch1MaxLevel= attrValue;
            break;
            case SCCP_ATTRIBUTES.LEVEL_MIN                                               : 
                this.uiParams.devicesObj.DeviceData.levelMin =  attrValue;
            break;
            case SCCP_ATTRIBUTES.LEVEL_MAX                                               :
                this.uiParams.devicesObj.DeviceData.levelMax = attrValue;
            break;
            case SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL                                     :
                this.uiParams.devicesObj.DeviceData.daliPowerOnLevel = attrValue;
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE                                       : 
                this.uiParams.devicesObj.DeviceData.colorTemperature = attrValue;
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN                                   :
                this.uiParams.devicesObj.DeviceData.colorTemperatureMin = attrValue;
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX                                   : 
                this.uiParams.devicesObj.DeviceData.colorTemperatureMax = attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_ENABLE                                          : 
                this.uiParams.devicesObj.DeviceData.burnInEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_MODE                                            : 
                this.uiParams.devicesObj.DeviceData.burnInMode= attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION                                        : 
                this.uiParams.devicesObj.DeviceData.burnInDuration= attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN                                    : 
                this.uiParams.devicesObj.DeviceData.burnInDuration_min= attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION_MAX                                    : 
                this.uiParams.devicesObj.DeviceData.burnInDuration_max= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE                                   : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessMode= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL                                  : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessLevel= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessAmbientBrightnessThreshold= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessAmbientBrightnessThresholdMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessAmbientBrightnessThresholdMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME                             : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessStartTime= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME                               : 
                this.uiParams.devicesObj.DeviceData.basicBrightnessEndTime= attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  :
                this.uiParams.devicesObj.DeviceData.basicBrightnessStartTimeAstroFunctionEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE                             : 
                this.uiParams.devicesObj.DeviceData.nightLightFunctionEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME                                  : 
                this.uiParams.devicesObj.DeviceData.nightLightStartTime= attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME                                    : 
                this.uiParams.devicesObj.DeviceData.nightLightEndTime= attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL                                       : 
                this.uiParams.devicesObj.DeviceData.nightLightLevel= attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE                        : 
                this.uiParams.devicesObj.DeviceData.stepwiseSwitchOffDelayEnable= attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY                               : 
                this.uiParams.devicesObj.DeviceData.stepwiseSwitchOffDelay= attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN                           : 
                this.uiParams.devicesObj.DeviceData.stepwiseSwitchOffDelayMin= attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MAX                           : 
                this.uiParams.devicesObj.DeviceData.stepwiseSwitchOffDelayMax= attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL                               : 
                this.uiParams.devicesObj.DeviceData.stepwiseSwitchOffLevel= attrValue;
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE                              :
                this.uiParams.devicesObj.DeviceData.presenceSimulationEnable = attrValue
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME                          :
                this.uiParams.devicesObj.DeviceData.presenceSimulationStartTime = attrValue
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME                            :
                this.uiParams.devicesObj.DeviceData.presenceSimulationEndTime = attrValue 
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               :
            break;
            case SCCP_ATTRIBUTES.PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE_ID                :
                this.uiParams.devicesObj.DeviceData.permanentLightByPushButtonEnable = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC                                       :
                this.uiParams.devicesObj.DeviceData.ch2CircuitLogic = attrValue
            break;
            case SCCP_ATTRIBUTES.CH2_MODE                                                :
                this.uiParams.devicesObj.DeviceData.ch2Mode = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE                                           :
                this.uiParams.devicesObj.DeviceData.hvacDynamicalControlEnable = attrValue;
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY                                    :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOnDelay = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN                                :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOnDelayMin = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MAX                                :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOnDelayMax = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY                                   :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOffDelay = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN                               :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOffDelayMin = attrValue 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MAX                               :
                this.uiParams.devicesObj.DeviceData.hvacSwitchOffDelayMax = attrValue 
            break;
            case SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     :
                this.uiParams.devicesObj.DeviceData.testModeDeactivateOutputsEnable = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD                           :
                this.uiParams.devicesObj.DeviceData.energyMonitorConnectedLoad = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN                       :
                this.uiParams.devicesObj.DeviceData.energyMonitorConnectedLoadMin = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX                       :
                this.uiParams.devicesObj.DeviceData.energyMonitorConnectedLoadMax = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION                        :
                this.uiParams.devicesObj.DeviceData.energyMonitorLightingDuration = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN                    :
                this.uiParams.devicesObj.DeviceData.energyMonitorLightingDurationMin = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX                    :
                this.uiParams.devicesObj.DeviceData.energyMonitorLightingDurationMax = attrValue 
            break;
            case SCCP_ATTRIBUTES.CONTACT                                                 : 
                this.uiParams.devicesObj.DeviceData.contact = attrValue;
            break;
            case SCCP_ATTRIBUTES.BUILDING                                                : 
                this.uiParams.devicesObj.DeviceData.building = attrValue;
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    :
                this.uiParams.devicesObj.DeviceData.enableUserSetBrightnessThreshold = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY                        :
                this.uiParams.devicesObj.DeviceData.enableUserSetSwitchOffDelay = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR                              :
                this.uiParams.devicesObj.DeviceData.enableUserEnergyMonitor = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS                            :
                this.uiParams.devicesObj.DeviceData.enableUserBasicBrightness = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION                        :
                this.uiParams.devicesObj.DeviceData.enableUserNightLightFunction = attrValue 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            :
                this.uiParams.devicesObj.DeviceData.enableUserColorTemperatureControlEnable = attrValue 
            break;
            case SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS                                      : 
                this.uiParams.devicesObj.DeviceData.currentBrightness= attrValue;
            break;
            case SCCP_ATTRIBUTES.IDENTIFYING_DEVICE                                      : 
                this.uiParams.devicesObj.DeviceData.identifyingDevice = attrValue
            break;
            case SCCP_ATTRIBUTES.MOVEMENT                                                :
                this.uiParams.devicesObj.DeviceData.movement = attrValue 
            break;
            case SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD                                    :
                this.uiParams.devicesObj.DeviceData.ch1IdentifyingLoad = attrValue 
            break;
            case SCCP_ATTRIBUTES.CH1_ON_OFF_STATE                                        :
                this.uiParams.devicesObj.DeviceData.ch1OnOffState = attrValue 
            break;
            case SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL                                       : 
                this.uiParams.devicesObj.DeviceData.ch1CurrentLevel = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD                                    :
                this.uiParams.devicesObj.DeviceData.ch2IdentifyingLoad = attrValue 
            break;
            case SCCP_ATTRIBUTES.CH2_ON_OFF_STATE                                        :
                this.uiParams.devicesObj.DeviceData.ch2OnOffState = attrValue 
            break;
            case SCCP_ATTRIBUTES.CH2_CURRENT_LEVEL                                       :
                this.uiParams.devicesObj.DeviceData.ch2CurrentLevel = attrValue 
            break;
            case SCCP_ATTRIBUTES.TEST_MODE_ENABLE                                        :
                this.uiParams.devicesObj.DeviceData.testModeEnable = attrValue 
            break;
            case SCCP_ATTRIBUTES.ACCESS_LEVEL                                            :
                this.uiParams.devicesObj.DeviceData.accessLevel = attrValue  
            break;
            default:
            break;
        }
    }
    getHexofMe(decNumber){
    let hexString = decNumber.toString(16);
    let yourNumber = parseInt(hexString, 16);
    return yourNumber;
  }
}