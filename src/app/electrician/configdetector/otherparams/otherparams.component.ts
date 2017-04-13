import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
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
  masterQuad = 'q1';
  
      readAttrs =[
                  SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,                      
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,                            
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,                         
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                     
                  //SCCP_ATTRIBUTES.CONTACT,                                                  
                  //SCCP_ATTRIBUTES.BUILDING,                                                 
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
                ]

  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
      this.data.readData(this.readAttrs);
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
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
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
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price + 1;
    }
  }
  onBLEdata() {
    
  }
  toggleDP(){
    this.ad.testModeDeactivateOutputsEnable = !this.ad.testModeDeactivateOutputsEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.testModeDeactivateOutputsEnable])
  }
  CNameChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CONTACT,SCCP_DATATYPES.SCCP_TYPE_STRING,this.activeDevice.contactName])
  }
  BuildingChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.BUILDING,SCCP_DATATYPES.SCCP_TYPE_STRING,this.activeDevice.buildingName])
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
}
