import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';

@Component({
  selector: 'addparams-root',
  templateUrl: './addparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EAddParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    currentBrightness = '450 lx';
    brrangeerror = false;

  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Additional sensor paramters');
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
  ngOnDestroy() {
  }
  toggleBr(){
   this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.enable = !this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.enable;
   this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.enable?1:0])
  }
  gotoSensitivity() {
    this.router.navigate(['sensitivity'],{relativeTo: this.route})
  }
  reduceBrightness(item) {
    this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on - 1;
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.actuator1.durable_on_off_switching.duration_on])
  }

  increaseBrightness(item) {
    this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on + 1;
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.actuator1.durable_on_off_switching.duration_on])
  }

  toggledsd(){
    this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay = !this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay;
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay?1:0])
  }
  onBLEdata() {
    
  }
}
