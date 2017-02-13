import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { CDetectorEComponent } from './cdetectore.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const CDetectorERoutes: Routes = [
  { path: '', component: CDetectorEComponent },
  { path: 'addparams', loadChildren: './addparams/addparams.module#EAddParamsModule' },
];

@NgModule({
  declarations: [
    CDetectorEComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(CDetectorERoutes)
  ],
})
export class CDetectorEModule {
    constructor() {
     }
 }
