import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EAddParamsComponent } from './addparams.component';
import { SharedModule } from '../../../shared/shared.module';

const EAddParamsRoutes: Routes = [
  { path: '', component: EAddParamsComponent },
  { path: 'sensitivity', loadChildren: './sensitivity/sensitivity.module#ESensitivityModule'},

];

@NgModule({
  declarations: [
    EAddParamsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    SharedModule, 
    RouterModule.forChild(EAddParamsRoutes)
  ],
})
export class EAddParamsModule {
    constructor() {
     }
 }
