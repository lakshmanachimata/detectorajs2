import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService , SCCP_ATTRIBUTES,SCCP_DATATYPES} from '../data.service';
import { i18nService } from '../i18n.service';
@Component({
  selector: 'testmode-root',
  templateUrl: './testmode.component.html',
  styleUrls: ['./testmode.component.css'],
})

export class TestModeComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    ad:any;
    masterQuad = 'q1';
    activeDevice:any;
    onLabel = this.translater.translate('ON');
    offLabel = this.translater.translate('OFF');
    constructor(public logger: LoggerService,private router:Router,public data:DataService
        ,private translater:i18nService) {
    }
    ngOnChanges(changes) { 
    }
    ngOnInit() { 
        this.activeDevice = this.data.getSelectedDevice(false);
        this.data.setOtherParam('testmode','Test mode');
        this.ad = this.data.getDevicedata(false);
        this.data.setActiveComponent(this);
        this.data.setEDevParamsState(0);
    }
    ngDoCheck() { 
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
        this.data.setOtherParam('','');
    }
    togglech1ID(){
        this.data.sendIdentifyLoadCommand(0,5);
    }
    togglech2ID(){
        this.data.sendIdentifyLoadCommand(1,5);
    }
    toggleDP(){
        this.ad.testModeDeactivateOutputsEnable = !this.ad.testModeDeactivateOutputsEnable;
        this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE,SCCP_DATATYPES.SCCP_TYPE_BOOL,this.ad.testModeDeactivateOutputsEnable])
        this.data.sendChangedParams();
    }
}
