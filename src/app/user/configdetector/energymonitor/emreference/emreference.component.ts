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
  electricityPrice:number;
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
    this.data.setOtherParam('energymonRef','Energy Monitor');
    this.data.setShowHomeButton(true);//PDAL-2577
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




  reduceCount(item,isClick,isLong) {
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
      this.electricityPrice = this.ad.energyMonitor.electricityPrice;
      if(isLong){
        if(this.ad.energyMonitor.electricityPrice <= 0){
          this.electricityPrice = 0;
        }
        else if((this.ad.energyMonitor.electricityPrice > 0) && (this.ad.energyMonitor.electricityPrice <= 0.1)){
          this.electricityPrice -= 0.01;
        }
        else if((this.ad.energyMonitor.electricityPrice > 0.1) && (this.ad.energyMonitor.electricityPrice <= 1)){
          this.electricityPrice -= 0.10;
        }
        else if((this.ad.energyMonitor.electricityPrice > 1) && (this.ad.energyMonitor.electricityPrice <= 10)){
          this.electricityPrice -= 1;
        }
        else{
          this.electricityPrice -= 10;
        }
      }else{
        this.electricityPrice = this.electricityPrice -0.01;
        if(this.ad.energyMonitor.electricityPrice <= 0){
          this.electricityPrice = 0;
        }
      }

      this.ad.energyMonitor.electricityPrice = +(this.electricityPrice).toFixed(2);
      this.data.deviceParams.electricityPrice = this.ad.energyMonitor.electricityPrice;
      this.data.setEDevParamsState(1);
      
    }
  }

  formatCurrency(val) {
    if(val.toString().indexOf('.') != -1){
      var price = val.toString().split('.');
      var euro = price[0];
      var cent = price[1];
      console.log('val: '+ val);
      console.log('cent: '+ cent);
      if (euro < 10){
        euro =  '0' + euro.toString();
      }
      switch(cent){
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          cent = cent + '0';
      }
        return euro.toString() + '.' + cent;
    }
    else{
      return val.toString();
    }

  }

  increaseCount(item,isClick,isLong) {
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
      this.electricityPrice = this.ad.energyMonitor.electricityPrice;
      if(isLong){
        if((this.ad.energyMonitor.electricityPrice > 0) && (this.ad.energyMonitor.electricityPrice < 0.1)){
          this.electricityPrice += 0.01;
        }
        else if((this.ad.energyMonitor.electricityPrice >= 0.1) && (this.ad.energyMonitor.electricityPrice < 1)){
          this.electricityPrice += 0.10;
        }
        else if((this.ad.energyMonitor.electricityPrice >= 1) && (this.ad.energyMonitor.electricityPrice < 10)){
          this.electricityPrice += 1;
        }
        else{
          this.electricityPrice += 10;
        }
      }else{
          this.electricityPrice = this.electricityPrice + 0.01;          
        
      }
      
      this.ad.energyMonitor.electricityPrice = +(this.electricityPrice.toFixed(2));
      this.data.deviceParams.electricityPrice = this.ad.energyMonitor.electricityPrice;
      this.data.setEDevParamsState(1);     
    }
  }
  
  onBLEdata(isread,iswrite) {
    if(iswrite == true){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        this.data.setEDevParamsState(0);
        this.loadingDataDone =  true;
      });
      this.loadingDataDone =  true;
    }
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
