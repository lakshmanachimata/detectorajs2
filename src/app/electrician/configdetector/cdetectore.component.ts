import { Component ,trigger, state, animate, transition, style, OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,Renderer, ViewChild, ElementRef,NgZone} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../data.service';
import {SCCP_ATTRIBUTES} from'../../data.service';

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
    onLabel = 'on';
    offLabel = 'off';
    brthresholderror = false;
    brsetpointerror = false;
    sdelayerror = false;
    aslider = 'none';
    currentBrightness = '450 lx';
    showSlider = false;
    brSubScribed = false;
    loadingDataDone = false;
    readAttrs =[
                SCCP_ATTRIBUTES.POTENTIOMETER_MODE,                                       
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,                                     
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,                                 
                SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,                                 
                SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE,                        
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE,                            
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,                      
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN,                  
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX,                  
                SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE,  
                SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,                                  
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,                                        
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,                                     
                SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,                                     
                SCCP_ATTRIBUTES.OPERATION_MODE,                                           
                SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,
                SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL
                ]
    constructor(private logger: LoggerService,private data: DataService, 
                  private router:Router,private route:ActivatedRoute,
                private renderer:Renderer,private elRef:ElementRef,
                private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.aslider = 'none';
      this.showSlider = false;
      this.data.setActiveComponent(this);
      this.data.setEDevParamsState(0);
      if(this.data.getDeviceConnectionState() == true){
        this.data.readData(this.readAttrs);
      }
      // else {
      //   this.loadingDataDone = true;
      // }
    }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  toggleclr() {
    this.ad.constantLightControlEnable = !this.ad.constantLightControlEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
    this.data.setEDevParamsState(1);
  }
  togglecsb() {
    this.ad.constantLightControlEnable = !this.ad.constantLightControlEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
    this.data.setEDevParamsState(1);
  }
  togglerrb() {
    this.ad.constantLightControlConsiderSlaveBrightnessEnable = !this.ad.constantLightControlConsiderSlaveBrightnessEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
    this.data.setEDevParamsState(1);
  }
  togglemsd() {
    this.ad.slaveModeEnable = !this.ad.slaveModeEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.constantLightControlEnable?1:0])
    this.data.setEDevParamsState(1);
  }
  togglestp(){
    this.ad.shortTimePulseEnable= !this.ad.shortTimePulseEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.shortTimePulseEnable?1:0])
    this.data.setEDevParamsState(1);
  }
  ngOnInit() {
    this.data.setMainTitle('Config detector');
    this.currentBrightness = this.data.getCurrentBrightness();
    this.data.setOtherParam('','');
    this.data.setEDevParamsState(0);
  }
  ngAfterContentInit() { 
  }
  ngAfterContentChecked() { 
  }
  ngAfterViewInit() { 
  }
  ngAfterViewChecked() { 
  }

  showResetDialog() {
    this.data.setDialogTitle("Reset "+ this.activeDevice.btDeviceName);
    this.data.setDialogText("Are you sure to set the " +'"'+this.activeDevice.btDeviceName+'"' +" to factory adjustment?" );
    this.data.setShowModal(true);
  }

  longPressingEnd(item){
    if(item == 'threshold') {
      this.data.addToSendData([SCCP_ATTRIBUTES.POTENTIOMETER_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.potentiometerMode])
      this.data.setEDevParamsState(1);
    }else if(item == 'setpoint') {
        this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
        this.data.setEDevParamsState(1);
    }else if(item == 'sdelay') {
       this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
        this.data.setEDevParamsState(1);
    }
  }

  gotoaddParams(){
    this.router.navigate(['addparams'],{relativeTo: this.route});
  }

  potentioMeterChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.POTENTIOMETER_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.potentiometerMode])
    this.data.setEDevParamsState(1);
  }
  operationChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.OPERATION_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.operationMode])
    this.data.setEDevParamsState(1);
  }
  reduceBrightness(item, isClick) {
    if(item == 'threshold') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold - 1;
      if(isClick){
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
        this.data.setEDevParamsState(1);
      }
    }
    else if(item == 'setpoint'){
      this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPoint - 1;
      if(isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
        this.data.setEDevParamsState(1);
      }
    }
    else if(item == 'sdelay') {
      this.ad.switchOffDelay = this.ad.switchOffDelay - 1;
      if(isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
        this.data.setEDevParamsState(1);
      }
    }
    this.validatebrparams(item)
  }

  brightnessChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.ad.ch1CurrentLevel])
    this.data.setEDevParamsState(1);
  }
  increaseBrightness(item,isClick) {
    if(item == 'threshold') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold + 1;
      if(isClick){
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
         this.data.setEDevParamsState(1);
      }
    }
    else if(item == 'setpoint') {
          this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPoint + 1;
          if(isClick){
            this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
             this.data.setEDevParamsState(1);
      }
    }
    else if(item == 'sdelay'){
          this.ad.switchOffDelay = this.ad.switchOffDelay + 1;
          if(isClick){
            this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
             this.data.setEDevParamsState(1);
      }
    }
    this.validatebrparams(item) 
  }

  


getMystyle(item) {
    let styleValue;
    if(item == false){
      styleValue = "float: right; \
      font-size: 12px;\
    margin-right: 5px;\
    margin-top: 10px;\
    color: #212e40;\
    padding: 3px;\
    border-radius: 2px;\
    border: 1px solid #212e40;"
    }else {
      styleValue = "float: right; \
      font-size: 12px;\
      margin-right: 5px;\
      margin-top: 10px;\
      color: #ffffff;\
      padding: 3px;\
      border-radius: 2px;\
      background-color: #212e40;\
      border: 1px solid #212e40;"
    }
    let mystyles =  {
      styleValue
    }
    return mystyles;
    
  }
  
  validatebrparams(item) {
    if(item == 'threshold') {
      if(this.ad.brightnessThreshold < 10 || 
      this.ad.brightnessThreshold >2000) {
        this.brthresholderror =  true;
      }else {
        this.brthresholderror =  false;
      }
    }else if(item == 'setpoint') {
      if(this.ad.constantLightBrightnessSetPoint < 10 || 
      this.ad.constantLightBrightnessSetPoint >2000) {
        this.brsetpointerror =  true;
      }else {
        this.brsetpointerror =  false;
      }
    }else  if(item == 'sdelay') {
      if(this.ad.switchOffDelay < 10 && this.ad.switchOffDelay > 1800) {
        this.sdelayerror = true;
      }else {
        this.sdelayerror = false;
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
  }
  paramsChanged() {
    this.data.setEDevParamsState(1);
  }
  gotoActuator1(){
    this.router.navigate(['eactuator1'],{relativeTo: this.route});
  }
  gotoActuator2(){
    this.router.navigate(['eactuator2'],{relativeTo: this.route});
  }
  gotoOtherParams(otherparam,otherParamTitle){
    this.data.setOtherParam(otherparam,otherParamTitle);
    this.router.navigate(['otherparams'],{relativeTo: this.route});
  }

  onBLEdata() {
    this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
      });
  }

  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }

  onDeviceConnected(deviceAddress){
    this.loadingDataDone = false;
    this.data.readData(this.readAttrs);
  }
}
