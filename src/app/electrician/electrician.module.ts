import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../logger.service';
import { DataService } from '../data.service';
import { ElectricianComponent } from '../electrician/electrician.component';
import { RouterModule, Routes,Router }  from '@angular/router';
const ElctricianRoutes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '', component: ElectricianComponent },
  { path: 'electrician', loadChildren: './configdetector/cdetector.module#CDetectorEModule' },
];

@NgModule({
  declarations: [
    ElectricianComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(ElctricianRoutes)
  ],
})
export class ElectricianModule {
    constructor() {
     }
 }
