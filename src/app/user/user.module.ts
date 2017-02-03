import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { UserComponent } from './user.component';
import { HeaderComponent} from '../header/header.component';
import { MenuComponent} from '../menu/menu.component';
import { RouterModule, Routes,Router }  from '@angular/router';
const UserRoutes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: '', component: UserComponent },
];

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(UserRoutes)
  ],
})
export class UserModule {
    constructor() {
     }
 }
