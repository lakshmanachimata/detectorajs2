import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { i18nService } from '../i18n.service';
declare var connectDevice;

export class DetectorInfo {
        public hashCode;
        public btDeviceName;
        public modelNumber;
        public manufacturerName;
        public deviceType;
        public firmwareVersion;
        public softwareVersion;
        public btAddress;
        public rssi;
        public contactName;
        public buildingName;
        public createdDate;
        public updatedDate;
    }

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy {

    detectors:Array<any>;
    jsonLoadObserve: any;
    scannedData:Array<any>;
    connectDeviceObj:any;
    snap:RouterStateSnapshot;
    isDeviceConnected = false;
    constructor(public logger: LoggerService,public data: DataService, private router:Router,
    private route: ActivatedRoute,private zone:NgZone,private translater:i18nService) {
    }
  configureDetectorUser(item){
      this.data.setSelectedDevice(item,false);
      if(this.data.DeviceBuild == 1) {
        this.data.connectDevice(item.btAddress);
      }
      else {
        this.isDeviceConnected = true;
        this.data.initDeviceData(false);
      }
  }
  showPWDDialog(){
        this.data.setEOptionText(this.translater.translate('OK'));
        this.data.setEDialogInputHint(this.translater.translate('Enter password'));
        this.data.setDialogTitle(this.translater.translate('Enter password for detector'));
        this.data.setShowEModal(true);
  }
 setScannedData(){
    this.detectors= [];
    this.scannedData = this.data.getScannedData();
    if(this.scannedData != undefined) {
      for(let i =0; i < this.scannedData.length; i++)
      {
        let detectorInfo =  new DetectorInfo()
        detectorInfo.btDeviceName = this.scannedData[i].btDeviceName;
        detectorInfo.firmwareVersion = this.scannedData[i].firmwareRevision;
        detectorInfo.modelNumber = this.scannedData[i].modelNumber;
        detectorInfo.btAddress = this.scannedData[i].btAddress;
        detectorInfo.deviceType = this.scannedData[i].deviceType;
        detectorInfo.rssi = this.scannedData[i].rssi;
        detectorInfo.createdDate=this.data.getFormattedDate();
        detectorInfo.updatedDate = this.data.getUTCDateFormat();
        detectorInfo.contactName = this.scannedData[i].manufacturerName;
        this.detectors.push(detectorInfo);
      }
    }
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.data.setMainTitle(this.translater.translate('Detectors'));
         this.data.setEDevParamsState(0);
      });
  }

    getSignalRange(item){
    if(this.data.DeviceBuild == 1){
      let range = (parseInt(item.rssi) + 90) / 3.5;
      if(range != 0){
        return Math.round(range);
      }
      return -4;
    }
    else {
      return 4;
    }
  }

  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngAfterContentInit() { 
  }
  ngAfterContentChecked() { 
  }
  ngAfterViewInit() { 
  }
  ngAfterViewChecked() { 
    this.snap = this.router.routerState.snapshot;
  }
  ngOnInit () {
    this.data.setActiveComponent(this);
    this.jsonLoadObserve = this.data.subscribeJsonLoad(this, this.jsonOnLoad);
    if(this.data.DeviceBuild == 1){
      this.setScannedData();
      this.data.resetSendData();
    }
    else{
      this.detectors = this.data.getDevices(false);
    }
    if(this.detectors != undefined &&  this.detectors.length == 0){
      this.detectors = this.data.getDevices(false);
      this.data.DeviceBuild = 0;
    }
    this.data.setMainTitle(this.translater.translate('Detectors'));
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('user');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  jsonOnLoad(component) {
     if(component.isDeviceConnected == true){
      component.data.setProfileSwitch(false);
      component.router.navigate(['uconfigdetector'],{relativeTo: component.route});
     }
  }
  ngOnDestroy() {
    this.data.resetSendData();
  }

  onDeviceConnected(address){
     this.isDeviceConnected = true
     this.data.initDeviceData(false);
  }

}
