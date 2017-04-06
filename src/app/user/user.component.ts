import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';

declare var connectDevice;
@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy {

    private detectors:Array<any>;
    jsonLoadObserve: any;
    scannedData:Array<any>;
    connectDeviceObj:any;
    private snap:RouterStateSnapshot;
    constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
    }
  configureDetectorUser(item){
      this.data.initDeviceData(item,false);
      this.data.setSelectedDevice(item,false);
      if(this.data.DeviceBuild == 1)
        this.connectDeviceObj = new connectDevice(item.btDeviceAddress);
  }

  setScannedDataToFirst(){
    if(this.scannedData != undefined) {
      for(let i =0; i < this.scannedData.length; i++)
      {
        this.detectors[2-i].btDeviceName = this.scannedData[i].btDeviceName;
        this.detectors[2-i].firmwareVersion = this.scannedData[i].firmwareRevision;
        this.detectors[2-i].articleNumber = this.scannedData[i].modelNumber;
        this.detectors[2-i].btDeviceAddress = this.scannedData[i].btAddress;
        this.detectors[2-i].deviceType = this.scannedData[i].deviceType;
        this.detectors[2-i].contactName = this.scannedData[i].manufacturerName;
      }
    }
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
    this.snap = this.router.routerState.snapshot;
  }
  ngOnInit () {
    this.jsonLoadObserve = this.data.subscribeJsonLoad(this, this.jsonOnLoad);
    this.detectors = this.data.getDevices();
    this.scannedData = this.data.getScannedData();
    this.setScannedDataToFirst();
    this.data.setMainTitle('Detecors');
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('user');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  jsonOnLoad(component) {
      component.data.setProfileSwitch(false);
      component.router.navigate(['uconfigdetector'],{relativeTo: component.route});
  }
  ngOnDestroy() {
  }
}
