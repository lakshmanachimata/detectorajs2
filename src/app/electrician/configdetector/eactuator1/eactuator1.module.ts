import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EActuator1Component } from './eactuator1.component';

const EActuator1Routes: Routes = [
  { path: '', component: EActuator1Component },
];

@NgModule({
  declarations: [
    EActuator1Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(EActuator1Routes)
  ],
})
export class EActuator1Module {
    constructor() {
     }
 }
