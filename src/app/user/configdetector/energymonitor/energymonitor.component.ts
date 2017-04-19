import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'energymonitor-root',
  templateUrl: './energymonitor.component.html',
  styleUrls: ['../cdetectoru.component.css']
})
export class EnergyMonitorComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

TotalSavingsMonthText = "Total savings";
currentDurationMonthText="Current duration of monthly light";
currentDurationYearText="Current duration of yearly light";
currentDurationMonthValue = 213;
currentDurationYearValue = 3130;
TotalSavingsMonthValue = 23;
TotalSavingsYearValue = 759;

  loadingDataDone = false;
  activeTab = 1;
  activeDevice:any;
  ad:any;
  maxYear = 0;
  maxMonth = 0;
  showData:any;
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      this.data.setMainTitle('Energy monitor')
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.maxMonth = Math.max.apply(Math,this.ad.energy_monitor.energy_monitor_month_data.map(function(o){return o.data;}));
    this.maxYear = Math.max.apply(Math,this.ad.energy_monitor.energy_monitor_year_data.map(function(o){return o.data;}));
    this.maxMonth = (Math.round(this.maxMonth/10)*10) + 10;
    this.maxYear = (Math.round(this.maxYear/10)*10) + 10;
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
  gotoReference() {
      this.router.navigate(['emreference'],{relativeTo: this.route});
      this.data.setShowOnlyCancel(false);
  }
  resetEM() {
    this.data.setDialogTitle("Reset ");
    this.data.setDialogText("Reset energy monitor");
    this.data.setShowModal(true);
  }
  getStyle (data, isYear) {
    let percentage;
    if(isYear ==  true) {
        percentage =  data.data / this.maxYear;
    }else {
      percentage =  data.data / this.maxMonth;
    }
    let stringval = data.data.toString();
    let stylestr = "" + (percentage * 100) + "%";
    let mystyles =  {
      'height': stylestr
    }
    return mystyles;
  }
  showDataForBar(data) {
    this.showData = data;
  }
  getShowData(data) {
    if(this.showData != 'undefined'){
      return (this.showData == data);
    } else {
      return false;
    }
  }
  onBLEdata() {
        this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad ;
        this.data.setEDevParamsState(0);
      });
  }
}
