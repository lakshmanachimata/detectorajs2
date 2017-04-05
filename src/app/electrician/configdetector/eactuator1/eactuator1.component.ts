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
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.night_time_anti_glare_function.illumination_level]);
  }
  ambientBrChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.basic_illumination.ambient_brightness_threshold]);
  }
  basicBrLevelChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.basic_illumination.basic_illumination_level]);
  }
  basicBrModeChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.actuator1.basic_illumination.settings]);
  }
  burnInModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.actuator1.fluorescent_lamps.burn_in_mode]);
  }
  circuitModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.actuator1.circuit_logic]);
  }
  togglesn(){
    this.ad.actuator1.soft_switching.on.enable = !this.ad.actuator1.soft_switching.on.enable
    this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.soft_switching.on.enable?1:0])
  }
   togglesf(){
    this.ad.actuator1.soft_switching.off.enable = !this.ad.actuator1.soft_switching.off.enable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.soft_switching.off.enable?1:0])
   }
   phaseCutModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.PHASE_CUT_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.actuator1.soft_switching.load_phase_cut_dimmable_edge]);
   }
   togglemf(){
     this.ad.actuator1.misc_settings.switch_on_with_last_brightness = !this.ad.actuator1.misc_settings.switch_on_with_last_brightness;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.misc_settings.switch_on_with_last_brightness?1:0])
   }
   togglelrb() {
     this.ad.actuator1.misc_settings.limit_of_room_brightness = !this.ad.actuator1.misc_settings.limit_of_room_brightness
    this.data.addToSendData([SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.misc_settings.limit_of_room_brightness?1:0])
   }
   toggleminl() {
     this.ad.actuator1.misc_settings.load_output.minimum.enable = !this.ad.actuator1.misc_settings.load_output.minimum.enable
     this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.misc_settings.load_output.minimum.enable?1:0])
   }
   togglemaxl(){
     this.ad.actuator1.misc_settings.load_output.maximum.on = !this.ad.actuator1.misc_settings.load_output.maximum.on
     this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.misc_settings.load_output.maximum.on?1:0])
   }
   togglebn(){
     this.ad.actuator1.fluorescent_lamps.burn_in_function = !this.ad.actuator1.fluorescent_lamps.burn_in_function;
    this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.fluorescent_lamps.burn_in_function?1:0])
   }
   toggleAs(){
     this.ad.actuator1.basic_illumination.astro_function = !this.ad.actuator1.basic_illumination.astro_function
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.basic_illumination.astro_function?1:0])
   }
   toggleNl() {
     this.ad.actuator1.night_time_anti_glare_function.enable = !this.ad.actuator1.night_time_anti_glare_function.enable
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.night_time_anti_glare_function.enable?1:0])
   }
   togglesso(){
     this.ad.actuator1.time_shifted_switch_off.enable = !this.ad.actuator1.time_shifted_switch_off.enable
     this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.actuator1.time_shifted_switch_off.enable?1:0])
   }
  reduceCount(item) {
    if(item == 'peron') {
      this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on - 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.durable_on_off_switching.duration_on])
    } else if(item == 'peroff') {
      this.ad.actuator1.durable_on_off_switching.duration_off = this.ad.actuator1.durable_on_off_switching.duration_off - 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.durable_on_off_switching.duration_off])
    } else if(item == 'softon' && (this.ad.actuator1.soft_switching.on.range > 1 && this.ad.actuator1.soft_switching.on.range <= 60)){
      this.ad.actuator1.soft_switching.on.range = this.ad.actuator1.soft_switching.on.range - 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.soft_switching.on.range ])
    } else if(item == 'softoff' && (this.ad.actuator1.soft_switching.off.range > 1 && this.ad.actuator1.soft_switching.off.range <= 60)){
      this.ad.actuator1.soft_switching.off.range = this.ad.actuator1.soft_switching.off.range - 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.soft_switching.off.range ])
    } else if(item == 'minload') {
        this.ad.actuator1.misc_settings.load_output.minimum.value = this.ad.actuator1.misc_settings.load_output.minimum.value - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MIN_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.misc_settings.load_output.minimum.value ])
    } else if(item == 'maxload') {
        this.ad.actuator1.misc_settings.load_output.maximum.output_value = this.ad.actuator1.misc_settings.load_output.maximum.output_value - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.misc_settings.load_output.maximum.output_value ])
    } else if(item == 'burnduration' && (this.ad.actuator1.fluorescent_lamps.burn_in_hours > 1 && this.ad.actuator1.fluorescent_lamps.burn_in_hours <= 250)){
      this.ad.actuator1.fluorescent_lamps.burn_in_hours = this.ad.actuator1.fluorescent_lamps.burn_in_hours - 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.fluorescent_lamps.burn_in_hours ])
    }else if(item == 'brightstart') {
        this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.basic_illumination.start_time ])
    } else if(item == 'brightend') {
        this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.basic_illumination.end_time ])
    }else if(item == 'glarestart') {
        this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.night_time_anti_glare_function.start_time ])
    } else if(item == 'glareend') {
        this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.night_time_anti_glare_function.end_time ])
    }else if(item == 'sstime') {
        this.ad.actuator1.time_shifted_switch_off.switch_off_time = this.ad.actuator1.time_shifted_switch_off.switch_off_time - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.time_shifted_switch_off.switch_off_time ])
    } else if(item == 'ssinter') {
        this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness = this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness - 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness ])
    }
  }

  increaseCount(item) {
    if(item == 'peron') {
      this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.durable_on_off_switching.duration_on])
    }  else if(item == 'peroff') {
      this.ad.actuator1.durable_on_off_switching.duration_off = this.ad.actuator1.durable_on_off_switching.duration_off + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.durable_on_off_switching.duration_off])
    } else if(item == 'softon' && (this.ad.actuator1.soft_switching.on.range >= 1 && this.ad.actuator1.soft_switching.on.range < 60)) {
      this.ad.actuator1.soft_switching.on.range = this.ad.actuator1.soft_switching.on.range + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_ON_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.soft_switching.on.range ])
    } else if(item == 'softoff' && (this.ad.actuator1.soft_switching.off.range >= 1 && this.ad.actuator1.soft_switching.off.range < 60)){
      this.ad.actuator1.soft_switching.off.range = this.ad.actuator1.soft_switching.off.range + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.SOFT_OFF_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.soft_switching.off.range ])
    } else if(item == 'minload') {
        this.ad.actuator1.misc_settings.load_output.minimum.value = this.ad.actuator1.misc_settings.load_output.minimum.value + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.misc_settings.load_output.minimum.value ])
    } else if(item == 'maxload') {
        this.ad.actuator1.misc_settings.load_output.maximum.output_value = this.ad.actuator1.misc_settings.load_output.maximum.output_value + 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.CH1_MAX_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.misc_settings.load_output.maximum.output_value ])
    } else if(item == 'burnduration' && (this.ad.actuator1.fluorescent_lamps.burn_in_hours >= 1 && this.ad.actuator1.fluorescent_lamps.burn_in_hours < 250)){
      this.ad.actuator1.fluorescent_lamps.burn_in_hours = this.ad.actuator1.fluorescent_lamps.burn_in_hours + 1;
      this.validateParam(item);
      this.data.addToSendData([SCCP_ATTRIBUTES.BURN_IN_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.fluorescent_lamps.burn_in_hours ])
    }else if(item == 'brightstart') {
        this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time + 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.basic_illumination.start_time ])
    } else if(item == 'brightend') {
        this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time + 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.basic_illumination.end_time ])
    }else if(item == 'glarestart') {
        this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time +  1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.night_time_anti_glare_function.start_time ])
    } else if(item == 'glareend') {
        this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time + 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.actuator1.night_time_anti_glare_function.end_time ])
    }else if(item == 'sstime') {
        this.ad.actuator1.time_shifted_switch_off.switch_off_time = this.ad.actuator1.time_shifted_switch_off.switch_off_time +  1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.actuator1.time_shifted_switch_off.switch_off_time ])
    } else if(item == 'ssinter') {
        this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness = this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness + 1;
        this.validateParam(item);
        this.data.addToSendData([SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness ])
    }
  }
  validateParam(item) {
     if(item == 'peron') {
       if(this.ad.actuator1.durable_on_off_switching.duration_on < 30 || this.ad.actuator1.durable_on_off_switching.duration_on > 2400) {
         this.perOn = true;
       }else {
         this.perOn = false;
       }
     } else  if(item == 'peroff') {
       if(this.ad.actuator1.durable_on_off_switching.duration_off < 30 || this.ad.actuator1.durable_on_off_switching.duration_off > 2400) {
         this.perOff = true;
       }else {
         this.perOff = false;
       }
     } else  if(item == 'softon') {
       if(this.ad.actuator1.soft_switching.on.range < 1 || this.ad.actuator1.soft_switching.on.range > 60) {
         this.softOn = true;
       }else {
         this.softOn = false;
       }
     } else  if(item == 'softoff') {
       if(this.ad.actuator1.soft_switching.off.range < 1 || this.ad.actuator1.soft_switching.off.range > 60) {
         this.softOff = true;
       }else {
         this.softOff = false;
       }
     } else  if(item == 'minload') {
       
     }else  if(item == 'maxload') {
       
     } else if(item == 'burnduration') {
       if(this.ad.actuator1.soft_switching.off.range < 1 || this.ad.actuator1.soft_switching.off.range > 250) {
         this.burnHours = true;
       }else {
         this.burnHours = false;
       }
     }else if(item == 'sstime') {
       if(this.ad.actuator1.time_shifted_switch_off.switch_off_time < 30 || this.ad.actuator1.time_shifted_switch_off.switch_off_time> 3060) {
         this.ssOffTime = true;
       }else {
         this.ssOffTime = false;
       }
     }
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
        this.ad.actuator1.soft_switching.on.enable = this.ad.actuator1.soft_switching.on.enable;
    });
  }
}
