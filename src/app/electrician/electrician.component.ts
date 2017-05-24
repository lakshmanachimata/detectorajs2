import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';

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

declare var connectDevice;
@Component({
  selector: 'electrician-root',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    detectors:Array<any>;
    scannedData:Array<any>;
    jsonLoadObserve: any;
    connectDeviceObj:any; 
    snap:RouterStateSnapshot;
    isDeviceConnected =  false;
    constructor(public logger: LoggerService,public data: DataService, private router:Router,private route: ActivatedRoute) {
    }
  configureDetector(item){
      this.data.setSelectedDevice(item,false);
      if(this.data.DeviceBuild == 1) {
        this.connectDeviceObj = new connectDevice(item.btAddress);
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
      this.scannedData = this.data.getScannedData();
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
    this.data.setMainTitle('Detectors');
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('electrician');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  setScannedData(){
    this.detectors= [];
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
        this.data.setDevices(this.detectors,false);
    }
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

  jsonOnLoad(component) {
    if(this.isDeviceConnected == true){
      component.data.setProfileSwitch(false);
      component.router.navigate(['econfigdetector'],{relativeTo: component.route});
    }
  }

  ngOnDestroy() {
    this.data.resetSendData();
  }
  onDeviceConnected(address){
    this.isDeviceConnected = true;
    this.data.initDeviceData(false);
  }
}
