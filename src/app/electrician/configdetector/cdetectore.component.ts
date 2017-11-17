import { Component, trigger, state, animate, transition, style, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, Renderer, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { SCCP_DATATYPES } from '../../data.service';
import { SCCP_ATTRIBUTES } from '../../data.service';
import { i18nService } from '../../i18n.service';

@Component({
  selector: 'cdetectore-root',
  templateUrl: './cdetectore.component.html',
  styleUrls: ['./cdetectore.component.css'],
  animations: [
    trigger('slideIn1', [
      state('*', style({
        display: 'none',
      })),
      state('in', style({
        width: '300px',
        display: 'block',
      })),
      state('out', style({
        display: 'none',
      })),
      transition('* => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-in')),
    ]),
    trigger('slideIn2', [
      state('*', style({
        display: 'none',
      })),
      state('in', style({
        display: 'block',
      })),
      state('out', style({
        display: 'none',
      })),
      transition('* => in', animate('300ms ease-in')),
      transition('in => out', animate('300ms ease-in')),
    ])
  ]
})
export class CDetectorEComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  activeDevice: any;
  ad: any;
  doDisConnect = true;
  onLabel = this.translater.translate('ON');
  offLabel = this.translater.translate('OFF');
  brthresholderror = false;
  brsetpointerror = false;
  sdelayerror = false;
  aslider = 'none';
  showSlider = false;
  detectorName;
  loadingDataDone = false;
  switchOffDelayInMinutes: number;
  switchOffDelayInSeconds: number;
  /* added by gopal:) */ 
  widgetSliderLevel: number;
  

  readAttrs = [
    SCCP_ATTRIBUTES.POTENTIOMETER_MODE,
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD,
    // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,                                 
    // SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MAX,                                 
    SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE,
    SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE,
    SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT,
    // SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN,                  
    // SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX,               
    SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE,
    SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE,
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY,
    SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
    // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,                                     
    // SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MAX,                                     
    SCCP_ATTRIBUTES.OPERATION_MODE,
    // SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MAX,                                            
    SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
    SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,
    SCCP_ATTRIBUTES.OUTDOOR_APPLICATION_ENABLE,
    SCCP_ATTRIBUTES.CH1_CIRCUIT_LOGIC,
    SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION,
    // SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN,                            
    // SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MAX,                                        
    SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION,
    // SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN,                                                                                   
    SCCP_ATTRIBUTES.SOFT_ON_ENABLE,
    SCCP_ATTRIBUTES.SOFT_ON_DURATION,
    // SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN,                                    
    // SCCP_ATTRIBUTES.SOFT_ON_DURATION_MAX,                                     
    SCCP_ATTRIBUTES.SOFT_OFF_ENABLE,
    SCCP_ATTRIBUTES.SOFT_OFF_DURATION,
    SCCP_ATTRIBUTES.SWITCH_OFF_PRE_WARNING_ENABLE,
    // SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN,
    // SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MAX,
    SCCP_ATTRIBUTES.PHASE_CUT_MODE,
    SCCP_ATTRIBUTES.CH1_MEMORY_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE,
    SCCP_ATTRIBUTES.CH1_MIN_LEVEL_ENABLE,
    SCCP_ATTRIBUTES.CH1_MIN_LEVEL,
    SCCP_ATTRIBUTES.CH1_MAX_LEVEL_ENABLE,
    SCCP_ATTRIBUTES.CH1_MAX_LEVEL,
    // SCCP_ATTRIBUTES.LEVEL_MIN,
    // SCCP_ATTRIBUTES.LEVEL_MAX,                                                
    SCCP_ATTRIBUTES.DALI_POWER_ON_LEVEL,
    // SCCP_ATTRIBUTES.COLOR_TEMPERATURE,    
    // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,                                                                        
    // SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MAX,                                    
    SCCP_ATTRIBUTES.BURN_IN_ENABLE,
    SCCP_ATTRIBUTES.BURN_IN_MODE,
    SCCP_ATTRIBUTES.BURN_IN_DURATION,
    // SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN,                                     
    // SCCP_ATTRIBUTES.BURN_IN_DURATION_MAX,                                     
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_MODE,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD,
    // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,                                        
    // SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX,        
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_START_TIME_ASTRO_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_END_TIME_ASTRO_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_START_TIME,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_END_TIME,
    SCCP_ATTRIBUTES.NIGHT_LIGHT_LEVEL,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME_ASTRO_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_ENABLE,
    SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY,
    // SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN,                            
    // SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MAX,                            
    SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_LEVEL,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_ENABLE,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_START_TIME,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME,
    SCCP_ATTRIBUTES.PRESENCE_SIMULATION_END_TIME_ASTRO_FUNCTION_ENABLE,
    SCCP_ATTRIBUTES.PERMANENT_LIGHT_BY_PUSH_BUTTON_ENABLE,
    SCCP_ATTRIBUTES.CH2_CIRCUIT_LOGIC,
    SCCP_ATTRIBUTES.CH2_MODE,
    SCCP_ATTRIBUTES.HVAC_DYNAMICAL_CONTROL_ENABLE,
    SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY,
    // SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN,                                 
    // SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MAX,                                 
    SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_LEVEL,
    // SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN,
    // SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MAX, 
    SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD,
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,                        
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MAX,                        
    SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION,
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,                     
    // SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MAX,                                                                                                                       
    SCCP_ATTRIBUTES.ENABLE_USER_SET_BRIGHTNESS_THRESHOLD,
    SCCP_ATTRIBUTES.ENABLE_USER_SET_SWITCH_OFF_DELAY,
    SCCP_ATTRIBUTES.ENABLE_USER_ENERGY_MONITOR,
    SCCP_ATTRIBUTES.ENABLE_USER_BASIC_BRIGHTNESS,
    SCCP_ATTRIBUTES.ENABLE_USER_NIGHT_LIGHT_FUNCTION,
    SCCP_ATTRIBUTES.ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE,
    SCCP_ATTRIBUTES.CURRENT_BRIGHTNESS,
    //added by gopal
    SCCP_ATTRIBUTES.CURRENT_OPERATING_MODE,
    SCCP_ATTRIBUTES.IDENTIFYING_DEVICE,
    SCCP_ATTRIBUTES.MOVEMENT,
    SCCP_ATTRIBUTES.CH1_IDENTIFYING_LOAD,
    SCCP_ATTRIBUTES.CH1_ON_OFF_STATE,
    SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,
    SCCP_ATTRIBUTES.CH2_IDENTIFYING_LOAD,
    SCCP_ATTRIBUTES.CH2_ON_OFF_STATE,
    SCCP_ATTRIBUTES.TEST_MODE_ENABLE,
    SCCP_ATTRIBUTES.ACCESS_LEVEL,
    SCCP_ATTRIBUTES.END_USER_PASSWORD_LENGTH,
    SCCP_ATTRIBUTES.PASSWORD_REMINDER_ACTIVE,
    //added by gopal - PDAL 2818
    SCCP_ATTRIBUTES.CONTACT,
    SCCP_ATTRIBUTES.BUILDING
  ]

  arrayReadAttrs = [
    SCCP_ATTRIBUTES.PIR_SENSITIVITY, //ATTR TYPE
    0x04,                            // NUMBER OF ATTRS 
    SCCP_ATTRIBUTES.PIR_SENSITIVITY_ODOR,
    0x04,
    SCCP_ATTRIBUTES.SOFT_ON_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.SOFT_OFF_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.LEVEL_MIN,
    0x02,
    SCCP_ATTRIBUTES.BURN_IN_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN,
    0x02,
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.CH1_PERMANENT_OFF_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.CH1_PERMANENT_ON_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.COLOR_TEMPERATURE_MIN,
    0x02,
    SCCP_ATTRIBUTES.BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN,
    0x02,
    SCCP_ATTRIBUTES.STEPWISE_SWITCH_OFF_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.HVAC_SWITCH_ON_DELAY_MIN,
    0x02,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_CONNECTED_LOAD_MIN,
    0x02,
    SCCP_ATTRIBUTES.ENERGY_MONITOR_LIGHTING_DURATION_MIN,
    0x02,
    SCCP_ATTRIBUTES.HVAC_SWITCH_OFF_DELAY_MIN,
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
    SCCP_ATTRIBUTES.CURRENT_OPERATING_MODE,
    /* added by gopal:) */
    SCCP_ATTRIBUTES.SWITCH_OFF_DELAY
  ]

  permanentSubscrioAttrs = [
    SCCP_ATTRIBUTES.TEST_MODE_ENABLE,
  ]

  constructor(public logger: LoggerService, public data: DataService,
    private router: Router, private route: ActivatedRoute,
    private renderer: Renderer, private elRef: ElementRef,
    private zone: NgZone, private translater: i18nService) {
    //this.data.resetTransferData();
    this.activeDevice = this.data.getSelectedDevice(false);
    this.ad = this.data.getDevicedata(false);
    this.data.setFooter(true);
    this.ad.deviceType = this.activeDevice.deviceType;
    this.aslider = 'none';
    this.showSlider = false;
    this.data.setActiveComponent(this);
    this.detectorName = this.ad.btDeviceName;

    /* added by gopal:) */
    this.widgetSliderLevel = this.ad.ch1CurrentLevel;
    

    // else {
    //   this.loadingDataDone = true;
    // }

    console.log("CDETECTOR CONSTR TRIGGER", this);
  }

  ngOnChanges(changes) {
  }
  ngDoCheck() {
  }
  toggleclr() {
    this.ad.constantLightControlEnable = !this.ad.constantLightControlEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, this.ad.constantLightControlEnable ? 1 : 0])
  }
  togglecsb() {
    this.ad.considerSlaveBrightnessEnable = !this.ad.considerSlaveBrightnessEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSIDER_SLAVE_BRIGHTNESS_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, this.ad.considerSlaveBrightnessEnable ? 1 : 0])
  }
  togglerrb() {
    this.ad.constantLightControlConsiderSlaveBrightnessEnable = !this.ad.constantLightControlConsiderSlaveBrightnessEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, this.ad.constantLightControlEnable ? 1 : 0])
  }

  /**
  * Limit Room brightness
  * //added by gopal
  */
  togglelrb() {
    this.ad.delimitLightingLevelEnable = !this.ad.delimitLightingLevelEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.DELIMIT_LIGHTING_LEVEL_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, this.ad.delimitLightingLevelEnable ? 1 : 0])
  }

  togglemsd() {
    // this.ad.slaveModeEnable = ! this.ad.slaveModeEnable
    // this.data.addToSendData([SCCP_ATTRIBUTES.SLAVE_MODE_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.slaveModeEnable?1:0])
  }
  togglestp() {
    this.ad.shortTimePulseEnable = !this.ad.shortTimePulseEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.SHORT_TIME_PULSE_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, this.ad.shortTimePulseEnable ? 1 : 0])
  }

  formatSwitchOffDelay(delay) {
    //assuming that the delay from device is in seconds;

    this.switchOffDelayInMinutes = +Math.floor(delay / 60);
    this.switchOffDelayInSeconds = +Math.floor(delay % 60);


  }

  ngOnInit() {
    console.log("CDETECTOR INIT TRIGGER", this);
    this.doDisConnect = true;
    this.data.setMainTitle(this.translater.translate('Configure detector'));
    this.data.setOtherParam('', '');
    this.data.setEDevParamsState(0);
    if (this.data.getDeviceConnectionState() == true) {
      if (this.data.getFromRoot() == true)
        this.data.readData(this.readAttrs);
      else
        this.loadingDataDone = true;
    }
    this.data.setProfileSwitch(true)
    this.data.setShowHomeButton(true);//PDAL-2577
    this.formatSwitchOffDelay(this.ad.switchOffDelay);
    console.log("CDETECTOR INIT TRIGGER", this);
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

  switchOffDelayOnInit(delay) { /*Added By BikashV PDAL2815*/
    return Math.floor(delay);
  }


  formatTimeValue(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  brThresholdChange(element) {
    if (this.ad.brightnessThreshold <= this.ad.brightnessThresholdMin) {
      this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
      element.value = this.ad.brightnessThreshold;
      this.zone.run(() => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold;
      });
    }
    if (this.ad.brightnessThreshold >= this.ad.brightnessThresholdMax) {
      this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
      element.value = this.ad.brightnessThreshold;
      this.zone.run(() => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold;
      });
    }
  }

  showResetDialog() {
    this.data.setDialogTitle(this.translater.translate("Reset ") + this.activeDevice.btDeviceName);
    this.data.setDialogText(this.translater.translate("Are you sure to set the ") + '"' + this.activeDevice.btDeviceName + '"' + this.translater.translate(" to factory adjustment?"));
    this.data.setShowModal(true);
    this.data.setResetCommand(0x02);
  }

  potentioMeterChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.POTENTIOMETER_MODE, SCCP_DATATYPES.SCCP_TYPE_ENUM8, this.ad.potentiometerMode])
  }
  operationChanged() {
    this.data.addToSendData([SCCP_ATTRIBUTES.OPERATION_MODE, SCCP_DATATYPES.SCCP_TYPE_ENUM8, this.ad.operationMode])
  }
  reduceCount(item, isClick) {
    if (item == 'threshold') {
      this.ad.brightnessThreshold = this.data.getPermanentTapVal(isClick, this.ad.brightnessThreshold, 'decrease', this.data.permanentTapStep_1_10_50);
      if (this.ad.brightnessThreshold <= this.ad.brightnessThresholdMin) {
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
      }
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.brightnessThreshold)])
      }
    }
    else if (item == 'setpoint') {
      this.ad.constantLightBrightnessSetPoint = this.data.getPermanentTapVal(isClick, this.ad.constantLightBrightnessSetPoint, 'decrease', this.data.permanentTapStep_1_10_50);
      if (this.ad.constantLightBrightnessSetPoint <= this.ad.constantLightBrightnessSetPointMin) {
        this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMin;
      }
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
      }
    }
    else if (item == 'sdelay') {
      //this.ad.switchOffDelay = this.ad.switchOffDelay - 1;
      this.ad.switchOffDelay = this.data.getStepTapVal("decrease", this.data.StepArrSwitchOffDelay,this.ad.switchOffDelay);
      if (this.ad.switchOffDelay <= this.ad.switchOffDelayMin) {
        this.ad.switchOffDelay = this.ad.switchOffDelayMin;
      }
      this.formatSwitchOffDelay(this.ad.switchOffDelay);
      this.ad.switchOffDelay = this.switchOffDelayInMinutes * 60 + this.switchOffDelayInSeconds;
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.switchOffDelay)])
      }
    }
  }

  setDevName(event: any) {
    if (this.detectorName.length <= 0) {
      this.data.setEDevParamsState(0)
    } else {
      var nameBytes = [];
      for (var i = 0; i < this.detectorName.length; i++) {
        nameBytes.push(this.detectorName.charCodeAt(i));
      }
      nameBytes.push(0)
      this.data.addToSendData([SCCP_ATTRIBUTES.BT_DEVICE_NAME, SCCP_DATATYPES.SCCP_TYPE_STRING, nameBytes])
    }
    this.data.setEDevParamsState(1)
  }
  setBrTr(event: any) {
    if (event.target.value < this.ad.brightnessThresholdMin) {
      this.ad.brightnessThreshold = this.ad.brightnessThresholdMin;
      event.target.value = this.ad.brightnessThresholdMin;
    }
    if (event.target.value > this.ad.brightnessThresholdMax) {
      this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
      event.target.value = this.ad.brightnessThresholdMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.brightnessThreshold)])
  }

  setBrSp(event: any) {
    if (event.target.value < this.ad.constantLightBrightnessSetPointMin) {
      this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMin;
      event.target.value = this.ad.constantLightBrightnessSetPointMin;
    }
    if (event.target.value > this.ad.constantLightBrightnessSetPointMax) {
      this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMax;
      event.target.value = this.ad.constantLightBrightnessSetPointMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
  }

  setSoffDelay(event: any) {
    if (event.target.value < this.ad.switchOffDelayMin) {
      this.ad.switchOffDelay = this.ad.switchOffDelayMin;
      event.target.value = this.ad.switchOffDelayMin;
    }
    if (event.target.value > this.ad.switchOffDelayMax) {
      this.ad.switchOffDelay = this.ad.switchOffDelayMax;
      event.target.value = this.ad.switchOffDelayMax;
    }
    this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.switchOffDelay)])
  }

  dopen() {
    return false;
  }

  setCurrentBr() { // without type info
    if (this.ad.constantLightControlEnable == true) {
      this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.currentBrightness)])
      this.ad.constantLightBrightnessSetPoint = this.ad.currentBrightness;
    } else {
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.currentBrightness)])
      this.ad.brightnessThreshold = this.ad.currentBrightness;
    }
    //this.data.sendChangedParams();
  }

  // brightnessChanged() {
  //   this.data.addToSendData([SCCP_ATTRIBUTES.CH1_CURRENT_LEVEL,SCCP_DATATYPES.SCCP_TYPE_UINT8,this.data.getHexofMe(this.ad.ch1CurrentLevel)])
  // }

  //added by Gopal

  //added by Gopal

  slideThis(isSliding) {
    this.data.uiParams.ignoreSubscribedAttributes = isSliding;
  }


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

    // console.log("current brightness level", this.widgetSliderLevel);
    // this.data.uiParams.ignoreSubscribedAttributes = true;

    setTimeout(() =>
      this.data.setCurrentLevel(this.widgetSliderLevel, 0, 1), 200
    )

    // setTimeout(() =>
    //   function () {
    //     console.log("Start listening to real brightness level")
    //     this.data.uiParams.ignoreSubscribedAttributes = false;
    //   }, 1000
    // )

    // this.data.setCurrentLevel(this.ad.ch1CurrentLevel, 0, 0);
  }

  increaseCount(item, isClick) {
    if (item == 'threshold') {

      this.ad.brightnessThreshold = this.data.getPermanentTapVal(isClick, this.ad.brightnessThreshold, 'increase', this.data.permanentTapStep_1_10_50);
      //this.ad.brightnessThreshold = this.ad.brightnessThreshold + 1;
      if (this.ad.brightnessThreshold >= this.ad.brightnessThresholdMax) {
        this.ad.brightnessThreshold = this.ad.brightnessThresholdMax;
      }
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_THRESHOLD, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.brightnessThreshold)])
      }
    }
    else if (item == 'setpoint') {
      this.ad.constantLightBrightnessSetPoint = this.data.getPermanentTapVal(isClick, this.ad.constantLightBrightnessSetPoint, 'increase', this.data.permanentTapStep_1_10_50);
      // this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPoint + 1;
      if (this.ad.constantLightBrightnessSetPoint >= this.ad.constantLightBrightnessSetPointMax) {
        this.ad.constantLightBrightnessSetPoint = this.ad.constantLightBrightnessSetPointMax;
      }
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.CONSTANT_LIGHT_BRIGHTNESS_SET_POINT, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.constantLightBrightnessSetPoint)])
      }
    }
    else if (item == 'sdelay') {
      //this.ad.switchOffDelay = this.ad.switchOffDelay + 1;
      this.ad.switchOffDelay = this.data.getStepTapVal("increase", this.data.StepArrSwitchOffDelay,this.ad.switchOffDelay);
      if (this.ad.switchOffDelay >= this.ad.switchOffDelayMax) {
        this.ad.switchOffDelay = this.ad.switchOffDelayMax;
      }
      this.formatSwitchOffDelay(this.ad.switchOffDelay);
      this.ad.switchOffDelay = this.switchOffDelayInMinutes * 60 + this.switchOffDelayInSeconds;
      if (isClick) {
        this.data.addToSendData([SCCP_ATTRIBUTES.SWITCH_OFF_DELAY, SCCP_DATATYPES.SCCP_TYPE_UINT16, this.data.getHexofMe(this.ad.switchOffDelay)])
      }
    }
  }

  slideBrightnessIn() {
    this.aslider = 'in';
  }
  slideBrightnessOut() {
    this.aslider = 'out';
  }
  setActuatorBrightness() {
  }
  slideBackground(value) {
    let stringval = value.toString();
    let stylestr = "linear-gradient(to right,#2c435c " + stringval + "%, transparent 0%";
    let mystyles = {
      'background': stylestr
    }
    return mystyles;
  }
  animationStarted($event) {
    if ($event.toState == "in") {
      this.showSlider = true;
    } else if ($event.toState == "in") {

    }
  }
  animationDone($event) {
    if ($event.toState == "out") {
      this.showSlider = false;
    }
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

    /**
     * Trigger reporting attribute request 
     */
    this.subcribeForDetails();   

  }


  getLightIntensity() {

    let intensity = (this.widgetSliderLevel / 10);

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

  ngOnDestroy() {
    if (this.data.getShowTestMode() == 1) {
      return;
    } else {
      this.unSubscriveDetails()
      this.data.setProfileSwitch(false)
      if (this.doDisConnect == true && this.data.getProfile() == 'electrician')
        this.data.disConnectDevice();
    }
    this.data.unConfigureData(this.updateSubcribeAttrs)
    this.data.unConfigureData(this.permanentSubscrioAttrs)
  }
  gotoActuator1() {
    this.doDisConnect = false;
    this.router.navigate(['eactuator1'], { relativeTo: this.route });
  }
  gotoActuator2() {
    this.doDisConnect = false;
    this.router.navigate(['eactuator2'], { relativeTo: this.route });
  }
  gotoOtherParams(otherparam, otherParamTitle) {
    this.doDisConnect = false;
    if (otherparam == 'testmode') {
      this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, 1])
      this.data.sendChangedParams();
    }
    otherParamTitle = this.translater.translate(otherParamTitle);
    this.data.setOtherParam(otherparam, otherParamTitle);
    this.router.navigate(['otherparams'], { relativeTo: this.route });
  }

  gotoaddParams() {
    this.doDisConnect = false;
    this.router.navigate(['addparams'], { relativeTo: this.route });
  }

  onNonArrayRead() {
    if (this.data.getDeviceConnectionState() == true) {
      if (this.data.getFromRoot() == true) {
        this.data.readArrayData(this.arrayReadAttrs);
      }
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
      this.checkPWDReminder()
      setTimeout(() =>
        this.subcribeForDetails(), 1000
      )
      setTimeout(() =>
        this.subcribeForPermanentDetails(), 2000
      )
      this.data.setFromRoot(false);
      this.loadingDataDone = true;
      this.setDeviceInfo();
      this.data.addDevice(this.ad, false);
      this.data.checkAndAddDeviceToInstalledDevices();
      this.zone.run(() => { // Change the property within the zone, CD will run after
        this.ad.brightnessThreshold = this.ad.brightnessThreshold;
        this.data.setEDevParamsState(0);
      });
    } else {
      this.onNonArrayRead();
    }
  }

  onReportBLEdata() {
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.ad.brightnessThreshold = this.ad.brightnessThreshold;
    });
  }

  checkPWDReminder() {
    if (this.ad.enduserpwdlength == 0 && this.ad.passwordreminder == 1) {
      this.logger.log("PWD REMINDER IS ACTIVE")
      // Show PWD REMINDER
    }
  }

  setDeviceInfo() {
    let data = this.data.getSelectedDevice(false);
    this.ad.btDeviceName = data.btDeviceName;
    this.detectorName = this.ad.btDeviceName;
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
  }
  setLoadingDataDone(value) {
    this.loadingDataDone = value;
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
}
