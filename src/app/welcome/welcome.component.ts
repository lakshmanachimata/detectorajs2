import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { Location }  from '@angular/common';
import {Observable} from 'rxjs/Rx';

declare var scan:any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    scanobj: any;
    timer;
  constructor(public logger:LoggerService, public data:DataService,private router:Router,private location:Location) {
      }
  ngOnInit() {
  }


  gotoProfile(item) {
    this.data.setProfile(item);
    this.location.replaceState('/');
    this.router.navigateByUrl(item);
    this.data.setEDevParamsState(0);
  }
}
