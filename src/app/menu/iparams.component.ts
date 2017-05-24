import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import { SubMenuItem} from '../data.service';
@Component({
  selector: 'iparams-root',
  templateUrl: './iparams.component.html',
  styleUrls: ['./submenu.component.css'],
  animations: [
      trigger('subMenuSlideIn', [
        state('*', style({
            transform: 'translateX(+100%)',
        })),
        state('rightin', style({
            transform: 'translateX(0)',
        })),
        state('rightout',   style({
            transform: 'translateX(+100%)',
        })),
        transition('* => rightin', animate('700ms ease-in')),
        transition('rightin => rightout', animate('700ms ease-in'))
        ])
    ]
})

export class IParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    subMenuState = 'none';
    activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    styleValue = '#ffffff';
    showUserPin = false;
    showFitterPin = false;
    showCircuitSettings = false;
    showDurableSwitchingSettings = false;
    showMiscSettings = false;
    showNightAntiGlareSettings = false;
    showBasicIlluminationSettings = false;
    showDaliSettings = false;
    showTimeShiftedSwitchOffSettings = false;
    showFluorescentSettings = false;

    constructor(public logger: LoggerService,public data: DataService,private router:Router) {
        this.subMenuState = 'none';
    }

    animationStarted($event) {
    }

    animationDone($event) {
    }

    ngOnChanges(changes) { 
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
    ngOnInit() { 
        this.activeDevice = this.data.getSelectedDevice(true);
        this.ad = this.data.getDevicedata(true);
        if (this.subMenuState == 'none') {
            setTimeout(() => this.subMenuState = "rightin")
        }
        this.data.setIActiveComponent(this);
    }
    ngOnDestroy() {
    }
    setStyleAttr(value) {
    switch(value) {
      case 0:
        this.styleValue = "#ffffff"
        break;
      case 25:
        this.styleValue = "#c2ecff"
        break;
      case 50:
        this.styleValue = "#7cd8ff"
        break;
      case 75:
        this.styleValue = "#40c5ff"
        break;
      case 100:
        this.styleValue = "#01b3ff"
        break;
    }
  }
    getMystyle(item) {
    switch(item) {
      case 'q1' :
        this.setStyleAttr(this.ad.pirSensitivity0);
      break;
      case 'q2' :
        this.setStyleAttr(this.ad.pirSensitivity1);
      break;
      case 'q3' :
        this.setStyleAttr(this.ad.pirSensitivity2);
      break;
      case 'q4' :
        this.setStyleAttr(this.ad.pirSensitivity3);
      break;
    }
    let mystyles =  {
      'background': this.styleValue
    }
    return mystyles;
    
  }

  onBLEdata() {
    
  }
}
