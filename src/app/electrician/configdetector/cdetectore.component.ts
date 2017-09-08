import { Component ,trigger, state, animate, transition, style, OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,Renderer, ViewChild, ElementRef,NgZone} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../data.service';
import {SCCP_ATTRIBUTES} from'../../data.service';
import { i18nService } from '../../i18n.service';

@Component({
  selector: 'cdetectore-root',
  templateUrl: './cdetectore.component.html',
  styleUrls: ['./cdetectore.component.css'],
  animations: [
      trigger('slideIn1', [
        state('*', style({
            display: 'none',
        })),
        state('in', style({
            width:'300px',
            display: 'block',
        })),
        state('out',   style({
            display: 'none',
        })),
        transition('* => in', animate('300ms ease-in')),
        transition('in => out', animate('300ms ease-in')),
        ]),
        trigger('slideIn2', [
        state('*', style({
            display: 'none',
        })),
        state('in', style({
            display: 'block',
        })),
        state('out',   style({
            display: 'none',
        })),
        transition('* => in', animate('300ms ease-in')),
        transition('in => out', animate('300ms ease-in')),
        ])
    ]
})
export class CDetectorEComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    activeDevice:any;
    ad:any;
    doDisConnect = true;
    onLabel = this.translater.translate('ON');
    offLabel = this.translater.translate('OFF');
    brthresholderror = false;
    brsetpointerror = false;
    sdelayerror = false;
    aslider = 'none';
    showSlider = false;
    detectorName;
    loadingDataDone = false;
    readAttrs =[
                SCCP_ATTRIBUTES.POTENTIOMETER_MODE,                                       
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,                                     
                // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,                                 
                // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,                                 
                SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE,                        
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE,                            
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,                      
                // SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN,                  
                // SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX,               
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE,  
                SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,                                  
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,
                SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,                                        
                // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,                                     
                // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,                                     
                SCCP_ATTRIBUTES.OPERATION_MODE,
                // SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MAX,                                            
                SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
                SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,
                SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE,
                SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC, 
                SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,                                
                // SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN,                            
                // SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MAX,                                        
                SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,
                // SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN,                                                                                   
                SCCP_ATTRIBUTES.SOFT_ON_ENABLE,                                        
                SCCP_ATTRIBUTES.SOFT_ON_DURATION,                                        
                // SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN,                                    
                // SCCP_ATTRIBUTES.SOFT_ON_DURATION_MAX,                                     
                SCCP_ATTRIBUTES.SOFT_OFF_ENABLE,                                          
                SCCP_ATTRIBUTES.SOFT_OFF_DURATION,                                        
                // SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN,
                // SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MAX,
                SCCP_ATTRIBUTES.PHASE_CUT_MODE,                                                                            
                SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,                               
                SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE,                            
                SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE,                                     
                SCCP_ATTRIBUTES.CH1_MIN_LEVEL,                                            
                SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE,                                     
                SCCP_ATTRIBUTES.CH1_MAX_LEVEL,                                            
                // SCCP_ATTRIBUTES.LEVEL_MIN,
                // SCCP_ATTRIBUTES.LEVEL_MAX,                                                
                SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL,                                                
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE,    
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,                                                                        
                // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX,                                    
                SCCP_ATTRIBUTES.BURN_IN_ENABLE,                                           
                SCCP_ATTRIBUTES.BURN_IN_MODE,                                             
                SCCP_ATTRIBUTES.BURN_IN_DURATION,                                         
                // SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN,                                     
                // SCCP_ATTRIBUTES.BURN_IN_DURATION_MAX,                                     
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,                                    
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,            
                // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,                                        
                // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,        
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,                              
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,                                
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME_ASTRO_FUNCTION_ENABLE,
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME_ASTRO_FUNCTION_ENABLE,                  
                SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,                              
                SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,                                   
                SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,
                SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,  
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME_ASTRO_FUNCTION_ENABLE,                             
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE,                         
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,                                
                // SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN,                            
                // SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MAX,                            
                SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,                               
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,                           
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,                       
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME_ASTRO_FUNCTION_ENABLE,
                SCCP_ATTRIBUTES.PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE,                
                SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC,                                        
                SCCP_ATTRIBUTES.CH2_MODE,                                                 
                SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE,                            
                SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY,                                     
                // SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN,                                 
                // SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MAX,                                 
                SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY,                                          
                SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,                        
                // SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN,
                // SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MAX, 
                SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,                      
                SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,                            
                // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
                // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
                SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,                         
                // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
                // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                                                                                                                       
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
                SCCP_ATTRIBUTES.TEST_MODE_ENABLE,                                         
                SCCP_ATTRIBUTES.ACCESS_LEVEL,
                ]

  arrayReadAttrs = [
    SCCP_ATTRIBUTES.PIR_SENSITIVITY, //ATTR TYPE
    0x04,                            // NUMBER OF ATTRS 
    SCCP_ATTRIBUTES.PIR_SENSITIVITY_ODOR,
    0x04,
    SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.LEVEL_MIN,
    0x02,
    SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN,
    0x02,
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,
    0x02,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,
    0x02,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN,
    0x02
  ]

    updateSubcribeAttrs =[
      SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,
      SCCP_ATTRIBUTES.OPERATION_MODE,
      SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,
      SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
      SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,
      SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
      SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
    ]

    permanentSubscrioAttrs = [
      SCCP_ATTRIBUTES.TEST_MODE_ENABLE,
    ]
    
    constructor(public logger: LoggerService,public data: DataService, 
                  private router:Router,private route:ActivatedRoute,
                private renderer:Renderer,private elRef:ElementRef,
                private zone:NgZone,private translater:i18nService) {
      //this.data.resetTransferData();
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.ad.deviceType = this.activeDevice.deviceType;
      this.aslider = 'none';
      this.showSlider = false;
      this.data.setActiveComponent(this);
      this.detectorName = this.ad.btDeviceName;
      
      // else {
      //   this.loadingDataDone = true;
      // }
    }

  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  toggleclr() {
    this.ad.constantLightControlEnable = !this.ad.constantLightControlEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
  }
  togglecsb() {
    this.ad.considerSlaveBrightnessEnable = !this.ad.considerSlaveBrightnessEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.considerSlaveBrightnessEnable?1:0])
  }
  togglerrb() {
    this.ad.constantLightControlConsiderSlaveBrightnessEnable = !this.ad.constantLightControlConsiderSlaveBrightnessEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
  }
  togglemsd() {
    // this.ad.slaveModeEnable = ! this.ad.slaveModeEnable
    // this.data.addToSendData([SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.slaveModeEnable?1:0])
  }
  togglestp(){
    this.ad.shortTimePulseEnable= !this.ad.shortTimePulseEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.shortTimePulseEnable?1:0])
  }
  ngOnInit() {
    this.doDisConnect = true; 
    this.data.setMainTitle(this.translater.translate('Configure detector'));
    this.data.setOtherParam('','');
    this.data.setEDevParamsState(0);
    if(this.data.getDeviceConnectionState() == true){
      if(this.data.getFromRoot() == true )
        this.data.readData(this.readAttrs);
      else 
        this.loadingDataDone = true;
    }
    this.data.setProfileSwitch(true)
    // setTimeout(()=> 
    // this.data.testTestMode(), 5000
    // )
  }
  ngAfterContentInit() { 
  }
  ngAfterContentChecked() { 
  }
  ngAfterViewInit() { 
  }
  ngAfterViewChecked() { 
  }

  brThresholdChange(element){
    if(this.ad.brightnessThreshold <=this.ad.brightnessThresholdMin){
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
        element.value = this.ad.brightnessThreshold;
         this.zone.run( () => { // Change the property within the zone, CD will run after
            this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        });
      }
    if(this.ad.brightnessThreshold >= this.ad.brightnessThresholdMax){
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
        element.value = this.ad.brightnessThreshold;
          this.zone.run( () => { // Change the property within the zone, CD will run after
            this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        });
      }
  }

  showResetDialog() {
    this.data.setDialogTitle(this.translater.translate("Reset ")+ this.activeDevice.btDeviceName);
    this.data.setDialogText(this.translater.translate("Are you sure to set the ") +'"'+this.activeDevice.btDeviceName+'"' +this.translater.translate(" to factory adjustment?"));
    this.data.setShowModal(true);
    this.data.setResetCommand(0x02);
  }

  potentioMeterChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.POTENTIOMETER_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.potentiometerMode])
  }
  operationChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.OPERATION_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.operationMode])
  }
  reduceCount(item, isClick) {
    if(item == 'threshold') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold - 1;
      if(this.ad.brightnessThreshold <=this.ad.brightnessThresholdMin){
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
      }
      if(isClick){
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
      }
    }
    else if(item == 'setpoint'){
      this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPoint - 1;
      if(this.ad.constantLightBrightnessSetPoint <= this.ad.constantLightBrightnessSetPointMin){
        this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMin;
      }
      if(isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
      }
    }
    else if(item == 'sdelay') {
      this.ad.switchOffDelay = this.ad.switchOffDelay - 1;
      if(this.ad.switchOffDelay <= this.ad.switchOffDelayMin){
        this.ad.switchOffDelay = this.ad.switchOffDelayMin;
      }

      if(isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
      }
    }
  }

  setDevName(event: any){
    if(this.detectorName.length <= 0 ){
      this.data.setEDevParamsState(0)
    }else {
        var nameBytes = [];
        for (var i = 0; i < this.detectorName.length; i++){  
            nameBytes.push(this.detectorName.charCodeAt(i));
        }
        nameBytes.push(0)
        this.data.addToSendData([SCCP_ATTRIBUTES.BT_DEVICE_NAME,SCCP_DATATYPES.SCCP_TYPE_STRING,nameBytes])
    }
    this.data.setEDevParamsState(1)
  }
  setBrTr(event: any){
    if(event.target.value < this.ad.brightnessThresholdMin ){
      this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
      event.target.value = this.ad.brightnessThresholdMin;
    }
    if(event.target.value > this.ad.brightnessThresholdMax) {
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
        event.target.value = this.ad.brightnessThresholdMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
  }

  setBrSp(event: any){
    if(event.target.value < this.ad.constantLightBrightnessSetPointMin ){
      this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMin;
      event.target.value = this.ad.constantLightBrightnessSetPointMin;
    }
    if(event.target.value > this.ad.constantLightBrightnessSetPointMax) {
        this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMax;
        event.target.value = this.ad.constantLightBrightnessSetPointMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
  }

  setSoffDelay(event: any){
    if(event.target.value < this.ad.switchOffDelayMin ){
      this.ad.switchOffDelay = this.ad.switchOffDelayMin;
      event.target.value = this.ad.switchOffDelayMin;
    }
    if(event.target.value > this.ad.switchOffDelayMax) {
        this.ad.switchOffDelay = this.ad.switchOffDelayMax;
        event.target.value = this.ad.switchOffDelayMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
  }


  setCurrentBr(event: any) { // without type info
    this.ad.currentBrightness = event.target.value;
    this.data.addToSendData([SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.currentBrightness)])
  }

  brightnessChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1CurrentLevel)])
  }
  increaseCount(item,isClick) {
    if(item == 'threshold') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold + 1;
      if(this.ad.brightnessThreshold >= this.ad.brightnessThresholdMax){
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
      }
      if(isClick){
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
      }
    }
    else if(item == 'setpoint') {
          this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPoint + 1;
          if(this.ad.constantLightBrightnessSetPoint >= this.ad.constantLightBrightnessSetPointMax){
            this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMax;
          }
          if(isClick){
            this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
      }
    }
    else if(item == 'sdelay'){
          this.ad.switchOffDelay = this.ad.switchOffDelay + 1;
          if(this.ad.switchOffDelay >= this.ad.switchOffDelayMax){
            this.ad.switchOffDelay = this.ad.switchOffDelayMax;
          }
          if(isClick){
            this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
      }
    }
  }
   
  slideBrightnessIn() {
    this.aslider = 'in';
  }
  slideBrightnessOut() {
    this.aslider = 'out';
  }
  setActuatorBrightness() {
  }
  slideBackground (value) {
  let stringval = value.toString();
  let stylestr = "linear-gradient(to right,#2c435c " + stringval + "%, transparent 0%";
  let mystyles =  {
     'background': stylestr
  }
  return mystyles;
  }
  animationStarted($event) {
     if($event.toState == "in") {
        this.showSlider = true;
    } else if($event.toState == "in") {
      
    }
  }
  animationDone($event) {
    if($event.toState == "out") {
        this.showSlider = false;
    }
  }

  ngOnDestroy() {
    if(this.data.getShowTestMode () == 1){
      return;
    }else {
    this.unSubscriveDetails()
    this.data.setProfileSwitch(false)
    if(this.doDisConnect == true && this.data.getProfile() == 'electrician')
      this.data.disConnectDevice();
    }
    // this.data.unConfigureData(this.updateSubcribeAttrs)
    // this.data.unConfigureData(this.permanentSubscrioAttrs)
  }
  gotoActuator1(){
    this.doDisConnect = false;
    this.router.navigate(['eactuator1'],{relativeTo: this.route});
  }
  gotoActuator2(){
    this.doDisConnect = false;
    this.router.navigate(['eactuator2'],{relativeTo: this.route});
  }
  gotoOtherParams(otherparam,otherParamTitle){
    this.doDisConnect = false;
    if(otherparam == 'testmode'){
      this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,1])  
      this.data.sendChangedParams();      
    }
    otherParamTitle = this.translater.translate(otherParamTitle);
    this.data.setOtherParam(otherparam,otherParamTitle);
    this.router.navigate(['otherparams'],{relativeTo: this.route});
  }

  gotoaddParams(){
    this.doDisConnect = false;
    this.router.navigate(['addparams'],{relativeTo: this.route});
  }

  onNonArrayRead(){
    if(this.data.getDeviceConnectionState() == true){
      if(this.data.getFromRoot() == true )
        this.data.readArrayData(this.arrayReadAttrs);
      else 
        this.loadingDataDone = true;
    }
  }
  onBLEdata(isRead,iswrite) {
    if(iswrite == true){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        this.data.setEDevParamsState(0);
        this.loadingDataDone =  true;
      });
      this.loadingDataDone =  true;
    }
    if(isRead){
      setTimeout(()=> 
          this.subcribeForDetails(), 1000
      )
      setTimeout(()=> 
          this.subcribeForPermanentDetails(), 1000
      )
      this.data.setFromRoot(false);
      this.loadingDataDone =  true;
      this.setDeviceInfo();
      this.data.addDevice(this.ad,false);
      this.data.checkAndAddDeviceToInstalledDevices();
      this.zone.run( () => { // Change the property within the zone, CD will run after
          this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
          this.data.setEDevParamsState(0);
        });
    }else{
      this.onNonArrayRead();
    }
  }

  onReportBLEdata() {
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
      });
  }

  setDeviceInfo(){
    let data = this.data.getSelectedDevice(false);
    this.ad.btDeviceName = data.btDeviceName;
    this.detectorName = this.ad.btDeviceName;
    this.ad.btAddress = data.btAddress;
    this.ad.btIAddress = data.btIAddress;
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
  }
  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
  subcribeForDetails(){
    this.data.configureData(this.updateSubcribeAttrs)
  }

  subcribeForPermanentDetails(){
    this.data.configureData(this.permanentSubscrioAttrs)
  }
  unSubscriveDetails(){
    this.data.unConfigureData(this.updateSubcribeAttrs)
    this.data.unConfigureData(this.permanentSubscrioAttrs)
  }
}
