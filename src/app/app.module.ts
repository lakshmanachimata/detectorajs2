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
import { i18nService } from './i18n.service'
import { i18n_Lang_Defs } from './i18n-data';
import { DummyComponentComponent } from './dummy-component/dummy-component.component'
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
    DummyComponentComponent,
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
    i18nService,
    i18n_Lang_Defs
  ],
  bootstrap: [AppComponent]
})



export class AppModule {
    constructor(public logger: LoggerService,
    public data: DataService) {
      data.initDevices();
     }
 }
