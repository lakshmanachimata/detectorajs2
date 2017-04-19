import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy,NgZone} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import {SCCP_DATATYPES} from'../../../data.service';
import {SCCP_ATTRIBUTES} from'../../../data.service';

@Component({
  selector: 'addparams-root',
  templateUrl: './addparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EAddParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    activeDevice:any;
    ad:any;
    onLabel = 'on';
    offLabel = 'off';
    brrangeerror = false;
    loadingDataDone = false;
    readAttrs =[
          SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_ENABLE,
          SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,
          SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,
          ]


  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute, private zone:NgZone) {
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
    this.data.setMainTitle('Additional sensor paramters');
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


  increaseCount(item,isClick) {
    this.ad.brightnessCorrectionValue = this.ad.brightnessCorrectionValue + 1;
    if(isClick)
      this.data.addToSendData([SCCP_ATTRIBUTES.BRIGHTNESS_CORRECTION_VALUE,SCCP_DATATYPES.SCCP_TYPE_INT16,this.ad.brightnessCorrectionValue])
  }

  toggledsd(){
    this.ad.DynamicSwitchOffDelayEnable = !this.ad.DynamicSwitchOffDelayEnable;
    this.data.addToSendData([SCCP_ATTRIBUTES.DYNAMIC_SWITCH_OFF_DELAY_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.DynamicSwitchOffDelayEnable?1:0])
  }
  onBLEdata() {
    this.loadingDataDone = true;
    this.zone.run( () => { // Change the property within the zone, CD will run after
        this.ad.brightnessCorrectionEnable = this.ad.brightnessCorrectionEnable ;
      });
  }
    setLoadingDataDone(value){
    this.loadingDataDone = value;
  }
}
