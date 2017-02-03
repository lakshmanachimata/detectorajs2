import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private data:DataService,private router:Router) {
  }

  ngOnInit() {
  }

  gotoProfile(item) {
    this.data.setProfile(item);
    this.router.navigateByUrl(item);
  }
}
