import { NgModule } from '@angular/core';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { EMReferenceComponent} from './emreference.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

const EMReferenceRoutes: Routes = [
  { path: '', component: EMReferenceComponent },
];

@NgModule({
  declarations: [
    EMReferenceComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EMReferenceRoutes)
  ],
})
export class EMReferenceModule {
    constructor() {
     }
 }
