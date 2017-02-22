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
    deviceType = -1;
    ad:any;
    perOn = false;
    perOff = false;
    softOn = false;
    softOff = false;
  onLabel = 'on';
  offLabel = 'off';
  constructor(private logger: LoggerService,private data: DataService, private router:Router) {
      this.activeDevice = this.data.getSelectedDevice();
      this.ad = this.data.getDevicedata();
      this.deviceType = data.getSelectedDeviceType();
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
     }
  }
}
