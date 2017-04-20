import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';

@Component({
  selector: 'other-root',
  templateUrl: './otherparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EOtherParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  showFitterPin = false;
  showUserPin = false;
  A1LoadIdentify = false;
  A2LoadIdentify = false;
  userProfiles = [];
  preDefined_Profiles =[
    "Living room",
    "Toilet",
    "Kitchen",
    "Bath",
    "Floor",
    "Out door"
  ]
  preDefined_Searches=[];
  searchText = '';
  masterQuad = 'q1';
  loadingDataDone = false;
      readAttrs =[
                  SCCP_ATTRIBUTES.CONTACT,
                  SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,                      
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,                            
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,                         
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                                                                                                                        
                  SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,                     
                  SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,                         
                  SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,                               
                  SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,                             
                  SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,                         
                  SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE,             
                  SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,                                       
                  SCCP_ATTRIBUTES.IDENTIFYING_DEVICE,                                       
                  SCCP_ATTRIBUTES.MOVEMENT,                                                 
                  SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,                                     
                  SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,                                         
                  SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,                                        
                  SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,                                     
                  SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,                                         
                  SCCP_ATTRIBUTES.CH2_CURRENT_LEVEL,                                        
                  SCCP_ATTRIBUTES.TEST_MODE_ACTIVE,                                         
                  SCCP_ATTRIBUTES.ACCESS_LEVEL,
                  SCCP_ATTRIBUTES.BUILDING,
                ]

  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
      this.data.readData(this.readAttrs);
  }
    getOtherProfiles(){
      return this.userProfiles;
    }
      searchDetectors(items) {
        if(this.searchText.length > 0)
        {
            let result = [];
            var searchString = new RegExp(this.searchText.toLowerCase());
            for(var j =0; j < items.length; j++) {
                let profile = items[j];
                if(profile === undefined) {
                    result.push(profile);
                }else {
                    if( profile.toLowerCase().indexOf(this.searchText) >= 0){
                        result.push(profile);
                    }
                }
            }
            this.preDefined_Searches = result;
            return this.preDefined_Searches;
        }else {
          return this.preDefined_Profiles;
        }
    }
    
   sortedMapValues(){
        return this.searchDetectors(this.preDefined_Profiles);
    }

onFitterPinChanged(){
    this.data.setEDevParamsState(1);
}
onUserPinChanged(){
    this.data.setEDevParamsState(1);
}
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle(this.data.getOtherParamTitle());
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
  }
  getOtherParam() {
    return this.data.getOtherParam();
  }
  reduceCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad - 1;
      if(this.ad.energyMonitorConnectedLoad <= this.ad.energyMonitorConnectedLoadMin){
          this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      if(this.ad.energyMonitorLightingDuration <= this.ad.energyMonitorLightingDurationMin){
          this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDurationMin;
        }
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price - 1;
    }

  }


  increaseCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad + 1;
      if(this.ad.energyMonitorConnectedLoad >= this.ad.energyMonitorConnectedLoadMax){
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration + 1;
       if(this.ad.energyMonitorLightingDuration >= this.ad.energyMonitorLightingDurationMax){
        this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price + 1;
    }
  }
  onBLEdata() {
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
  }
  toggleDP(){
    this.ad.testModeDeactivateOutputsEnable = !this.ad.testModeDeactivateOutputsEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.testModeDeactivateOutputsEnable])
  }
  CNameChanged() {
    var bytes = []; // char codes
    for (var i = 0; i < this.ad.contact.length; ++i) {
      var code = this.ad.contact.charCodeAt(i);
      bytes = bytes.concat([code]);
    }
    bytes.concat[0];
    this.logger.log("contact is " + bytes.join(','))
    this.data.addToSendData([SCCP_ATTRIBUTES.CONTACT,SCCP_DATATYPES.SCCP_TYPE_STRING,bytes])
  }
  BuildingChanged() {
    var bytes = []; // char codes
    for (var i = 0; i < this.ad.building.length; ++i) {
      var code = this.ad.contact.charCodeAt(i);
      bytes = bytes.concat([code]);
    }
    bytes.concat[0];
    this.logger.log("building is " + bytes.join(','))
    this.data.addToSendData([SCCP_ATTRIBUTES.BUILDING,SCCP_DATATYPES.SCCP_TYPE_STRING,this.ad.building])
  }
  togglepbr(){
    this.ad.enableUserSetBrightnessThreshold = !this.ad.enableUserSetBrightnessThreshold
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserSetBrightnessThreshold])
  }
  togglessod(){
    this.ad.enableUserSetSwitchOffDelay = !this.ad.enableUserSetSwitchOffDelay
        this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserSetSwitchOffDelay])
  }
  toggleem(){
    this.ad.enableUserEnergyMonitor = !this.ad.enableUserEnergyMonitor
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserEnergyMonitor])
  }
  togglebi(){
    this.ad.enableUserBasicBrightness = !this.ad.enableUserBasicBrightness
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserBasicBrightness])
  }
  togglenf(){
    this.ad.enableUserNightLightFunction = !this.ad.enableUserNightLightFunction
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserNightLightFunction])
  }
  togglech1ID(){
    this.ad.ch1IdentifyingLoad = this.ad.ch1IdentifyingLoad;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1IdentifyingLoad ])
  }
  togglech2ID(){
    this.ad.ch2IdentifyingLoad = this.ad.ch2IdentifyingLoad;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch2IdentifyingLoad ])
  }
    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
