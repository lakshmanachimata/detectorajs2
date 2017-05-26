import {Injectable} from '@angular/core';

@Injectable()
export class i18n_Lang_Defs
        {
            public userLanguageCode:string = 'en';
            public langTranslations:any = []
            constructor()
            {
                this.userLanguageCode = this.getUserLanguage(navigator.language);
                this.loadStaticData();
            }
    getUserLanguage(_langStr:string)
            {
              console.log(_langStr);
                if(_langStr!=''){
                    if(_langStr.indexOf('-')>0){
                        return _langStr.substring(0,_langStr.indexOf('-'));
                    }
                    else if(_langStr.length==2){
                      return _langStr;
                    }
                }
                return 'en';
            }
    getTranslations()
            {
                if(this.langTranslations[this.userLanguageCode])
                    return this.langTranslations[this.userLanguageCode];
                else
                    return this.langTranslations['en'];
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Installer</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Standard User</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Selected user profile</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Username</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Password</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>You are now logged in</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Logout</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Sync now</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Deactivate test mode</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Load</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Send</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensor settings</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Block potentiometer setting</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Enabled</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Disabled</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>OFF</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>brightness threshold</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Consider slave brightness</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Smallest value as reference</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Short-time pulse</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Switch-off delay</target>
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
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Settings of actuator 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Saved profile</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energy monitor</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Building allocation</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Enable settings</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamic switch-off delay</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Outdoor application</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Circuit logic</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>NC contact</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>NO contact</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft ON</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft OFF</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimming mode</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Leading edge</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Trailing edge</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Additional Settings</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Memory function</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Limit room brightness</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimum load</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximum load</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI settings</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Fluorescent lamps</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Burn in function</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Steady</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Accumulated</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Operating hours</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Basic brightness</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Basic illumination level</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Start time</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>End time</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astro function</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Switch-off time</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Switching function</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Brightness independent</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>Switch off DALI control gear voltage</target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synchronous operation</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Blackboard lightening</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manual</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HVAC</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamic control</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Switch-on delay</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Connected load</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Electricity price</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Currency</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Contact Name</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Building</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Brightness correction</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Set sensitivity</target>
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
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>Load detector profile</target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Save as user profile</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Update Firmware</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Reset to factory settings</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Release to user</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Use master in slave mode</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>NC contact</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Permanent light ON/OFF</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Enabled by push button</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Reset control gear</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Burn in mode</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Reset operating hours</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Determined by time</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Determined by brightness</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Ambient brightness threshold</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Night light</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Stepwise switch-off</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identify load on actuator 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identify load on actuator 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>No Profile</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Predefined profiles</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>User profiles</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Add profile</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Lighting duration per week</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>All</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Show password</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Standard User password</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Light 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Light 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Settings</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Reference details</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Reset data</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Presence simulation</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstallateur</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Benutzer</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Ausgewähltes Benutzerprofil</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Benutzername</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Passwort</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Sie sind jetzt angemeldet</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Abmelden</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Jetzt synchronisieren</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Testbetrieb beenden</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Laden</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Senden</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensoreinstellungen</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Potentiometer sperren</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiv</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktiviert</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Aus</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Helligkeitsschaltschwelle</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Slave-Helligkeit berücksichtigen</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Kleinster Helligkeitswert als Referenz</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Kurzzeitimpuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Nachlaufzeit</target>
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
        <target>Automatik</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Halbautomatik</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halbautomatik, Komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktoreinstellungen</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Einstellungen Aktor 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Gespeichertes Profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Gebäudezuordnung</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Einstellungen aktivieren</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamische Nachlaufzeit</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Anwendung im Außenbereich</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Schaltverhalten</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Öffner</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Schließer</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft EIN</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft AUS</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimmverfahren</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Phasenanschnitt</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Phasenabschnitt</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Weitere Einstellungen</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Memoryfunktion</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Raumhelligkeit begrenzen</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Mindestlast</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximallast</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI Einstellungen</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Leuchtstofflampen</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Einbrennfunktion</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Dauerhaft</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Summiert</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Betriebsstunden</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Grundhelligkeit</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Grundhelligkeit</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Startzeit</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Endzeit</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunktion</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Ausschaltzeit</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Schaltfunktion</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Helligkeitsunabhängig</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synchronbetrieb</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Tafellicht</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuell</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamische Steuerung</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Einschaltverzögerung</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Angeschlossene Lasten</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Stromtarif</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Währung</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Kontaktname</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Gebäude</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Helligkeitskorrektur</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Empfindlichkeit einstellen</target>
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
        <target>Aktor 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktor 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktionen</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testbetrieb</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Als Benutzerprofil speichern</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Firmwareupdate</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Auf Werkseinstellungen zurücksetzen</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Für Benutzer freigeben</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Master als Slave benutzen</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Öffner</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Dauerlicht Ein/Aus schalten</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Über Taster aktivierbar</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Betriebsgeräte zurücksetzen</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Einbrennmethode</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Betriebsstunden zurücksetzen</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Zeitabhängig</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Helligkeitsabhängig</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Helligkeitsschaltschwelle</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Nachtlicht</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Stufenweise ausschalten</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Aktor 1 identifizieren</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Aktor 2 identifizieren</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Kein Profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Vordefinierte Profile</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Benutzerprofile</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Profil hinzufügen</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Leuchtdauer je Woche</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Alle</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Passwort anzeigen</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Benutzer Passwort</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampe 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampe 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Einstellungen</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referenzangaben</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Daten zurücksetzen</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Anwesenheitssimulation</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektrotechnisch installateur</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Gebruiker</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Geselecteerd gebruikersprofiel</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Gebruikersnaam</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Wachtwoord</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>U bent nu aangemeld</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Afmelden</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Nu synchroniseren</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Testbedrijf beëindigen</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Laden</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Verzenden</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorinstellingen</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Potentiometer blokkeren</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Actief</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Gedeactiveerd</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Uit</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Helderheidsschakeldrempel</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Rekening houden met slave-helderheid</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Laagste helderheidswaarde als referentie</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korte impuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Nalooptijd</target>
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
        <target>Automaat</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Halfautomaat</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halfautomaat, comfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktorinstellingen</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Instellingen aktor 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Opgeslagen profiel</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiemonitor</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Gebouwtoewijzing</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Instellingen activeren</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamische nalooptijd</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Toepassing buiten</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Schakelgedrag</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Verbreekcontact (NC)</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Maakcontact (NO)</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft AAN</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft UIT</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimgedrag</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Faseaansnijding</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Faseafsnijding</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Meer instellingen</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Memofunctie</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Helderheid in ruimte begrenzen</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimale belasting</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximale belasting</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI-instellingen</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Fluorescentielampen</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Inbrandfunctie</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Continu</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Opgeteld</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Bedrijfsuren</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Basishelderheid</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Basishelderheid</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Starttijd</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Eindtijd</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunctie</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Uitschakeltijd</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Schakelfunctie</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Lichtonafhankelijk</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synchrone werking</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Tafellicht</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Handmatig</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HVAC</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamische besturing</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Inschakelvertraging</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Aangesloten belastingen</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Stroomtarief</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Contact</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Gebouw</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Helderheidscorrectie</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Gevoeligheid instellen</target>
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
        <target>Aktor 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktor 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefuncties</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testbedrijf</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Als gebruikersprofiel opslaan</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Firmware-update</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Resetten op fabrieksinstellingen</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Voor gebruiker vrijgegeven</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Master als slave gebruiken</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Verbreekcontact (NC)</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Continulicht in-/uitschakelen</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Met impulsdrukkers te activeren</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Componenten resetten</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Inbrandmethode</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Bedrijfsuren resetten</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Tijdafhankelijk</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Helderheidsafhankelijk</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Helderheidsschakeldrempel</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Nachtlicht</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Stapsgewijs uitschakelen</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Aktor 1 identificeren</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Aktor 2 identificeren</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Geen profiel</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Vooraf gedefinieerde profielen</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Gebruikersprofielen</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Profiel toevoegen</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Lichtduur per week</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Alle</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Wachtwoord tonen</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Wachtwoord gebruiker</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lamp 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lamp 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Instellingen</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referentiegegevens</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Gegevens resetten</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Aanwezigheidssimulatie</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Electricien</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utilisateur</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Profil utilisateur sélectionné</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Nom d'utilisateur</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Mot de passe</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Vous êtes connecté maintenant</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Fermer la session</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synchronisser maintenant</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Quitter le mode test</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Charger</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Envoyer</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Réglages des capteurs</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Bloquer un potentiomètre</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Actif</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Désactivé</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Arrêt</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Seuil de commutation en fonction de la luminosité</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tenir compte de la luminosité esclave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Valeur de luminosité la plus faible en tant que référence</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulsion de courte durée</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Temporisation d'arrêt</target>
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
        <target>Automatique</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semi-automatique</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semi-automatique, confort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Réglages de l'actionneur</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Réglages d'actionneur 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Profil enregistré</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Suivi énergétique</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Affectation bâtiment</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Activer les réglages</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Temporisation d'arrêt dynamique</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Utilisation à l'extérieur</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Comportement de commutation</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Contact à ouverture</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Contact à fermeture</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Marche en douceur</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>ARRÊT en douceur</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Méthode de variation</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Coupure de phase ascendante</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Coupure de phase descendante</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Autres réglages</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Fonction Mémoire</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Limiter la luminosité ambiante</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Charge minimale</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Charge maximale</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Réglages DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Mémo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lampes fluorescentes</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Fonction de prévieillissement</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Durable</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Totalisée</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Heures de fonctionnement</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Luminosité de base</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Luminosité de base</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Heure de début</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Heure de fin</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Fonction Astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Durée de mise à l'arrêt</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Fonction de commutation</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Indépendamment de la luminosité</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Mode synchronisé</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Eclairage de tableau</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuel</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>CCV</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Commande dynamique</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Temporisation à l'enchenchement</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Charges raccordées</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Tarif électrique</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Devise</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Nom de contact</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Bâtiment</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Correction de luminosité</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Régler la sensibilité</target>
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
        <target>Actionneur 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Actionneur 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Fonctions de service</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Mode Test</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Enregistrer en tant que profil utilisateur</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Mise à jour du micrologiciel</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Rétablir les réglages d'usine</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Partage pour utilisateur</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Utiliser le maître en tant qu'esclave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Contact à ouverture</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Allumer/éteindre l'allumage ininterrompu</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Activable par bouton-poussoir</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Réinitialiser les appareils de service</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Méthode de prévieillissement</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Réinitialiser les heures de service</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Fonction du temps</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Fonction de la luminosité</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Seuil de commutation en fonction de la luminosité</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Lumière nocturne</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Mise à l'arrêt progressive</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Maître</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Esclaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifier l'actionneur 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifier l'actionneur 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Aucun profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Profils prédéfinis</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Profils utilisateur</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Ajouter un profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Durée d'éclairage par semaine</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Tous</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Afficher le mot de passe</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Mot de passe utilisateur</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampe 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampe 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Réglages</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Indications de référence</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Réinitialiser les données</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulation de présence</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elettricista installatore</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utente</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Profilo utente selezionato</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Nome utente</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Password</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Ora siete collegati</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Logout</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Sincronizza ora</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Esci dal funzionamento di prova</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Carica</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Invia</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Impostazioni dei sensori</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Blocca potenziometro</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Attivo</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Disattivato</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>OFF</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Soglia della luminosità di intervento</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Osservare luminosità slave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Valore di luminosità minimo come riferimento</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso breve</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Tempo di disinserimento ritardato</target>
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
        <target>Automatico</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomatico</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomatico, comfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Impostazioni degli attuatori</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Impostazioni attuatore 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Servizio</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Profilo salvato</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor conta energia</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Assegnazione edifici</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Attiva impostazioni</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Inserimento ritardato dinamico</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Applicazione in ambiente esterno</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Comportamento di commutazione</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Contatto NC</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Contatto NA</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft ON</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft OFF</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Procedura di regolazione</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Taglio di fase ascendente</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Taglio di fase discendente</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Altre impostazioni</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Funzione Memory</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Limita luminosità ambiente</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Carico minimo</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Carico massimo</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Impostazioni DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lampade fluorescenti</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Funzione di accensione</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Permanente</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Sommato</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Ore di esercizio</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Luminosità di base</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Luminosità di base</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Ora di avvio</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Ora di fine</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Funzione Astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Tempo di spegnimento</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Funzione di commutazione</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Indipendente dalla luminosità</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Funzionamento sincronizzato</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Luce da tavola</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuale</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>RCV</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Controllo dinamico</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Accensione ritardata</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Carichi collegati</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Tariffa dell'energia elettrica</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Nome contatto</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Edificio</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Correzione della luminosità</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Imposta sensibilità</target>
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
        <target>Attuatore 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Attuatore 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funzioni di assistenza</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Prova di funzionamento</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Salva come profilo utente</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Aggiornamento firmware</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Resettaggio su impostazioni predefinite</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Abilita per utente</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Utilizza master come slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Contatto NC</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Commuta ON/OFF luce permanente</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Attivabile con i pulsanti</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Resetta apparecchi di controllo</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Metodo di accensione preliminare</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Resetta ore di esercizio</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Dipende dall'ora</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Dipende dalla luminosità</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Soglia della luminosità di intervento</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target> Luce notturna</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Disattivazione graduale</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifica attuatore 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifica attuatore 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Nessun profilo</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Profili predefiniti</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Profili utente</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Aggiungi profilo</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Durata di accensione per settimana</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Tutti</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Visualizza password</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Password utente</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampadina 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampadina 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Impostazioni</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Dati di riferimento</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Resetta dati</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulazione di presenza</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Установщик</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Пользователь</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Выбранный профиль пользователя</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Имя пользователя</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Пароль</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Вы вошли в систему</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Выход</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Синхронизировать сейчас</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Выход из тестового режима</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Загрузка</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Передать</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Настройки датчика</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Заблокировать потенциометр</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Активен</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Деактивировано</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Выкл</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Порог освещенности</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Учитывать «ведомую» освещенность</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Минимальное значение освещенности в качестве эталона</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Кратковременный импульс</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Время ожидания</target>
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
        <target>Автоматический</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Полуавтоматический</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Полуавтоматический, комфорт</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Настройки активатора</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Настройки активатора 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Сервис</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Сохраненный профиль</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Энергомонитор</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Привязка здания</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Активировать настройки</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Динамическое время ожидания</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Применение на улице</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Поведение</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Нормально-замкнутый</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Нормально-разомкнутый</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Плавное включение</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Плавное выключение</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Метод светорегулировки</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Отсечка фазы по переднему фронту</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Отсечка фазы по заднему фронту</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Дополнительные настройки</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Функция памяти</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Ограничение освещенности помещения</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Минимальная нагрузка</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Максимальная нагрузка</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Настройки DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Память</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Люминесцентные лампы</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Функция приработки</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Постоянный</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Суммированный</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Время работы</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Базовая освещенность</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Базовая освещенность</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Время запуска</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Время окончания</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Сезонная функция</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Время выключения</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Функция переключения</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Независимо от освещенности</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Синхронный режим работы</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Подсветка доски</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Ручной</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>ОВК</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Динамическое управление</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Задержка включения</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Подключенная нагрузка</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Тариф</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Валюта</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Контактное имя</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Здание</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Коррекция освещенности</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Настройка чувствительности</target>
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
        <target>Активатор 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Активатор 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Сервисные функции</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Тестовый режим</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Сохранить как профиль пользователя</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Обновление прошивки</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Сброс на заводские настройки</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Разрешить для пользователя</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Использовать ведущее как ведомое</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Нормально-замкнутый</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Постоянный свет ВКЛ/ВЫКЛ</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Активируется кнопкой</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Сброс рабочих устройств</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Метод приработки</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Сброс счетчика времени работы</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>По времени</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>По освещенности</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Порог освещенности</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Ночник</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Ступенчатое выключение</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Ведущее</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Ведомые</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Идентификация активатора 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Идентификация активатора 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Без профиля</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Готовый профиль</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Пользовательские профили</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Добавить профиль</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Продолжительность свечения за неделю</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Все</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Показать пароль</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Пароль пользователя</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Лампа 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Лампа 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Настройки</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Эталонные данные</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Сброс данных</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Имитация присутствия</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstalator</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Użytkownik</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Wybrany profil użytkownika</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Nazwa użytkownika</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Hasło</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Jesteś teraz zalogowany</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Wyloguj</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synchronizuj teraz</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Zakończ tryb testowy</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Ładuj</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Wyślij</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ustawienia czujnika</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Zablokuj potencjometr </target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktywny</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Dezaktywowane</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Wył.</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Próg jasności przełączania</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Uwzględnij jasność slave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Najmniejsza wartość jasności jako odniesienie</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impuls krótkotrwały</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Czas opóźnienia</target>
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
        <target>automatyczny</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>półautomatyczny</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>półautomatyczny, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ustawienia aktuatora</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Ustawienia aktuatora 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Serwis</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Zapisany profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor zużycia energii</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Przyporządkowanie budynku</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktywuj ustawienia</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamiczny czas opóźnienia</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Zastosowanie na zewnątrz</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Charakterystyka łączeniowa</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Rozwierny</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Zwierny</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Płynne WŁ.</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Płynne WYŁ.</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Ściemnianie</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Nacinanie fazy</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Odcinanie fazy</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Dalsze ustawienia</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Funkcja pamięci</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Ogranicz jasność pomieszczenia</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Obciążenie minimalne</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maksymalne obciążenie</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Ustawienia DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Notatka</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Świetlówki</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Funkcja wypalania</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Stale</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Zsumowane</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Godziny pracy</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Jasność podstawowa</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Jasność podstawowa</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Czas startu</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Czas zakończenia</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Funkcja astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Czas wyłączenia</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Funkcja łączeniowa</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Niezależnie od jasności</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Praca synchroniczna</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Oświetlenie tablicy</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Ręcznie</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HVAC</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Sterowanie dynamiczne</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Opóźnienie włączania</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Podłączone obciążenia</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Taryfa za prąd</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Waluta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Nazwa kontaktu</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Budynek</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Korekta jasności</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Ustaw czułość</target>
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
        <target>Aktuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funkcje serwisowe</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Tryb testowy</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Zapisz jako profil użytkownika</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Aktualizacja oprogramowania systemowego</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Zresetuj do ustawień fabrycznych</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Udostępnij użytkownikom</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Użyj master jako slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Rozwierny</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Oświetlenie stałe wł./wył.</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktywowane przyciskiem</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Resetuj urządzenia robocze</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Metoda wypalania</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Resetuj godziny pracy</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Zależnie od czasu</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Zależnie od jasności</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Próg jasności przełączania</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Oświetlenie nocne</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Wyłącz stopniowo</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Urządzenia slave</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Zidentyfikuj aktuator 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Zidentyfikuj aktuator 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Brak profilu</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Wstępnie zdefiniowane profile</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Profile użytkowników</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Dodaj profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Czas trwania świecenia na tydzień</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Wszystkie</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Pokaż hasło</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Hasło użytkownika</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampa 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampa 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Ustawienia</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Dane referencyjne</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Zresetuj dane</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Symulacja obecności</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Auktoriserad elektriker</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Användare</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Vald användarprofil</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Användarnamn</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Lösenord</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Du är nu inloggad</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Logga ut</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synkronisera nu</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Avsluta testdrift</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Ladda</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Skicka</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorinställningar</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Spärra potentiometrar</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiv</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Avaktiverad</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Av</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Ljuskopplingströskel</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ta hänsyn till slave-ljusstyrkan</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Minsta ljusstyrka som referens</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Efterlöptid</target>
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
        <target>Automat</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Halvautomat</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomat, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ställdonsinställningar</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Inställningar ställdon 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Sparad profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiövervakning</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Tilldelning av hus</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivera inställningarna</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamisk efterlöptid</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Användning utomhus</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Kopplingsförhållande</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Öppnare</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Slutare</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft PÅ</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft AV</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimningsförfarande</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Fasstyrning</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Fassektion</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Ytterligare inställningar</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Minnesfunktion</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Begränsa ljusstyrkan i rummet</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimilast</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximal last</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI-inställningar</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lysrör</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Inbränningsfunktion</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Kontinuerligt</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Summerat</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Drifttimmar</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Ljusstyrka</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Ljusstyrka</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Starttid</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Sluttid</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunktion</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Frånkopplingstid</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Omkopplingsfunktion</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Ljusstyrkeoberoende</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synkrondrift</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Tavelbelysning</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuell</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamisk styrning</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Tillslagsfördröjning</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Anslutna laster</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Strömpris</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Kontaktnamn</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Byggnad</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Korrigering av ljusstyrka</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Ställa in känslighet</target>
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
        <target>Ställdon 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ställdon 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktioner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testdrift</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Spara som användarprofil</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Firmware-uppdatering</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Återställning till fabriksinställningarna</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Frikoppla för användare</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Använd master som slav</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Öppnare</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Slå på/av permanent ljus</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Kan aktiveras via tryckknapp</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Återställa driftdon</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Inbränningsmetod</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Återställa drifttimmar</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Tidsberoende</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Ljusstyrkeberoende</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Ljuskopplingströskel</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Nattljus</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Koppla från stegvis</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifiera ställdon 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifiera ställdon 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Ingen profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Fördefinierade profiler</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Användarprofil</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Lägg till profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Belysningstid per vecka</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Alla</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Visa lösenord</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Användarens lösenord</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampa 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampa 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Inställningar</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referensuppgifter</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Återställ uppgifter</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Närvarosimulering</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstallatør</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Bruker</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Valg brukerprofil</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Brukernavn</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Passord</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Du er nå logget på</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Utmelding</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synkroniser nå</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Avslutte testdrift</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Last</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Sende</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorinnstillinger</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Sperre potensiometer</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiv</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktivert</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Av</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Reaksjonsterskel</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ta hensyn til lysstyrken for slaven</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Minste lysstyrkeverdi som referanse</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Etterløpstid</target>
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
        <target>Automatikk</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Halvautomatisk</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomatisk, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktuatorinnstillinger</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Innstillinger aktuator 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Lagret profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiovervåker</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Bygningstilordning</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivere innstillinger</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamisk etterløpstid</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Utendørs bruk</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Koblingsrekkefølge</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Åpner</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Lukker</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft PÅ</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft AV</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimmeprosedyre</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Faseinnsnitt</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Faseutsnitt</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Andre innstillinger</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Minnefunksjon</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Begrense lysstyrken i rommet</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minstelast:</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maksimallast</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI-innstillinger</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lysstoffrør</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Innbrenningsfunksjon</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Kontinuerlig</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Oppsummert</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Driftstimer</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Grunnbelysning</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Grunnbelysning</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Starttid</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Sluttid</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunksjon</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Utkoblingstid</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Tidsfunksjon</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Lysstyrkeuavhengig</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synkrondrift</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Bordlampe</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuell</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamisk styring</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Innkoblingsforsinkelse</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Tilkoblede laster</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Strømtariff</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Kontaktnavn</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Bygning</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Lysstyrkekorrigering</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Stille inn følsomhet</target>
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
        <target>Aktuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunksjoner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testdrift</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Lagre som brukerprofil</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Fastvareoppdatering</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Tilbakestill til fabrikkinnstillingene</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Aktivere for bruker</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Bruk master som slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Åpner</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Slå kontinuerlig lys På/Av</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Kan aktiveres med tast</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Tilbakestille driftsapparater</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Innbrenningsmetode</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Tilbakestille driftstimer</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Tidsavhengig</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Avhengig av lysstyrken</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Reaksjonsterskel</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Nattlys</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Trinnvis utkobling</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaver</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifisere aktuator 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifisere aktuator 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Ingen profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Forhåndsdefinerte profiler</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Brukerprofiler</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Legg til profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Lysvarighet per uke</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Alle</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Vise passord</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Brukerpassord</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampe 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampe 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Innstillinger</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referanseangivelser</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Tilbakestille data</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Tilstedeværelsessimulering</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Sähköasentaja</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Käyttäjä</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Valittu käyttäjäprofiili</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Käyttäjänimi</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Salasana</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Olet kirjautunut sisään</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Uloskirjautuminen</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synkronisoi nyt</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Lopeta testikäyttö</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Lataa</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Lähetä</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Anturiasetukset</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Lukitse potentiometri</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivoitu</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktivoitu</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Pois</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Valokytkentäkynnys</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Ota huomioon slave-valovoimakkuus</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Pienin valovoimakkuusarvo referenssinä</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Lyhytaikaimpulssi</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Jälkikäyntiaika</target>
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
        <target>Automatiikka</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Puoliautomatiikka</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Puoliautomatiikka, mukavuus</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Toimilaiteasetukset</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Asetukset, toimilaite 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Tallennettu profiili</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energiamonitori</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Rakennuksen kohdistus</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivoi asetukset</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynaaminen jälkikäyntiaika</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Käyttö ulkoalueella</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Kytkentäkäyttäytyminen</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Avaava kosketin</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Sulkeva kosketin</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Pehmeä PÄÄLLÄ</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Pehmeä POIS</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Himmennysmenetelmä</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Vaihekulmasäätö</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Nollapistesäätö</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Muut asetukset</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Memory-muistitoiminto</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Tilan valovoimakkuuden rajoittaminen</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimikuormitus</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Enimmäiskuorma</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI-asetukset</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Muistio</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Loisteputket</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Polttotoiminto</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Jatkuvasti</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Yhteenlaskettu</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Käyttötunnit</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Perusvalovoimakkuus</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Perusvalovoimakkuus</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Aloitusaika</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Lopetusaika</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrotoiminto</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Poiskytkentäaika</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Kytkentätoiminto</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Valovoimakkuudesta riippumaton</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synkronikäyttö</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Pöytävalo</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuaalinen</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>KKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynaaminen ohjaus</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Päällekytkentäviive</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Kytketyt kuormat</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Sähköhinta</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuutta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Yhteystietojen nimi</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Rakennus</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Valovoimakkuuden korjaus</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Herkkyyden asettaminen</target>
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
        <target>Toimilaite 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Toimilaite 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Huoltotoiminnot</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testikäyttö</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Tallenna käyttäjäprofiilina</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Laiteohjelmiston päivitys</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Palauta tehdasasetukset</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Vapauta käyttäjälle</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Käytä masteria slavenä</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Avaava kosketin</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Jatkuvan valon kytkeminen päälle/pois</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktivoitavissa painikkeilla</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Käyttölaitteiden palauttaminen</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Palamismenetelmä</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Käyttötuntien palauttaminen</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Ajasta riippuvainen</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Valovoimakkuudesta riippuvainen</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Valokytkentäkynnys</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Yövalo</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Porrastettu poiskytkentä</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slave-laitteet</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Tunnista toimilaite 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Tunnista toimilaite 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Ei profiilia</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Esimääritetyt profiilit</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Käyttäjäprofiilit</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Lisää profiili</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Palamisen kesto viikkoa kohden</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Kaikki</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Näytä salasana</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Käyttäjän salasana</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lamppu 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lamppu 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Asetukset</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referenssitiedot</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Palauta tiedot</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Läsnäolosimulaatio</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Instalador eléctrico</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Usuario</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Perfil de usuario seleccionado</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Nombre de usuario</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Contraseña</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Ha iniciado sesión</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Cerrar sesión</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Sincronizar ahora</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Finalizar modo test</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Cargar</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Enviar</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ajustes de sensor</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Bloquear potenciómetro</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Activo</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Desactivado</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Desconectado</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Umbral de conmutación por luminosidad</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tener en cuenta luminosidad del esclavo</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Valor de luminosidad más bajo como referencia</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso de corta duración</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Tiempo de seguimiento</target>
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
        <target>Automático</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomático</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomático, confort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ajustes de actuador</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Ajustes actuador 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Servicio postventa</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Perfil almacenado</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor de energía</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Asignación de edificios</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Activar ajustes</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Tiempo de seguimiento dinámico</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Aplicación en zonas exteriores</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Comportamiento de conmutación</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Contacto de apertura</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Contacto de cierre</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft SÍ</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft NO</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Proceso de regulación</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Control de fase</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Control invertido de fase</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Otros ajustes</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Función de memoria</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Limitar luminosidad de estancia</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Carga mínima</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Carga máxima</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Ajustes DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Luminarias fluorescentes</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Función quemador</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Permanente</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Acumulativo</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Horas de servicio</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Luminosidad básica</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Luminosidad básica</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Hora de comienzo</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Hora de finalización</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Función Astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Tiempo de desconexión</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Función de conmutación</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Independiente de la luminosidad</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Servicio síncrono</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Luz de sobremesa</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manual</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>CVA</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Control dinámico</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Retardo de conexión</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Cargas conectadas</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Tarifa de corriente</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Moneda</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Nombre de contacto</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Edificio</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Corrección de luminosidad</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Ajustar sensibilidad</target>
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
        <target>Actuador 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Actuador 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funciones de servicio</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Modo test</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Guardar como perfil de usuario</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Actualización del firmware</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Restablecer ajustes de fábrica</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Habilitar para usuario</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Utilizar maestro como esclavo</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Contacto de apertura</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Conectar luz continua CON/DESC</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Activable mediante pulsador</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Restablecer aparatos operativos</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Método de quemado</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Restablecer horas de servicio</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Sujeto a tiempo</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Sujeto a luminosidad</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Umbral de conmutación por luminosidad</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Luz de noche</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Desconexión progresiva</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Maestro</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Esclavos</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identificar actuador 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identificar actuador 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Ningún perfil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Perfiles predefinidos</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Perfiles de usuario</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Añadir perfil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Duración de luz por semana</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Todas</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Mostrar contraseña</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Contraseña de usuario</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lámpara 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lámpara 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Ajustes</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Datos de referencia</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Restablecer datos</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulación de presencia</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>电气安装工</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>用户</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>选择的用户配置文件</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>用户名</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>密码</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>您现在已登录</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>退出</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>现在同步</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>结束试运行</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>加载</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>发送</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>传感器设置</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>锁定电位计</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>激活</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>已禁用</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>关闭</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>亮度开关阈</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>考虑从站亮度</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>将最小亮度值作为参考</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>短时脉冲</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>空转时间</target>
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
        <target>自动</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>半自动</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>半自动，舒适</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>执行器设置</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>执行器 1 设置</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>服务</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>保存的配置文件</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>能量监测器</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>建筑分配</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>激活设置</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>动态空转时间</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>户外使用</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>开关特性</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>常闭触点</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>常开触点</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>渐开</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>渐关</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>调光性能</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>前沿</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>后沿</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>其它设置</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>记忆功能</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>限制房间亮度</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>最小负载</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>最大负荷</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI 设置</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>记忆</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>荧光灯</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>老化功能</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>持续</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>积累</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>运行小时</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>基本亮度</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>基本亮度</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>起始时间</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>终止时间</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>天文功能</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>关闭时间</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>开关功能</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>与亮度无关</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>同步运行</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>面板灯</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>手动</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HVAC</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>动态控制</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>打开延迟</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>所连接的负载</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>电费</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>货币</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>联系人姓名</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>建筑</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>亮度校正</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>设置灵敏度</target>
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
        <target>执行器 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>执行器 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>服务功能</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>试运行</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>保存为用户配置文件</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>固件更新</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>复位至出厂设置</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>发布给用户</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>主站用作从站</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>常闭触点</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>打开/关闭持续照明</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>可通过按键激活</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>重置控制设备</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>老化方式</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>重置运行小时</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>与时间有关</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>与亮度有关</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>亮度开关阈</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target> 夜灯</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>逐步关闭</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>主站</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>从站</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>识别执行器 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>识别执行器 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>无配置文件</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>预定义的配置文件</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>用户配置文件</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>添加配置文件</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>每周照明时间</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>所有</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>显示密码</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>用户密码</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>灯 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>灯 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>设置</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>参考数据</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>重置数据</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>模拟在家模式</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektriker</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Bruger</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Udvalgt brugerprofil</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Brugernavn</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Password</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Du er nu logget ind</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Log off</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synkroniser nu</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Afslut testdrift</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Indlæs</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Send</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensorindstillinger</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Spær potentiometer</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktiv</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktiveret</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>FRA</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Lysstyrkeomskiftningstærskel</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Tag hensyn til slave-lysstyrke</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Mindste lysstyrkeværdi som reference</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Korttidsimpuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Efterløbstid</target>
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
        <target>Automatisk</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Halvautomatisk</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Halvautomatisk, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktuatorindstillinger</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Indstillinger aktuator 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Service</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Gemt profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Energimonitor</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Bygningstildeling</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivér indstillinger</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamisk efterløbstid</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Anvendelse udendørs</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Omskiftningsadfærd</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Bryder</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Slutter</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft TIL</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft FRA</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dæmperproces</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Fasestyring</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Proportionalstyring</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Yderligere indstillinger</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Memoryfunktion</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Begræns rumlysstyrke</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimumsbelastning</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maksimal belastning</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI indstillinger</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Memo</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lysstoflamper</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Indbrændingsfunktion</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Permanent</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Summeret</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Driftstimer</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Grundlysstyrke</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Grundlysstyrke</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Starttid</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Sluttid</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunktion</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Frakoblingstid</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Kontaktfunktion</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Lysstyrkeuafhængig</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synkrondrift</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Tavlelys</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuel</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HVAC</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamisk styring</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Tilkoblingsforsinkelse</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Tilsluttede belastninger</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Strømtakst</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Valuta</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Kontaktnavn</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Bygning</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Lysstyrkekorrektion</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Indstil følsomhed</target>
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
        <target>Aktuator 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktuator 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servicefunktioner</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testdrift</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Gem som brugerprofil</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Firmwareopdatering</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Reset til fabriksindstillinger</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Frigiv til bruger</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Benyt master som slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Bryder</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Til-/frakobling af permanent lys</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktiveres via trykknap</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Reset driftsenheder</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Indbrændingsmetode</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Reset driftstimer</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Tidsafhængig</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Lysstyrkeafhængig</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Lysstyrkeomskiftningstærskel</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Natlys</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Trinvis frakobling</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identificer aktuator 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identificer aktuator 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Ingen profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Fordefinerede profiler</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Brugerprofiler</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Tilføj profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Lysvarighed pr. uge</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Alle</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Vis password</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Bruger password</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lampe 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lampe 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Indstillinger</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referenceangivelser</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Reset data</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Tilstedeværelsessimulering</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektrik tesisatçısı</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Kullanıcı</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Seçilen kullanıcı profili</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Kullanıcı adı</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Parola</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Oturum açtınız</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Oturumu kapat</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Şimdi eşitle</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Test işletimini bitir</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Yükle</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Gönder</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Sensör ayarları</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Potansiyometreyi kilitle</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktif</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Devre dışı</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Kapat</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Parlaklık devreye girme eşiği</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Slave parlaklığı dikkate al</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Referans olarak en küçük parlaklık değeri</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Kısa süreli impuls</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Ek çalışma süresi</target>
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
        <target>Otomatik</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Yarı otomatik</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Yarı otomatik, konfor</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Aktüatör ayarları</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Aktuatör 1 ayarları</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Servis</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Kayıtlı profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Enerji ekranı</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Bina ataması</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Ayarları etkinleştir</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dinamik ek çalışma süresi</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Açık alanda uygulama</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Anahtarlama durumu</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Açma kontağı</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Kapatma kontağı</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Yumuşak AÇIK</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Yumuşak KAPALI</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Dimleme yöntemi</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Faz başlangıcı</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Faz bitişi</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Diğer ayarlar</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Hafıza fonksiyonu</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Oda parlaklığını sınırla</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimum yük</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maksimum yük</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>DALI ayarları</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Hafıza</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Floresan lambalar</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Yakma fonksiyonu</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Sürekli</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Toplam</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Çalışma saatleri</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Temel parlaklık</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Temel parlaklık</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Başlangıç zamanı</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Bitiş zamanı</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astro fonksiyonu</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Kapatma zamanı</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Anahtarlama fonksiyonu</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Parlaklıktan bağımsız</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Senkron işletimi</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Tablo ışığı</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manuel</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>ISH</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dinamik kumanda</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Açma gecikmesi</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Bağlanan yükler</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Elektrik tarifesi</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Para birimi</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Kişi adı</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Bina</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Parlaklık düzeltmesi</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Hassasiyeti ayarla</target>
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
        <target>Aktuatör 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Aktuatör 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servis fonksiyonları</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Test işletimi</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Kullanıcı profili olarak kaydet</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Yazılım güncelleme</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Fabrika ayarlarına geri al</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Kullanıcı için onayla</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Master'ı Slave olarak kullan</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Açma kontağı</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Sürekli ışığı aç/kapat</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Düğme ile etkinleştirilebilir</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>İşletim cihazlarını sıfırla</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Yakma metodu</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Çalışma saatlerini sıfırla</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Zamana bağlı</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Parlaklığa bağlı</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Parlaklık devreye girme eşiği</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target> Gece ışığı</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Kademeli kapat</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slave'ler</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Aktuatör 1 tanımla</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Aktuatör 2 tanımla</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Profil yok</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Ön tanımlı profiller</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Kullanıcı profilleri</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Profil ekle</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Hafta başına yanma süresi</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Tümü</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Parolayı göster</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Kullanıcı parolası</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lamba 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lamba 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Ayarlar</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referans bilgileri</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Verileri sıfırla</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Mevcudiyet simülasyonu</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Eletricista</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Utilizador</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Perfil de utilizador selecionado</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Nome de utilizador</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Palavra-passe</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Näao está logado.</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Logout</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Sincronizar agora</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Terminar oper. teste</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Carregar</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Enviar</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ajustes do sensor</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Bloquear o potenciômetro</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Ativo</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Desativado</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>OFF</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Limite comut. luminosidade</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Considerar luminosidade Slave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Menor valor lumin. como referência</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Impulso curto tempo</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Período de retardamento</target>
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
        <target>Automático</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Semiautomático</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Semiautomático, conforto</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ajustes do atuador</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Definições atuador 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Serviço</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Perfil guardado</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor de energia</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Atribuição prédios</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Ativar as definições</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Período de retard. dinâm.</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Utilização na área ext.</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Comport. de ligação</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Abridor</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Fechador</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>LIG Soft</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>DESL Soft</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Comport. regulagem</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Controlo de fase</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Corte de fase</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Outras definições</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Função de memória</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Limitar a luminos. do espaço</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Carga mínima</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Carga máxima</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Definições DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Nota</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Lâmpadas fluoresc.</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Função burn in</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Permanente</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Somado</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Horas oper.</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Luminos. básica</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Luminos. básica</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Tempo inicial</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Tempo final</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Função Astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Tempo deslig.</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Função de comut.</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Depende da luminos.</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Oper. sincr.</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Luz de mesa</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Manual</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>AACV</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Comando dinâmico</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Atraso de ligamento</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Cargas conectadas</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Tarifa elétrica</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Moeda</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Nome do contacto</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Prédio</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Correção de luminos.</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Ajustar a sensibilidade</target>
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
        <target>Atuador 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Atuador 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Funções serviço</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Operação teste</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Guardar como perfil de utilizador</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Atualiz. de firmware</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Repor as definições de fábrica</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Desbloquear para utilizadores</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Usar Master como Slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Abridor</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Ligar/desligar a luz permanente</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Ativável por botão</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Repor os aparelhos de oper.</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Método burn in</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Repor horas oper.</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Depende do tempo</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Depende da luminos.</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Limite comut. luminosidade</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Luz noturna</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Desligar gradativamente</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identificar atuador 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identificar atuador 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Nenhum perfil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Perfis predefinidos</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Perfis de utilizadores</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Adicionar perfil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Duração da luz por semana</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Todos</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Mostrar a palavra-passe</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Palavra-passe do utilizador</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Lâmpada 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Lâmpada 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Definições</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Inform. de referência</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Repor os dados</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulação de presença</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Ηλεκτρολόγος</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Χρήστης</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Επιλεγμένο προφίλ χρήστη</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Όνομα χρήστη</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Κωδικός πρόσβασης</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Έχετε συνδεθεί</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Αποσύνδεση</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Συγχρονισμός τώρα</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Τερματισμός δοκιμαστικής λειτουργίας</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Φόρτωση</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Αποστολή</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Ρυθμίσεις αισθητήρων</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Κλείδωμα ποτενσιόμετρου</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Ενεργός</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Απενεργοποιημέν.</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Off</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Κατώφλι μεταγωγής φωτεινότητας</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Συνυπολογισμός φωτεινότητας Slave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Μικρότερη τιμή φωτεινότητας ως αναφορά</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Παλμός σύντομης διάρκειας</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Χρόνος μετέπειτα λειτουργίας</target>
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
        <target>Αυτοματισμός</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Ημιαυτόματη λειτουργία</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Ημιαυτόματη λειτουργία, άνεσης</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Ρυθμίσεις ενεργοποιητή</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Ρυθμίσεις ενεργοποιητή 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Σέρβις</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Αποθηκευμένο προφίλ</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Ενεργειακό μόνιτορ</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Αντιστοίχιση κτιρίων</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Ενεργοποίηση ρυθμίσεων</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Δυναμικός χρόνος αδρανείας</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Χρήση σε εξωτερικό χώρο</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Συμπεριφορά ενεργοποίησης</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Κανονικά κλειστή επαφή</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Κανονικά ανοιχτή επαφή</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft ΑΠΕΝΕΡΓΟΠΟΙΗΜΕΝΟ</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Ενεργοποίηση/απενεργοποίηση Soft</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Διαδικασία ρύθμισης έντασης φωτισμού</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Αποκοπή φάσης</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Τμήμα φάσης</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Περαιτέρω ρυθμίσεις</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Λειτουργία μνήμης</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Περιορισμός φωτεινότητας οθόνης</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Ελάχιστο φορτίο</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Μέγιστο φορτίο</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Ρυθμίσεις DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Μνήμη</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Λαμπτήρες πυρακτώσεως</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Λειτουργία εγγραφής</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Διαρκώς</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Σύνολο</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Ώρες λειτουργίας</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Βασική φωτεινότητα</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Βασική φωτεινότητα</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Χρόνος εκκίνησης</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Ώρα λήξης</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Λειτουργία Astro</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Χρόνος απενεργοποίησης</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Λειτουργία μεταγωγής</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Ανεξάρτητα από τη φωτεινότητα</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Σύγχρονη λειτουργία</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Επιτραπέζιο φωτιστικό</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Χειροκίνητα</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Δυναμικός έλεγχος</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Καθυστέρηση ενεργοποίησης</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Συνδεδεμένοι καταναλωτές</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Τιμή ρεύματος</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Νόμισμα</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Επικοινωνία</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Κτίριο</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Διόρθωση φωτεινότητας</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Ρύθμιση ευαισθησίας</target>
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
        <target>Ενεργοποιητής 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ενεργοποιητής 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Λειτουργίες σέρβις</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Δοκιμαστική λειτουργία</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Αποθήκευση ως προφίλ χρήστη</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Ενημέρωση υλικού</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Επαναφορά εργοστασιακών ρυθμίσεων</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Απελευθέρωση για χρήστες</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Χρήση Master ως Slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Κανονικά κλειστή επαφή</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Ενεργοποίηση/απενεργοποίηση συνεχόμενου φωτισμού</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Ενεργοποιείται με πλήκτρα</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Επαναφορά συσκευών λειτουργίας</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Μέθοδος εγγραφής</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Επαναφορά ωρών λειτουργίας</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Σε συνάρτηση με το χρόνο</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Σε συνάρτηση με τη φωτεινότητα</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Κατώφλι μεταγωγής φωτεινότητας</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Νυχτερινός φωτισμός</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Σταδιακή απενεργοποίηση</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slaves</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Αναγνώριση ενεργοποιητή 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Αναγνώριση ενεργοποιητή 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Κανένα προφίλ</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Προκαθορισμένα προφίλ</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Προφίλ χρήστη</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Προσθήκη προφίλ</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Διάρκεια φωτισμού ανά βδομάδα</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Όλα</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Προβολή κωδικού πρόσβασης</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Κωδικός πρόσβασης χρήστη</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Λάμπα 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Λάμπα 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Ρυθμίσεις</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Στοιχεία αναφοράς</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Επαναφορά δεδομένων</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Προσομοίωση παρουσίας</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinštalatér</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Užívateľ</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Zvolený užívateľský profil</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Užívateľské meno</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Heslo</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Ste prihlásení</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Odhlásiť</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synchronizovať teraz</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Ukončiť testovaciu prevádzku</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Načítať</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Poslať</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Nastavenia senzora</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Zablokovať potenciometer</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktívny</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktivované</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Vypnuté</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Spínací prah jasu</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Zohľadniť jas slave</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Najmenšia hodnota jasu ako referencia</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Krátky časový impulz</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Čas dobehu</target>
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
        <target>Automatika</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Poloautomatika</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Poloautomatika, komfort</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Nastavenia akčného člena</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Nastavenia akčného člena 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Servis</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Uložený profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitor energie</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Priradenie budovy</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivovať nastavenia</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamický čas dobehu</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Použitie vo vonkajšej oblasti</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Správanie sa pri spínaní</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Otvárací kontakt</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Pracovný kontakt</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Tlmene ZAP</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Tlmene VYP</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Postup stmievania</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Fázový výrez</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Fázový úsek</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Ďalšie nastavenia</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Pamäťová funkcia</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Obmedziť jas v miestnosti</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimálna záťaž</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximálna záťaž</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Nastavenia DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Zápis</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Žiarivky</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Funkcia vypaľovania</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Trvale</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Akumulovane</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Prevádzkové hodiny</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Základný jas</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Základný jas</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Čas spustenia</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Čas ukončenia</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astrofunkcia</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Vypínací čas</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Spínacia funkcia</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Nezávisle od jasu</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synchrónna prevádzka</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Svetlo tabule</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Ručne</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>Kúrenie, klimatizácia, ventilácia</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamické riadenie</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Oneskorenie zapnutia</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Pripojené záťaže</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Tarifa za elektrický prúd</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Mena</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Meno kontaktnej osoby</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Budova</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Korekcia jasu</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Nastaviť citlivosť</target>
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
        <target>Akčný člen 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Akčný člen 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servisné funkcie</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testovacia prevádzka</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Uložiť ako užívateľský profil</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Aktualizácia firmvéru</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Resetovať do nastavení z výrobného závodu</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Uvoľniť pre užívateľa</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Použiť master ako slave</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Otvárací kontakt</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Trvalé svetlo zap/vyp</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Aktivovateľné pomocou tlačidla</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Resetovať prevádzkové prístroje</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Metóda vypaľovania</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Resetovať prevádzkové hodiny</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>V závislosti od času</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>V závislosti od jasu</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Spínací prah jasu</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Nočné svetlo</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Vypnúť postupne</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Master</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Slave</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifikovať akčný člen 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifikovať akčný člen 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Žiadny profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Preddefinované profily</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Užívateľské profily</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Pridať profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Doba svietenia za týždeň</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Všetky</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Zobraziť heslo</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Heslo užívateľa</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Svietidlo 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Svietidlo 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Nastavenia</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referenčné údaje</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Resetovať údaje</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulácia prítomnosti</target>
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
      <trans-unit id="d36e31a5b7bf16e6b29bedbe3a1d8637ba427c1a" datatype="html">
        <source>Installer</source>
        <target>Elektroinstalatér</target>
      </trans-unit>
      <trans-unit id="ae32135acfc24ce97ff81cc4388f9ab41fb360ca" datatype="html">
        <source>Standard User</source>
        <target>Uživatel</target>
      </trans-unit>
      <trans-unit id="3a1a2f9c25115e7db9a09990023236e1ee95b753" datatype="html">
        <source>Selected user profile</source>
        <target>Vybraný profil uživatele</target>
      </trans-unit>
      <trans-unit id="08c74dc9762957593b91f6eb5d65efdfc975bf48" datatype="html">
        <source>Username</source>
        <target>Uživatelské jméno</target>
      </trans-unit>
      <trans-unit id="c32ef07f8803a223a83ed17024b38e8d82292407" datatype="html">
        <source>Password</source>
        <target>Heslo</target>
      </trans-unit>
      <trans-unit id="fe985c5cbd7d97db55b5330c4ca939432f9ae7c6" datatype="html">
        <source>You are now logged in</source>
        <target>Nyní jste přihlášení</target>
      </trans-unit>
      <trans-unit id="bb694b49d408265c91c62799c2b3a7e3151c824d" datatype="html">
        <source>Logout</source>
        <target>Odhlásit</target>
      </trans-unit>
      <trans-unit id="a2d81ebd3b9c4496dc9d2cb964e9c080be9555dc" datatype="html">
        <source>Sync now</source>
        <target>Synchronizovat nyní</target>
      </trans-unit>
      <trans-unit id="2c26bd9af7f9e65d5358933d492dcb63ea22c475" datatype="html">
        <source>Deactivate test mode</source>
        <target>Ukončit testovací provoz</target>
      </trans-unit>
      <trans-unit id="8d7fb36ea2bff6fd8a53c1676d45e63ab624ad16" datatype="html">
        <source>Load</source>
        <target>Načíst</target>
      </trans-unit>
      <trans-unit id="2c5ff8fa9c9aaec93f97e37c9a0edcd797194573" datatype="html">
        <source>Send</source>
        <target>Odeslat</target>
      </trans-unit>
      <trans-unit id="e6ca70fa71a27ad5afdb155a05795596016c66eb" datatype="html">
        <source>Sensor settings</source>
        <target>Nastavení senzoru</target>
      </trans-unit>
      <trans-unit id="7fb1d97b43b51bc13ea56678777b4be69ae771cc" datatype="html">
        <source>Block potentiometer setting</source>
        <target>Zamknout potenciometr</target>
      </trans-unit>
      <trans-unit id="f50a33d3c339f8f4a465141f8caa5d2d8c005251" datatype="html">
        <source>Enabled</source>
        <target>Aktivní</target>
      </trans-unit>
      <trans-unit id="f39256070bfc0714020dfee08895421fc1527014" datatype="html">
        <source>Disabled</source>
        <target>Deaktivováno</target>
      </trans-unit>
      <trans-unit id="df4fd82a4f58c987a19eb6624dd3c98d14cd53db" datatype="html">
        <source>OFF</source>
        <target>Vyp</target>
      </trans-unit>
      <trans-unit id="99d9f6153e37aa499da09b92f881bc441af5c25e" datatype="html">
        <source>brightness threshold</source>
        <target>Spínací práh jasu</target>
      </trans-unit>
      <trans-unit id="cf2f27f3aacfd3c9a683f04a07890e8073426c0a" datatype="html">
        <source>Consider slave brightness</source>
        <target>Zohlednit jas podřízených zařízení</target>
      </trans-unit>
      <trans-unit id="daaa3a29ff14089f7b09bfb91153e7c413e5340d" datatype="html">
        <source>Smallest value as reference</source>
        <target>Nejmenší hodnota jasu jako reference</target>
      </trans-unit>
      <trans-unit id="8de07d06cee8306340a068988a14bc076dad2a1d" datatype="html">
        <source>Short-time pulse</source>
        <target>Krátkodobý impulz</target>
      </trans-unit>
      <trans-unit id="c9987d27799c92d689546abe476e47650af9b2ab" datatype="html">
        <source>Switch-off delay</source>
        <target>Doba doběhu</target>
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
        <target>Automatika</target>
      </trans-unit>
      <trans-unit id="41f81fefc1f6addc7cb35e3e1f0e674ff0b2e02d" datatype="html">
        <source>Semiautomatic</source>
        <target>Poloautomatika</target>
      </trans-unit>
      <trans-unit id="c44989f9463a5d2cda6d1e85db35ee834a6db56d" datatype="html">
        <source>Semiautomatic, comfort</source>
        <target>Poloautomatika, pohodlné ovládání</target>
      </trans-unit>
      <trans-unit id="4ce29d022d7307462954c14c64acabf6112dee77" datatype="html">
        <source>Actuator settings</source>
        <target>Nastavení ovladače</target>
      </trans-unit>
      <trans-unit id="20c04785904da3dfce30823658ddf9e60e527556" datatype="html">
        <source>Settings of actuator 1</source>
        <target>Nastavení ovladače 1</target>
      </trans-unit>
      <trans-unit id="d473e0f684a60db45d6f31e993f693f74290e056" datatype="html">
        <source>Service</source>
        <target>Služba</target>
      </trans-unit>
      <trans-unit id="ec04af208ca152a81c402399feadb837dd09e4ba" datatype="html">
        <source>Saved profile</source>
        <target>Uložený profil</target>
      </trans-unit>
      <trans-unit id="fa5913839f46f88864a6479662fd4390087621e0" datatype="html">
        <source>Energy monitor</source>
        <target>Monitorování energie</target>
      </trans-unit>
      <trans-unit id="45ee2f27d86fc2d0767ebb7a12179b9ab6dd98fe" datatype="html">
        <source>Building allocation</source>
        <target>Přiřazení budov</target>
      </trans-unit>
      <trans-unit id="8e15185abad9bb5744f8fd7dcc9bf668cb0a8307" datatype="html">
        <source>Enable settings</source>
        <target>Aktivovat nastavení</target>
      </trans-unit>
      <trans-unit id="b22a70288383df8cf0bebaafbe18d002a607f3b4" datatype="html">
        <source>Dynamic switch-off delay</source>
        <target>Dynamická doba doběhu</target>
      </trans-unit>
      <trans-unit id="2f783fb109eb6ae3f3b7ef89568b94b5ac9c994f" datatype="html">
        <source>Outdoor application</source>
        <target>Použití venku</target>
      </trans-unit>
      <trans-unit id="54e0f18a5793daca11c9103733b42ca1caac0472" datatype="html">
        <source>Circuit logic</source>
        <target>Nastavení sepnutí</target>
      </trans-unit>
      <trans-unit id="37e01ff2912886481d31b49e92e6e5d7dd7b1d15" datatype="html">
        <source>NC contact </source>
        <target>Rozpínací kontakt</target>
      </trans-unit>
      <trans-unit id="ece8539e5780137a95ce797fb87d851419a8ffa8" datatype="html">
        <source>NO contact</source>
        <target>Zavírací kontakt</target>
      </trans-unit>
      <trans-unit id="564047b9f59a79429d339a3d5b9309867f562077" datatype="html">
        <source>Soft ON</source>
        <target>Soft ZAP</target>
      </trans-unit>
      <trans-unit id="edc8986f83021c10d3bf82636fec6eb7a99d6c24" datatype="html">
        <source>Soft OFF</source>
        <target>Soft VYP</target>
      </trans-unit>
      <trans-unit id="8acfb9e606132532768df280178c97d9cf175c80" datatype="html">
        <source>Dimming mode</source>
        <target>Nastavení stmívání</target>
      </trans-unit>
      <trans-unit id="1475af1c8fd72aae0912d7da80e7d6fca630979f" datatype="html">
        <source>Leading edge</source>
        <target>Začátek fáze</target>
      </trans-unit>
      <trans-unit id="05b65867b200dca75c737545d6f026e15e75d4e4" datatype="html">
        <source>Trailing edge</source>
        <target>Konec fáze</target>
      </trans-unit>
      <trans-unit id="db5386a6b4c2ed4fd2842d7edf3e66c298a46326" datatype="html">
        <source>Additional Settings</source>
        <target>Další nastavení</target>
      </trans-unit>
      <trans-unit id="ccc9adadd0184221bdc984bf146323de6d9885e5" datatype="html">
        <source>Memory function</source>
        <target>Funkce paměti</target>
      </trans-unit>
      <trans-unit id="fd5b0870a1c7b6b57730a9690896f4d78583428c" datatype="html">
        <source>Limit room brightness</source>
        <target>Omezit prostorový jas</target>
      </trans-unit>
      <trans-unit id="e3bb9042b9779a5c93b3293cba85637d112fdf2e" datatype="html">
        <source>Minimum load</source>
        <target>Minimální zatížení</target>
      </trans-unit>
      <trans-unit id="721ac66d28da4336aa6f230db6ec367097ff4dad" datatype="html">
        <source>Maximum load</source>
        <target>Maximální zatížení</target>
      </trans-unit>
      <trans-unit id="cb037519956d71aa2cdfe1625c4c845efea87923" datatype="html">
        <source>DALI settings</source>
        <target>Nastavení DALI</target>
      </trans-unit>
      <trans-unit id="e112a61fcc06bf4a35e3a943aae0e0e2e95e57ad" datatype="html">
        <source>Power ON level</source>
        <target>Power ON level</target>
      </trans-unit>
      <trans-unit id="1d530182a11808d36e12c068c8c00e2498c53e30" datatype="html">
        <source>Memo</source>
        <target>Poznámka</target>
      </trans-unit>
      <trans-unit id="29c1391c0b127646bee4306cfdba2053c83dd436" datatype="html">
        <source>100%</source>
        <target>100%</target>
      </trans-unit>
      <trans-unit id="63ff80519b754dae9fad2e5c593b84416353f54f" datatype="html">
        <source>Fluorescent lamps</source>
        <target>Zářivky</target>
      </trans-unit>
      <trans-unit id="9b03b311a63146d7b5a9022c4355b26b42f90f7f" datatype="html">
        <source>Burn in function</source>
        <target>Funkce zahoření zářivky</target>
      </trans-unit>
      <trans-unit id="5dc4339f375dc51fca30d40aeea7a59651c049fd" datatype="html">
        <source>Steady</source>
        <target>Trvale</target>
      </trans-unit>
      <trans-unit id="09cb086dd3c4a4237e43cd2c58815f039e93bfca" datatype="html">
        <source>Accumulated</source>
        <target>Celkově</target>
      </trans-unit>
      <trans-unit id="1ea395e897ed1c078df18cbdfc3f8bd562a54904" datatype="html">
        <source>Operating hours</source>
        <target>Provozní hodiny</target>
      </trans-unit>
      <trans-unit id="4a41751c325af4f274cb64aa7fbd8d4a5a70c091" datatype="html">
        <source>Basic brightness</source>
        <target>Základní jas</target>
      </trans-unit>
      <trans-unit id="a1bca3d61c90e5b7516e5b266e1e6f1f48bb1417" datatype="html">
        <source>Basic illumination level</source>
        <target>Základní jas</target>
      </trans-unit>
      <trans-unit id="4c11aad490b2d53fdae30b3807beabf79306752c" datatype="html">
        <source>Start time</source>
        <target>Čas spuštění</target>
      </trans-unit>
      <trans-unit id="2f4e35e36f4d3c62e2c17df41730b6dee4afc4b9" datatype="html">
        <source>End time</source>
        <target>Čas ukončení</target>
      </trans-unit>
      <trans-unit id="b74804267a09da681f1e237c390ae0072bd4c55e" datatype="html">
        <source>Astro function</source>
        <target>Astro funkce</target>
      </trans-unit>
      <trans-unit id="48818f4252a67e7ffe02475757e8b1cfcd3b31fd" datatype="html">
        <source>Switch-off time</source>
        <target>Čas vypnutí</target>
      </trans-unit>
      <trans-unit id="01285838a98dd26208390fbd479e9bc692a8fd49" datatype="html">
        <source>Switching function</source>
        <target>Spínací funkce</target>
      </trans-unit>
      <trans-unit id="11bf2f3044da84950642788e3aa0a704f25e8fac" datatype="html">
        <source>Brightness independent</source>
        <target>Nezávisle na jasu</target>
      </trans-unit>
      <trans-unit id="c92690010797b007e26d4ba4b2add68a1dba0715" datatype="html">
        <source>Switch off DALI control gear voltage</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="cee94c2ab5d6f2777d9a9e292493977606a27723" datatype="html">
        <source>Synchronous operation</source>
        <target>Synchronní provoz</target>
      </trans-unit>
      <trans-unit id="9fc17cda63eac4eeab52f91c802ef09d304c658d" datatype="html">
        <source>Blackboard lightening</source>
        <target>Panelové světlo</target>
      </trans-unit>
      <trans-unit id="9d0ac9c23563b10fafabeedbf739e933b054d1c8" datatype="html">
        <source>Manual</source>
        <target>Ručně</target>
      </trans-unit>
      <trans-unit id="81ff266913c9a01706a1e38187d74b4007cd00c3" datatype="html">
        <source>HVAC</source>
        <target>HKL</target>
      </trans-unit>
      <trans-unit id="377a3e82927b3fa752ec7e6901e276e5c9e43acb" datatype="html">
        <source>Dynamic control</source>
        <target>Dynamické řízení</target>
      </trans-unit>
      <trans-unit id="c9f455999ecc0004ee12e67544a42db00bb60487" datatype="html">
        <source>Switch-on delay</source>
        <target>Prodlevy zapnutí</target>
      </trans-unit>
      <trans-unit id="cc67e5b1c66c11362b971fa44a6374999fca73bd" datatype="html">
        <source>Connected load</source>
        <target>Připojené zátěže</target>
      </trans-unit>
      <trans-unit id="215f57ba9f54b9585ea0c013f639149cea3f4e38" datatype="html">
        <source>Electricity price</source>
        <target>Sazba za proud</target>
      </trans-unit>
      <trans-unit id="32072c7fb0469aaf82d256a59b3e0d6ecce973b9" datatype="html">
        <source>Currency</source>
        <target>Měna</target>
      </trans-unit>
      <trans-unit id="e0e8b3214de0ffe8bc186c42773b425e366ed646" datatype="html">
        <source>Contact Name</source>
        <target>Jméno kontaktu</target>
      </trans-unit>
      <trans-unit id="6e8be3c170a661414dbcf0e4be5ce2ba65f62615" datatype="html">
        <source>Building</source>
        <target>Budova</target>
      </trans-unit>
      <trans-unit id="fe52d1549e9ab5ad0014f8e07ace851aa71ac385" datatype="html">
        <source>Brightness correction</source>
        <target>Oprava jasu</target>
      </trans-unit>
      <trans-unit id="9ce2e8afc35bd488283dbac4eef00e340b86be2f" datatype="html">
        <source>Set sensitivity</source>
        <target>Nastavit citlivost</target>
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
        <target>Ovladač 1</target>
      </trans-unit>
      <trans-unit id="ba5cfb0eaa7bc16b549541ef935a35e2d30899fa" datatype="html">
        <source>Actuator 2</source>
        <target>Ovladač 2</target>
      </trans-unit>
      <trans-unit id="6b31a7d1b8dec59bca4b7a48fb173b860f2ab288" datatype="html">
        <source>Service functions</source>
        <target>Servisní funkce</target>
      </trans-unit>
      <trans-unit id="fe593469864af22709d7e3dd8a7fb2fc9ebb8d0b" datatype="html">
        <source>Test mode</source>
        <target>Testovací provoz</target>
      </trans-unit>
      <trans-unit id="f07595a505b840cb85c2e9bf903a081b5816f670" datatype="html">
        <source>Load detector profile</source>
        <target>
        </target>
      </trans-unit>
      <trans-unit id="850b78a126ef4e85c2e9d74d9ca74394ec9d05cf" datatype="html">
        <source>Save as user profile</source>
        <target>Uložit jako profil uživatele</target>
      </trans-unit>
      <trans-unit id="00f29bc8f272fef4adb87a16c6c3bd5fabc975a6" datatype="html">
        <source>Update Firmware</source>
        <target>Aktualizace firmwaru</target>
      </trans-unit>
      <trans-unit id="3e1b27e504199ab194c3ec5c204054e5d868b4a2" datatype="html">
        <source>Reset to factory settings</source>
        <target>Obnovit výrobní nastavení</target>
      </trans-unit>
      <trans-unit id="5ef2499eac8943120c53e36b3fcb5ce2ca4050f6" datatype="html">
        <source>Release to user</source>
        <target>Aktivovat pro uživatele</target>
      </trans-unit>
      <trans-unit id="564c3fe059cb5abecb34cf4fa6dd7a9a64fa28bf" datatype="html">
        <source>Use master in slave mode</source>
        <target>Použít hlavní zařízení jako podřízené</target>
      </trans-unit>
      <trans-unit id="1d574eaf5333b24c23f97a9ca5e3fea4c7acd377" datatype="html">
        <source>NC contact</source>
        <target>Rozpínací kontakt</target>
      </trans-unit>
      <trans-unit id="2c3dfd18c563d59633522a68ffcc7550f40d4b34" datatype="html">
        <source>Permanent light ON/OFF</source>
        <target>Spínání trvalého světla zap/vyp</target>
      </trans-unit>
      <trans-unit id="6d0e8de0d36a9f5ae128fa4e3d13d8a958e17476" datatype="html">
        <source>Enabled by push button</source>
        <target>Lze aktivovat tlačítky</target>
      </trans-unit>
      <trans-unit id="9ab60e8d787485121d78110a1a64bb3aee668ad0" datatype="html">
        <source>Reset control gear</source>
        <target>Obnovit provozní zařízení</target>
      </trans-unit>
      <trans-unit id="e8bb8257da195ad0bc948342518d951405d31193" datatype="html">
        <source>Burn in mode</source>
        <target>Metoda zahoření zářivky</target>
      </trans-unit>
      <trans-unit id="34de71d6c35fbbae740dec811e4cbc476022d96d" datatype="html">
        <source>Reset operating hours</source>
        <target>Obnovit provozní hodiny</target>
      </trans-unit>
      <trans-unit id="ea7599a23cbc8ea01d9a925e94e705763f331e14" datatype="html">
        <source>Determined by time</source>
        <target>Podle času</target>
      </trans-unit>
      <trans-unit id="db8f39b6bab45536dc949ff70194787b9b545e59" datatype="html">
        <source>Determined by brightness</source>
        <target>Podle jasu</target>
      </trans-unit>
      <trans-unit id="ec932dca5a9af2787160227c587b282310036e3e" datatype="html">
        <source>Ambient brightness threshold</source>
        <target>Spínací práh jasu</target>
      </trans-unit>
      <trans-unit id="caed47aad9282737a20ed401bc5f674f733a07bc" datatype="html">
        <source>Night light </source>
        <target>Noční světlo</target>
      </trans-unit>
      <trans-unit id="2a71cc3bbc868ae3c405519d939e0ff0432553f7" datatype="html">
        <source>Stepwise switch-off</source>
        <target>Vypnout postupně</target>
      </trans-unit>
      <trans-unit id="bceb00c745ce685e6f6f3eda4fd9a4dab5279296" datatype="html">
        <source>Master</source>
        <target>Hlavní zařízení</target>
      </trans-unit>
      <trans-unit id="cd7ead9c32d8ed20d1de4cafa0534d57c368c7cf" datatype="html">
        <source>Slaves</source>
        <target>Podřízená zařízení</target>
      </trans-unit>
      <trans-unit id="32b6a1bf3980d8a7c99744060397b27ffa6fa090" datatype="html">
        <source>Identify load on actuator 1</source>
        <target>Identifikovat ovladač 1</target>
      </trans-unit>
      <trans-unit id="b405eec86eb9597dadb684595a66ead00d43c205" datatype="html">
        <source>Identify load on actuator 2</source>
        <target>Identifikovat ovladač 2</target>
      </trans-unit>
      <trans-unit id="069fac057c10be0dd7d70695e7b69d73d3464323" datatype="html">
        <source>No Profile</source>
        <target>Žádný profil</target>
      </trans-unit>
      <trans-unit id="75635ef0a19bf850834256ce34e286ef239aa5d0" datatype="html">
        <source>Predefined profiles</source>
        <target>Předefinované profily</target>
      </trans-unit>
      <trans-unit id="b7a9adbfb82a70b1ccc2b7028aef9c6d520328d1" datatype="html">
        <source>User profiles</source>
        <target>Profily uživatelů</target>
      </trans-unit>
      <trans-unit id="c55060954448e171f709493f38f3ec9645fd9b50" datatype="html">
        <source>Add profile</source>
        <target>Vložit profil</target>
      </trans-unit>
      <trans-unit id="0128107450d1e2cde9ecb5fd7678d4d2676c00f1" datatype="html">
        <source>Lighting duration per week</source>
        <target>Délka osvětlení za týden</target>
      </trans-unit>
      <trans-unit id="dfc3c34e182ea73c5d784ff7c8135f087992dac1" datatype="html">
        <source>All</source>
        <target>Vše</target>
      </trans-unit>
      <trans-unit id="ee79f7ba39540c5849b2fe34b817f6d18d35f759" datatype="html">
        <source>Show password</source>
        <target>Zobrazit heslo</target>
      </trans-unit>
      <trans-unit id="7d0eeeaa2d6344026205f2990aa2e12e2cf399f9" datatype="html">
        <source>Standard User password</source>
        <target>Heslo uživatele</target>
      </trans-unit>
      <trans-unit id="7bc8bcf8928972f72797f0fe08ba58700f29e67e" datatype="html">
        <source>Light 1</source>
        <target>Světlo 1</target>
      </trans-unit>
      <trans-unit id="9d533115c77a62060c500534eaca5c6b971bd494" datatype="html">
        <source>Light 2</source>
        <target>Světlo 2</target>
      </trans-unit>
      <trans-unit id="121cc5391cd2a5115bc2b3160379ee5b36cd7716" datatype="html">
        <source>Settings</source>
        <target>Nastavení</target>
      </trans-unit>
      <trans-unit id="a97b4a967db245cd901f806f3fb889c042e7ab13" datatype="html">
        <source>Reference details</source>
        <target>Referenční údaje</target>
      </trans-unit>
      <trans-unit id="6b79e23bd61ea83f039ff6fb6a362de8b47f33d9" datatype="html">
        <source>Reset data</source>
        <target>Obnovit data</target>
      </trans-unit>
      <trans-unit id="a7d80da17458263c923bbdf193ebd3d5e7c2d3a0" datatype="html">
        <source>Presence simulation</source>
        <target>Simulace přítomnosti</target>
      </trans-unit>
    </body>
  </file>
</xliff>`;
                
            }

        }
