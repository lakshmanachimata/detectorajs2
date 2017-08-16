import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,ViewChild,Input,Output} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'settime-root',
  templateUrl: './settime.component.html',
  styleUrls: ['./settime.component.css'],
})

export class SetTimeComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
  
  @ViewChild('bjehours') bjehours;
  @ViewChild('bjeminutes') bjeminutes
  @ViewChild('bjeseconds') bjeseconds

  timeHours = -1;
  timeMins = -1;
  timeSecs =-1;

  constructor(public logger: LoggerService,private router:Router,public data:DataService) {
  }
  ngOnChanges(changes) { 
  }


  ngOnInit() { 
    this.timeHours= this.data.getTimeHours();
    this.timeMins= this.data.getTimeMins();
    this.timeSecs= this.data.getTimeSecs();
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
    if(this.timeHours >= 0){
      this.bjehours.nativeElement.selectedIndex = this.timeHours;
      this.data.setDrumElement(this.bjehours)
    }
    if(this.timeMins >= 0){
      this.bjeminutes.nativeElement.selectedIndex = this.timeMins;
      this.data.setDrumElement(this.bjeminutes)
    }
    if(this.timeSecs >= 0){
      this.bjeseconds.nativeElement.selectedIndex = this.timeSecs;
      this.data.setDrumElement(this.bjeseconds)
    }
  }
  ngOnDestroy() { 
    this.timeHours = -1;
    this.timeMins = -1;
    this.timeSecs =-1;
  }

  getArrowType() {
  }
  public getHeader() {
  }

  cancelStuff() {
      this.data.setTimeModal(false);
  }
  doStuff() {
    if(this.data.getTimeComponent() != undefined){
      this.data.getTimeComponent().setTimeBackToParent();
    }
      this.data.setTimeModal(false);
  }
  getIfShowCancel(){
  }
  getOptionsCount(){
  }
  getOptionsText(){
  }
  getDialiogTitleColor(){
  }
  getDialogOptionColor(){
  }
  getProfile() {
    return this.data.getProfile();
  }
}
