import { Component, Injectable, trigger, state, animate, transition, style, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy, NgZone } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { SCCP_ATTRIBUTES } from '../data.service';
import { SCCP_DATATYPES } from '../data.service';

@Component({
  selector: 'footer-root',
  templateUrl: './footer.component.html',
  styleUrls: ['./header.component.css']
})
export class FooterComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  private snap: RouterStateSnapshot;

  isTestmode = 0;
  constructor(public logger: LoggerService, private router: Router, public data: DataService, private route: ActivatedRoute, private location: Location, private zone: NgZone) {
  }

  ngOnChanges(changes) {
  }
  ngOnInit() {
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
  }

  public getFooter() {
    return this.data.getFooter();
  }
  deActivateTestMode() {
    this.data.addToSendData([SCCP_ATTRIBUTES.TEST_MODE_ENABLE, SCCP_DATATYPES.SCCP_TYPE_BOOL, 0])
    if (this.data.getTestPriorRouteLength() == 0) {
      this.location.back();
    } else {
      this.data.setShowTestMode(0)
    }

    this.sendChangedParams();
  }
  getProfile() {
    return this.data.getProfile();
  }

  gotoPage(item) {
    this.router.navigateByUrl(item);
  }
  bjGoBack() {
    if((this.router.url=='/electrician/econfigdetector') || (this.router.url=='/user/uconfigdetector')){
         this.data.disConnectDevice();
    }
    let somestuff = this.router.routerState.snapshot.toString();
    if (this.data.getShowTestMode() == 1) {
      this.deActivateTestMode()
    } else {
      if (this.data.getShowHomeButton() || this.router.url.includes('energymonitor')) {//PDAL-2577
        this.data.goBackAfterSwitch();
      }
      else {

        /**
         * Clearing out the password changes that are not saved before exiting the screen
         */
        if (this.router.url.includes("otherparams")) {

          this.data.uiParams.toBeSetInstallerPwd = "";
          this.data.uiParams.toBeSetUserPwd = "";

          this.data.uiParams.installpwdChanged = false;
          this.data.uiParams.userPwdChanged = false;
        }

        this.location.back();
        this.data.resetTransferData();
      }
    }
  }
  getOtherParam() {
    // let testmodecheck = this.data.getOtherParam(); 
    // if(testmodecheck == 'testmode')
    //   this.isTestmode = 1
    // else 
    //   this.isTestmode = 0 
    // this.zone.run( () => { // Change the property within the zone, CD will run after

    // });
    return this.data.getOtherParam();
  }
  showOnlyCancel() {
    return this.data.showOnlyCancel();
  }
  getEDevParamsState() {
    return this.data.getEDevParamsState();
  }
  sendChangedParams() {
    this.data.sendChangedParams();
  }

  saveToLocalStorage() {
    this.data.saveToLocalStorage('ElectricityPrice', this.data.deviceParams.electricityPrice);
    this.data.setEDevParamsState(0);
  }
}
