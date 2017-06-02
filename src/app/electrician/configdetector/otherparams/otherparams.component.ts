import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';
import { i18nService } from '../../../i18n.service';

@Component({
  selector: 'other-root',
  templateUrl: './otherparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EOtherParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = this.translater.translate('on');
  offLabel = this.translater.translate('off');
  showFitterPin = false;
  showUserPin = false;
  A1LoadIdentify = false;
  A2LoadIdentify = false;
  userProfiles = [
    this.translater.translate('Garage'),
    this.translater.translate('Entry of cellar')
  ];
  preDefined_Profiles =[
    this.translater.translate("Living room"),
    this.translater.translate("Toilet"),
    this.translater.translate("Kitchen"),
    this.translater.translate("Bath"),
    this.translater.translate("Floor"),
    this.translater.translate("Outdoor")
  ]

  preDefined_Searches=[];
  searchText = '';
  masterQuad = 'q1';
  loadingDataDone = false;
      readAttrs =[
                  SCCP_ATTRIBUTES.CONTACT,
                  SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,                      
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,                            
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,                         
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
                  SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                                                                                                                        
                  SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,                     
                  SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,                         
                  SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,                               
                  SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,                             
                  SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,                         
                  SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE,             
                  SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,                                       
                  SCCP_ATTRIBUTES.IDENTIFYING_DEVICE,                                       
                  SCCP_ATTRIBUTES.MOVEMENT,                                                 
                  SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,                                     
                  SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,                                         
                  SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,                                        
                  SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,                                     
                  SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,                                         
                  SCCP_ATTRIBUTES.CH2_CURRENT_LEVEL,                                        
                  SCCP_ATTRIBUTES.TEST_MODE_ENABLE,                                         
                  SCCP_ATTRIBUTES.ACCESS_LEVEL,
                  SCCP_ATTRIBUTES.BUILDING,
                ]

  constructor(public logger: LoggerService,public data: DataService, private router:Router,private route: ActivatedRoute,
              private zone:NgZone,private translater:i18nService) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setActiveComponent(this);
      // if(this.data.getDeviceConnectionState() == true){
      //   this.data.readData(this.readAttrs);
      // }
      // else 
      {
        this.loadingDataDone = true;
      }
  }
    getOtherProfiles(){
      return this.userProfiles;
    }
    searchProfiles(items,userDefined) {
      if(this.searchText.length > 0)
      {
          let result = [];
          var searchString = new RegExp(this.searchText.toLowerCase());
          for(var j =0; j < items.length; j++) {
              let profile = items[j];
              if(profile === undefined) {
                  result.push(profile);
              }else {
                  if( profile.toLowerCase().indexOf(this.searchText) >= 0){
                      result.push(profile);
                  }
              }
          }
          this.preDefined_Searches = result;
          return this.preDefined_Searches;
      }else {
        if(userDefined){
          return this.userProfiles;
        }else {
          return this.preDefined_Profiles;
        }
      }
    }

    searchAllProfiles(){
      this.searchPredefinedProfiles();
      this.searchUserDefinedProfiles();
    }

    searchUserDefinedProfiles(){
      return this.searchProfiles(this.userProfiles,true);
    }
    
   searchPredefinedProfiles(){
        return this.searchProfiles(this.preDefined_Profiles,false);
    }

  onFitterPinChanged(){
      this.data.setEDevParamsState(1);
  }
  onUserPinChanged(){
      this.data.setEDevParamsState(1);
  }

  showOverWriteEModal(item){
    this.data.setProfileName(item);
    this.data.setDialogTitle(this.translater.translate('Overwrtie existing profile'))
    this.data.setEDialogInputHint(this.translater.translate(''))
    this.data.setEOptionText(this.translater.translate('OK'));
    this.data.setShowEModal(true);
  }

  showAddUserProfie(){
    this.data.setProfileName('');
    this.data.setDialogTitle(this.translater.translate('Name of new profile'))
    this.data.setEDialogInputHint(this.translater.translate('Name of new profile'))
    this.data.setShowEModal(true);
  }

  addProfile(){
    this.data.addProfile();
  }
  updateProfile(){
    this.data.updateProfile();
  }
  syncProfiles(){
    this.data.syncProfiles()
  }

  ngOnChanges(changes) { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle(this.data.getOtherParamTitle());
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
  getOtherParam() {
    return this.data.getOtherParam();
  }
  reduceCount(item,isClick) {
    if(item == 'cload') {
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad - 1;
      if(this.ad.energyMonitorConnectedLoad <= this.ad.energyMonitorConnectedLoadMin){
          this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      if(this.ad.energyMonitorLightingDuration <= this.ad.energyMonitorLightingDurationMin){
          this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDurationMin;
        }
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration - 1;
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price - 1;
      if(this.ad.energy_monitor.electricity_price  <= 0){
        this.ad.energy_monitor.electricity_price  = 0;
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
       if(this.ad.energyMonitorLightingDuration >= this.ad.energyMonitorLightingDurationMax){
        this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDurationMax;
      }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energy_monitor.electricity_price = this.ad.energy_monitor.electricity_price + 1;
    }
  }
  onBLEdata() {
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
  }
  
  CNameChanged() {
    var bytes = []; // char codes
    for (var i = 0; i < this.ad.contact.length; ++i) {
      var code = this.ad.contact.charCodeAt(i);
      bytes = bytes.concat([code]);
    }
    bytes.concat[0];
    this.data.addToSendData([SCCP_ATTRIBUTES.CONTACT,SCCP_DATATYPES.SCCP_TYPE_STRING,bytes])
  }
  BuildingChanged() {
    var bytes = []; // char codes
    for (var i = 0; i < this.ad.building.length; ++i) {
      var code = this.ad.contact.charCodeAt(i);
      bytes = bytes.concat([code]);
    }
    bytes.concat[0];
    this.data.addToSendData([SCCP_ATTRIBUTES.BUILDING,SCCP_DATATYPES.SCCP_TYPE_STRING,this.ad.building])
  }
  togglepbr(){
    this.ad.enableUserSetBrightnessThreshold = !this.ad.enableUserSetBrightnessThreshold
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserSetBrightnessThreshold])
  }
  togglessod(){
    this.ad.enableUserSetSwitchOffDelay = !this.ad.enableUserSetSwitchOffDelay
        this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserSetSwitchOffDelay])
  }
  toggleem(){
    this.ad.enableUserEnergyMonitor = !this.ad.enableUserEnergyMonitor
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserEnergyMonitor])
  }
  togglebi(){
    this.ad.enableUserBasicBrightness = !this.ad.enableUserBasicBrightness
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserBasicBrightness])
  }
  togglenf(){
    this.ad.enableUserNightLightFunction = !this.ad.enableUserNightLightFunction
    this.data.addToSendData([SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.enableUserNightLightFunction])
  }
  togglech1ID(){
    this.ad.ch1IdentifyingLoad = !this.ad.ch1IdentifyingLoad;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch1IdentifyingLoad ])
  }
  togglech2ID(){
    this.ad.ch2IdentifyingLoad = !this.ad.ch2IdentifyingLoad;
    this.data.addToSendData([SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.ch2IdentifyingLoad ])
  }

  toggleDP(){
    this.ad.testModeDeactivateOutputsEnable = !this.ad.testModeDeactivateOutputsEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.testModeDeactivateOutputsEnable])
  }
  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
