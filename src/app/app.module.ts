import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { DataService } from './data.service';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService,
    LoggerService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private logger: LoggerService,
    private data: DataService) {
      data.initDevices();
     }
 }
