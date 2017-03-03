import {Injectable,EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {LoggerService} from './logger.service';


export class SubMenuItem {
  constructor(public name: string, public navigation: string) { }
}

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

}

export class DeviceParams {
        constructor(){}
        public deviceName = '';
        public deviceType= '';
        public articleNumber= '';
        public contactName= '';
        public buildingName= '';
        public date= '';
        public fwupdate = false;
        public modelType= '';
        public firmwareVersion= '';
        jsonLoadEmitter: EventEmitter<any> = new EventEmitter();
        iJsonLoadEmitter: EventEmitter<any> = new EventEmitter();

}


    
@Injectable()
export class DataService {

    scanneddata:any;
    uiParams:UIParams   =  new UIParams();
    deviceParams:DeviceParams   =  new DeviceParams();
    deviceData:any;
    private selectedDevice:any;
    private iSelectedDevice:any;
    iDeviceData:any;
    currentBrightness = '498';
    constructor(private http:Http,private logger: LoggerService) {
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

}