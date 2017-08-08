import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { NextComponent} from './next.component';
import { TimeInputComponent} from './timeinput.component';
import { UpComponent} from './up.component';
import { DownComponent} from './down.component';
import { SwitchComponent} from './switch.component';
import { LongPress } from './LongPress';

@NgModule({
  declarations: [
  NextComponent,
  UpComponent,
  DownComponent,
  SwitchComponent,
  LongPress,
  TimeInputComponent,
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
      SwitchComponent,
      TimeInputComponent,
      LongPress,
      CommonModule,
      FormsModule,
      HttpModule,
  ],

})

export class SharedModule {
    constructor() {
     }
 }
