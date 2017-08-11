import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

const AppRoutes: Routes = [
  // { path: '', redirectTo: 'welcome', pathMatch: 'full'},
  { path: 'welcome', component: WelcomeComponent },
  { path: 'electrician', loadChildren: './electrician/electrician.module#ElectricianModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(AppRoutes,{ useHash: true })
    // RouterModule.forRoot(AppRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}