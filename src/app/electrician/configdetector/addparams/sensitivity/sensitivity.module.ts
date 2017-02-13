import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../../logger.service';
import { DataService } from '../../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { ESensitivityComponent } from './sensitivity.component';

const ESensitivityRoutes: Routes = [
  { path: '', component: ESensitivityComponent },
];

@NgModule({
  declarations: [
    ESensitivityComponent,
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
