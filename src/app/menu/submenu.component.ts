import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy ,Pipe,PipeTransform} from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common'

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
    detectors:Array<any>;
    selectedSortType = 'modelType';
    heloText = "Download Manuals";
    sortUITypes = ["sort by","Contact name","Building","Date of change","Article Number"];
    helpLink ="https://www.busch-jaeger.de/en/service-int/downloads/downloads-data-sheets/";
    aboutText = "More information available on";
    aboutLink="https://www.busch-jaeger.de/en/";
    jsonLoadObserve: any;
    sortedMap;
    searchText = '';
    constructor(private logger: LoggerService,private data: DataService,
                private router:Router,private route:ActivatedRoute) {
        this.subMenuState = 'none';
        this.detectors = data.getDevices();
        this.selectedSortType = this.sortUITypes[0];
        this.sortedMap = [];
        for (var i=0; i<this.detectors.length; i++) {
            this.sortedMap.push(this.detectors[i]);
        }
        this.detectors = this.sortedMap;
    }

    subMenuVal() {
        return this.data.getSubMenuVal();
    }
    ngOnChanges() { 
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

    menuArrowStateChange (arrowState){
    }

    InstallerItemClick(item) {
        this.data.initDeviceData(item,true);
        this.data.setSelectedDevice(item,true);
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
                    var key = this.detectors[i].articleNumber;
                    let isKeyIn = this.sortedMap.indexOf(key);
                    if (isKeyIn < 0){
                        this.sortedMap.push(key,this.detectors[i]);
                    }else {
                        this.sortedMap.push(this.detectors[i]);
                    }       
                }
                var sorted = this.detectors.sort(function (a, b) {
                    var x = a.modelType.localeCompare(b.articleNumber);
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
        if(item.btDeviceName !==  undefined) {
            return true;
        }
        else {
            return false;
        }

    }
    ngOnInit() { 
        this.jsonLoadObserve = this.data.subscribeIJsonLoad(this, this.jsonOnLoad);
        this.arrowStateObserve = this.data.subscribeArrowState(this, this.menuArrowStateChange);
         if (this.subMenuState == 'none') {
            setTimeout(() => this.subMenuState = "rightin")
        }
    }
    ngOnDestroy() {
        this.arrowStateObserve.unsubscribe();
    }

    getProfile() {
        return this.data.getProfile();
    }
   getArrowType() {
    return  this.data.getMenuArrow();
   }
   
}


