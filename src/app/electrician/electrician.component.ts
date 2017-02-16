import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot,ActivatedRoute} from '@angular/router';


@Component({
  selector: 'electrician-root',
  templateUrl: './electrician.component.html',
  styleUrls: ['./electrician.component.css']
})
export class ElectricianComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    private detectors:Array<any>;
    jsonLoadObserve: any;
    private snap:RouterStateSnapshot;
    constructor(private logger: LoggerService,private data: DataService, private router:Router,private route: ActivatedRoute) {
    }
  configureDetector(item){
      this.data.initDeviceData(item);
      this.data.setSelectedDevice(item);
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
    this.snap = this.router.routerState.snapshot;
  }
  ngOnInit () {
    this.jsonLoadObserve = this.data.subscribeJsonLoad(this, this.jsonOnLoad);
    this.detectors = this.data.getDevices();
    this.data.setMainTitle('Detecors');
    this.logger.log('ElectricianComponent called' + this.detectors.length);
    this.data.setHeader(true);
    this.data.setMenuArrow(0);
    this.data.setProfile('electrician');
    this.data.setProfileSwitch(true);
  }

  jsonOnLoad(component) {
      component.data.setProfileSwitch(false);
      component.router.navigate(['econfigdetector'],{relativeTo: component.route});
  }
  ngOnDestroy() {
  }
}
