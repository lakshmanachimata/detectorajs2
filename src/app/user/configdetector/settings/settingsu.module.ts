import { NgModule } from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { SettingsuComponent} from './settingsu.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const SettingsuRoutes: Routes = [
  { path: '', component: SettingsuComponent },
];

@NgModule({
  declarations: [
    SettingsuComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(SettingsuRoutes)
  ],
})
export class SettingsuModule {
    constructor() {
     }
 }
