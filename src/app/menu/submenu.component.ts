import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy ,Pipe,PipeTransform,NgZone} from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common'
import {HeaderComponent} from '../header/header.component'
import {HTTPCODES} from '../data.service'
import { i18nService } from '../i18n.service';

@Component({
  selector: 'submenu-root',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.css'],
  animations: [
      trigger('subMenuSlideIn', [
        state('*', style({
            transform: 'translateX(+100%)',
        })),
        state('rightin', style({
            transform: 'translateX(0)',
        })),
        state('rightout',   style({
            transform: 'translateX(+100%)',
        })),
        transition('* => rightin', animate('700ms ease-in')),
        transition('rightin => rightout', animate('700ms ease-in'))
        ])
    ]
})

export class SubMenuComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    subMenuState = 'none';
    arrowStateObserve: any;
    public username = 'lakshmana'
    public password = 'Abb@123456'
    detectors:Array<any>;
    selectedSortType = 'modelType';
    heloText = this.translater.translate("Download manuals");
    sortUITypes = [ this.translater.translate("Sort by"),
                    this.translater.translate("Contact name"),
                    this.translater.translate("Building"),
                    this.translater.translate("Date of change"),
                    this.translater.translate("Article Number")];
    helpLink ="https://www.busch-jaeger.de/en/service-int/downloads/downloads-data-sheets/";
    aboutText = this.translater.translate("More information available on");
    aboutLink="https://www.busch-jaeger.de/en/";
    sortedMap;
    profile_name;
    onLabel = this.translater.translate('ON');
    offLabel = this.translater.translate('OFF');
    autoSync = true;
    loadingInstalleDeviceData =  false;
    header:HeaderComponent;
    searchText = '';
    lastSynced = '';
    constructor(public logger: LoggerService,public data: DataService,
                private router:Router,private route:ActivatedRoute,private zone:NgZone,
                private translater:i18nService) {
        this.subMenuState = 'none';
        this.detectors = data.getDevices(true);
        this.selectedSortType = this.sortUITypes[0];
        this.sortedMap = [];
        for (var i=0; i<this.detectors.length; i++) {
            this.sortedMap.push(this.detectors[i]);
        }
        this.detectors = this.sortedMap;
        this.profile_name = this.data.getProfile();
        this.header = this.data.getHeaderComponent();
    }

    subMenuVal() {
        return this.data.getSubMenuVal();
    }
    ngOnChanges(changes) { 
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

    animationStarted($event) {
    }

    animationDone($event) {
        if(this.subMenuState  == 'rightout')
            this.data.setMenuArrow(0);
    }

    switchProfile(profilename) {
        if(profilename == 'electrician' && this.data.getProfile() == 'user') {
            this.data.setProfile('electrician');
            this.gotoPage('electrician');
        }else if(profilename == 'user' && this.data.getProfile() == 'electrician') {
            this.data.setProfile('user');
            this.gotoPage('user');
        }
    }

    gotoPage(item) {
        this.header.gotoPage(item);
    }

    menuArrowStateChange (arrowState){
    }

    InstallerItemClick(item) {
        this.data.setSelectedDevice(item,true);
        this.data.getIDevicesFromCloud();
        this.loadingInstalleDeviceData =  true;
    }
    searchDetectors(items) {
        if(this.searchText)
        {
            let result = [];
            var searchString = new RegExp(this.searchText.toLowerCase());
            for(var j =0; j < items.length; j++) {
                let detector = items[j];
                if(detector.btDeviceName === undefined) {
                    result.push(detector);
                }else {
                    if( detector.btDeviceName.toLowerCase().indexOf(this.searchText) >= 0){
                        result.push(detector);
                    }
                }
            }
            this.sortedMap = result;
            return this.sortedMap;
        }
        else{
            if(this.selectedSortType == this.sortUITypes[0])
                return this.detectors;
            else 
                return this.sortedMap;
        }
    }
    sortDetectors()
    {
            var sortby = this.selectedSortType;

            switch(sortby){
                case (this.sortUITypes[0]):
                this.sortedMap = [];
                for (var i=0; i<this.detectors.length; i++) {
                    this.sortedMap.push(this.detectors[i]);
                }
               this.detectors = this.sortedMap;
            break;
            case (this.sortUITypes[1]):
               this.sortedMap =[];
               for (var i=0; i<this.detectors.length; i++) {
                    var key = this.detectors[i].contactName;
                    let isKeyIn = this.sortedMap.indexOf(key);
                    if (isKeyIn < 0){
                        this.sortedMap.push(key,this.detectors[i]);
                    }else {
                        this.sortedMap.push(this.detectors[i]);
                    } 
                }
               var sorted = this.detectors.sort(function (a, b) {
                    var x = a.contactName.localeCompare(b.contactName);
                    if(x==0){
                        return a.btDeviceName.localeCompare(b.btDeviceName);
                    }
                   return x;
               });
               this.detectors=sorted;
            break;
            case (this.sortUITypes[2]):
              this.sortedMap =[];
               for (var i=0; i<this.detectors.length; i++) {
                    var key = this.detectors[i].buildingName;
                    let isKeyIn = this.sortedMap.indexOf(key);
                    if (isKeyIn < 0){
                        this.sortedMap.push(key,this.detectors[i]);
                    }else {
                        this.sortedMap.push(this.detectors[i]);
                    }      
                }

                var sorted = this.detectors.sort(function(a,b){
                    var x= a.buildingName.localeCompare(b.buildingName);
                    if(x==0){
                        return a.btDeviceName.localeCompare(b.btDeviceName);
                    }
                    return x;
                });
                this.detectors = sorted;
            break;
            case (this.sortUITypes[3]):
                 this.sortedMap =[];
               for (var i=0; i<this.detectors.length; i++) {
                    let key = this.detectors[i].date;
                    let isKeyIn = this.sortedMap.indexOf(key);
                   if (isKeyIn < 0){
                        this.sortedMap.push(key,this.detectors[i]);
                    }else {
                        this.sortedMap.push(this.detectors[i]);
                    }      
                }
                var sorted = this.detectors.sort(function(a,b){
                    var date1 = new Date(b.date)
                    var date2 = new Date(a.date);
                    var x = date1.getTime() - date2.getTime() ;
                    if(x==0){
                       return a.btDeviceName.localeCompare(b.btDeviceName);
                    }
                    return x;
                });
                this.detectors = sorted;
            break;
            case (this.sortUITypes[4]):
               this.sortedMap =[];
               for (var i=0; i<this.detectors.length; i++) {
                    var key = this.detectors[i].modelNumber;
                    let isKeyIn = this.sortedMap.indexOf(key);
                    if (isKeyIn < 0){
                        this.sortedMap.push(key,this.detectors[i]);
                    }else {
                        this.sortedMap.push(this.detectors[i]);
                    }       
                }
                var sorted = this.detectors.sort(function (a, b) {
                    var x = a.modelType.localeCompare(b.modelNumber);
                    if(x==0){
                      return a.btDeviceName.localeCompare(b.btDeviceName);
                     }
                    return x;
                });
                this.detectors=sorted;
            break;
            }
       }


    jsonOnLoad(component) {
        component.data.setShowCDI(0);
    }
    sortedMapValues(){
        if(this.selectedSortType == this.sortUITypes[0]) {
            this.sortedMap = this.searchDetectors(this.detectors);
        }
        else {
            this.sortDetectors();
            this.sortedMap = this.searchDetectors(this.sortedMap);
         }
        return this.sortedMap;
    }
    getIfName(item) {
        if(item !== undefined && item.btDeviceName !==  undefined) {
            return true;
        }
        else {
            return false;
        }

    }
    ngOnInit() { 
        this.data.setSubMenuComponent(this);
        this.arrowStateObserve = this.data.subscribeArrowState(this, this.menuArrowStateChange);
         if (this.subMenuState == 'none') {
            setTimeout(() => this.subMenuState = "rightin")
        }
        this.lastSynced = this.data.getLastSyncedTime();
        this.autoSync =  this.data.getAutoSync();
    }

    setSubMenuTitle() {
         switch(this.data.getSubMenuVal()){
            case 'help':
            this.data.setSMMainTitle('Help')
            break;
            case 'about':
            if(this.data.getIsAbbFlavor() ==  false)
                this.data.setSMMainTitle('About Busch-Jaeger')
            else 
                this.data.setSMMainTitle('About ABB')
            break;
            case 'switch_mode':
            this.data.setSMMainTitle('Switch mode')
            break;
            case 'user_profiles':
            this.data.setSMMainTitle('User profiles')
            break;
            case 'installed_devices':
            this.data.setSMMainTitle('Installed devices')
            break;
            case 'sync':
            if(this.data.getIsAbbFlavor() ==  false)
                this.data.setSMMainTitle('Sync with my BUSCH-JAEGER')
            else
                this.data.setSMMainTitle('Sync with my ABB')
            break;
        }
    }
    ngOnDestroy() {
        this.arrowStateObserve.unsubscribe();
        this.data.setSubMenuComponent(undefined);
    }

    getProfile() {
        return this.data.getProfile();
    }
   getArrowType() {
    return  this.data.getMenuArrow();
   }
   
   logmeIn(){
       this.data.syncDevicesFromCloud(this.username, this.password,this);
   }
   logmeOut(){
   }
   isUserLoggedIn(){
       return this.data.isUserLoggedIn();
   }
   onErrorMessage(errorCode){
        if(errorCode == HTTPCODES.NO_AUTH){
            this.showErrorDialog()
            this.data.uiParams.userLoggedIn = false;
        }
        // else if(errorCode == HTTPCODES.NOT_FOUND)
        //     this.data.putDevicesToCloud();
        else if(errorCode >= HTTPCODES.SERVER_ERR_START)
            this.showTryDialog();
   }

    showTryDialog() {
        this.data.setDialogTitle(this.translater.translate("Please try After some time"));
        this.data.setDialogText(this.translater.translate("Server is not available now please try after some time"));
        this.data.setShowModal(true);
    }

    showErrorDialog() {
        this.data.setDialogTitle(this.translater.translate("Access details incorrect"));
        this.data.setDialogText(this.translater.translate("Please enter the correct username and password"));
        this.data.setShowModal(true);
    }

   onSucessfullSync(timeSynced){
    this.loadingInstalleDeviceData =  false;
    this.zone.run( () => { // Change the property within the zone, CD will run after
            this.lastSynced = timeSynced;
      });
   }
   syncNow(){
    this.data.syncDataNow(false);
   }
   toggleAS(){
       this.autoSync = !this.autoSync;
       this.data.setAutoSync(this.autoSync);
   }
}


