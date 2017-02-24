import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common'
import { Pipe, PipeTransform } from '@angular/core';
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
    sortedGroupList =[];
    private groupDet = 'modelType';
    selectedSortType = 'modelType';
    heloText = "Download Manuals";
    sortTypes = ["sort by","Contact name","Building","Date of change","Article Number"];
    helpLink ="https://www.busch-jaeger.de/en/service-int/downloads/downloads-data-sheets/";
    aboutText = "More information available on";
    aboutLink="https://www.busch-jaeger.de/en/";
    jsonLoadObserve: any;
    constructor(private logger: LoggerService,private data: DataService,
                private router:Router,private route:ActivatedRoute) {
        this.subMenuState = 'none';
        this.detectors = data.getDevices();
        this.selectedSortType = this.sortTypes[0];
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
        this.data.initDeviceData(item);
        this.data.setSelectedDevice(item);
    }
    sortDetectors()
    {
            var sortby = this.selectedSortType;

            switch(sortby){
            case (this.sortTypes[0]):
               this.groupDet= 'contactName';
               var sorted = this.detectors.sort(function (a, b) {
                    var x = a.contactName.localeCompare(b.contactName);
                    if(x==0){
                        return a.btDeviceName.localeCompare(b.btDeviceName);
                    }
                   return x;
               });
               this.detectors=sorted;
            break;
            case (this.sortTypes[1]):
               this.groupDet= 'buildingName';
                var sorted = this.detectors.sort(function(a,b){
                    var x= a.buildingName.localeCompare(b.buildingName);
                    if(x==0){
                        return a.btDeviceName.localeCompare(b.btDeviceName);
                    }
                    return x;
                });
                this.detectors = sorted;
            break;
            case (this.sortTypes[2]):
                this.groupDet= 'date';
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
            case (this.sortTypes[3]):
                this.groupDet= 'modelType';
                var sorted = this.detectors.sort(function (a, b) {
                    var x = a.modelType.localeCompare(b.modelType);
                    if(x==0){
                      return a.btDeviceName.localeCompare(b.btDeviceName);
                     }
                    return x;
                });
                this.detectors=sorted;
            break;
            }
       }

    filterDet(det){
            var groupNew = this.sortedGroupList.indexOf(det[this.groupDet]) == -1;
            if(groupNew)
            {
                 this.sortedGroupList.push(det[this.groupDet]);
            }
            return groupNew;
       }
    jsonOnLoad(component) {
        component.data.setShowCDI(0);
    }
    ngOnInit() { 
        this.jsonLoadObserve = this.data.subscribeJsonLoad(this, this.jsonOnLoad);
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
   
   setArrowType() {
     if(this.data.getMenuArrow() == 0) {
       this.data.setMenuArrow(1);
     }else {
       this.data.setMenuArrow(0);
     }
   }

}
