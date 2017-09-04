import { NgModule } from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { UTestmodeComponent} from './utestmode.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';

const UTestmodeRoutes: Routes = [
  { path: '', component: UTestmodeComponent },
];

@NgModule({
  declarations: [
    UTestmodeComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(UTestmodeRoutes)
  ],
})
export class UTestmodeModule {
    constructor() {
     }
 }
