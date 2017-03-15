import { Component ,trigger, state, animate, transition, style, OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,Renderer, ViewChild, ElementRef,NgZone} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../data.service';
import {SCCP_ATTRIBUTES} from'../../data.service';


declare var configureReporting;
declare var writeAttr;

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
    configureReportingObj:any;
    writeAttrObj:any;
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
    }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Config detector');
    this.currentBrightness = this.data.getCurrentBrightness();
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

  showResetDialog() {
    this.data.setDialogTitle("Reset "+ this.activeDevice.btDeviceName);
    this.data.setDialogText("Are you sure to set the " +'"'+this.activeDevice.btDeviceName+'"' +" to factory adjustment?" );
    this.data.setShowModal(true);
  }

  gotoaddParams(){
    this.router.navigate(['addparams'],{relativeTo: this.route});
  }

  reduceBrightness(item) {
    if(item == 'threshold')
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold - 1;
    else if(item == 'setpoint')
          this.ad.sensor_settings.brightness_setpoint = this.ad.sensor_settings.brightness_setpoint - 1;
    else if(item == 'sdelay')
      this.ad.sensor_settings.switch_off_delay = this.ad.sensor_settings.switch_off_delay - 1;
    this.validatebrparams(item)
    this.writeAttrObj = new writeAttr([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.sensor_settings.brightness_threshold]);
  }

  increaseBrightness(item) {
    if(item == 'threshold')
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold + 1;
    else if(item == 'setpoint')
          this.ad.sensor_settings.brightness_setpoint = this.ad.sensor_settings.brightness_setpoint + 1;
    else if(item == 'sdelay')
          this.ad.sensor_settings.switch_off_delay = this.ad.sensor_settings.switch_off_delay + 1;
    this.validatebrparams(item) 
    this.writeAttrObj = new writeAttr([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.sensor_settings.brightness_threshold]);
    }

  subScribeThreshold() {
    this.brSubScribed = !this.brSubScribed;
    this.configureReportingObj =  new configureReporting([ SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,0x03,0x0A]);
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
      if(this.ad.sensor_settings.brightness_threshold < 10 || 
      this.ad.sensor_settings.brightness_threshold >2000) {
        this.brthresholderror =  true;
      }else {
        this.brthresholderror =  false;
      }
    }else if(item == 'setpoint') {
      if(this.ad.sensor_settings.brightness_setpoint < 10 || 
      this.ad.sensor_settings.brightness_setpoint >2000) {
        this.brsetpointerror =  true;
      }else {
        this.brsetpointerror =  false;
      }
    }else  if(item == 'sdelay') {
      if(this.ad.sensor_settings.switch_off_delay < 10 && this.ad.sensor_settings.switch_off_delay > 1800) {
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
  deviceNameChanged(nameChanged) {
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

  onBLEdata(dataType, dataValue) {
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.sensor_settings.brightness_threshold = dataValue;
      });
  }
}
