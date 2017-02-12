import { Component , OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy} from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes ,Router,RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'addparams-root',
  templateUrl: './addparams.component.html',
  styleUrls: ['./addparams.component.css']
})
export class EAddParamsComponent implements OnChanges,OnInit ,DoCheck,AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy{

    
  constructor(private logger: LoggerService,private data: DataService, private router:Router) {
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
}
