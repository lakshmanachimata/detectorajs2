import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { NextComponent} from './next.component';
import { UpComponent} from './up.component';
import { DownComponent} from './down.component';

@NgModule({
  declarations: [
  NextComponent,
  UpComponent,
  DownComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  exports:[
      NextComponent,
      UpComponent,
      DownComponent,
      CommonModule,
      FormsModule,
      HttpModule,
  ],

})

export class SharedModule {
    constructor() {
     }
 }
