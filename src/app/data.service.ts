import {Injectable,EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {LoggerService} from './logger.service';


export class SubMenuItem {
  constructor(public name: string, public navigation: string) { }
}

export class WriteData{
    constructor(public attrType: number, public attrValue: number[]) { }
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
    static TEST_MODE_ACTIVE                                        = 0x10B0;
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
      public devices:Array<any>;
      public profileSwitch = true;
      public subMenuVal= 'none';
      public profile = 'none';
      public mainTitle = 'BJ DETECTOR';
      public otherparamTitle = '';
      arrowStateChange: EventEmitter<any> = new EventEmitter();
      public otherparam = '';
      public iparam = '';
      showOnlyCancel =  false;
      dialogTitle = '';
      dialogText = '';
      showModal = false;
      showCDI = -1;
      eDevParamsChanged = 0;

}

export class DeviceParams {
        constructor(){}
        public deviceName = '';
        public deviceType= '';
        public deviceAddress = '';
        public articleNumber= '';
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

declare var setDataServiceCallBack;
declare var configureAttr;
declare var writeAttr;
declare var readAttr;

@Injectable()
export class DataService {

    scanneddata:any;
    uiParams:UIParams   =  new UIParams();
    deviceParams:DeviceParams   =  new DeviceParams();
    deviceData:any;
    private selectedDevice:any;
    private iSelectedDevice:any;
    setDataServiceCallBackObj:any;
    writeAttrObj:any;
    readAttrObj:any;
    configureAttrObj:any;
    iDeviceData:any;
    public DeviceBuild = 1;
    currentBrightness = '498';
    activeComponent:any;
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
    constructor(private http:Http,private logger: LoggerService) {
        if(this.DeviceBuild == 1)
            this.setDataServiceCallBackObj = new setDataServiceCallBack(this);
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
    }

    setScannedData(scanned){
        this.scanneddata = scanned;
    }

    

    getScannedData() {
        return this.scanneddata;
    }
    setMainTitle(title) {
        this.uiParams.mainTitle = title;
    }
    getMainTitle() {
        return this.uiParams.mainTitle;
    }
    public initDevices() {
        this.loadDevices().then((devs) => {
             this.uiParams.devices = devs;
        });
    }

    getCurrentBrightness() {
        return this.currentBrightness+ 'lx';
    }
   
    setCurrentBrightness(brightness) {
        this.currentBrightness = brightness;
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
    getDevice(i) {
        return this.uiParams.devices[i];
    }
    setDevice(device) {
        this.uiParams.devices.concat(device);
    }
    setDevices(devices) {
        this.clearDevices();
        this.uiParams.devices = devices;
    }
    clearDevices() {
        this.uiParams.devices.splice(0,this.uiParams.devices.length);
    }
    getDevices(){
        if(this.uiParams.devices && (this.uiParams.devices.length > 0)) {
            return this.uiParams.devices;
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
         this.setMainTitle(itemTitle);
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
            this.iSelectedDevice = device;
        } else {
            this.selectedDevice =  device;
        }
    }
    public getSelectedDevice(installed) {
        if(installed) {
            return this.iSelectedDevice;
        }else {
            return this.selectedDevice;
        }
    }
    subscribeJsonLoad(component, callback) {
        return this.deviceParams.jsonLoadEmitter.subscribe(data => callback(component, data));
    }
    public initDeviceData(item,installed){
    this.loadDeviceData(item,installed).then((data) => {
            if(installed) {
                this.iDeviceData = data;
                this.iJsonLoadEmit();
            }else {
             this.deviceData = data;
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

    notifyActiveComponentWithBLEdata() {
        if(this.activeComponent != undefined) {
            this.activeComponent.onBLEdata();
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
                    this.logger.log("data remaining is " + this.readArray.length)
                }
                else {
                    this.readArray = [];
                }  
                if(this.readArray.length > 0){
                    this.readData(this.readArray);
                }else {
                    this.notifyActiveComponentWithBLEdata()
                }
            break;
            case 132:
                if(this.writeArray.length > this.writeCount){
                    this.writeArray = this.writeArray.slice(this.writeCount,this.writeArray.length);
                    this.sendData = this.sendData.slice(this.writeCount,this.sendData.length);
                }
                else {
                    this.writeArray = [];
                }  
                
                if(this.writeArray.length > 0){
                    this.sendChangedParams();
                }else {
                    this.notifyActiveComponentWithBLEdata()
                    this.setEDevParamsState(0);
                }
            break;
            default:
            break;
        }
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
            this.logger.log("data length is " + data.length);
            if(this.readArray.length == 0) {
                this.readArray = data;
                this.logger.log("readArray length is " + this.readArray.length);
            }
            if(this.readArray.length <= this.readCount) {
                this.readAttrObj =  new readAttr(this.readArray);
            }else {
                let partArray =  this.readArray.slice(0, this.readCount-1);
                this.logger.log("partArray length is " + partArray.length);
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
            return this.iDeviceData;
        }else {
            return this.deviceData;
        }
    }
    loadDeviceData(item,installed) {
        if(item.deviceType == 'relay1c') {
            return new Promise<Array<any>>(resolve => {
            this.http.get('assets/relay1c.json').subscribe(response => {
                    resolve(response.json());
                    
                });
            });
            
        }else if(item.deviceType == 'mosfet1c') {
            return new Promise<Array<any>>(resolve => {
            this.http.get('assets/mosfet1c.json').subscribe(response => {
                    resolve(response.json());
                });
            });
        }else if(item.deviceType == 'daliMaster1c') {
            return new Promise<Array<any>>(resolve => {
            this.http.get('assets/daliMaster1c.json').subscribe(response => {
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
            this.logger.log("write data is " + dataBytes);
            this.writeAttrObj =  new writeAttr(dataBytes);
        }
    }


    setBLEdataOnDeviceData(attrType,attrValue){
        this.logger.log("attrType is   " + attrType  + "   " + attrValue );
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
                this.deviceData.sensor_settings.potentio_meter_mode = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD                                    : 
                this.deviceData.sensor_settings.brightness_threshold = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN                                : 
                this.deviceData.sensor_settings.brightness_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX                                : 
                this.deviceData.sensor_settings.brightness_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        :
                this.deviceData.sensor_settings.consider_slave_brightness = attrValue;
            break; 
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE                           : 
                this.deviceData.sensor_settings.constant_light_regulation = attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     : 
                this.deviceData.sensor_settings.brightness_setpoint = attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 : 
                this.deviceData.sensor_settings.setpoint_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 : 
                this.deviceData.sensor_settings.setpoint_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE : 
                this.deviceData.sensor_settings.reference_brightness = attrValue;
            break;
            case SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE                                 : 
                this.deviceData.sensor_settings.short_time_pulse = attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY                                        :
                this.deviceData.sensor_settings.switch_off_delay = attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN                                    : 
                this.deviceData.sensor_settings.switch_off_delay_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX                                    : 
                this.deviceData.sensor_settings.switch_off_delay_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.OPERATION_MODE                                          : 
                this.deviceData.operating_mode = attrValue;
            break;
            case SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE                                       : 
                this.deviceData.commissioning.use_master_in_slave_mode = attrValue;
            break;
            case SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE                              : 
                this.deviceData.sensor_settings.additional_sensor_parameters.set_detection_range.outdoor_application = attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY0                                        : 
                this.deviceData.sensor_settings.additional_sensor_parameters.set_detection_range.q1 = attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY1                                        : 
                this.deviceData.sensor_settings.additional_sensor_parameters.set_detection_range.q2 = attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY2                                        : 
                this.deviceData.sensor_settings.additional_sensor_parameters.set_detection_range.q3 = attrValue;
            break;
            case SCCP_ATTRIBUTES.PIR_SENSITIVITY3                                        : 
                this.deviceData.sensor_settings.additional_sensor_parameters.set_detection_range.q4 = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE                            : 
                this.deviceData.sensor_settings.additional_sensor_parameters.brightness_correction.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE                             : 
                this.deviceData.sensor_settings.additional_sensor_parameters.brightness_correction.range = attrValue;
            break;
            case SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         : 
                this.deviceData.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay =attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC                                       : 
                this.deviceData.actuator1.circuit_logic = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION                               : 
                this.deviceData.actuator1.durable_on_off_switching.duration_on = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN                           : 
            this.deviceData.actuator1.durable_on_off_switching.duration_on_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MAX                           : 
            this.deviceData.actuator1.durable_on_off_switching.duration_on_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION                              : 
                this.deviceData.actuator1.durable_on_off_switching.duration_off = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN                          : 
                this.deviceData.actuator1.durable_on_off_switching.duration_off_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MAX                          : 
                this.deviceData.actuator1.durable_on_off_switching.duration_off_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_ENABLE                                          : 
                this.deviceData.actuator1.soft_switching.on.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION                                        :
                this.deviceData.actuator1.soft_switching.on.range = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN                                    :
                this.deviceData.actuator1.soft_switching.on.range_min = attrValue;
            break; 
            case SCCP_ATTRIBUTES.SOFT_ON_DURATION_MAX                                    : 
                this.deviceData.actuator1.soft_switching.on.range_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_ENABLE                                         : 
                this.deviceData.actuator1.soft_switching.off.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION                                       : 
                this.deviceData.actuator1.soft_switching.off.range = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN                                   : 
                this.deviceData.actuator1.soft_switching.off.range_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MAX                                   : 
                this.deviceData.actuator1.soft_switching.off.range_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.PHASE_CUT_MODE                                          : 
                this.deviceData.actuator1.soft_switching.load_phase_cut_dimmable_edge = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE                              : 
                this.deviceData.actuator1.misc_settings.switch_on_with_last_brightness = attrValue;
            break;
            case SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE                           : 
                this.deviceData.actuator1.misc_settings.limit_of_room_brightness = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE                                    : 
                this.deviceData.actuator1.misc_settings.load_output.minimum.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MIN_LEVEL                                           : 
                this.deviceData.actuator1.misc_settings.load_output.minimum.value = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE                                    : 
                this.deviceData.actuator1.misc_settings.load_output.maximum.on = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH1_MAX_LEVEL                                           : 
                this.deviceData.actuator1.misc_settings.load_output.maximum.output_value = attrValue;
            break;
            case SCCP_ATTRIBUTES.LEVEL_MIN                                               : 
            break;
            case SCCP_ATTRIBUTES.LEVEL_MAX                                               : 
            break;
            case SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL                                     : 
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE                                       : 
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN                                   : 
            break;
            case SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX                                   : 
            break;
            case SCCP_ATTRIBUTES.BURN_IN_ENABLE                                          : 
                this.deviceData.actuator1.fluorescent_lamps.burn_in_function = attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_MODE                                            : 
                this.deviceData.actuator1.fluorescent_lamps.burn_in_mode = attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION                                        : 
                this.deviceData.actuator1.fluorescent_lamps.burn_in_hours = attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN                                    : 
                this.deviceData.actuator1.fluorescent_lamps.burn_in_hours_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.BURN_IN_DURATION_MAX                                    : 
                 this.deviceData.actuator1.fluorescent_lamps.burn_in_hours_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE                                   : 
                this.deviceData.actuator1.basic_illumination.settings = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL                                  : 
                this.deviceData.actuator1.basic_illumination.basic_illumination_level = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           : 
                this.deviceData.actuator1.basic_illumination.ambient_brightness_threshold = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       : 
                this.deviceData.actuator1.basic_illumination.ambient_brightness_threshold_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       : 
                this.deviceData.actuator1.basic_illumination.ambient_brightness_threshold_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME                             : 
                this.deviceData.actuator1.basic_illumination.start_time = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME                               : 
                this.deviceData.actuator1.basic_illumination.end_time = attrValue;
            break;
            case SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  :
                this.deviceData.actuator1.basic_illumination.astro_function = attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE                             : 
                this.deviceData.actuator1.night_time_anti_glare_function.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME                                  : 
                this.deviceData.actuator1.night_time_anti_glare_function.start_time = attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME                                    : 
                this.deviceData.actuator1.night_time_anti_glare_function.end_time = attrValue;
            break;
            case SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL                                       : 
                this.deviceData.actuator1.night_time_anti_glare_function.illumination_level = attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE                        : 
                this.deviceData.actuator1.time_shifted_switch_off.enable = attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY                               : 
                this.deviceData.actuator1.time_shifted_switch_off.switch_off_time = attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN                           : 
                this.deviceData.actuator1.time_shifted_switch_off.switch_off_time_min = attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MAX                           : 
                this.deviceData.actuator1.time_shifted_switch_off.switch_off_time_max = attrValue;
            break;
            case SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL                               : 
                this.deviceData.actuator1.time_shifted_switch_off.intermediate_stage_brightness = attrValue;
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE                              : 
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME                          : 
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME                            : 
            break;
            case SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               : 
            break;
            case SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC                                       : 
            break;
            case SCCP_ATTRIBUTES.CH2_MODE                                                : 
            break;
            case SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE                           : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY                                    : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN                                : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MAX                                : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY                                   : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN                               : 
            break;
            case SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MAX                               : 
            break;
            case SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD                           : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN                       : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX                       : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION                        : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN                    : 
            break;
            case SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX                    : 
            break;
            case SCCP_ATTRIBUTES.CONTACT                                                 : 
            break;
            case SCCP_ATTRIBUTES.BUILDING                                                : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY                        : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR                              : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS                            : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION                        : 
            break;
            case SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            : 
            break;
            case SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS                                      : 
            break;
            case SCCP_ATTRIBUTES.IDENTIFYING_DEVICE                                      : 
            break;
            case SCCP_ATTRIBUTES.MOVEMENT                                                : 
            break;
            case SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD                                    : 
            break;
            case SCCP_ATTRIBUTES.CH1_ON_OFF_STATE                                        : 
            break;
            case SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL                                       : 
                this.deviceData.actuator1.ch1_current_level = attrValue;
            break;
            case SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD                                    : 
            break;
            case SCCP_ATTRIBUTES.CH2_ON_OFF_STATE                                        : 
            break;
            case SCCP_ATTRIBUTES.CH2_CURRENT_LEVEL                                       : 
            break;
            case SCCP_ATTRIBUTES.TEST_MODE_ACTIVE                                        : 
            break;
            case SCCP_ATTRIBUTES.ACCESS_LEVEL                                            : 
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