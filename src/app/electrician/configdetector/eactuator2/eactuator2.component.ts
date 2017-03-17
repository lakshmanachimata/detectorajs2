import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'eactuator2-root',
  templateUrl: './eactuator2.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EActuator2Component implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  constructor(private logger: LoggerService,private data: DataService, private router:Router) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle('Settings of actuator2');
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
  reduceCount(item){
    if(item == 'sondelay') {
      this.ad.actuator2.durable_on_off_switching.duration_on = this.ad.actuator2.durable_on_off_switching.duration_on -1;
    }else if(item == 'soffdelay') {
      this.ad.actuator2.durable_on_off_switching.duration_off = this.ad.actuator2.durable_on_off_switching.duration_off -1;
    }

  }
  increaseCount(item) {
 if(item == 'sondelay') {
      this.ad.actuator2.durable_on_off_switching.duration_on = this.ad.actuator2.durable_on_off_switching.duration_on + 1;
    }else if(item == 'soffdelay') {
      this.ad.actuator2.durable_on_off_switching.duration_off = this.ad.actuator2.durable_on_off_switching.duration_off + 1;
    }
  }
  onBLEdata() {
    
  }
}
