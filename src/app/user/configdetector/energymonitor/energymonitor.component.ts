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
onDurationWeek=[{month:"April",week:"CW04",value:40},{month:"April",week:"CW05",value:52},
                {month:"April",week:"CW06",value:30},{month:"April",week:"CW07",value:22},];

onDurationYear=[
        { month: "Jan", year: 2015, value: 89},
        { month: "Feb", year: 2015, value: 43},
        { month: "Mar", year: 2015, value: 67},
        { month: "Apr", year: 2015, value: 46},
        { month: "May", year: 2015, value: 78},
        { month: "Jun", year: 2015, value: 24},
        { month: "Jul", year: 2015, value: 65},
        { month: "Aug", year: 2015, value: 43},
        { month: "Sep", year: 2015, value: 45},
        { month: "Oct", year: 2015, value: 78},
        { month: "Nov", year: 2015, value: 78},
        { month: "Dec", year: 2015, value: 50},
        { month: "Jan", year: 2016, value: 30},
        { month: "Feb", year: 2016, value: 45},
        { month: "Mar", year: 2016, value: 67},
        { month: "Apr", year: 2016, value: 76},
        { month: "May", year: 2016, value: 56},
        { month: "Jun", year: 2016, value: 35},
        { month: "Jul", year: 2016, value: 65},
        { month: "Aug", year: 2016, value: 43},
        { month: "Sep", year: 2016, value: 89},
        { month: "Oct", year: 2016, value: 78},
        { month: "Nov", year: 2016, value: 67},
        { month: "Dec", year: 2016, value: 65},

        ]

  activeTab = 1;
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute) {
  }

  setActiveTab(tab) {
    this.activeTab = tab;
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
  gotoReference() {
      this.router.navigate(['emreference'],{relativeTo: this.route});
      this.data.setShowOnlyCancel(false);
  }
  resetEM() {
    this.data.setDialogTitle("Reset ");
    this.data.setDialogText("Reset energy monitor");
    this.data.setShowModal(true);
  }
}
