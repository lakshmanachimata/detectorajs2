import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EActuator2Component } from './eactuator2.component';

const EActuator2Routes: Routes = [
  { path: '', component: EActuator2Component },
];

@NgModule({
  declarations: [
    EActuator2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(EActuator2Routes)
  ],
})
export class EActuator2Module {
    constructor() {
     }
 }
