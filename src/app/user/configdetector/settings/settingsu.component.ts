import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';


@Component({
  selector: 'settingsu-root',
  templateUrl: './settingsu.component.html',
  styleUrls: ['../cdetectoru.component.css']
})
export class SettingsuComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  presenceSimulationEnable = true;
  activeDevice:any;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  loadingDataDone = false;

    NLStartTime = "";
    NLEndTime = "";
    BRStartTime = "";
    BREndTime = "";


  readAttrs =[
            SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,                               
            SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,                           
            SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,                             
            SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE,     
            SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
            SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,
            SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
            SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,
            SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,
            SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
            SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
            SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,
            SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,
            SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,
            SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME
            ]

  brightnessError = false;
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route:ActivatedRoute,private zone:NgZone) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
  }

  setActiveTab(tab) {
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
    this.data.setMainTitle('Settings');

    this.data.setOtherParam('','');
    if(this.data.DeviceBuild == 1){
      this.data.readData(this.readAttrs);
      this.loadingDataDone = false;
    }
  }
  basicBrModeChanged(){
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.basicBrightnessMode])
  }
  nightLevelChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.nightLightLevel)])
  }
  basicBrightnessLevelChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.basicBrightnessLevel)])
  }
  basicBrightnessAmbientBrightnessThresholdChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.basicBrightnessAmbientBrightnessThreshold)])
  }

  togglePE(){
    this.ad.presenceSimulationEnable=!this.ad.presenceSimulationEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.presenceSimulationEnable?1:0])
  }
  toggleNL(){
    this.ad.nightLightFunctionEnable=!this.ad.nightLightFunctionEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.nightLightFunctionEnable?1:0])
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
  reduceCount(item,isClick) {
    if(item == 'brightness') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold- 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
    }else if(item == 'soff') {
      this.ad.switchOffDelay = this.ad.switchOffDelay- 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
    }else if(item == 'illuminationstart') {
      this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime - 60;
      if(this.ad.basicBrightnessStartTime <= 0 ){
          this.ad.basicBrightnessStartTime = 86400;
        }
      this.secondsToString(this.ad.basicBrightnessStartTime,this.BRStartTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    }
    else if(item == 'illuminationend') {
      this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime - 60;
      if(this.ad.basicBrightnessEndTime <= 0 ){
          this.ad.basicBrightnessEndTime = 86400;
        }
      this.secondsToString(this.ad.basicBrightnessEndTime,this.BREndTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }
    else if(item == 'glarestart') {
      this.ad.nightLightStartTime = this.ad.nightLightStartTime - 60;
      if(this.ad.nightLightStartTime <= 0 ){
          this.ad.nightLightStartTime = 86400;
        }
      this.secondsToString(this.ad.nightLightStartTime,this.NLStartTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    }
    else if(item == 'glareend') {
      this.ad.nightLightEndTime = this.ad.nightLightEndTime - 60;
       if(this.ad.nightLightEndTime <= 0 ){
          this.ad.nightLightEndTime = 86400;
        }
      this.secondsToString(this.ad.nightLightEndTime,this.NLEndTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightEndTime ])
    }
  }

  increaseCount(item,isClick) {
    if(item == 'brightness') {
      this.ad.brightnessThreshold = this.ad.brightnessThreshold+ 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.brightnessThreshold)])
    }else if(item == 'soff') {
      this.ad.switchOffDelay = this.ad.switchOffDelay+ 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.switchOffDelay)])
    }else if(item == 'illuminationstart') {
      this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime +60;
      if(this.ad.basicBrightnessStartTime >= 86400 ){
          this.ad.basicBrightnessStartTime = 0;
        }
      this.secondsToString(this.ad.basicBrightnessStartTime,this.BRStartTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    }
    else if(item == 'illuminationend') {
      this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime + 60;
      if(this.ad.basicBrightnessEndTime >= 86400 ){
          this.ad.basicBrightnessEndTime = 0;
        }
      this.secondsToString(this.ad.basicBrightnessEndTime,this.BREndTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }
    else if(item == 'glarestart') {
      this.ad.nightLightStartTime = this.ad.nightLightStartTime + 60;
      if(this.ad.nightLightStartTime >= 86400 ){
          this.ad.nightLightStartTime = 0;
        }
      this.secondsToString(this.ad.nightLightStartTime,this.NLStartTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    }
    else if(item == 'glareend') {
      this.ad.nightLightEndTime = this.ad.nightLightEndTime + 60;
      if(this.ad.nightLightEndTime >= 86400 ){
          this.ad.nightLightEndTime = 0;
        }
      this.secondsToString(this.ad.nightLightEndTime,this.NLEndTime)
      this.onBLEdata()
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightEndTime ])
    }
  }

  
secondsToString (sec_num,itemAttr) {
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var shours = hours.toString();
    var sminutes = minutes.toString();
    var sseconds = seconds.toString();

    if (hours   < 10) {shours   = "0"+shours;}
    if (minutes < 10) {sminutes = "0"+sminutes;}
    if (seconds < 10) {sseconds = "0"+sseconds;}

    switch(itemAttr){
      case 'illuminationstart':
        this.BRStartTime =  shours+' : '+sminutes;
      break;
      case 'illuminationend':
        this.BREndTime =  shours+' : '+sminutes;
      break;
      case 'glarestart':
        this.NLStartTime =  shours+' : '+sminutes;
      break;
      case 'glareend':
        this.NLEndTime =  shours+' : '+sminutes;
      break;
    }
  }

  setCurrentBr(event: any) { // without type info
    this.ad.currentBrightness = event.target.value;
    this.data.addToSendData([SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.data.getHexofMe(this.ad.currentBrightness)])
  }



  onBLEdata() {
     this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
        this.data.setEDevParamsState(0);
        this.secondsToString(this.ad.basicBrightnessStartTime,'illuminationstart')
        this.secondsToString(this.ad.basicBrightnessEndTime,'illuminationend')
        this.secondsToString(this.ad.nightLightStartTime,'glarestart')
        this.secondsToString(this.ad.nightLightEndTime,'glareend')
      });
  }
    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }

}
