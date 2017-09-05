import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import {SCCP_DATATYPES} from'../../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../../data.service';
import { i18nService } from '../../../../i18n.service';
@Component({
  selector: 'sensitivity-root',
  templateUrl: './sensitivity.component.html',
  styleUrls: ['../../cdetectore.component.css']
})
export class ESensitivityComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

   activeDevice:any;
    ad:any;
    onLabel = this.translater.translate('ON');
    offLabel = this.translater.translate('OFF');
    selectedQuadrant = '';
    selectedQuadrantValue = 0;
    styleValue = '#ffffff';
    loadingDataDone = false;

    readAttrs =[
      SCCP_ATTRIBUTES.PIR_SENSITIVITY,
      SCCP_ATTRIBUTES.PIR_SENSITIVITY_ODOR,
    ]
  constructor(public logger: LoggerService,public data: DataService, private router:Router,
              private zone:NgZone,private translater:i18nService) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      if(this.data.getDeviceConnectionState() == true){
        this.data.readPeerSensivitivity(this.readAttrs);
      }
      else 
      {
        this.loadingDataDone = true;
      }
  }
  onPeerData(data){
    this.zone.run( () => { // Change the property within the zone, CD will run after
    this.ad.pirSensitivity0 = this.getHexToDecMode(data[12]);
    this.ad.pirSensitivity1= this.getHexToDecMode(data[13]);
    this.ad.pirSensitivity2= this.getHexToDecMode(data[14]);
    this.ad.pirSensitivity3= this.getHexToDecMode(data[15]);
    this.ad.opirSensitivity0= this.getHexToDecMode(data[23]);
    this.ad.opirSensitivity1= this.getHexToDecMode(data[24]);
    this.ad.opirSensitivity2= this.getHexToDecMode(data[25]);
    this.ad.opirSensitivity3= this.getHexToDecMode(data[26]);
  });
  }
  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle(this.translater.translate('Sensitivity of sensors'));
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
  }
  setValue(value) {
    this.selectedQuadrantValue = value;
    if(this.ad.outdoorApplicationEnable ==  true){
      switch(this.selectedQuadrant) {
        case 'q1' :
          this.ad.opirSensitivity0 = value;
        break;
        case 'q2' :
          this.ad.opirSensitivity1 = value;
        break;
        case 'q3' :
          this.ad.opirSensitivity2 = value;
        break;
        case 'q4' :
          this.ad.opirSensitivity3 = value;
        break;
      }
    }else{
      switch(this.selectedQuadrant) {
        case 'q1' :
          this.ad.pirSensitivity0 = value;
        break;
        case 'q2' :
          this.ad.pirSensitivity1 = value;
        break;
        case 'q3' :
          this.ad.pirSensitivity2 = value;
        break;
        case 'q4' :
          this.ad.pirSensitivity3 = value;
        break;
      }
  }
    if(this.ad.outdoorApplicationEnable ==  true){
      this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY_ODOR,SCCP_DATATYPES.SCCP_TYPE_AUINT8,0x04,0x00,0x00,this.getDecToHexMode(this.ad.opirSensitivity0),this.getDecToHexMode(this.ad.opirSensitivity1),this.getDecToHexMode(this.ad.opirSensitivity2),this.getDecToHexMode(this.ad.opirSensitivity3)]);
    }else{
      this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY,SCCP_DATATYPES.SCCP_TYPE_AUINT8,0x04,0x00,0x00,this.getDecToHexMode(this.ad.pirSensitivity0),this.getDecToHexMode(this.ad.pirSensitivity1),this.getDecToHexMode(this.ad.pirSensitivity2),this.getDecToHexMode(this.ad.pirSensitivity3)]);
    }
    this.setStyleAttr(this.selectedQuadrantValue);
  }

  getDecToHexMode(value){
    switch(value){
      case 0:
      return 0;
      case 25:
      return  72;
      case 50:
      return 102;
      case 75:
      return 170;
      case 100:
      return 255;

    }
  }
  getHexToDecMode(value){
    switch(value){
      case 0:
      return 0;
      case 72:
      return  25;
      case 102:
      return 50;
      case 170:
      return 75;
      case 255:
      return 100;
    }
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
  toggleoa() {
    this.ad.outdoorApplicationEnable = !this.ad.outdoorApplicationEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.outdoorApplicationEnable?1:0])
  }
  getRangeValue() {
    return this.selectedQuadrantValue;
  }
  setQuadrantSelected(item,value) {
    this.selectedQuadrant = item;
    this.selectedQuadrantValue = value;
  }
  getQuadrantSelected() {
    return this.selectedQuadrant;
  }
  getMystyle(item) {
    if(this.ad.outdoorApplicationEnable ==  true){
      switch(item) {
        case 'q1' :
          this.setStyleAttr(this.ad.opirSensitivity0);
        break;
        case 'q2' :
          this.setStyleAttr(this.ad.opirSensitivity1);
        break;
        case 'q3' :
          this.setStyleAttr(this.ad.opirSensitivity2);
        break;
        case 'q4' :
          this.setStyleAttr(this.ad.opirSensitivity3);
        break;
      }
    }else{
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
  }
     if(item == this.selectedQuadrant) {
       let mystyles =  {
        'background': this.styleValue ,
        'border-style': 'solid',
        'border-width': '2px',
        'border-color': '#4682b4',
        'color':'#EEEEEE'
        // 'border': '5px 5px 5px #888888'
      }
      return mystyles;
      }
      else
      {
        let mystyles =  {
          'background': this.styleValue ,
        }
        return mystyles;
      } 
  }

  setLoadingDataDone(){
    this.loadingDataDone = false;
  }
  onBLEdata(isread) {
    this.loadingDataDone = true;
     this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.pirSensitivity0 = this.ad.pirSensitivity0 ;
        this.data.setEDevParamsState(0);
      });
  }
  
}
