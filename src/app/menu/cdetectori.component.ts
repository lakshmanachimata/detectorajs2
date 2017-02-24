import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import { SubMenuItem} from '../data.service';


@Component({
  selector: 'cdetectori-root',
  templateUrl: './cdetectori.component.html',
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

export class CDetectorIComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    subMenuState = 'none';
    activeDevice:any;
    ad:any;
    deviceType = -1;
    constructor(private logger: LoggerService,private data: DataService,private router:Router) {
        this.subMenuState = 'none';
    }

    animationStarted($event) {
        this.data.setMainTitle('Installed detector');
    }

    animationDone($event) {
    }

    ngOnChanges() { 
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
        this.activeDevice = this.data.getSelectedDevice();
        this.ad = this.data.getDevicedata();
        this.deviceType = this.data.getSelectedDeviceType();
        if (this.subMenuState == 'none') {
            setTimeout(() => this.subMenuState = "rightin")
        }
    }
    ngOnDestroy() {
    }

    gotoParam(item) {

    }

}
