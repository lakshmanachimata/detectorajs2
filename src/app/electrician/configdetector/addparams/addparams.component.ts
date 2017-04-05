import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
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
    loadingDataDone = false;
    readAttrs =[
          SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,
          SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,
          SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,
          ]


  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute, private zone:NgZone) {
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
    this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range = this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range - 1;
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range])
  }

  increaseBrightness(item) {
    this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range = this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range + 1;
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.range])
  }

  toggledsd(){
    this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay = !this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay;
    this.data.addToSendData([SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.sensor_settings.additional_sensor_parameters.dynamic_switch_off_delay?1:0])
  }
  onBLEdata() {
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.enable = this.ad.sensor_settings.additional_sensor_parameters.brightness_correction.enable ;
      });
  }
}
