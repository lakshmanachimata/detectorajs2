import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';
import { i18nService } from '../../../i18n.service';

@Component({
  selector: 'eactuator2-root',
  templateUrl: './eactuator2.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EActuator2Component implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = this.translater.translate('on');
  offLabel = this.translater.translate('off');
  loadingDataDone = false;
   readAttrs =[ 
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,                               
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,                           
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,                             
                SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE,
                //SCCP_ATTRIBUTES.PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE_ID,                
                SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC,                                        
                SCCP_ATTRIBUTES.CH2_MODE,                                                 
                SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE,                            
                SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY,                                     
                SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN,                                 
                SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MAX,                                 
                SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY,                                    
                SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN,                                
                SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MAX,                                
                ]

  constructor(public logger: LoggerService,public data: DataService, private router:Router,
              private zone:NgZone,private translater:i18nService) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      // if(this.data.getDeviceConnectionState() == true){
      //   this.data.readData(this.readAttrs);
      // }
      // else 
      {
        this.loadingDataDone = true;
      }
  }
  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle(this.translater.translate('Settings of actuator 2'));
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
  reduceCount(item,isClick){
    if(item == 'sondelay') {
      this.ad.hvacSwitchOnDelay = this.ad.hvacSwitchOnDelay -1;
      if(this.ad.hvacSwitchOnDelay <= this.ad.hvacSwitchOnDelayMin){
          this.ad.hvacSwitchOnDelay = this.ad.hvacSwitchOnDelayMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.hvacSwitchOnDelay])
    }else if(item == 'soffdelay') {
      this.ad.hvacSwitchOffDelay = this.ad.hvacSwitchOffDelay -1;
       if(this.ad.hvacSwitchOffDelay <= this.ad.hvacSwitchOffDelayMin){
          this.ad.hvacSwitchOffDelay = this.ad.hvacSwitchOffDelayMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.hvacSwitchOffDelay])
    }

  }

  increaseCount(item,isClick) {
 if(item == 'sondelay') {
      this.ad.hvacSwitchOnDelay = this.ad.hvacSwitchOnDelay + 1;
      if(this.ad.hvacSwitchOnDelay >= this.ad.hvacSwitchOnDelayMax){
        this.ad.hvacSwitchOnDelay = this.ad.hvacSwitchOnDelayMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.hvacSwitchOnDelay])
    }else if(item == 'soffdelay') {
      this.ad.hvacSwitchOffDelay = this.ad.hvacSwitchOffDelay + 1;
      if(this.ad.hvacSwitchOffDelay >= this.ad.hvacSwitchOffDelayMax){
        this.ad.hvacSwitchOffDelay = this.ad.hvacSwitchOffDelayMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.hvacSwitchOffDelay])
    }
  }
  onBLEdata() {
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.hvacSwitchOnDelay = this.ad.hvacSwitchOnDelay;
        this.data.setEDevParamsState(0);
    });
  }
  circuitModeChange() {
    this.data.addToSendData([SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.ch2CircuitLogic])
  }
  ch2ModeChange(){
    this.data.addToSendData([SCCP_ATTRIBUTES.CH2_MODE,SCCP_DATATYPES.SCCP_TYPE_ENUM8,this.ad.ch2Mode])
  }
  togglehvacDC(){
    this.ad.hvacDynamicalControlEnable = !this.ad.hvacDynamicalControlEnable
    this.data.addToSendData([SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.hvacDynamicalControlEnable?1:0])
  }

  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
