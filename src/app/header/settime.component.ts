import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'settime-root',
  templateUrl: './settime.component.html',
  styleUrls: ['./header.component.css'],
})

export class SetTimeComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
  
  constructor(public logger: LoggerService,private router:Router,public data:DataService) {
  }
  ngOnChanges(changes) { 
  }
  ngOnInit() { 
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
