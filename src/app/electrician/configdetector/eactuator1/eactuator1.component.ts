import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';



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
  onLabel = 'on';
  offLabel = 'off';
  constructor(private logger: LoggerService,private data: DataService, private router:Router) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
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
  reduceCount(item) {
    if(item == 'peron') {
      this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on - 1;
      this.validateParam(item);
    } else if(item == 'peroff') {
      this.ad.actuator1.durable_on_off_switching.duration_off = this.ad.actuator1.durable_on_off_switching.duration_off - 1;
      this.validateParam(item);
    } else if(item == 'softon' && (this.ad.actuator1.soft_switching.on.range > 1 && this.ad.actuator1.soft_switching.on.range <= 60)){
      this.ad.actuator1.soft_switching.on.range = this.ad.actuator1.soft_switching.on.range - 1;
      this.validateParam(item);
    } else if(item == 'softoff' && (this.ad.actuator1.soft_switching.off.range > 1 && this.ad.actuator1.soft_switching.off.range <= 60)){
      this.ad.actuator1.soft_switching.off.range = this.ad.actuator1.soft_switching.off.range - 1;
      this.validateParam(item);
    } else if(item == 'minload') {
        this.ad.actuator1.misc_settings.load_output.minimum.value = this.ad.actuator1.misc_settings.load_output.minimum.value - 1;
        this.validateParam(item);
    } else if(item == 'maxload') {
        this.ad.actuator1.misc_settings.load_output.maximum.output_value = this.ad.actuator1.misc_settings.load_output.maximum.output_value - 1;
        this.validateParam(item);
    } else if(item == 'burnduration' && (this.ad.actuator1.fluorescent_lamps.burn_in_hours > 1 && this.ad.actuator1.fluorescent_lamps.burn_in_hours <= 250)){
      this.ad.actuator1.fluorescent_lamps.burn_in_hours = this.ad.actuator1.fluorescent_lamps.burn_in_hours - 1;
      this.validateParam(item);
    }else if(item == 'brightstart') {
        this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time - 1;
        this.validateParam(item);
    } else if(item == 'brightend') {
        this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time - 1;
        this.validateParam(item);
    }else if(item == 'glarestart') {
        this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time - 1;
        this.validateParam(item);
    } else if(item == 'glareend') {
        this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time - 1;
        this.validateParam(item);
    }else if(item == 'sstime') {
        this.ad.actuator1.time_shifted_switch_off.switch_off_time = this.ad.actuator1.time_shifted_switch_off.switch_off_time - 1;
        this.validateParam(item);
    } else if(item == 'ssinter') {
        this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness = this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness - 1;
        this.validateParam(item);
    }
  }

  increaseCount(item) {
    if(item == 'peron') {
      this.ad.actuator1.durable_on_off_switching.duration_on = this.ad.actuator1.durable_on_off_switching.duration_on + 1;
      this.validateParam(item);
    }  else if(item == 'peroff') {
      this.ad.actuator1.durable_on_off_switching.duration_off = this.ad.actuator1.durable_on_off_switching.duration_off + 1;
      this.validateParam(item);
    } else if(item == 'softon' && (this.ad.actuator1.soft_switching.on.range >= 1 && this.ad.actuator1.soft_switching.on.range < 60)) {
      this.ad.actuator1.soft_switching.on.range = this.ad.actuator1.soft_switching.on.range + 1;
      this.validateParam(item);
    } else if(item == 'softoff' && (this.ad.actuator1.soft_switching.off.range >= 1 && this.ad.actuator1.soft_switching.off.range < 60)){
      this.ad.actuator1.soft_switching.off.range = this.ad.actuator1.soft_switching.off.range + 1;
      this.validateParam(item);
    } else if(item == 'minload') {
        this.ad.actuator1.misc_settings.load_output.minimum.value = this.ad.actuator1.misc_settings.load_output.minimum.value + 1;
      this.validateParam(item);
    } else if(item == 'maxload') {
        this.ad.actuator1.misc_settings.load_output.maximum.output_value = this.ad.actuator1.misc_settings.load_output.maximum.output_value + 1;
      this.validateParam(item);
    } else if(item == 'burnduration' && (this.ad.actuator1.fluorescent_lamps.burn_in_hours >= 1 && this.ad.actuator1.fluorescent_lamps.burn_in_hours < 250)){
      this.ad.actuator1.fluorescent_lamps.burn_in_hours = this.ad.actuator1.fluorescent_lamps.burn_in_hours + 1;
      this.validateParam(item);
    }else if(item == 'brightstart') {
        this.ad.actuator1.basic_illumination.start_time = this.ad.actuator1.basic_illumination.start_time + 1;
        this.validateParam(item);
    } else if(item == 'brightend') {
        this.ad.actuator1.basic_illumination.end_time = this.ad.actuator1.basic_illumination.end_time + 1;
        this.validateParam(item);
    }else if(item == 'glarestart') {
        this.ad.actuator1.night_time_anti_glare_function.start_time = this.ad.actuator1.night_time_anti_glare_function.start_time +  1;
        this.validateParam(item);
    } else if(item == 'glareend') {
        this.ad.actuator1.night_time_anti_glare_function.end_time = this.ad.actuator1.night_time_anti_glare_function.end_time + 1;
        this.validateParam(item);
    }else if(item == 'sstime') {
        this.ad.actuator1.time_shifted_switch_off.switch_off_time = this.ad.actuator1.time_shifted_switch_off.switch_off_time +  1;
        this.validateParam(item);
    } else if(item == 'ssinter') {
        this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness = this.ad.actuator1.time_shifted_switch_off.intermediate_stage_brightness + 1;
        this.validateParam(item);
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
}
