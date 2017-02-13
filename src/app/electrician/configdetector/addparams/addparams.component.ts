import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'addparams-root',
  templateUrl: './addparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EAddParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  onLabel = 'on';
  offLabel = 'off';
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
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
  gotoSensitivity() {
    this.router.navigate(['sensitivity'],{relativeTo: this.route})
  }
}
