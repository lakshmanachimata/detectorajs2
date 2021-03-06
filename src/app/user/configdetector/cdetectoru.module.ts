import { NgModule } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { CDetectorUComponent } from './cdetectoru.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const CDetectorURoutes: Routes = [
  { path: '', component: CDetectorUComponent },
  { path: 'energymonitor', loadChildren: './energymonitor/energymonitor.module#EnergyMonitorModule' },
  { path: 'settingsu',loadChildren: './settings/settingsu.module#SettingsuModule'},
  { path: 'utestmode',loadChildren: './utestmode/utestmode.module#UTestmodeModule'}
];

@NgModule({
  declarations: [
    CDetectorUComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(CDetectorURoutes)
  ],
})
export class CDetectorUModule {
    constructor() {
     }
 }
