import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'other-root',
  templateUrl: './otherparams.component.html',
  styleUrls: ['../cdetectore.component.css']
})
export class EOtherParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

  activeDevice:any;
  ad:any;
  onLabel = 'on';
  offLabel = 'off';
  deviceType = -1;
  showFitterPin = false;
  showUserPin = false;
  DeactivateOp = false;
  A1LoadIdentify = false;
  A2LoadIdentify = false;
  masterQuad = 'q1';
  
  constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
      this.activeDevice = this.data.getSelectedDevice();
      this.ad = this.data.getDevicedata();
      this.deviceType = data.getSelectedDeviceType();
      this.data.setFooter(true);
  }
  ngOnChanges() { 
  }
  ngDoCheck() { 
  }
  ngOnInit() {
      this.data.setMainTitle(this.data.getOtherParamTitle());
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
  getOtherParam() {
    return this.data.getOtherParam();
  }
}
