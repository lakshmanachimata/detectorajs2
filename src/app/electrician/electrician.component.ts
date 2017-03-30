import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';

declare var connectDevice;
@Component({
  selector: 'electrician-root',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    private detectors:Array<any>;
    scannedData:Array<any>;
    jsonLoadObserve: any;
    connectDeviceObj:any;
    private snap:RouterStateSnapshot;
    constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
    }
  configureDetector(item){
      this.data.initDeviceData(item,false);
      this.data.setSelectedDevice(item,false);
      if(this.data.DeviceBuild == 1)
        this.connectDeviceObj = new connectDevice(item.btDeviceAddress);
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
    this.data.setProfile('electrician');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  setScannedDataToFirst(){
    if(this.scannedData != undefined) {
      this.detectors[2].btDeviceName = this.scannedData[0].btDeviceName;
      this.detectors[2].firmwareVersion = this.scannedData[0].firmwareRevision;
      this.detectors[2].articleNumber = this.scannedData[0].modelNumber;
      this.detectors[2].btDeviceAddress = this.scannedData[0].btAddress;
      this.detectors[2].contactName = this.scannedData[0].manufacturerName;
    }
  }

  jsonOnLoad(component) {
      component.data.setProfileSwitch(false);
      component.router.navigate(['econfigdetector'],{relativeTo: component.route});
  }
  ngOnDestroy() {
  }
}
