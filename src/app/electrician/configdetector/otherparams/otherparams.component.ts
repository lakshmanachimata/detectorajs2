import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';
import { i18nService } from '../../../i18n.service';
import { Location }  from '@angular/common';

@Component({
  selector: 'other-root',
  templateUrl: './otherparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EOtherParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = this.translater.translate('ON');
  offLabel = this.translater.translate('OFF');
  showFitterPin = false;
  showUserPin = false;
  A1LoadIdentify = false;
  A2LoadIdentify = false;
  showEnergyMonitorRefSettings = true;
  installer_pwd ="";
  user_pwd ="";
  showTestModeSettings = false;
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
  Quad1 = false;
  Quad2 = false;
  Quad3 = false;
  Quad4 = false;
  loadingDataDone = false;
  slaveMovementAttrs=[
    SCCP_ATTRIBUTES.MOVEMENT,
  ]
  contactName;
  buildingName;
      readAttrs =[
                  SCCP_ATTRIBUTES.CONTACT,
                  // SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,                      
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,                            
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,                         
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
                  // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                                                                                                                        
                  // SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,                     
                  // SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,                         
                  // SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,                               
                  // SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,                             
                  // SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,                         
                  // SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE,             
                  // SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,                                       
                  // SCCP_ATTRIBUTES.IDENTIFYING_DEVICE,                                       
                  // SCCP_ATTRIBUTES.MOVEMENT,                                                 
                  // SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,                                     
                  // SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,                                         
                  // SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,                                        
                  // SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,                                     
                  // SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,                                         
                  // SCCP_ATTRIBUTES.TEST_MODE_ENABLE,                                         
                  // SCCP_ATTRIBUTES.ACCESS_LEVEL,
                  SCCP_ATTRIBUTES.BUILDING,
                ]

  constructor(public logger: LoggerService,public data: DataService, private router:Router,private route: ActivatedRoute,
              private zone:NgZone,private translater:i18nService,private location:Location) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setFooter(true);
      this.data.setTestModeComponent(this);
      this.data.setActiveComponent(this);
      if(this.data.getDeviceConnectionState() == true){
        if(this.data.getOtherParam() == "buildingallocation")
          this.data.readData(this.readAttrs);
        else
          this.loadingDataDone = true;
      }
      else 
      {
        this.loadingDataDone = true;
      }
  }

    onInstallerPwdSetSuccess(){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
    }
    onInstallerPwdSetFailed(){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
    }
    onUserPwdSetSuccess(){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
    }
    onUserPwdSetFailed(){
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad;
        this.data.setEDevParamsState(0);
      });
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

    getInstallerPwd(){
      this.installer_pwd = this.data.deviceParams.installer_pwd;
    }
    getUserPwd(){
      this.user_pwd = this.data.deviceParams.user_pwd;
    }
  onFitterPinChanged(){
      if(this.installer_pwd.length >= 16){
        this.installer_pwd =  this.installer_pwd.slice(0,15);
      }
      if(this.data.deviceParams.installer_pwd != this.installer_pwd){
        this.data.installerPasswordChanged(true)
        this.data.setTobeSetInstallerPwd(this.installer_pwd)
      }
      this.data.setEDevParamsState(1);
  }
  onUserPinChanged(){
      if(this.user_pwd.length >= 16){
        this.user_pwd =  this.user_pwd.slice(0,15);
      }
      if(this.data.deviceParams.user_pwd != this.user_pwd){
        this.data.userPasswordChanged(true)
        this.data.setTobeSetUserPwd(this.user_pwd)
      }
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
    if(this.data.getOtherParamTitle().length <= 0){
      this.location.back();
      this.data.settestmodetest(0)
      return;
    }
    this.contactName = this.ad.contact;
    this.buildingName = this.ad.building;
    if(this.data.getOtherParam() == 'energymonitor')
      this.data.setProfileSwitch(true)
    if(this.data.getOtherParam() == 'testmode'){
      this.data.setTestModeComponent(this)
      this.subscribeForTestSlaves()
    }
    this.data.setMainTitle(this.data.getOtherParamTitle());
    this.getInstallerPwd();
    this.getUserPwd();
    this.data.userPasswordChanged(false)
    this.data.installerPasswordChanged(false)
  }
  setMovement(movement){
    this.logger.log("TESTMODE MOVEMENT " +"    "+ movement +"     " + (movement & 0x08) + "   " + (movement & 0x04)+ "   " + (movement & 0x02) + "   " + (movement & 0x01)) 
    if((movement & 0x08 ) > 0){
       this.Quad4 =true;
    }if((movement & 0x04 ) > 0){
       this.Quad3 =true;
    }if((movement & 0x02 ) > 0){
       this.Quad2 =true;
    }if((movement & 0x01 ) > 0 ){
       this.Quad1 =true;
    }
    setTimeout(()=> 
      this.UnsetQuads(), 1000
    )
  }
  UnsetQuads(){
    this.Quad1 = false;
    this.Quad2 = false;
    this.Quad3 = false;
    this.Quad4 = false;
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
      this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoad - 1;
      if(this.ad.energyMonitorConnectedLoad <= this.ad.energyMonitorConnectedLoadMin){
          this.ad.energyMonitorConnectedLoad = this.ad.energyMonitorConnectedLoadMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorConnectedLoad])
    }else if(item == 'lduration') {
      this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDuration - 1;
      if(this.ad.energyMonitorLightingDuration <= this.ad.energyMonitorLightingDurationMin){
          this.ad.energyMonitorLightingDuration = this.ad.energyMonitorLightingDurationMin;
        }
      if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,SCCP_DATATYPES.SCCP_TYPE_UINT16,this.ad.energyMonitorLightingDuration])
    }else if(item == 'eprice') {
      this.ad.energyMonitor.electricityPrice = this.ad.energyMonitor.electricityPrice - 1;
      if(this.ad.energyMonitor.electricityPrice  <= 0){
        this.ad.energyMonitor.electricityPrice  = 0;
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
      this.ad.energyMonitor.electricityPrice = this.ad.energyMonitor.electricityPrice + 1;
    }
  }
  onBLEdata(isread) {
    if(isread == true){
      this.loadingDataDone = true;
      this.zone.run( () => { // Change the property within the zone, CD will run after
        this.contactName = this.ad.contact;
        this.buildingName = this.ad.building;
        this.data.setEDevParamsState(0);
      });
    }
  }
  
  setCName(event: any) {
  if(this.contactName.length <= 0 ){
        
    }else {
        var nameBytes = [];
        for (var i = 0; i < this.contactName.length; i++){  
            nameBytes.push(this.contactName.charCodeAt(i));
        }
        nameBytes.push(0)
        this.data.addToSendData([SCCP_ATTRIBUTES.CONTACT,SCCP_DATATYPES.SCCP_TYPE_STRING,nameBytes])
    }
  }
  setBName(event: any) {
    if(this.buildingName.length <= 0 ){
        
    }else {
        var nameBytes = [];
        for (var i = 0; i < this.buildingName.length; i++){  
            nameBytes.push(this.buildingName.charCodeAt(i));
        }
        nameBytes.push(0)
        this.data.addToSendData([SCCP_ATTRIBUTES.BUILDING,SCCP_DATATYPES.SCCP_TYPE_STRING,nameBytes])
    }
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
  identifyLoadCh1(){
    this.data.sendIdentifyLoadCommand(0,5)
  }
  identifyLoadCh2(){
    this.data.sendIdentifyLoadCommand(1,5)
  }

  toggleDP(){
    this.ad.testModeDeactivateOutputsEnable = !this.ad.testModeDeactivateOutputsEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.testModeDeactivateOutputsEnable])
    this.data.sendChangedParams();
  }
  setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
  subscribeForTestSlaves(){
      this.data.configureData(this.slaveMovementAttrs)
  }
  unSubscribeForTestSlaves(){
    this.data.unConfigureData(this.slaveMovementAttrs)
  }
}
