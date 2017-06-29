import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { Location }  from '@angular/common';
import {Observable} from 'rxjs/Rx';
import {i18nService} from '../i18n.service';
declare var scan:any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    scanobj: any;
    timer;
  constructor(public logger:LoggerService, public data:DataService,
            private router:Router,private location:Location, private translater:i18nService) {
      }
  ngOnInit() {
    this.logger.log('welcome loaded')
  }
  gotoProfile(item) {
    this.data.setProfile(item);
    this.location.replaceState('/');
    this.router.navigateByUrl(item);
    this.data.setEDevParamsState(0);
  }
  getElectricianString(){
   return this.translater.translate('Installer');
  }
  getWelcomeString(){
    return this.translater.translate('Welcome');
  }
  getUserString(){
    return this.translater.translate('Standard User');
  }
}
