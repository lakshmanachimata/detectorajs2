import { NgModule } from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EActuator2Component } from './eactuator2.component';
import { SharedModule } from '../../../shared/shared.module';

const EActuator2Routes: Routes = [
  { path: '', component: EActuator2Component },
];

@NgModule({
  declarations: [
    EActuator2Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EActuator2Routes)
  ],
})
export class EActuator2Module {
    constructor() {
     }
 }
