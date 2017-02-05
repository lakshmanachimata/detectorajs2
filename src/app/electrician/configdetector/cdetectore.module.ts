import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { LoggerService } from '../../logger.service';
import { DataService } from '../../data.service';
import { ElectricianComponent } from '../electrician.component';
import { CDetectorEComponent } from './cdetectore.component';
import { RouterModule, Routes,Router }  from '@angular/router';
const CDetectorERoutes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '', component: CDetectorEComponent },
];

@NgModule({
  declarations: [
    CDetectorEComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(CDetectorERoutes)
  ],
})
export class CDetectorEModule {
    constructor() {
     }
 }
