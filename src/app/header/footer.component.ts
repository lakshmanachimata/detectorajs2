import { Component , Injectable, trigger, state, animate, transition, style,OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'footer-root',
  templateUrl: './footer.component.html',
  styleUrls: ['./header.component.css']
})
export class FooterComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

 private snap:RouterStateSnapshot;


  constructor(private logger: LoggerService,private router:Router,private data:DataService,private route:ActivatedRoute,private location:Location) {
  }

  ngOnChanges() { 
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
  
  getProfile() {
    return this.data.getProfile();
  }
 
  gotoPage(item) {
    this.router.navigateByUrl(item);
  }
  bjGoBack() {
    this.location.back();
  }
  getOtherParam() {
    return this.data.getOtherParam();
  }
}
