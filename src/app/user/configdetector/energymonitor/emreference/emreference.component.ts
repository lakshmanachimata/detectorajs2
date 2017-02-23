import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'emreference-root',
  templateUrl: './emreference.component.html',
  styleUrls: ['../../cdetectoru.component.css']
})
export class EMReferenceComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{


  eCurrency = false;
  cLoad = false;
  lDuration = false;
  activeDevice:any;
  deviceType = -1;
  ad:any;
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
    if(item == 'cload') {
      this.ad.service.energy_monitor.connected_load = this.ad.service.energy_monitor.connected_load -1;
    }else if(item == 'lduration') {
      this.ad.service.energy_monitor.lighting_duration_per_week = this.ad.service.energy_monitor.lighting_duration_per_week -1;
    }else if(item == 'eprice') {
      this.ad.service.energy_monitor.electricity_price = this.ad.service.energy_monitor.electricity_price -1;
    }
  }
  increaseVal(item) {
    if(item == 'cload') {
      this.ad.service.energy_monitor.connected_load = this.ad.service.energy_monitor.connected_load + 1;
    }else if(item == 'lduration') {
      this.ad.service.energy_monitor.lighting_duration_per_week = this.ad.service.energy_monitor.lighting_duration_per_week + 1;
    }else if(item == 'eprice') {
      this.ad.service.energy_monitor.electricity_price = this.ad.service.energy_monitor.electricity_price + 1;
    }
  }
}
