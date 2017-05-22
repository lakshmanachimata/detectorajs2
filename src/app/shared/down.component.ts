import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'down-nav',
  templateUrl: './down.component.html',
})

export class DownComponent  implements  OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{
  constructor(public logger: LoggerService,private router:Router,public data:DataService) {
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

  getArrowType() {
  }
  public getHeader() {
  }
}
