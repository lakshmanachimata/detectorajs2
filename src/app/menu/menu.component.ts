import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';
import { SubMenuItem} from '../data.service';

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
    menuState = 'none';
    arrowStateObserve: any;
     private snap:RouterStateSnapshot;

    constructor(private logger: LoggerService,private data: DataService,private router:Router) {
        this.menuItems = [];
    }

    animationStarted($event) {
        this.data.setMainTitle('Menu');
    }

    animationDone($event) {
        if(this.menuState  == 'topout')
            this.data.setMenuArrow(0);
    }

    menuArrowStateChange (arrowState){
       arrowState.menuState = "topout";
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
    menuItemClick(item) {
        this.data.setMenuArrow(2);
        this.data.setMainTitle(item.name);
        this.data.setSubMenuVal(item.navigation);
    }
    getProfile() {
     return this.data.getProfile();
   }
   getArrowType() {
    return  this.data.getMenuArrow();
   }
}
