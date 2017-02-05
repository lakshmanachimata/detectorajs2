import {Injectable,EventEmitter} from '@angular/core';
import {Http} from '@angular/http';
import {LoggerService} from './logger.service';


export class SubMenuItem {
  constructor(public name: string, public navigation: string) { }
}

@Injectable()
export class DataService {
      private showHeader = false;
      private showFooter = false;
      private arrowState = -1;
      private devices:Array<any>;
      private profileSwitch = true;
      private subMenuVal= 'none';
      private profile = 'none';
      private mainTitle = 'BJ DETECTOR';
      arrowStateChange: EventEmitter<any> = new EventEmitter();
    constructor(private http:Http,private logger: LoggerService) {

    }

    setMainTitle(title) {
        this.mainTitle = title;
    }
    getMainTitle() {
        return this.mainTitle;
    }
    public initDevices() {
        this.loadDevices().then((devs) => {
             this.devices = devs;
        });
    }

    loadDevices() {
        return new Promise<Array<any>>(resolve => {
        this.http.get('../assets/detectorslist.json').subscribe(response => {
                resolve(response.json().detectors);
            });
        });
    }

    getDevice(i) {
        return this.devices[i];
    }
    setDevice(device) {
        this.devices.concat(device);
    }
    setDevices(devices) {
        this.clearDevices();
        this.devices = devices;
    }
    clearDevices() {
        this.devices.splice(0,this.devices.length);
    }
    getDevices(){
        if(this.devices && (this.devices.length > 0)) {
            return this.devices;
        }
    }
    setMenuArrow(menuState) {
      this.arrowState =  menuState;
    }
    closeMenu() {
        this.arrowStateEmit();
    }
    getMenuArrow() {
      return this.arrowState;
    }
    setFooter(footerState) {
      this.showFooter =  footerState;
    }
    getFooter() {
      return this.showFooter;
    }

    setHeader(headerState) {
      this.showHeader =  headerState;
    }
    getHeader() {
      return this.showHeader;
    }
    setProfile(in_profile) {
      this.profile = in_profile;
    }
    getProfile(){
      return this.profile;
    }

    getProfileSwitch() {
        return this.profileSwitch;
    }
    setProfileSwitch(switchprofile) {
        this.profileSwitch = switchprofile;
    }
    arrowStateEmit() {
        this.arrowStateChange.emit(0);
    }
    subscribe(component, callback) {
        return this.arrowStateChange.subscribe(data => callback(component, data));
    }
    setSubMenuVal(submenuval) {
        this.subMenuVal =  submenuval;
    }
    getSubMenuVal() {
        return this.subMenuVal;
    }

    getSubMenuItems() {
        if(this.profile == 'user') {
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