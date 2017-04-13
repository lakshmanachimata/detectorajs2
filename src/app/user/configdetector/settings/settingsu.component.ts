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
            SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,
            ]

  brightnessError = false;
  currentBrightness = '450 lx';
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
    this.currentBrightness = this.data.getCurrentBrightness();
    this.data.setOtherParam('','');
    if(this.data.DeviceBuild == 1){
      this.data.readData(this.readAttrs);
      this.loadingDataDone = false;
    }
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
      this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    }
    else if(item == 'illuminationend') {
      this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }
    else if(item == 'glarestart') {
      this.ad.nightLightStartTime = this.ad.nightLightStartTime - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    }
    else if(item == 'glareend') {
      this.ad.nightLightEndTime = this.ad.nightLightEndTime - 1;
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
      this.ad.basicBrightnessStartTime = this.ad.basicBrightnessStartTime +1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessStartTime ])
    }
    else if(item == 'illuminationend') {
      this.ad.basicBrightnessEndTime = this.ad.basicBrightnessEndTime + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.basicBrightnessEndTime ])
    }
    else if(item == 'glarestart') {
      this.ad.nightLightStartTime = this.ad.nightLightStartTime + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightStartTime ])
    }
    else if(item == 'glareend') {
      this.ad.nightLightEndTime = this.ad.nightLightEndTime + 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,SCCP_DATATYPES.SCCP_TYPE_TIME,this.ad.nightLightEndTime ])
    }
  }
  onBLEdata() {
     this.loadingDataDone =  true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold ;
      });
  }
}
