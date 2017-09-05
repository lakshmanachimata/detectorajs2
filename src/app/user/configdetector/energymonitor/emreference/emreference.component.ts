import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { SCCP_ATTRIBUTES} from '../../../../data.service';
import {SCCP_DATATYPES} from '../../../../data.service';

@Component({
  selector: 'emreference-root',
  templateUrl: './emreference.component.html',
  styleUrls: ['../../cdetectoru.component.css']
})
export class EMReferenceComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{


  eCurrency = false;
  cLoad = false;
  lDuration = false;
  activeDevice:any;
  ad:any;
  loadingDataDone = false;
  constructor(public logger: LoggerService,public data: DataService, private router:Router,private route:ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
  }

  setActiveTab(tab) {
  }

  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setProfileSwitch(true)
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
    this.data.setProfileSwitch(false)
  }

    setCLoad(event: any){
    if(event.target.value < this.ad.energyMonitorConnectedLoadMin ){
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMin;
      event.target.value = this.ad.energyMonitorConnectedLoadMin;
    }
    if(event.target.value > this.ad.energyMonitorConnectedLoadMax) {
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMax;
        event.target.value = this.ad.energyMonitorConnectedLoadMax;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
  }

  setLduration(event: any){
    if(event.target.value < 0 ){
      this.ad.energyMonitorLightingDuration = 0;
      event.target.value = 0;
    }
    if(event.target.value > 168) {
        this.ad.energyMonitorLightingDuration = 168;
        event.target.value = 168;
    }
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
  }

    setEprice(event: any){
    if(event.target.value < 0 ){
      this.ad.energyMonitor.electricityPrice = 0;
      event.target.value = 0;
    }
  }




  reduceCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad -1;
      if(this.ad.energyMonitorConnectedLoad <= this.ad.energyMonitorConnectedLoadMin){
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMin;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration -1;
      if(this.ad.energyMonitorLightingDuration <= 0){
        this.ad.energyMonitorLightingDuration = 0;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energyMonitor.electricityPrice = this.ad.energyMonitor.electricityPrice -1;
      if(this.ad.energyMonitor.electricityPrice <= 0){
        this.ad.energyMonitor.electricityPrice = 0;
      }
    }
  }


  increaseCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad + 1;
      if(this.ad.energyMonitorConnectedLoad >= this.ad.energyMonitorConnectedLoadMax){
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration + 1;
      if(this.ad.energyMonitorLightingDuration >= 168){
        this.ad.energyMonitorLightingDuration = 168;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energyMonitor.electricityPrice = this.ad.energyMonitor.electricityPrice + 1;
    }
  }
  
  onBLEdata(isread) {
    this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad ;
        this.data.setEDevParamsState(0);
      });
  }

    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }


}
