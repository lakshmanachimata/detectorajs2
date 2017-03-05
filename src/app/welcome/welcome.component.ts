import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { Location }  from '@angular/common';
import {Observable} from 'rxjs/Rx';

declare var scan:any;
declare var connect:any;
declare var services:any;
declare var devices:any;
declare var setDevicesCallBack:any;
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    scanobj: any;
    connectobj:any;
    servicesobj:any;
     devicesobj:any;
     setDevicesCallBackobj:any;
    timer;
  constructor(private logger:LoggerService, private data:DataService,private router:Router,private location:Location) {
     this.scanobj = new scan();
     
     setTimeout(() => {
      this.connectIt();
    }, 5000);
    this.setDevicesCallBackobj = new setDevicesCallBack(this);
  }

  connectIt() {
    this.connectobj = new connect();
    setTimeout(() => {
      this.servicesIt();
    }, 3000);

  }
  servicesIt() {
    this.connectobj = new services();
    setTimeout(() => {
      this.devicesIt();
    }, 4000);
  }
  devicesIt() {    
    this.connectobj = new devices(this);
  }

  ngOnInit() {
  }

 onDevices(scanned) {
   let obj = JSON.parse(scanned);
   this.data.setScannedData(obj);
 }
  gotoProfile(item) {
    this.data.setProfile(item);
    this.location.replaceState('/');
    this.router.navigateByUrl(item);
  }
}
