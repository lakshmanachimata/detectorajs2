import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'other-root',
  templateUrl: './otherparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EOtherParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  showFitterPin = false;
  showUserPin = false;
  DeactivateOp = false;
  A1LoadIdentify = false;
  A2LoadIdentify = false;
  masterQuad = 'q1';
  
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle(this.data.getOtherParamTitle());
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
  getOtherParam() {
    return this.data.getOtherParam();
  }
  reduceCount(item) {
    if(item == 'cload') {
      this.ad.service.energy_monitor.connected_load = this.ad.service.energy_monitor.connected_load - 1;
    }else if(item == 'lduration') {
      this.ad.service.energy_monitor.lighting_duration_per_week = this.ad.service.energy_monitor.lighting_duration_per_week - 1;
    }else if(item == 'eprice') {
      this.ad.service.energy_monitor.electricity_price = this.ad.service.energy_monitor.electricity_price - 1;
    }

  }
  increaseCount(item) {
    if(item == 'cload') {
      this.ad.service.energy_monitor.connected_load = this.ad.service.energy_monitor.connected_load + 1;
    }else if(item == 'lduration') {
      this.ad.service.energy_monitor.lighting_duration_per_week = this.ad.service.energy_monitor.lighting_duration_per_week + 1;
    }else if(item == 'eprice') {
      this.ad.service.energy_monitor.electricity_price = this.ad.service.energy_monitor.electricity_price + 1;
    }
  }
  onBLEdata() {
    
  }
}
