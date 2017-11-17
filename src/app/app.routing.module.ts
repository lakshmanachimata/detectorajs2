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

    /**
     * For ios uncomment 1 and comment 2
     * For android uncomment 2 and comment 1
     */
       RouterModule.forRoot(AppRoutes,{ useHash: true,enableTracing: true })  //1
  //   RouterModule.forRoot(AppRoutes,{ enableTracing: true })                //2
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
