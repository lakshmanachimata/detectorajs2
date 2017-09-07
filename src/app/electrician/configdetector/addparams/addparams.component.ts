import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';
import { i18nService } from '../../../i18n.service';
@Component({
  selector: 'addparams-root',
  templateUrl: './addparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EAddParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    activeDevice:any;
    ad:any;
    testmodestate = 0;
    onLabel = this.translater.translate('ON');
    offLabel = this.translater.translate('OFF');
    brrangeerror = false;
    loadingDataDone = false;
    readAttrs =[
          //REMOVED IN LATEST RELEASE
          // SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,
          // SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,
          SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,
          ]


  constructor(public logger: LoggerService,public data: DataService, private router:Router,
              private route: ActivatedRoute, private zone:NgZone,private translater:i18nService) {
      this.activeDevice = this.data.getSelectedDevice(false);
      this.ad = this.data.getDevicedata(false);
      this.data.setActiveComponent(this);
      this.data.setOtherParam('','');
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
    this.data.setMainTitle(this.translater.translate('Additional sensor parameters'));

      // if(this.data.gettestmodetest() == 0){
      //   this.data.testTestMode();
      //   this.data.settestmodetest(1);
      // }
    
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



  toggleBr(){
   this.ad.brightnessCorrectionEnable = !this.ad.brightnessCorrectionEnable;
   this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.brightnessCorrectionEnable?1:0])
  }
  gotoSensitivity() {
    this.router.navigate(['sensitivity'],{relativeTo: this.route})
  }
  reduceCount(item,isClick) {
    this.ad.brightnessCorrectionValue = this.ad.brightnessCorrectionValue - 1;

    if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.brightnessCorrectionValue])
  }


  setBrSt(event: any){
    this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.brightnessCorrectionValue])
  }

  increaseCount(item,isClick) {
    this.ad.brightnessCorrectionValue = this.ad.brightnessCorrectionValue + 1;
    if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.brightnessCorrectionValue])
  }

  toggledsd(){
    this.ad.DynamicSwitchOffDelayEnable = !this.ad.DynamicSwitchOffDelayEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.DynamicSwitchOffDelayEnable?1:0])
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
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessCorrectionEnable = this.ad.brightnessCorrectionEnable ;
        this.data.setEDevParamsState(0);
      });
  }
    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
