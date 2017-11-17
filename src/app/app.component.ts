import { Component, OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { LoggerService } from './logger.service';
import { RouterModule, Routes, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ElectricianComponent } from './electrician/electrician.component';
import { UserComponent } from './user/user.component';
import { DataService } from './data.service';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';
import 'rxjs/add/operator/pairwise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  private _routeScrollPositions: { [url: string]: number }[] = [];
  private _subscriptions: Subscription[] = [];

  constructor(public logger: LoggerService, private router: Router, public data: DataService, private location: Location) {
    this.data.setHeader(false);
    if (this.data.getProfile() == 'none') {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigateByUrl('welcome');
    }
    else {
      this.location.replaceState('/');
      this.router.navigateByUrl(this.data.getProfile());
    }
  }
  gotoProfile(item) {
    this.data.setProfileSwitch(true);
    this.data.setProfile(item);
    this.router.navigateByUrl(item);
  }
  ngOnChanges(changes) {
  }
  ngOnInit() {

    this._subscriptions.push(
      // save or restore scroll position on route change
      this.router.events.pairwise().subscribe(([prevRouteEvent, currRouteEvent]) => {
        if (prevRouteEvent instanceof NavigationEnd && currRouteEvent instanceof NavigationStart) {
          // url path without parameters
          let urlPath = (prevRouteEvent.urlAfterRedirects || prevRouteEvent.url).split(';', 1)[0];
          this._routeScrollPositions[urlPath] = window.pageYOffset;
        }
        if (currRouteEvent instanceof NavigationEnd) {
          // in some cases it need timeout
          setTimeout(() => {
            // url path without parameters
            let urlPath = (currRouteEvent.urlAfterRedirects || currRouteEvent.url).split(';', 1)[0];
            window.scrollTo(0, this._routeScrollPositions[urlPath] || 0);
          }, 0);
        }
      })
    );

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

  getArrowType() {
    return this.data.getMenuArrow();
  }
  public getHeader() {
    return this.data.getHeader();
  }
}
