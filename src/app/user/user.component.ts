import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import {LoggerService} from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy {

    private detectors:Array<any>;
    private snap:RouterStateSnapshot;

    constructor(private logger: LoggerService,private data: DataService,private router:Router) {
        this.detectors = data.getDevices();
        this.data.setMainTitle('Detecors');
    }
    configureDetectorUser(item){
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
        this.data.setHeader(true);
        this.data.setMenuArrow(0);
        this.data.setProfile('user');
        this.data.setProfileSwitch(true);
    }
    ngOnDestroy() {
    }
}
