import { NgModule } from '@angular/core';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { CDetectorEComponent } from './cdetectore.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const CDetectorERoutes: Routes = [
  { path: '', component: CDetectorEComponent },
  { path: 'addparams', loadChildren: './addparams/addparams.module#EAddParamsModule' },
  { path: 'eactuator1', loadChildren: './eactuator1/eactuator1.module#EActuator1Module' },
  { path: 'eactuator2', loadChildren: './eactuator2/eactuator2.module#EActuator2Module' },
  { path: 'otherparams', loadChildren: './otherparams/otherparams.module#EOtherParamsModule' },
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
