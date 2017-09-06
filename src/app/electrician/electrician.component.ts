import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService , SCCP_ATTRIBUTES,SCCP_COMMAND,SCCP_DATATYPES} from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { i18nService } from '../i18n.service';
export class DetectorInfo {
        public hashCode;
        public btDeviceName;
        public modelNumber;
        public manufacturerName;
        public deviceType;
        public firmwareVersion;
        public softwareVersion;
        public btAddress;
        public btIAddress;
        public rssi;
        public createdDate;
        public updatedDate;
        public identify;
    }


@Component({
  selector: 'electrician-root',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    detectors:Array<any>;
    scannedData:Array<any>;
    snap:RouterStateSnapshot;
    identifyingDevice:any;
    selectedDevice =  false;
    constructor(public logger: LoggerService,public data: DataService, private router:Router,
    private route: ActivatedRoute,private zone:NgZone,private translater:i18nService) {
      this.selectedDevice = false;
    }
  configureDetector(item){
      if(this.data.getAccessLevel() == 2){
        this.selectedDevice = true;
        this.jsonOnLoad(this)
      }else{
      this.selectedDevice = true;
      this.data.setSelectedDevice(item,false);
      if(this.data.DeviceBuild == 1) {
        if(this.data.getDeviceConnectionState() == false){
          if(this.data.isIPhone == 1)
            this.data.connectDevice(item.btIAddress);
          else
            this.data.connectDevice(item.btAddress); 
        }
        else 
          this.data.setAccessLevel();
      }
      else {
        this.data.initDeviceData(false);
      }
  }
  }

  retryConnetion(){
    this.configureDetector(this.data.getSelectedDevice(false))
  }

  showPWDDialog(){
        this.data.setEOptionText(this.translater.translate('OK'));
        this.data.setEDialogInputHint(this.translater.translate('Enter password'));
        this.data.setDialogTitle(this.translater.translate('Enter password for detector'));
        this.data.setShowEModal(true);
        this.ngAfterViewChecked();
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
    if(this.data.getDemoMode() == 1){
      this.updateDemoDevices();
    }
    else {
      if(this.data.DeviceBuild == 1){
        this.setScannedData();
        this.data.resetSendData();
      }
      else{
        this.detectors = this.data.getDevices(false);
      }
    }
    this.data.setMainTitle(this.translater.translate('Detectors'));
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('electrician');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  updateDemoDevices(){
      this.zone.run( () => {
        this.detectors = this.data.getDevices(false);
        this.ngOnChanges(''); 
      });
  }

  setScannedData(){
    if(this.data.demoMode == 0){
      this.detectors = [];
      this.scannedData = this.data.getScannedData();
      if(this.scannedData != undefined) {
        for(let i =0; i < this.scannedData.length; i++)
        {
          let detectorInfo =  new DetectorInfo()
          detectorInfo.btDeviceName = this.scannedData[i].btDeviceName;
          detectorInfo.firmwareVersion = this.scannedData[i].firmwareRevision;
          detectorInfo.modelNumber = this.scannedData[i].modelNumber;
          detectorInfo.btAddress = this.scannedData[i].btAddress;
          detectorInfo.btIAddress = this.scannedData[i].btIAddress;
          detectorInfo.deviceType = this.scannedData[i].deviceType;
          detectorInfo.rssi = this.scannedData[i].rssi;
          detectorInfo.createdDate=this.data.getFormattedDate();
          detectorInfo.updatedDate = this.data.getUTCDateFormat();
          detectorInfo.identify='0';
          this.detectors.push(detectorInfo);
        }
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

  getMystyle(identify) {
    if(identify == '1'){
      let mystyles =  {
        'background-color': '#0A60A0' ,
        'color': '#FFFFFF',
      }
      return mystyles;
    }else{
      let mystyles =  {
        'background-color': '#FFFFFF' ,
        'color': '#00395c',
      }
      return mystyles;
    }
  }


  removeIdentifyingDevice(){
    if(this.data.getIdentifyDevicePending() == 2){
        this.data.sendRemoveIdentifyCommand()
        this.data.setIdentifyDeviceState(0)
        if(this.data.isIPhone == 1){
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btIAddress == this.identifyingDevice.btIAddress){
              this.detectors[i].identify = '0';
            }
          }
        }else {
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btAddress == this.identifyingDevice.btAddress){
              this.detectors[i].identify = '0';
            }
          }
        }
        this.identifyingDevice.identify = '0';
        this.identifyingDevice = undefined;
    }
  }

  clearDevicesForRescan(){
    this.logger.log("clearDevicesForRescan called")
    this.zone.run( () => {
      this.detectors = [];
    });
  }

  setIdentify(state){
    this.zone.run( () => { // Change the property within the zone, CD will run after
      if(state == 1){
        if(this.data.isIPhone == 1){
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btIAddress == this.identifyingDevice.btIAddress){
              this.detectors[i].identify = '1';
            }
          }
        }else {
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btAddress == this.identifyingDevice.btAddress){
              this.detectors[i].identify = '1';
            }
          }
        }
        this.identifyingDevice.identify = '1';
      }else{
        if(this.data.isIPhone == 1){
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btIAddress == this.identifyingDevice.btIAddress){
              this.detectors[i].identify = '0';
            }
          }
        }else {
          for(let i =0; i<this.detectors.length; i++){
            if(this.detectors[i].btAddress == this.identifyingDevice.btAddress){
              this.detectors[i].identify = '0';
            }
          }
        }
        this.identifyingDevice.identify = '0';
        this.identifyingDevice = undefined;
      }
    });
  }

  identifyDevice(item){
    this.removeIdentifyingDevice()
    if(this.data.getIdentifyDevicePending() > 0 ){
      return;
    }else {
      this.data.setIdentifyDeviceState(1);
      this.identifyingDevice = item;
      if(this.data.isIPhone == 1)
        this.data.connectDevice(item.btIAddress);
      else
        this.data.connectDevice(item.btAddress); 
    }
  }

  onInstallerAccessSuccess(){
    if(this.data.getDeviceConnectionState() ==  true)
      this.data.initDeviceData(false);
  }
  onInstallerAccessDenied(){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.showPWDDialog();
         this.data.setEDevParamsState(0);
      });
  }

  jsonOnLoad(component) {
    // if(this.data.getDeviceConnectionState() == true && this.data.DeviceBuild == 1){
      
    // }
    // else {

    // }
    this.data.setFromRoot(true);
    component.router.navigate(['econfigdetector'],{relativeTo: component.route});
  }

  ngOnDestroy() {
    this.logger.log("somebody calling ngOnDestroy")
    this.data.resetSendData();
    this.data.setProfileSwitch(false)
    if(this.selectedDevice == false &&  !(this.data.getProfile() == 'user')){
      this.data.killMe();     
    } 
  }
  onDeviceConnected(address){
  }
  onAccessLevelUpdate(accessLevel){
    if(accessLevel == -1){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.showPWDDialog();
         this.data.setEDevParamsState(0);
      });
    }else {
      if(this.data.getDeviceConnectionState() ==  true)
        this.data.initDeviceData(false);
      }
      //this.data.setAccessLevelRequsetedAddress('')
  }
}
