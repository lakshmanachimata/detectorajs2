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
    getUserLanguage(_langStr:string)
            {
              if(_langStr!=""){
                if(_langStr.indexOf('-')>0){
                    this.userLanguageCode = _langStr.substring(0,_langStr.indexOf('-'));
                }
              }
                return this.userLanguageCode;
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
    </body>
  </file>
</xliff>`;
                
            }

}
