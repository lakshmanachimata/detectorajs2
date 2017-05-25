import {Injectable} from '@angular/core';

@Injectable()
export class i18n_Lang_Defs
        {
            userLanguageCode:string = 'en';
    langTranslations:any = []
    constructor(_selLangString)
            {
                this.userLanguageCode = this.getUserLanguage(_selLangString);
                this.loadStaticData();
            }
    getUserLanguage(_langStr)
            {
                return 'en';
            }
    getTranslations()
            {
                return this.langTranslations[this.userLanguageCode];
            }
            private loadStaticData()
            {
                   this.langTranslations['en'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Welcome</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Please select your user type</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Standard User</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Installer</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Standard user</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensor settings</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Enabled</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Consider slave brightness</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Short-time pulse</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Additional sensor parameters</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Operating mode</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomatic, comfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Actuator settings</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energy Monitor</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometers</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Blocked</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Limit access after power cycle</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Take over current brightness</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Smallest brightness value as reference</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Actuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Actuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Service functions</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energy monitor</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Enabled by push button</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['de'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Wilkommen</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Anwendertyp wählen</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Benutzer</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstallateur</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Benutzer</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensor einstellungen</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiviert</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Slave-Helligkeit berücksichtigen</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Kurzzeitimpuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Weitere Sensorparameter</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Betriebsart</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halbautomatik, Komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktoreinstellungen</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometer</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Gesperrt</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Eingeschränkter Zugang nach Spannungsausfall</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Aktuelle Helligkeit übernehmen</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Kleinster Helligkeitswert als Referenz</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Einstellungen Aktor 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Einstellungen Aktor 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktionen</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Über Taster aktivierbar</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['nl'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Welkom</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Gebruikerstype kiezen</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Gebruiker</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektrotechnisch installateur</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Gebruiker</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensor instellingen</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Geactiveerd</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Rekening houden met slave-helderheid</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korte impuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Meer sensorparameters</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Bedrijfsmodus</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halfautomaat, comfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktorinstellingen</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometer</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Geblokkeerd</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Beperkte toegang na spanningsuitval</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Actuele helderheid overnemen</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Laagste helderheidswaarde als referentie</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Instellingen aktor 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Instellingen aktor 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefuncties</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Met impulsdrukkers te activeren</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['fr'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Bienvenue</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Sélectionner un type d'utilisateur</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utilisateur</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Electricien</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Utilisateur</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Réglages capteurs</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Activé</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tenir compte de la luminosité esclave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulsion de courte durée</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Autres paramètres capteurs</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Mode de fonctionnement</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semi-automatique, confort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Réglages de l'actionneur</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Suivi énergétique</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiomètre</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Bloqué</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Accès limité à l'issue d'une coupure secteur</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Appliquer la luminosité actuelle</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Valeur de luminosité la plus faible en tant que référence</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Réglages d'actionneur 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Réglages d'actionneur 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Fonctions de service</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Suivi énergétique</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Activable par bouton-poussoir</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['it'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Benvenuti</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Seleziona tipo di utente</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utente</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elettricista installatore</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Utente</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Impostazioni del sensore</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Attivato</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Osservare luminosità slave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso breve</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Altri parametri del sensore</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Modo operativo</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomatico, comfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Impostazioni degli attuatori</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitor conta energia</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potenziometro</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Bloccato</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Accesso limitato in seguito a caduta di tensione</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Applica luminosità corrente</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Valore di luminosità minimo come riferimento</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Impostazioni attuatore 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Impostazioni attuatore 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funzioni di assistenza</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor conta energia</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Attivabile con i pulsanti</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['ru'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Добро пожаловать</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Выберите тип пользователя</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Пользователь</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Установщик</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Пользователь</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Настройки датчика</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Активировано</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Учитывать «ведомую» освещенность</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Кратковременный импульс</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Дополнительные параметры датчика</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Режим работы</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Полуавтоматический, комфорт</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Настройки активатора</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Энергомонитор</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Потенциометр</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Заблокирован</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Ограниченный доступ после отказа напряжения</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Принять текущую освещенность</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Минимальное значение освещенности в качестве эталона</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Настройки активатора 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Настройки активатора 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Сервисные функции</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Энергомонитор</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Активируется кнопкой</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['pl'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Witamy</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Wybierz typ użytkownika</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Użytkownik</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstalator</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Użytkownik</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ustawienia czujnika</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>aktywowany</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Uwzględnij jasność slave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impuls krótkotrwały</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Dalsze parametry czujnika</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Tryb pracy</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>półautomatyczny, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ustawienia aktuatora</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitor zużycia energii</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potencjometr </target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>zablokowany</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Ograniczony dostęp po po awarii zasilania</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Przejmij aktualną jasność</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Najmniejsza wartość jasności jako odniesienie</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Ustawienia aktuatora 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ustawienia aktuatora 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funkcje serwisowe</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor zużycia energii</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktywowane przyciskiem</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['sv'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Välkommen</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Välj typ av användare</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Användare</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Auktoriserad elektriker</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Användare</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorinställningar</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiverad</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ta hänsyn till slave-ljusstyrkan</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Ytterligare sensorparametrar</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Driftläge</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomat, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ställdonsinställningar</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energiövervakning</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometrar</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Spärrad</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Begränsad åtkomst efter strömavbrott</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Lagra aktuell ljusstyrka</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Minsta ljusstyrka som referens</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Inställningar ställdon 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Inställningar ställdon 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktioner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiövervakning</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Kan aktiveras via tryckknapp</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['no'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Velkommen</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Velg brukertype</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Bruker</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstallatør</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Bruker</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorinnstillinger</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivert</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ta hensyn til lysstyrken for slaven</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Andre sensorparametre</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Driftstype</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomatisk, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktuatorinnstillinger</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energiovervåker</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potensiometer</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Sperret</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Begrenset tilgang etter spenningsutfall</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Bruk gjeldende lysstyrke</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Minste lysstyrkeverdi som referanse</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Innstillinger aktuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Innstillinger aktuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunksjoner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiovervåker</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Kan aktiveres med tast</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['fi'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Tervetuloa</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Valitse käyttäjätyyppi</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Käyttäjä</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Sähköasentaja</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Käyttäjä</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Anturiasetukset</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivoitu</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ota huomioon slave-valovoimakkuus</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Lyhytaikaimpulssi</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Muut anturiparametrit</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Käyttötapa</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Puoliautomatiikka, mukavuus</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Toimilaiteasetukset</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energiamonitori</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometri</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Lukittu</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Rajoitettu pääsy jännitekatkoksen jälkeen</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Tallenna sen hetkinen valovoimakkuus</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Pienin valovoimakkuusarvo referenssinä</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Asetukset, toimilaite 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Asetukset, toimilaite 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Huoltotoiminnot</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiamonitori</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktivoitavissa painikkeilla</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['es'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Bienvenido</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Seleccionar el tipo de usuario</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Usuario</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Instalador eléctrico</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Usuario</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ajustes del sensor</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Activado</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tener en cuenta luminosidad del esclavo</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso de corta duración</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Otros parámetros de sensor</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Modo de funcionamiento</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomático, confort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ajustes de actuador</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitor de energía</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potenciómetro</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Bloqueado</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Acceso limitado tras caída de tensión</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Aplicar luminosidad actual</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Valor de luminosidad más bajo como referencia</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Ajustes actuador 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ajustes actuador 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funciones de servicio</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor de energía</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Activable mediante pulsador</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['zh'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>欢迎</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>选择用户类型</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>用户</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>电气安装工</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>用户</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>传感器设置</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>已激活</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>考虑从站亮度</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>短时脉冲</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>其他传感器参数</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>运行模式</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>半自动，舒适</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>执行器设置</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>能量监测器</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>电位计</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>已锁定</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>重启后访问受限</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>接受当前亮度</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>将最小亮度值作为参考</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>执行器 1 设置</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>执行器 2 设置</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>服务功能</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>能量监测器</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>可通过按键激活</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['da'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Velkommen</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Vælg brugertype</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Bruger</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektriker</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Bruger</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensor indstillinger</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiveret</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tag hensyn til slave-lysstyrke</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Andre sensorparametre</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Driftsmåde</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomatisk, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktuatorindstillinger</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Energimonitor</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potentiometer</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Spærret</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Begrænset adgang efter strømsvigt</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Overtag aktuel lysstyrke</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Mindste lysstyrkeværdi som reference</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Indstillinger aktuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Indstillinger aktuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktioner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energimonitor</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktiveres via trykknap</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['tr'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Hoş geldiniz</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Kullanıcı tipi seç</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Kullanıcı</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektrik tesisatçısı</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Kullanıcı</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensör ayarları</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Etkin</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Slave parlaklığı dikkate al</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Kısa süreli impuls</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Diğer sensör parametreleri</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>İşletim türü</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Yarı otomatik, konfor</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktüatör ayarları</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Enerji ekranı</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potansiyometre</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Kilitli</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Elektrik kesintisi sonrası sınırlı erişim</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Güncel parlaklığı uygula</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Referans olarak en küçük parlaklık değeri</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Aktuatör 1 ayarları</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktuatör 2 ayarları</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servis fonksiyonları</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Enerji ekranı</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Düğme ile etkinleştirilebilir</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['pt'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Bem-vindo</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Selec. tipo utilizador</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utilizador</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Eletricista</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Utilizador</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Definições do sensor</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Ativado</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Considerar luminosidade Slave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso curto tempo</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Outros parâm. sensor</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Modo funcion.</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomático, conforto</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ajustes do atuador</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitor de energia</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potenciômetro</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Bloqueado</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Acesso limitado após queda de tensão</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Aceitar a luminosidade atual</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Menor valor lumin. como referência</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Definições atuador 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Definições atuador 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funções serviço</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor de energia</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Ativável por botão</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['el'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Καλώς ορίσατε</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Επιλογή τυπου χρήσης</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Χρήστης</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Ηλεκτρολόγος</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Χρήστης</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ρυθμίσεις αισθητήρα</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Ενεργοποιημένο</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Συνυπολογισμός φωτεινότητας Slave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Παλμός σύντομης διάρκειας</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Περαιτέρω παράμετροι αισθητήρα</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Τρόπος λειτουργίας </target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Ημιαυτόματη λειτουργία, άνεσης</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ρυθμίσεις ενεργοποιητή</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Ενεργειακό μόνιτορ</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Ποτενσιόμετρο</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Κλειδωμένο</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Περιορισμένη πρόσβαση μετά από διακοπή ρεύματος</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Αποδοχή τρέχουσας φωτεινότητας</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Μικρότερη τιμή φωτεινότητας ως αναφορά</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Ρυθμίσεις ενεργοποιητή 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ρυθμίσεις ενεργοποιητή 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Λειτουργίες σέρβις</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Ενεργειακό μόνιτορ</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Ενεργοποιείται με πλήκτρα</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['sk'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Vitajte</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Zvoliť typ užívateľa</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Užívateľ</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinštalatér</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Užívateľ</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Nastavenia senzora</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivovaný</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Zohľadniť jas slave</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Krátky časový impulz</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Ďalšie parametre senzora</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Prevádzkový režim</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Poloautomatika, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Nastavenia akčného člena</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitor energie</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potenciometer</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Zablokovaný</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Obmedzený prístup po výpadku napätia</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Prevziať aktuálny jas</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Najmenšia hodnota jasu ako referencia</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Nastavenia akčného člena 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Nastavenia akčného člena 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servisné funkcie</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor energie</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktivovateľné pomocou tlačidla</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
this.langTranslations['cs'] = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template">
    <body>
      <trans-unit id="65cc4ab3b4c438e07c89be2b677d08369fb62da2" datatype="html">
        <source>Welcome</source>
        <target>Vítejte</target>
      </trans-unit>
      <trans-unit id="7d039e1807900f81c758bc1906a67ceb027eebb8" datatype="html">
        <source>Please select your user type</source>
        <target>Vybrat typ uživatele</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Uživatel</target>
      </trans-unit>
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstalatér</target>
      </trans-unit>
      <trans-unit id="95ace2884c9ce05aaa685bfa3f3236020cb6d557" datatype="html">
        <source>Standard user</source>
        <target>Uživatel</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Nastavit senzor</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivováno</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Zohlednit jas podřízených zařízení</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Krátkodobý impulz</target>
      </trans-unit>
      <trans-unit id="e67e5e24800be5a1f611c1779a28171a4afc41b6" datatype="html">
        <source>Additional sensor parameters</source>
        <target>Další parametry senzoru</target>
      </trans-unit>
      <trans-unit id="7da76c2bc6532563e2ab6c62b5f6dd2bcc972431" datatype="html">
        <source>Operating mode</source>
        <target>Provozní režim</target>
      </trans-unit>
      <trans-unit id="61fe3182398294e32542590867e87cb4432f1537" datatype="html">
        <source>Automatic</source>
        <target>Automatic</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatic</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Poloautomatika, pohodlné ovládání</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Nastavení ovladače</target>
      </trans-unit>
      <trans-unit id="479e9bb35acae729910a6cd91a42418af3149eb9" datatype="html">
        <source>Energy Monitor</source>
        <target>Monitorování energie</target>
      </trans-unit>
      <trans-unit id="8758c473c8b2e9ccbc687c463a8198ba5368c2a8" datatype="html">
        <source>Potentiometers</source>
        <target>Potenciometr</target>
      </trans-unit>
      <trans-unit id="1d3781d7296d4b4e04e7f023aec1052fb2955c4d" datatype="html">
        <source>Blocked</source>
        <target>Zablokováno</target>
      </trans-unit>
      <trans-unit id="4869c2d4fbf66169a01962d812277baa0573fa62" datatype="html">
        <source>Limit access after power cycle</source>
        <target>Omezený přístup po výpadku napětí</target>
      </trans-unit>
      <trans-unit id="0abab05de8b6021498bce793b412bfa130748d4a" datatype="html">
        <source>Take over current brightness</source>
        <target>Použít aktuální jas</target>
      </trans-unit>
      <trans-unit id="7edf4afd03833a4ee61e527c9a5d79b1a6e96ee5" datatype="html">
        <source>Smallest brightness value as reference</source>
        <target>Nejmenší hodnota jasu jako reference</target>
      </trans-unit>
      <trans-unit id="23b7924ad701ddff75c82c41403c22f4ff83badb" datatype="html">
        <source>Actuator 1</source>
        <target>Nastavení ovladače 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Nastavení ovladače 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servisní funkce</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test mode</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitorování energie</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Lze aktivovat tlačítky</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
                
            }

        }
