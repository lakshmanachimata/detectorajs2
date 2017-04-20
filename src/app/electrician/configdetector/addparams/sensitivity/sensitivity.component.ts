import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import {SCCP_DATATYPES} from'../../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../../data.service';

@Component({
  selector: 'sensitivity-root',
  templateUrl: './sensitivity.component.html',
  styleUrls: ['../../cdetectore.component.css']
})
export class ESensitivityComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

   activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    selectedQuadrant = '';
    selectedQuadrantValue = 0;
    styleValue = '#ffffff';
    loadingDataDone = false;

    readAttrs =[
      SCCP_ATTRIBUTES.PIR_SENSITIVITY0,
      SCCP_ATTRIBUTES.PIR_SENSITIVITY1,
      SCCP_ATTRIBUTES.PIR_SENSITIVITY2,
      SCCP_ATTRIBUTES.PIR_SENSITIVITY3,
      SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE
    ]
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      if(this.data.getDeviceConnectionState() == true){
        this.data.readData(this.readAttrs);
      }
      else {
        this.loadingDataDone = true;
      }
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Sensitivity of sensors');
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
    switch(this.selectedQuadrant) {
      case 'q1' :
        this.ad.pirSensitivity0 = value;
        this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY0,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(value)]);
      break;
      case 'q2' :
        this.ad.pirSensitivity1 = value;
        this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY1,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(value)]);
      break;
      case 'q3' :
        this.ad.pirSensitivity2 = value;
        this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY2,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(value)]);
      break;
      case 'q4' :
        this.ad.pirSensitivity3 = value;
        this.data.addToSendData([SCCP_ATTRIBUTES.PIR_SENSITIVITY3,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(value)]);
      break;
    }
    this.setStyleAttr(this.selectedQuadrantValue);
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
    let mystyles =  {
      'background': this.styleValue
    }
    return mystyles;
    
  }

  setLoadingDataDone(){
    this.loadingDataDone = false;
  }
  onBLEdata() {
    this.loadingDataDone = true;
     this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.pirSensitivity0 = this.ad.pirSensitivity0 ;
        this.data.setEDevParamsState(0);
      });
  }
  
}
