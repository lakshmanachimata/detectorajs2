import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { UserComponent } from '../user/user.component';
import { ElectricianComponent } from '../electrician/electrician.component';
import { HeaderComponent } from '../header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import {SubMenuComponent } from './submenu.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  
})
export class MenuModule {
    constructor() {
     }
 }
