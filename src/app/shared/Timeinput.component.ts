import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,Input,Output,EventEmitter,NgZone} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'timeinput',
  templateUrl: './timeinput.component.html',
  styleUrls: ['./timeinput.component.css'],
})

export class TimeInputComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  
  @Input() timeType: String;
  @Input() timeValue: number;
  @Input() parentComponent: any;
  @Input() timeHours: number;
  @Input() timeMins: number;
  @Input() timeSecs: number;

  
  @Output() setTimeBack = new EventEmitter<any>();

  showTimeDialog = false;
  constructor(public logger: LoggerService,private router:Router,public data:DataService,public zone:NgZone) {
  }
  ngOnChanges(changes) { 
  }
  ngOnInit(){ 
  }
  showTimeInPut(timeType){
      this.data.setTimeHours(this.timeHours);
      this.data.setTimeMins(this.timeMins);
      this.data.setTimeSecs(this.timeSecs);
      this.zone.run( () => {
        this.data.setTimeModal(true);
        this.ngOnChanges(''); 
        this.data.setTimeComponent(this);
      });
  }

  setTimeBackToParent(){
    this.setTimeBack.emit(this.timeType);
    this.data.setTimeComponent(undefined);
  }

  ngDoCheck() { 
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

  getArrowType() {
  }
  public getHeader() {
  }
}
