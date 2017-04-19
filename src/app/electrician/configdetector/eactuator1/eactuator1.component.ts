import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';


@Component({
  selector: 'eactuator1-root',
  templateUrl: './eactuator1.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EActuator1Component implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{


    activeDevice:any;
    ad:any;
    perOn = false;
    perOff = false;
    softOn = false;
    softOff = false;
    minLoad = false;
    maxLoad = false;
    burnHours = false;
    brightStart = false;
    brightEnd = false;
    glareStart = false;
    glareEnd = false;
    ssOffTime = false;
    ssInter = false;
    
    showCircuitSettings = false;
    showDurableSwitchingSettings = false;
    showMiscSettings = false;
    showNightAntiGlareSettings = false;
    showBasicIlluminationSettings = false;
    showDaliSettings = false;
    showTimeShiftedSwitchOffSettings = false;
    showFluorescentSettings = false;
    loadingDataDone = false;
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
                SCCP_ATTRIBUTES.COLOR_TEMPERATURE,                                                                           
                SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX,                                    
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
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE,                  
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

  onLabel = 'on';
  offLabel = 'off';
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      if(this.data.getDeviceConnectionState() == true){
        this.data.readData(this.readAttrs);
      }
      else {
        this.loadingDataDone = true;
      }
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Settings of actuator1');
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
  nightLightLevelChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.nightLightLevel]);
  }
  ambientBrChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.basicBrightnessAmbientBrightnessThreshold]);
  }
  basicBrLevelChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.basicBrightnessLevel]);
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
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.basicBrightnessStartTimeAstroFunctionEnable?1:0])
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
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOnDuration])
    } else if(item == 'peroff') {
      this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDuration - 1;
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOffDuration])
    } else if(item == 'softon' && (this.ad.softOnDuration > 1 && this.ad.softOnDuration <= 60)){
      this.ad.softOnDuration = this.ad.softOnDuration - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.softOnDuration ])
    } else if(item == 'softoff' && (this.ad.softOffDuration > 1 && this.ad.softOffDuration <= 60)){
      this.ad.softOffDuration = this.ad.softOffDuration - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.softOffDuration ])
    } else if(item == 'minload') {
        this.ad.ch1MinLevel = this.ad.ch1MinLevel - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.ch1MinLevel ])
    } else if(item == 'maxload') {
        this.ad.ch1MaxLevel = this.ad.ch1MaxLevel - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.ch1MaxLevel ])
    } else if(item == 'burnduration' && (this.ad.burnInDuration > 1 && this.ad.burnInDuration <= 250)){
      this.ad.burnInDuration = this.ad.burnInDuration - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.burnInDuration ])
    }else if(item == 'brightstart') {
        this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    } else if(item == 'brightend') {
        this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }else if(item == 'glarestart') {
        this.ad.nightLightStartTime = this.ad.nightLightStartTime - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    } else if(item == 'glareend') {
        this.ad.nightLightEndTime = this.ad.nightLightEndTime - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightEndTime ])
    }else if(item == 'sstime') {
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelay - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.stepwiseSwitchOffDelay ])
    } else if(item == 'ssinter') {
        this.ad.stepwiseSwitchOffLevel = this.ad.stepwiseSwitchOffLevel - 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.stepwiseSwitchOffLevel ])
    }
  }


  increaseCount(item, isClick) {
    if(item == 'peron') {
      this.ad.ch1PermanentOnDuration = this.ad.ch1PermanentOnDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOnDuration])
    }  else if(item == 'peroff') {
      this.ad.ch1PermanentOffDuration = this.ad.ch1PermanentOffDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.ch1PermanentOffDuration])
    } else if(item == 'softon' && (this.ad.softOnDuration >= 1 && this.ad.softOnDuration < 60)) {
      this.ad.softOnDuration = this.ad.softOnDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.softOnDuration ])
    } else if(item == 'softoff' && (this.ad.softOffDuration >= 1 && this.ad.softOffDuration < 60)){
      this.ad.softOffDuration = this.ad.softOffDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.softOffDuration ])
    } else if(item == 'minload') {
        this.ad.ch1MinLevel = this.ad.ch1MinLevel + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.ch1MinLevel ])
    } else if(item == 'maxload') {
        this.ad.ch1MaxLevel = this.ad.ch1MaxLevel + 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.ch1MaxLevel ])
    } else if(item == 'burnduration' && (this.ad.burnInDuration >= 1 && this.ad.burnInDuration < 250)){
      this.ad.burnInDuration = this.ad.burnInDuration + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.burnInDuration ])
    }else if(item == 'brightstart') {
        this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime + 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    } else if(item == 'brightend') {
        this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime + 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }else if(item == 'glarestart') {
        this.ad.nightLightStartTime = this.ad.nightLightStartTime +  1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    } else if(item == 'glareend') {
        this.ad.nightLightEndTime = this.ad.nightLightEndTime + 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightEndTime ])
    }else if(item == 'sstime') {
        this.ad.stepwiseSwitchOffDelay = this.ad.stepwiseSwitchOffDelay +  1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.stepwiseSwitchOffDelay ])
    } else if(item == 'ssinter') {
        this.ad.stepwiseSwitchOffLevel = this.ad.stepwiseSwitchOffLevel + 1;
        if(isClick)
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.stepwiseSwitchOffLevel ])
    }
  }

  togglemsd() {
    if(this.ad.slaveModeEnable ==0 )
      this.ad.slaveModeEnable = 1;
    else
      this.ad.slaveModeEnable = 0;
    this.data.addToSendData([SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
  }
  resetDali() {
    this.data.setDialogTitle("Reset DALI");
    this.data.setDialogText("Reset all DALI control gear to factory settings");
    this.data.setShowModal(true);
  }
  resetHours() {
    this.data.setDialogTitle("Reset");
    this.data.setDialogText("Reset operating hours");
    this.data.setShowModal(true);
  }

  onBLEdata() {
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.softOnEnable = this.ad.softOnEnable;
        this.data.setEDevParamsState(0);
    });
  }
  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
