import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../../logger.service';
import { DataService } from '../../../data.service';
import { RouterModule, Routes,Router }  from '@angular/router';
import { EOtherParamsComponent } from './otherparams.component';


const EAddParamsRoutes: Routes = [
  { path: '', component: EOtherParamsComponent },
];

@NgModule({
  declarations: [
    EOtherParamsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(EAddParamsRoutes)
  ],
})
export class EOtherParamsModule {
    constructor() {
     }
 }
