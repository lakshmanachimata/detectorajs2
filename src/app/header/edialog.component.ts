import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'edialog-root',
  templateUrl: './edialog.component.html',
  styleUrls: ['./header.component.css'],
})

export class EDialogComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    inputtext = '';
  constructor(public logger: LoggerService,private router:Router,public data:DataService) {     
  }
  ngOnChanges(changes) { 
  }
  ngOnInit() { 
       this.inputtext = this.data.getProfileName();
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
  getInputHint(){
    return this.data.getEDialogInputHint();
  }
  getArrowType() {
  }
  public getHeader() {
  }
  getDialogTitle() {
      return this.data.getDialogTitle();
  }
  getDialogText() {
      return this.data.getDialogText();
  }
  cancelStuff() {
      this.data.setShowEModal(false);
      this.data.setEOptionText('save');
  }
  doStuff() {
      this.data.setShowEModal(false);
      this.data.setEOptionText('save');
  }
  
  getIfShowCancel(){
  }
  getOptionsCount(){
  }
  getOptionText(){
      return this.data.getEOptionText();
  }
  getDialiogTitleColor(){
  }
  getDialogOptionColor(){
  }
  getProfile() {
    return this.data.getProfile();
  }
}
