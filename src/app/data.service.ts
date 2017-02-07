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
      arrowStateChange: EventEmitter<any> = new EventEmitter();
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
        public devicetype= -1;
        jsonLoadEmitter: EventEmitter<any> = new EventEmitter();
}


@Injectable()
export class DataService {

    uiParams:UIParams   =  new UIParams();
    deviceParams:DeviceParams   =  new DeviceParams();
    deviceData:any;

    constructor(private http:Http,private logger: LoggerService) {
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

    public getDeviceData(item){
        this.loadDeviceData(item).then((data) => {
             this.deviceData = data;
             this.jsonLoadEmit();
        });
    }

    loadDevices() {
        return new Promise<Array<any>>(resolve => {
        this.http.get('../assets/detectorslist.json').subscribe(response => {
                resolve(response.json().detectors);
            });
        });
    }

    loadDeviceData(item) {
        if(item.deviceType == 'relay1c') {
            this.deviceParams.devicetype = 2;
            return new Promise<Array<any>>(resolve => {
            this.http.get('../assets/relay1c.json').subscribe(response => {
                    resolve(response.json());
                    
                });
            });
            
        }else if(item.deviceType == 'mosfet1c') {
            this.deviceParams.devicetype = 1;
            return new Promise<Array<any>>(resolve => {
            this.http.get('../assets/mosfet1c.json').subscribe(response => {
                    resolve(response.json());
                });
            });
        }else if(item.deviceType == 'daliMaster1c') {
            this.deviceParams.devicetype = 0;
            return new Promise<Array<any>>(resolve => {
            this.http.get('../assets/daliMaster1c.json').subscribe(response => {
                    resolve(response.json());
                });
            });
        }
    }

    jsonLoadEmit() {
        this.deviceParams.jsonLoadEmitter.emit();
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
    subscribe(component, callback) {
        return this.uiParams.arrowStateChange.subscribe(data => callback(component, data));
    }
    setSubMenuVal(submenuval) {
        this.uiParams.subMenuVal =  submenuval;
    }
    getSubMenuVal() {
        return this.uiParams.subMenuVal;
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
}