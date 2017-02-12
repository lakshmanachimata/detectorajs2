import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { ESensitivityComponenet } from './sensitivity.component';

const ESensitivityRoutes: Routes = [
  { path: '', component: ESensitivityComponenet },
];

@NgModule({
  declarations: [
    ESensitivityComponenet,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ESensitivityRoutes)
  ],
})
export class ESensitivityModule {
    constructor() {
     }
 }
