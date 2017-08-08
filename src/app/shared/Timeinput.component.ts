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
  
  @Input() timeHours: number;
  @Input() timeMins: number;
  @Input() timeSecs: number;
  
  @Output() setTimeBack = new EventEmitter<any>();

  showTimeDialog = false;
  constructor(public logger: LoggerService,private router:Router,public data:DataService,public zone:NgZone) {
  }
  ngOnChanges(changes) { 
  }
  ngOnInit() { 
  }
  showTimeInPut(timeType){
    console.log('OPEN TIME FOR   ' + timeType)
      this.zone.run( () => {
        this.data.setTimeModal(true);
        this.ngOnChanges(''); 
      });
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
