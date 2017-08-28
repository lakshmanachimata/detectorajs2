import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { DataService } from '../data.service';
import { LoggerService } from '../logger.service';
import { NextComponent} from './next.component';
import { TimeInputComponent} from './timeinput.component';
import { SetTimeComponent} from './settime.component';
import { UpComponent} from './up.component';
import { DownComponent} from './down.component';
import { SwitchComponent} from './switch.component';
import { LongPress } from './LongPress';
import { TestModeComponent} from './testmode.component'
// import 'hammerjs';
// import 'hammer-timejs';

@NgModule({
  declarations: [
  NextComponent,
  UpComponent,
  DownComponent,
  SwitchComponent,
  LongPress,
  TimeInputComponent,
  SetTimeComponent,
  TestModeComponent,
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
      SetTimeComponent,
      TestModeComponent,
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
