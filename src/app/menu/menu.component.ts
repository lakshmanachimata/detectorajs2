import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import { SubMenuItem} from '../data.service';
import { i18nService } from '../i18n.service';
@Component({
  selector: 'menu-root',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
      trigger('slideIn', [
        state('*', style({
            transform: 'translateY(-100%)',
        })),
        state('topin', style({
            transform: 'translateY(0)',
        })),
        state('topout',   style({
            transform: 'translateY(-100%)',
        })),
        transition('* => topin', animate('700ms ease-in')),
        transition('topin => topout', animate('700ms ease-in')),
        ])
    ]
})
export class MenuComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
    private menuItems:Array<any>;
    private menuIcons:Array<any>;
    menuState = 'none';
    arrowStateObserve: any;
     private snap:RouterStateSnapshot;

    constructor(public logger: LoggerService,public data: DataService,private router:Router,
                private translater:i18nService) {
        this.menuItems = [];
    }

    animationStarted($event) {  
        this.data.setSMMainTitle(this.translater.translate('Menu'));
        this.data.setMenuActive(true);//PDAL-2577
    }

    animationDone($event) {
        if(this.menuState  == 'topout'){
            this.data.setMenuArrow(0);
            this.data.setSMMainTitle('');
            this.data.setMenuActive(false);//PDAL-2577
        }
    }

    menuArrowStateChange (arrowState){
       arrowState.menuState = "topout";
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


    ngOnInit() { 
        this.arrowStateObserve = this.data.subscribeArrowState(this, this.menuArrowStateChange);
        if (this.menuState == 'none') {
            setTimeout(() => this.menuState = "topin")
        }
    }
    ngOnDestroy() {
        this.arrowStateObserve.unsubscribe();
    }
    getMenuItems() {
        this.menuItems = this.data.getSubMenuItems();
        return this.menuItems;
    }

    getMenuIcons(item){
        this.menuIcons = this.data.getSubMenuIcons();
        for(var i=0; i< this.menuIcons.length; i++) {
            if(this.menuIcons[i].name == item.name){
                return this.menuIcons[i].icon;
            }
        }
        
    }
    menuItemClick(item) {
        this.data.setMenuArrow(2);
        this.data.setSMMainTitle(item.name);
        this.data.setSubMenuVal(item.navigation);
    }
    getProfile() {
     return this.data.getProfile();
   }
   getArrowType() {
    return  this.data.getMenuArrow();
   }
}
