import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { UserComponent } from '../user/user.component';
import { ElectricianComponent } from '../electrician/electrician.component';
import { HeaderComponent } from '../header/header.component';
import { MenuComponent } from './menu.component';
import { SubMenuComponent } from './submenu.component';
import { RouterModule, Routes,Router }  from '@angular/router';
import {groupByPipe } from './groupby.pipe';
@NgModule({
  declarations: [
    groupByPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    groupByPipe,
  ],
  exports: [
    groupByPipe
  ]
  
})
export class MenuModule {
    constructor() {
     }
 }
