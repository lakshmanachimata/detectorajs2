import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
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


  activeTab = 1;
  activeDevice:any;
  ad:any;
  maxYear = 0;
  maxMonth = 0;
  showData:any;
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
  }

  setActiveTab(tab) {
    this.activeTab = tab;
  }

  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.maxMonth = Math.max.apply(Math,this.ad.service.energy_monitor.energy_monitor_month_data.map(function(o){return o.data;}));
    this.maxYear = Math.max.apply(Math,this.ad.service.energy_monitor.energy_monitor_year_data.map(function(o){return o.data;}));
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
  onBLEdata(dataType, dataValue) {
    
  }
}
