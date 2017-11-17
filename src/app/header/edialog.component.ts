import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
import { i18nService } from '../i18n.service';

@Component({
  selector: 'edialog-root',
  templateUrl: './edialog.component.html',
  styleUrls: ['./header.component.css'],
})

export class EDialogComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    inputtext = '';
    retryWait:number;
  constructor(public logger: LoggerService,private router:Router,public data:DataService,private translater:i18nService) {     
  }
  ngOnChanges(changes) { 
  }
  ngOnInit() { 
        this.retryWait = 10;      
       this.inputtext = this.data.getProfileName();
       if(this.wrongPWEnteredMoreThanOnce()){
        var timer = setInterval(()=>{
            this.retryWait= this.retryWait-1;
            if(this.retryWait<=0){
                clearInterval(timer);
            }
        },1000);        
    }

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
    this.data.setEOptionText(this.translater.translate('Save'));
    this.data.setEDialogInputHint('');
    this.data.disConnectDevice()
  }
  doStuff() {
      
      if(this.inputtext != ''){
        this.data.setShowEModal(false);  
        this.data.setEOptionText(this.translater.translate('Save'));   
        
		if(this.data.getEDialogInputHint() == this.translater.translate('Enter password')){
            
            if (!this.wrongPWEnteredMoreThanOnce()) {
                
                this.data.authenticateDevice(this.inputtext);
            }
            else if (this.retryWait == 0 && this.wrongPWEnteredMoreThanOnce()) {
                
                this.data.authenticateDevice(this.inputtext);
            }
            else if (this.retryWait > 0 && this.wrongPWEnteredMoreThanOnce()) {   /*Added by BikashV*/
                
                this.data.authenticateDevice(this.inputtext);
            }
            
        }else {
		  if(this.data.getEDialogInputHint() == this.translater.translate('Name of new profile')){
            
		      this.data.addProfile()
		  }else {
            
		      this.data.updateProfile();
		  }
        }
        
          this.data.setEDialogInputHint(''); 
          
      }
      
  }

  
  getIfShowCancel(){
  }
  getOptionsCount(){
  }
  getOptionText(){
      return this.data.getEOptionText();
  }
  getRetypeText(){
      return this.data.getRetypeText();
  }
  getDialiogTitleColor(){
  }
  getDialogOptionColor(){
  }
  getProfile() {
    return this.data.getProfile();
  }
  isWrongPWEntered(){
      return this.data.isWrongPWEntered();
  }
  wrongPWEnteredMoreThanOnce(){
      if(this.data.uiParams.numberOfPasswordMistakes >= 2){
        return true;
      }
      else
        return false;
  }
   
  disableOk(){
    
    if((this.retryWait > 0 && this.wrongPWEnteredMoreThanOnce()) || (this.inputtext=='')){
        return true;
    }
     else{
         return false;        
     }
   }

}
