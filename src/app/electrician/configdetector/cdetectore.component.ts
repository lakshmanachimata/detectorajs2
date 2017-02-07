import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'cdetectore-root',
  templateUrl: './cdetectore.component.html',
  styleUrls: ['./cdetectore.component.css']
})
export class CDetectorEComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    jsonLoadObserve: any;
    jsonLoaded = false;
    activeDevice:any;
    constructor(private logger: LoggerService,private data: DataService, private router:Router) {
      this.activeDevice = this.data.getSelectedDevice();
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
  ngOnInit () {
    this.jsonLoadObserve = this.data.subscribe(this, this.jsonOnLoad);
  }
  jsonOnLoad() {
    this.jsonLoaded =  true;
    this.activeDevice = this.data.getSelectedDevice();
  }
  ngOnDestroy() {
  }
  deviceNameChanged(nameChanged) {
    this.logger.log('name changed to ' + nameChanged);
  }
}
