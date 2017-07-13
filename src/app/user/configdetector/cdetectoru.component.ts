import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../data.service';
import {SCCP_ATTRIBUTES} from'../../data.service';



@Component({
  selector: 'cdetectoru-root',
  templateUrl: './cdetectoru.component.html',
  styleUrls: ['./cdetectoru.component.css']
})
export class CDetectorUComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    
    activeDevice:any;
    ad:any;
    doDisConnect = true;
    onLabel = 'ON';
    offLabel = 'OFF';
    readAttrs =[
                SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
                //settings u
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,                               
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,                           
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,                             
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME_ASTRO_FUNCTION_ENABLE,     
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
                SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,
                SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,
                SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,
                SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,
                ]

    light1state = 0;
    loadingDataDone = false;
    constructor(public logger: LoggerService,public data: DataService, 
    private router:Router,private route:ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
      this.data.setMainTitle('Configure detector')
      this.data.readData(this.readAttrs);
    }

  slideBackground (value) {
    let stringval = value.toString();
    let stylestr = "linear-gradient(to right,#2c435c " + stringval + "%, transparent 0%";
    let mystyles =  {
      'background': stylestr
    }
    return mystyles;
  }

  slideNext() {
    this.light1state = this.light1state + 1;
  }

  brightnessChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1CurrentLevel)])
  }

  slidePrev() {
    this.light1state = this.light1state - 1;
  }
  gotoEnergySettings() {
    this.doDisConnect =  false;
    this.router.navigate(['energymonitor'],{relativeTo: this.route});
    //this.data.setShowOnlyCancel(false);
  }
  gotoSettings() {
    this.doDisConnect =  false;
    this.router.navigate(['settingsu'],{relativeTo: this.route});
    this.data.setShowOnlyCancel(false);
  }

  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
     this.doDisConnect = true;
    this.data.setOtherParam('','');
    this.data.setShowOnlyCancel(true);
  }
  ngAfterContentInit() { 
  }
  ngAfterContentChecked() { 
  }
  ngAfterViewInit() { 
  }
  ngAfterViewChecked() { 
  }
  ngOnDestroy() {
    this.data.resetSendData();
    if(this.doDisConnect == true)
      this.data.disConnectDevice();
  }
    
  onBLEdata() {
    this.loadingDataDone =  true;
    this.setDeviceInfo();
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.ch1CurrentLevel = this.ad.ch1CurrentLevel ;
        this.data.setEDevParamsState(0);
      });
  }

  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }

  setDeviceInfo(){
    let data = this.data.getSelectedDevice(false);
    this.ad.btDeviceName = data.btDeviceName;
    this.ad.btAddress = data.btAddress;
    this.ad.modelNumber = data.modelNumber;
    this.ad.deviceType = data.deviceType;
    this.ad.contactName = data.contactName;
    this.ad.buildingName = data.buildingName;
    this.ad.createdDate = data.createdDate;
    this.ad.fwupdate = data.fwupdate;
    this.ad.modelType = data.modelType;
    this.ad.firmwareVersion = data.firmwareVersion;
    this.ad.rssi = data.rssi;
    this.ad.updatedDate = data.updatedDate;
    this.ad.profileName = data.profileName;
    this.ad.btDeviceName = data.btDeviceName;
  }
}
