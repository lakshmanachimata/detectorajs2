import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
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
  ad:any;
  loadingDataDone = false;
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
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
  reduceCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad -1;
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration -1;
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price -1;
    }
  }


  increaseCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad + 1;
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration + 1;
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price + 1;
    }
  }
  
  onBLEdata() {
    this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad ;
      });
  }

    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }


}
