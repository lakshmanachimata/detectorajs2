import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'cdetectoru-root',
  templateUrl: './cdetectoru.component.html',
  styleUrls: ['./cdetectoru.component.css']
})
export class CDetectorUComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    
    activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    
    light1state = 0;
    constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
    }

  slideBackground (value) {
    let stringval = value.toString();
    let stylestr = "linear-gradient(to right,#2c435c " + stringval + "%, transparent 0%";
    let mystyles =  {
      'background': stylestr
    }
    return mystyles;
  }

  slideNext() {
    this.light1state = this.light1state + 1;
  }

  slidePrev() {
    this.light1state = this.light1state - 1;
  }
  gotoEnergySettings() {
    this.router.navigate(['energymonitor'],{relativeTo: this.route});
    //this.data.setShowOnlyCancel(false);
  }
  gotoSettings() {
    this.router.navigate(['settingsu'],{relativeTo: this.route});
    this.data.setShowOnlyCancel(false);
  }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setOtherParam('','');
    this.data.setShowOnlyCancel(true);
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
    paramsChanged() {
    this.data.setEDevParamsState(1);
  }
  onBLEdata(dataType, dataValue) {
    
  }
  
}
