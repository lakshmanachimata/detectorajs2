import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { enableProdMode } from '@angular/core';
import { enableProdMode,TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import { i18n_Lang_Defs } from  './app/i18n-data';


if (environment.production) {
  enableProdMode();
}
 
let langs:i18n_Lang_Defs = new i18n_Lang_Defs(navigator.language);
 
platformBrowserDynamic().bootstrapModule(
         AppModule,
         {providers: [
           {provide: TRANSLATIONS, useValue: langs.getTranslations()},
           {provide:TRANSLATIONS_FORMAT, useValue:'xlf'},
           {provide:LOCALE_ID, useValue:langs.userLanguageCode}
         ]}
         );

// lang.getTranslations(languageSel).then
// (
//   (TRANSLATION) =>{
//     console.log(TRANSLATION)
//       platformBrowserDynamic().bootstrapModule(
//         AppModule,
//         {providers: [
//           {provide: TRANSLATIONS, useValue: TRANSLATION},
//           {provide:TRANSLATIONS_FORMAT, useValue:'xlf'},
//           {provide:LOCALE_ID, useValue:languageSel}
//         ]}
//         );
//   }
// );



