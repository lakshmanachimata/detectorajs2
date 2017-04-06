import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';

export class DetectorInfo {
        public hashCode;
        public btDeviceName;
        public modelNumber;
        public manufacturerName;
        public deviceType;
        public firmwareVersion;
        public softwareVersion;
        public btAddress;
        public contactName;
        public buildingName;
        public date;
    }

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
        this.connectDeviceObj = new connectDevice(item.btAddress);
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
    if(this.data.DeviceBuild == 0)
      this.detectors = this.data.getDevices();
    else {
      this.scannedData = this.data.getScannedData();
      this.setScannedDataToFirst();
    }
    this.data.setMainTitle('Detecors');
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('electrician');
    this.data.setProfileSwitch(true);
    this.data.setEDevParamsState(0);
  }

  setScannedDataToFirst(){
    this.detectors= [];
    if(this.scannedData != undefined) {
      for(let i =0; i < this.scannedData.length; i++)
      {
        let detectorInfo =  new DetectorInfo()
        detectorInfo.btDeviceName = this.scannedData[i].btDeviceName;
        detectorInfo.firmwareVersion = this.scannedData[i].firmwareRevision;
        detectorInfo.modelNumber = this.scannedData[i].modelNumber;
        detectorInfo.btAddress = this.scannedData[i].btAddress;
        detectorInfo.deviceType = this.scannedData[i].deviceType;
        detectorInfo.contactName ="ABB";
        detectorInfo.buildingName ="ABB";
        detectorInfo.date="07.07.2017",
        detectorInfo.contactName = this.scannedData[i].manufacturerName;
        this.detectors.push(detectorInfo);
      }
    }
  }

  jsonOnLoad(component) {
      component.data.setProfileSwitch(false);
      component.router.navigate(['econfigdetector'],{relativeTo: component.route});
  }
  ngOnDestroy() {
  }
}
