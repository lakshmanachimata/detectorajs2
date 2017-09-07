import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';
import { i18nService } from '../../../i18n.service';

@Component({
  selector: 'eactuator1-root',
  templateUrl: './eactuator1.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EActuator1Component implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{


    activeDevice:any;
    ad:any;
    loadingDataDone = false;
    showSoftSwitchingSettings = true;
    NLStartTimeHH:number = 0;
    NLStartTimeMM:number = 0;
    NLEndTimeHH:number  = 0;
    NLEndTimeMM:number = 0;
    BRStartTimeHH : number = 0;
    BRStartTimeMM : number = 0;
    BREndTimeHH : number = 0;
    BREndTimeMM : number = 0;
    colorNumerator: any = Math.pow(10, 6);
    colorTempMax : any;
    colorTempMin: any;
    colorTempVal:any;

      readAttrs =[
                SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC, 
                SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,                                        
                SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,                                
                SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN,                            
                SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MAX,                                        
                SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,                               
                SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN,                           
                SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MAX,                           
                SCCP_ATTRIBUTES.SOFT_ON_ENABLE,                                        
                SCCP_ATTRIBUTES.SOFT_ON_DURATION,                                        
                SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN,                                    
                SCCP_ATTRIBUTES.SOFT_ON_DURATION_MAX,                                     
                SCCP_ATTRIBUTES.SOFT_OFF_ENABLE,                                          
                SCCP_ATTRIBUTES.SOFT_OFF_DURATION,                                        
                SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN,                                    
                SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MAX,
                SCCP_ATTRIBUTES.PHASE_CUT_MODE,                                           
                SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,                               
                SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE,                            
                SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE,                                     
                SCCP_ATTRIBUTES.CH1_MIN_LEVEL,                                            
                SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE,                                     
                SCCP_ATTRIBUTES.CH1_MAX_LEVEL,                                            
                SCCP_ATTRIBUTES.LEVEL_MIN,                                                
                SCCP_ATTRIBUTES.LEVEL_MAX,                                                
                SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL,                                      
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE,
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,                                                                            
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX,                                    
                SCCP_ATTRIBUTES.BURN_IN_ENABLE,                                           
                SCCP_ATTRIBUTES.BURN_IN_MODE,                                             
                SCCP_ATTRIBUTES.BURN_IN_DURATION,                                         
                SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN,                                     
                SCCP_ATTRIBUTES.BURN_IN_DURATION_MAX,                                     
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,                                    
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,                                   
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,            
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,        
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,        
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,                              
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,                                
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME_ASTRO_FUNCTION_ENABLE,                  
                SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,                              
                SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,                                   
                SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,
                SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,                                        
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE,                         
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,                                
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN,                            
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MAX,                            
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL                                
                ]

  onLabel = this.translater.translate('ON');
  offLabel = this.translater.translate('OFF');
  constructor(public logger: LoggerService,public data: DataService, private router:Router,
              private zone:NgZone,private translater:i18nService) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      this.loadingDataDone = true;
  }
  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle(this.translater.translate('Settings of actuator 1'));
    this.secondsToTimeValues(this.ad.nightLightStartTime,'nlstarttime')
    this.secondsToTimeValues(this.ad.nightLightEndTime,'nlendtime')
    this.secondsToTimeValues(this.ad.basicBrightnessStartTime,'brstarttime')
    this.secondsToTimeValues(this.ad.basicBrightnessEndTime,'brendtime')
    this.data.setProfileSwitch(true)
    this.data.setOtherParam('','');
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


  setPEROFF(event : any){
    if(event.target.value <= this.ad.ch1PermanentOffDurationMin ){
      this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDurationMin;
      event.target.value = this.ad.ch1PermanentOffDurationMin;
    }
    if(event.target.value >= this.ad.ch1PermanentOffDurationMax) {
        this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDurationMax;
        event.target.value = this.ad.ch1PermanentOffDurationMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1PermanentOffDuration) ])
  }


  setPERON(event : any){
    if(event.target.value <= this.ad.ch1PermanentOnDurationMin ){
      this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDurationMin;
      event.target.value = this.ad.ch1PermanentOnDurationMin;
    }
    if(event.target.value >= this.ad.ch1PermanentOnDurationMax) {
        this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDurationMax;
        event.target.value = this.ad.ch1PermanentOnDurationMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOnDuration])
  }

  setMinLoad(event: any){

    if(event.target.value <= this.ad.levelMin ){
      this.ad.ch1MinLevel = this.ad.levelMin;
      event.target.value = this.ad.levelMin;
    }
    if(event.target.value >= this.ad.levelMax) {
        this.ad.ch1MinLevel = this.ad.levelMax;
        event.target.value = this.ad.levelMax;
    }

    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MinLevel)])

  }
  setMaxLoad(event: any){
    
    if(event.target.value <= this.ad.levelMin ){
      this.ad.ch1MaxLevel = this.ad.levelMin;
      event.target.value = this.ad.levelMin;
    }
    if(event.target.value >= this.ad.levelMax) {
        this.ad.ch1MaxLevel = this.ad.levelMax;
        event.target.value = this.ad.levelMax;
    }

    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MaxLevel)])

  }

getMinColorTemp(){
  if(this.ad.colorTemperatureMin > 0){
    this.ad.colorTempMin = this.colorNumerator/this.ad.colorTemperatureMin;
  }
  else{
    this.ad.colorTempMin = 0;
  }
  this.getColorTemperatureValue();
  return this.ad.colorTempMin;
}

getMaxColorTemp(){
  if(this.ad.colorTemperatureMax > 0){
    this.ad.colorTempMax = this.colorNumerator/this.ad.colorTemperatureMax;    
  }
  else{
    this.ad.colorTempMax = 0;
  }
  return this.ad.colorTempMax;
}
getColorTemperatureValue(){
  if(this.ad.colorTemperature > 0){
    this.ad.colorTempVal = this.colorNumerator/this.ad.colorTemperature;
  }
  else{
    this.ad.colorTempVal = 0;
  }
}
  setSSOFF(event : any){
    if(event.target.value <= this.ad.softOffDurationMin ){
      this.ad.softOffDuration = this.ad.softOffDurationMin;
      event.target.value = this.ad.softOffDurationMin;
    }
    if(event.target.value >= this.ad.softOffDurationMax) {
        this.ad.softOffDuration = this.ad.softOffDurationMax;
        event.target.value = this.ad.softOffDurationMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOffDuration) ])
  }

  setSSON(event : any){
    if(event.target.value <= this.ad.softOnDurationMin ){
      this.ad.softOnDuration = this.ad.softOnDurationMin;
      event.target.value = this.ad.softOnDurationMin;
    }
    if(event.target.value >= this.ad.softOnDurationMax) {
        this.ad.softOnDuration = this.ad.softOnDurationMax;
        event.target.value = this.ad.softOnDurationMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOnDuration) ])
  }


  setSsOt(event : any){
    if(event.target.value < this.ad.stepwiseSwitchOffDelayMin ){
      this.ad.brightnessThreshold = this.ad.stepwiseSwitchOffDelayMin;
      event.target.value = this.ad.stepwiseSwitchOffDelayMin;
    }
    if(event.target.value > this.ad.stepwiseSwitchOffDelayMax) {
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelayMax;
        event.target.value = this.ad.stepwiseSwitchOffDelayMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.stepwiseSwitchOffDelay ])
  }
  setBrIs(event: any){
    if(event.target.value < 0 ){
      this.ad.brightnessThreshold = 0;
      event.target.value = 0;
    }
    if(event.target.value > 100) {
      this.ad.brightnessThreshold = 100;
      event.target.value = 100;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
  }
  togglepb() {
    this.ad.permanentLightByPushButtonEnable = !this.ad.permanentLightByPushButtonEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.permanentLightByPushButtonEnable?1:0])
  }
  nightLightLevelChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.nightLightLevel)]);
  }
  powerOnChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.daliPowerOnLevel)]);
  }
  ambientBrChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.basicBrightnessAmbientBrightnessThreshold]);
  }
  basicBrLevelChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.basicBrightnessLevel)]);
  }
  basicBrModeChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.basicBrightnessMode]);
  }
  burnInModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.burnInMode]);
  }
  circuitModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.ch1CircuitLogic]);
  }
  togglesn(){
    this.ad.softOnEnable = !this.ad.softOnEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.softOnEnable?1:0])
  }
   togglesf(){
    this.ad.softOffEnable = !this.ad.softOffEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.softOffEnable?1:0])
   }
   phaseCutModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.PHASE_CUT_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.phaseCutMode]);
   }
   togglemf(){
     this.ad.ch1MemoryFunctionEnable = !this.ad.ch1MemoryFunctionEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1MemoryFunctionEnable?1:0])
   }
   togglelrb() {
     this.ad.delimitLightingLevelEnable = !this.ad.delimitLightingLevelEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.delimitLightingLevelEnable?1:0])
   }
   togglePW(){
     this.ad.ch1SwitchOffPreWarning = !this.ad.ch1SwitchOffPreWarning
     this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1SwitchOffPreWarning?1:0])
   }
   toggleminl() {
     this.ad.ch1MinLevelEnable = !this.ad.ch1MinLevelEnable
     this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1MinLevelEnable?1:0])
   }
   togglemaxl(){
     this.ad.ch1MaxLevelEnable = !this.ad.ch1MaxLevelEnable
     this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1MaxLevelEnable?1:0])
   }
   togglebn(){
     this.ad.burnInEnable = !this.ad.burnInEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.burnInEnable?1:0])
   }
   toggleAs(){
     this.ad.basicBrightnessStartTimeAstroFunctionEnable = !this.ad.basicBrightnessStartTimeAstroFunctionEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME_ASTRO_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.basicBrightnessStartTimeAstroFunctionEnable?1:0])
   }
   toggleNl() {
     this.ad.nightLightFunctionEnable = !this.ad.nightLightFunctionEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.nightLightFunctionEnable?1:0])
   }
   togglesso(){
     this.ad.stepwiseSwitchOffDelayEnable = !this.ad.stepwiseSwitchOffDelayEnable
     this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.stepwiseSwitchOffDelayEnable?1:0])
   }
  reduceCount(item,isClick) {
    if(item == 'peron') {
      this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDuration - 1;
      if(this.ad.ch1PermanentOnDuration <= this.ad.ch1PermanentOnDurationMin){
        this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDurationMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOnDuration])
    } else if(item == 'peroff') {
      this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDuration - 1;
      if(this.ad.ch1PermanentOffDuration <= this.ad.ch1PermanentOffDurationMin){
        this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDurationMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOffDuration])
    } else if(item == 'softon'){
      this.ad.softOnDuration = this.ad.softOnDuration - 1;
      if(this.ad.softOnDuration <= this.ad.softOnDurationMin){
        this.ad.softOnDuration = this.ad.softOnDurationMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOnDuration) ])
    } else if(item == 'softoff'){
      this.ad.softOffDuration = this.ad.softOffDuration - 1;
      if(this.ad.softOffDuration <= this.ad.softOffDurationMin){
        this.ad.softOffDuration = this.ad.softOffDurationMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOnDuration) ])
    } else if(item == 'minload') {
        this.ad.ch1MinLevel = this.ad.ch1MinLevel - 1;
        if(this.ad.ch1MinLevel <= this.ad.levelMin){
          this.ad.ch1MinLevel = this.ad.levelMin;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MinLevel)])
    } else if(item == 'maxload') {
        this.ad.ch1MaxLevel = this.ad.ch1MaxLevel - 1;
        if(this.ad.ch1MaxLevel <= this.ad.levelMin){
          this.ad.ch1MaxLevel = this.ad.levelMin;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MaxLevel)])
    } else if(item == 'burnduration'){
      this.ad.burnInDuration = this.ad.burnInDuration - 1;
      if(this.ad.burnInDuration <= this.ad.burnInDurationMin){
        this.ad.burnInDuration = this.ad.burnInDurationMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.burnInDuration)])
    }else if(item == 'brightstart') {
        this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime - 60;
        if(this.ad.basicBrightnessStartTime <= 0){
          this.ad.basicBrightnessStartTime = 86400;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.basicBrightnessStartTime)
          this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    } else if(item == 'brightend') {
        this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime - 60;
        if(this.ad.basicBrightnessEndTime <= 0){
          this.ad.basicBrightnessEndTime = 86400;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.basicBrightnessEndTime)
          this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    }else if(item == 'glarestart') {
        this.ad.nightLightStartTime = this.ad.nightLightStartTime - 60;
        if(this.ad.nightLightStartTime <= 0){
          this.ad.nightLightStartTime = 86400;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.nightLightStartTime)
          this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    } else if(item == 'glareend') {
        this.ad.nightLightEndTime = this.ad.nightLightEndTime - 60;
        if(this.ad.nightLightEndTime <= 0){
          this.ad.nightLightEndTime = 86400;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.nightLightEndTime)
          this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    }else if(item == 'sstime') {
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelay - 1;
        if(this.ad.stepwiseSwitchOffDelay <= this.ad.stepwiseSwitchOffDelayMin){
          this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelayMin;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.stepwiseSwitchOffDelay ])
    } else if(item == 'ssinter') {
        this.ad.stepwiseSwitchOffLevel = this.ad.stepwiseSwitchOffLevel - 1;
        if(this.ad.stepwiseSwitchOffLevel <= 0){
          this.ad.stepwiseSwitchOffLevel = 0;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.stepwiseSwitchOffLevel)])
    }else if(item == 'colorTemp'){
      this.ad.colorTempVal = this.ad.colorTempVal - 1;
      if(this.ad.colorTempVal <= this.ad.colorTempMin){
        this.ad.colorTempVal = this.ad.colorTempMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.COLOR_TEMPERATURE,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.colorTempVal)])
    }
  }

  setTime(timetype){
    let byteData = []
    byteData.push(0);
   if(timetype == 'nlstarttime'){
      this.NLStartTimeHH = this.data.getTimeHours();
      this.NLStartTimeMM = this.data.getTimeMins();
      byteData.push(this.NLStartTimeHH);
      byteData.push(this.NLStartTimeMM);
      byteData.push(0);
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,byteData[3],byteData[2],byteData[1],byteData[0]])
   }if(timetype == 'nlendtime'){
      this.NLEndTimeHH = this.data.getTimeHours();
      this.NLEndTimeMM = this.data.getTimeMins();
      byteData.push(this.NLEndTimeHH);
      byteData.push(this.NLEndTimeMM);
      byteData.push(0);
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,byteData[3],byteData[2],byteData[1],byteData[0]])
   }
  if(timetype == 'brstarttime'){
      this.BRStartTimeHH = this.data.getTimeHours();
      this.BRStartTimeMM = this.data.getTimeMins();
      byteData.push(this.BRStartTimeHH);
      byteData.push(this.BRStartTimeMM);
      byteData.push(0);
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,byteData[3],byteData[2],byteData[1],byteData[0]])
   }if(timetype == 'brendtime'){
      this.BREndTimeHH = this.data.getTimeHours();
      this.BREndTimeMM = this.data.getTimeMins();
      byteData.push(this.BREndTimeHH);
      byteData.push(this.BREndTimeMM);
      byteData.push(0);
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,byteData[3],byteData[2],byteData[1],byteData[0]])
   }
  }

  getBytesFromTime(sec_num){
    let byteData = []
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    byteData.push(0);
    byteData.push(hours);
    byteData.push(minutes);
    byteData.push(seconds);
    return byteData;
  }

  secondsToTimeValues (sec_num,timetype) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if(timetype == 'nlstarttime'){
      this.NLStartTimeHH = hours
      this.NLStartTimeMM = minutes
   }if(timetype == 'nlendtime'){
      this.NLEndTimeHH = hours
      this.NLEndTimeMM = minutes
   }
  if(timetype == 'brstarttime'){
      this.BRStartTimeHH = hours
      this.BRStartTimeMM = minutes
   }if(timetype == 'brendtime'){
      this.BREndTimeHH = hours
      this.BREndTimeMM = minutes
   }
  }

  increaseCount(item, isClick) {
    if(item == 'peron') {
      this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDuration + 1;
      if(this.ad.ch1PermanentOnDuration >= this.ad.ch1PermanentOnDurationMax){
        this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOnDuration])
    }  else if(item == 'peroff') {
      this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDuration + 1;
      if(this.ad.ch1PermanentOffDuration >= this.ad.ch1PermanentOffDurationMax){
        this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOffDuration])
    } else if(item == 'softon') {
      this.ad.softOnDuration = this.ad.softOnDuration + 1;
      if(this.ad.softOnDuration >= this.ad.softOnDurationMax){
        this.ad.softOnDuration = this.ad.softOnDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOnDuration)])
    } else if(item == 'softoff'){
      this.ad.softOffDuration = this.ad.softOffDuration + 1;
       if(this.ad.softOffDuration >= this.ad.softOffDurationMax){
        this.ad.softOffDuration = this.ad.softOffDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.softOffDuration) ])
    } else if(item == 'minload') {
        this.ad.ch1MinLevel = this.ad.ch1MinLevel + 1;
        if(this.ad.ch1MinLevel >= this.ad.levelMax){
          this.ad.ch1MinLevel = this.ad.levelMax;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MinLevel) ])
    } else if(item == 'maxload') {
        this.ad.ch1MaxLevel = this.ad.ch1MaxLevel + 1;
        if(this.ad.ch1MaxLevel >= this.ad.levelMax){
          this.ad.ch1MaxLevel = this.ad.levelMax;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1MaxLevel) ])
    } else if(item == 'burnduration'){
      this.ad.burnInDuration = this.ad.burnInDuration + 1;
      if(this.ad.burnInDuration >= this.ad.burnInDurationMax){
        this.ad.burnInDuration = this.ad.burnInDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.burnInDuration) ])
    }else if(item == 'brightstart') {
        this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime + 60;
        if(this.ad.basicBrightnessStartTime >= 86400 ){
          this.ad.basicBrightnessStartTime = 0;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.basicBrightnessStartTime)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0] ])
        }
    } else if(item == 'brightend') {
        this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime + 60;
         if(this.ad.basicBrightnessEndTime >= 86400 ){
          this.ad.basicBrightnessEndTime = 0;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.basicBrightnessEndTime)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    }else if(item == 'glarestart') {
        this.ad.nightLightStartTime = this.ad.nightLightStartTime +  60;
        if(this.ad.nightLightStartTime >= 86400 ){
          this.ad.nightLightStartTime = 0;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.nightLightStartTime)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0]])
        }
    } else if(item == 'glareend') {
        this.ad.nightLightEndTime = this.ad.nightLightEndTime + 60;
        if(this.ad.nightLightEndTime >= 86400 ){
          this.ad.nightLightEndTime = 0;
        }
        if(isClick){
          let timeBytes = []
          timeBytes = this.getBytesFromTime(this.ad.nightLightEndTime)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,timeBytes[3],timeBytes[2],timeBytes[1],timeBytes[0] ])
        }
    }else if(item == 'sstime') {
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelay +  1;
      if(this.ad.stepwiseSwitchOffDelay >= this.ad.stepwiseSwitchOffDelayMax){
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelayMax;
      }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.stepwiseSwitchOffDelay ])
    } else if(item == 'ssinter') {
        this.ad.stepwiseSwitchOffLevel = this.ad.stepwiseSwitchOffLevel + 1;
        if(this.ad.stepwiseSwitchOffLevel >= 100){
          this.ad.stepwiseSwitchOffLevel = 100;
        }
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.stepwiseSwitchOffLevel) ])
    }else if(item == 'colorTemp'){
      this.ad.colorTempVal = this.ad.colorTempVal + 1;
      if(this.ad.colorTempVal >= this.ad.colorTempMax){
        this.ad.colorTempVal = this.ad.colorTempMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.COLOR_TEMPERATURE,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.colorTempVal)])
    }
  }

  togglemsd() {
    // this.ad.slaveModeEnable = !this.ad.slaveModeEnable
    // this.data.addToSendData([SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.slaveModeEnable?1:0])
  }
  resetDali() {
    this.data.setDialogTitle(this.translater.translate("Reset DALI"));
    this.data.setDialogText(this.translater.translate("Reset all DALI control gear to factory settings"));
    this.data.setShowModal(true);
    this.data.setResetCommand(0x48)
  }
  resetHours() {
    this.data.setDialogTitle(this.translater.translate("Reset"));
    this.data.setDialogText(this.translater.translate("Reset operating hours"));
    this.data.setShowModal(true);
    this.data.setResetCommand(0x44)
  }

  onBLEdata(isread,iswrite) {
    if(iswrite == true){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        this.data.setEDevParamsState(0);
        this.loadingDataDone =  true;
      });
      this.loadingDataDone =  true;
    }
    this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.softOnEnable = this.ad.softOnEnable;
        this.data.setEDevParamsState(0);
    });
  }
  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
