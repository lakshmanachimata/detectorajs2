import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,ViewChild} from '@angular/core';
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

  constructor(public logger: LoggerService,private router:Router,public data:DataService) {
  }
  ngOnChanges(changes) { 
  }

  onPanStartHours(event: any): void {
    console.log('onPanStartHours called')
  }

  onPanHours(event: any): void {
    event.preventDefault();
    console.log('onPanHours called')
  }

  onPanStartMins(event: any): void {
    console.log('onPanStartMins called')
  }

  onPanMins(event: any): void {
    event.preventDefault();
    console.log('onPanMins called')
  }

  ngOnInit() { 
  }
  ngDoCheck() { 
  }
  ngAfterContentInit() { 
    this.data.setDrumElement(this.bjehours)
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

  cancelStuff() {
      this.data.setTimeModal(false);
  }
  doStuff() {
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
