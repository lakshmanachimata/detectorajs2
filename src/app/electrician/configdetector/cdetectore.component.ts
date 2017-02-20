import { Component ,trigger, state, animate, transition, style, OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,Renderer, ViewChild, ElementRef} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'cdetectore-root',
  templateUrl: './cdetectore.component.html',
  styleUrls: ['./cdetectore.component.css'],
  animations: [
      trigger('slideIn', [
        state('*', style({
            transform: 'translateX(+100%)',
        })),
        state('in', style({
            width:'300px',
            transform: 'translateX(0%)',
        })),
        state('out',   style({
            transform: 'translateX(+100%)',
        })),
        transition('* => in', animate('500ms ease-in')),
        transition('in => out', animate('500ms ease-in')),
        ])
    ]
})
export class CDetectorEComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    
    activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    deviceType = -1;
    brthresholderror = false;
    brsetpointerror = false;
    aslider = 'none';
    currentBrightness = '450 lx';
    showSlider = false;
    constructor(private logger: LoggerService,private data: DataService, 
                  private router:Router,private route:ActivatedRoute,
                private renderer:Renderer,private elRef:ElementRef) {
      this.activeDevice = this.data.getSelectedDevice();
      this.ad = this.data.getDevicedata();
      this.deviceType = data.getSelectedDeviceType();
      this.data.setFooter(true);
      this.aslider = 'none';
      this.showSlider = false;
    }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Config detector');
    this.currentBrightness = this.data.getCurrentBrightness();
  }
  ngAfterContentInit() { 
  }
  ngAfterContentChecked() { 
  }
  ngAfterViewInit() { 
  }
  ngAfterViewChecked() { 
  }

  gotoaddParams(){
    this.router.navigate(['addparams'],{relativeTo: this.route});
  }

  reduceBrightness(item) {
    if(item == 'threshold')
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold - 1;
    else if(item == 'setpoint')
          this.ad.sensor_settings.brightness_setpoint = this.ad.sensor_settings.brightness_setpoint - 1;
    this.validatebrparams(item)
  }

  increaseBrightness(item) {
    if(item == 'threshold')
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold + 1;
    else if(item == 'setpoint')
          this.ad.sensor_settings.brightness_setpoint = this.ad.sensor_settings.brightness_setpoint + 1;
    this.validatebrparams(item)  
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
}
