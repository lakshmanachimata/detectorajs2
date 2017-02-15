import { NgModule } from '@angular/core';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EActuator1Component } from './eactuator1.component';
import { SharedModule } from '../../../shared/shared.module';

const EActuator1Routes: Routes = [
  { path: '', component: EActuator1Component },
];

@NgModule({
  declarations: [
    EActuator1Component,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(EActuator1Routes)
  ],
})
export class EActuator1Module {
    constructor() {
     }
 }
