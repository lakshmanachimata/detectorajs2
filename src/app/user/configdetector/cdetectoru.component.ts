import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, NgZone } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SCCP_DATATYPES } from '../../data.service';
import { SCCP_ATTRIBUTES } from '../../data.service';



@Component({
  selector: 'cdetectoru-root',
  templateUrl: './cdetectoru.component.html',
  styleUrls: ['./cdetectoru.component.css']
})
export class CDetectorUComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {


  activeDevice: any;
  ad: any;
  doDisConnect = true;
  onLabel = 'ON';
  offLabel = 'OFF';
  readAttrs = [
    SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
    //settings u
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME_ASTRO_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
    // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,
    // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,
    // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,
    // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
    SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,
    // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
    // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,
    SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,
    SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,
    SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,
    SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,
    SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,
    SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE,
    SCCP_ATTRIBUTES.CURRENT_OPERATING_MODE,
    SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,
    SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
    SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,
    SCCP_ATTRIBUTES.CH2_MODE,
  ]

  arrayReadAttrs = [
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,
    0x02
  ]
  updateSubcribeAttrs = [
    SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,
    SCCP_ATTRIBUTES.OPERATION_MODE,
    SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,
    SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
    SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,
    SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
  ]
  permanentSubscrioAttrs = [
    SCCP_ATTRIBUTES.TEST_MODE_ENABLE,
  ]

  light1state = 0;
  loadingDataDone = false;
  constructor(public logger: LoggerService, public data: DataService,
    private router: Router, private route: ActivatedRoute, private zone: NgZone) {
    this.activeDevice = this.data.getSelectedDevice(false);
    this.ad = this.data.getDevicedata(false);
    this.data.setFooter(true);
    this.data.setActiveComponent(this);
    this.data.setMainTitle(this.data.uiParams.devicesObj.DeviceData.btDeviceName);

    if (this.data.getDeviceConnectionState() == true) {
      if (this.data.getFromRoot() == true)
        this.data.readData(this.readAttrs);
      else
        this.loadingDataDone = true;
    }

    this.ad.deviceType = this.activeDevice.deviceType;
  }

  slideBackground(value) {
    let stringval = value.toString();
    let stylestr = "linear-gradient(to right,#2c435c " + stringval + "%, transparent 0%";
    let mystyles = {
      'background': stylestr
    }
    return mystyles;
  }

  slideNext() {
    this.light1state = this.light1state + 1;
  }

  //added by Gopal
  brightnessChanged() {
    //Switching to manual mode if the user users the slider
    // if (this.ad.currentOperatingMode !== 1) {
    //   this.ad.currentOperatingMode = 1;
    //   this.data.setCurrentOperatingMode(this.ad.currentOperatingMode);
    // }

    // this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL, SCCP_DATATYPES.SCCP_TYPE_UINT8, this.data.getHexofMe(this.ad.ch1CurrentLevel)])

    // changing from WRITE attr mode to Command Attr mode - gopal

    // let withOn = this.ad.ch1OnOffState;
    let data = this.data;
    let ad = this.ad;
    console.log("BRIGHTNESS CHANGE DETECTED ", this);

    setTimeout(() =>
      this.data.setCurrentLevel(this.ad.ch1CurrentLevel, 0, 0), 500
    )
  }

  slidePrev() {
    this.light1state = this.light1state - 1;
  }
  gotoEnergySettings() {
    this.doDisConnect = false;
    this.router.navigate(['energymonitor'], { relativeTo: this.route });
    //this.data.setShowOnlyCancel(false);
  }
  gotoSettings() {
    this.doDisConnect = false;
    this.router.navigate(['settingsu'], { relativeTo: this.route });
    this.data.setShowOnlyCancel(false);
  }
  gotoTestMode() {
    this.doDisConnect = false;
    this.router.navigate(['testmode'], { relativeTo: this.route });
  }

  ngOnChanges(changes) {
  }
  ngDoCheck() {
  }
  ngOnInit() {
    this.data.setProfileSwitch(true)
    this.doDisConnect = true;
    this.data.setOtherParam('', '');
    this.data.setShowOnlyCancel(true);
    this.data.setShowHomeButton(true);//PDAL-2577
    // setTimeout(()=> 
    // this.data.testTestMode(), 5000
    // )
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
    if (this.data.getShowTestMode() == 1) {
      return;
    } else {
      this.unSubscriveDetails()
      this.data.setProfileSwitch(false)
      if (this.doDisConnect == true && this.data.getProfile() == 'user')
        this.data.disConnectDevice();
    }
  }

  onNonArrayRead() {
    if (this.data.getDeviceConnectionState() == true) {
      if (this.data.getFromRoot() == true)
        this.data.readArrayData(this.arrayReadAttrs);
      else
        this.loadingDataDone = true;
    }
  }

  onBLEdata(isRead, iswrite) {
    if (iswrite == true) {
      this.zone.run(() => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold;
        this.data.setEDevParamsState(0);
        this.loadingDataDone = true;
      });
      this.loadingDataDone = true;
    }
    if (isRead) {
      setTimeout(() =>
        this.subcribeForDetails(), 1000
      )
      setTimeout(() =>
        this.subcribeForPermanentDetails(), 1000
      )
      this.data.setFromRoot(false);
      this.loadingDataDone = true;
      this.setDeviceInfo();
      this.zone.run(() => { // Change the property within the zone, CD will run after
        this.ad.ch1CurrentLevel = this.ad.ch1CurrentLevel;
        this.data.setEDevParamsState(0);
      });
    } else {
      this.onNonArrayRead();
    }

  }
  onReportBLEdata() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.ad.ch1CurrentLevel = this.ad.ch1CurrentLevel;
    });
  }

  setLoadingDataDone(value) {
    this.loadingDataDone = value;
  }

  setDeviceInfo() {
    let data = this.data.getSelectedDevice(false);
    this.ad.btDeviceName = data.btDeviceName;
    this.ad.btAddress = data.btAddress;
    this.ad.btIAddress = data.btIAddress;
    this.ad.modelNumber = data.modelNumber;
    this.ad.deviceType = data.deviceType;
    this.ad.contactName = data.contactName;
    this.ad.buildingName = data.buildingName;
    this.ad.createdDate = data.createdDate;
    this.ad.fwupdate = data.fwupdate;
    this.ad.modelType = data.modelType;
    this.ad.firmwareVersion = data.firmwareVersion;
    this.ad.rssi = data.rssi;
    this.ad.updatedDate = data.updatedDate;
    this.ad.profileName = data.profileName;
    this.ad.btDeviceName = data.btDeviceName;
  }
  subcribeForDetails() {
    this.data.configureData(this.updateSubcribeAttrs)
  }
  subcribeForPermanentDetails() {
    this.data.configureData(this.permanentSubscrioAttrs)
  }
  unSubscriveDetails() {
    this.data.unConfigureData(this.updateSubcribeAttrs)
    this.data.unConfigureData(this.permanentSubscrioAttrs)
  }

  /**
  * To activate the right operating mode icon 
  * based on the current operating mode
  * @param integer mode
  */
  operatingModeStatus(mode) {

    // console.log(" Operating mode styles triggered " + this.ad.currentOperatingMode, mode);

    let opacity = (this.ad.currentOperatingMode !== mode) ? 0.5 : 1;

    let mystyles = {
      'opacity': opacity
    }

    return mystyles;
  }

  /**
   * To set the selected operating mode and 
   * keep it ready to send to the device
   */
  operationModeChanged(newMode) {

    // this.ad.currentOperatingMode = newMode || 0;

    console.log("Current Operating Mode changed from " + this.ad.currentOperatingMode + " to " + newMode);

    //if the mode is changed only then update the mode to the changed one
    if (newMode != this.ad.currentOperatingMode) {
      this.ad.currentOperatingMode = newMode;
    } else {
      //default the mode to manual
      this.ad.currentOperatingMode = 1;
    }
    console.log("Current Operating Mode changed to " + this.ad.currentOperatingMode);

    // set the current operating mode on the device
    this.data.setCurrentOperatingMode(this.ad.currentOperatingMode);
  }

  /**
     * Function to toggle the Actuator state
     * @param {boolean} on
     * @param {integer} channel_index
     */
  toggleActuator(on, channel) {

    console.log("Toggle Actuator to " + on + " || Channel -" + channel);

    this.data.setOnOff(on, channel);

  }


  getLightIntensity() {

    let intensity = (this.ad.ch1CurrentLevel / 10);

    //initial intensity of the light is very dim hence just boosting it by 1px
    let offset = intensity == 0 ? 0 : 1;

    let mystyles = {
      'filter': 'drop-shadow(0px -2px ' + (intensity + offset) + 'px rgba(255, 255, 255, 0.99))',
      '-webkit-filter': 'drop-shadow(0px -2px ' + (intensity + offset) + 'px rgba(255, 255, 255, 0.99))',
    }

    return mystyles;
  }

  //CH2_DISABLED = 0, 
  //CH2_BRIGHTNESS_INDEPENDENT = 1, 
  //CH2_SWITCH_OFF_DALI_VOLTAGE = 2, 
  //CH2_SYNCHRONOUS_OPERATION = 3, 
  //CH2_BLACKBOARD_LIGHTING = 4, 
  //CH2_MANUAL = 5, 
  //CH2_HVAC = 6

  //"(deviceType ==  daliMaster1c) && (ch2Mode == CH2_HVAC)"
 /**
   * Function to Handle HVAC status
   */
  getHvacState() {
    return (this.ad.ch2OnOffState) ? 'assets/icons/fan_003039.svg' : 'assets/icons/fan-line_003040.svg';
  }


  //"(deviceType ==  daliMaster1c) && (ch2Mode == CH2_BLACKBOARD_LIGHTING)"
  /**
   * Function to handle Blackboard lighting state
   */
  getBlackBoardLightState() {
    return (this.ad.ch2OnOffState) ? 'assets/icons/light-on-detail_001003.svg' : 'assets/icons/light-off_001001.svg';
  }

  //"(deviceType ==  daliMaster1c) &&   ((ch2Mode == CH2_MANUAL) || ch2Mode == CH2_BRIGHTNESS_INDEPENDENT))"
  /**
   * Function to handle Actuator 2 state
   */
  getActuator2State() {
    return (this.ad.ch2OnOffState) ? 'assets/icons/light-on-detail_001003.svg' : 'assets/icons/light-off_001001.svg';
  }
  /**/
}
