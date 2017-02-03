import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { HeaderComponent } from './header.component';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { ElectricianComponent } from '../electrician/electrician.component';
import { MenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
  ],
})

export class HeaderModule {
    constructor() {

     }
 }
