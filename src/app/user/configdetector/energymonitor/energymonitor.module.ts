import { NgModule } from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { EnergyMonitorComponent} from './energymonitor.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const EnergyMonitorRoutes: Routes = [
  { path: '', component: EnergyMonitorComponent },
];

@NgModule({
  declarations: [
    EnergyMonitorComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EnergyMonitorRoutes)
  ],
})
export class EnergyMonitorModule {
    constructor() {
     }
 }
