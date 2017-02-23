import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'settingsu-root',
  templateUrl: './settingsu.component.html',
  styleUrls: ['../cdetectoru.component.css']
})
export class SettingsuComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  presenceSimulationEnable = true;
  activeDevice:any;
  deviceType = -1;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  brightnessError = false;
  currentBrightness = '450 lx';
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice();
      this.ad = this.data.getDevicedata();
      this.deviceType = data.getSelectedDeviceType();
  }

  setActiveTab(tab) {
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
  ngOnDestroy() {
  }
  reduceVal(item) {
    if(item == 'brightness') {
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold- 1;
    }else if(item == 'soff') {
      this.ad.sensor_settings.switch_off_delay = this.ad.sensor_settings.switch_off_delay- 1;
    }else if(item == 'illuminationstart') {
      this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time - 1;
    }
    else if(item == 'illuminationend') {
      this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time - 1;
    }
    else if(item == 'glarestart') {
      this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time - 1;
    }
    else if(item == 'glareend') {
      this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time - 1;
    }

  }
  increaseVal(item) {
    if(item == 'brightness') {
      this.ad.sensor_settings.brightness_threshold = this.ad.sensor_settings.brightness_threshold + 1;
    }else if(item == 'soff') {
      this.ad.sensor_settings.switch_off_delay = this.ad.sensor_settings.switch_off_delay + 1;
    }else if(item == 'illuminationstart') {
      this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time + 1;
    }
    else if(item == 'illuminationend') {
      this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time + 1;
    }else if(item == 'glarestart') {
      this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time + 1;
    }
    else if(item == 'glareend') {
      this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time + 1;
    }
  }
}
