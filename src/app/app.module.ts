import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent} from './header/header.component';
import { MenuComponent} from './menu/menu.component';
import { SubMenuComponent} from './menu/submenu.component';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { FooterComponent} from './header/footer.component';
import {DialogComponent} from './header/dialog.component';
import {EDialogComponent} from './header/edialog.component';
import {CDetectorIComponent} from './menu/cdetectori.component';
import {IParamsComponent} from './menu/iparams.component';
import {SharedModule} from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    MenuComponent,
    SubMenuComponent,
    FooterComponent,
    DialogComponent,
    EDialogComponent,
    CDetectorIComponent,
    IParamsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    LoggerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
    constructor(public logger: LoggerService,
    public data: DataService) {
      let aindex =  navigator.platform.toLowerCase().indexOf('linux');
      let iindex = navigator.platform.toLowerCase().indexOf('iphone');
      if( aindex >=  0 ||
         iindex >= 0){
          this.data.DeviceBuild = 1;
        }else {
          this.data.DeviceBuild = 0;
        }
      data.initDevices();
     }
 }
