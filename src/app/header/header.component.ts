import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';

@Component({
  selector: 'header-root',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

 private snap:RouterStateSnapshot;


  constructor(public logger: LoggerService,private router:Router,public data:DataService) {
  }

  ngOnChanges(changes) { 
  }
    ngOnInit() { 
      this.data.setHeaderComponent(this);
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
      this.snap = this.router.routerState.snapshot;
  }
  ngOnDestroy() {
  }

  getTitle() {
    if(this.data.getSMMainTitle().length > 0){
      return this.data.getSMMainTitle();
    }
    return this.data.getMainTitle();
  }
  public getHeader() {
    return this.data.getHeader();
  }
  arrowType() {
    return this.data.getMenuArrow();
  }
  setArrowType() {
    if(this.data.getShowCDI() >= 0) {
        this.data.setShowCDI(this.data.getShowCDI() -1);
    }else {
      if(this.data.getMenuArrow() == 0) {
      this.data.setMenuArrow(1);
      this.data.setProfileSwitch(false);
    }else if(this.data.getMenuArrow() ==2 ) {
      this.data.setMenuArrow(1);
      this.data.setProfileSwitch(false);
    }
    else {
      this.data.closeMenu();
      this.data.setProfileSwitch(true);
    }
    }
    
  }
  getProfile() {
    return this.data.getProfile();
  }
  switchProfile() {
    if(this.data.getProfile() == 'electrician') {
      this.data.setProfile('user');
      this.gotoPage('user');
      // this.data.disConnectDevice()
    }else {
      this.data.setProfile('electrician');
      this.gotoPage('electrician');
      // this.data.disConnectDevice()
    }
  }

  gotoPage(item) {
    this.router.navigateByUrl(item);
  }
  profileSwitch() {
    return this.data.getProfileSwitch();
  }
}
