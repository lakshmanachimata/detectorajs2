import './polyfills.ts';
import { enableProdMode,TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID,Provider,PlatformRef ,Injectable} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from './environments/environment';
import { i18n_Lang_Defs } from  './app/i18n-data';
import { AppModule } from './app/app.module';

let langs:i18n_Lang_Defs = new i18n_Lang_Defs();

if (environment.production) {
  enableProdMode();
}

//let appRef:PlatformRef =platformBrowserDynamic();
//platformBrowserDynamic().bootstrapModule(AppModule);
platformBrowserDynamic().bootstrapModule(
         AppModule//,
        //  {
        //     providers: 
        //     [
        //       {provide: TRANSLATIONS, useValue: langs.getTranslations()},
        //       {provide:TRANSLATIONS_FORMAT, useValue:'xlf'},
        //       {provide:LOCALE_ID, useValue:langs.userLanguageCode}
        //     ],
        // }
         );