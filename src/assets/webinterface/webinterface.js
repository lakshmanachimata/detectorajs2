
var welcomecomponent;
var appDataService;
var scannedDevices;
var BJE;
var debugLogs = true;
var bjeLogs = true;
var authGenSent = false;

var sendPacketCounter = 0;
var recvPacketCounter = 0;

var SCCP_DATATYPES = {
    SCCP_TYPE_BOOL     : 0x01,
    SCCP_TYPE_STRING   : 0x02,
    SCCP_TYPE_ENUM8    : 0x03,
    SCCP_TYPE_ENUM16   : 0x04,
    SCCP_TYPE_TIME     : 0x05,
    SCCP_TYPE_UINT8    : 0x08,
    SCCP_TYPE_UINT16   : 0x09,
    SCCP_TYPE_UINT32   : 0x0A,
    SCCP_TYPE_UINT64   : 0x0B,
    SCCP_TYPE_INT8     : 0x0C,
    SCCP_TYPE_INT16    : 0x0D,
    SCCP_TYPE_INT32    : 0x0E,
    SCCP_TYPE_INT64    : 0x0F,
    SCCP_TYPE_AUINT8    : 0x88,
    SCCP_TYPE_AUINT16    : 0x89,
}

var SCCP_COMMAND = {
    STANDARD_RESPONSE               : 0x80,
    RESET                           : 0x01,
    RESET_FN                        : 0x02,
    READ_ATTRIBUTE_REQUEST          : 0x03,
    READ_ATTRIBUTE_RESPONSE         : 0x83,
    WRITE_ATTRIBUTE_REQUEST         : 0x04,
    WRITE_ATTRIBUTE_RESPONSE        : 0x84,
    CONFIGURE_REPORTING_REQUEST     : 0x05,
    CONFIGURE_REPORTING_RESPONSE    : 0x85,
    REPORT_ATTRIBUTE                : 0x06,
    IDENTIFY_DEVICE                 : 0x20,
    IDENTIFY_LOAD                   : 0x30,
    ON_OFF                          : 0x31,
    SET_LEVEL                       : 0x32,
    RESET_ENERGY_MONITOR            : 0x40,
    RESET_DALI_CONTROL_GEAR         : 0x48,
    AUTH_GEN_RANDOM_REQUEST         : 0x50,
    AUTH_GEN_RANDOM_RESPONSE        : 0xD0,
    AUTH_REQUST                     : 0x51,
    AUTH_SET_PWD_REQUEST            : 0x52,
    SET_ACCESS_LEVEL                : 0x53,
    READ_EM_DB                      : 0x11,
    SET_DATE_TIME                   : 0x60,
    REPORT_ATTRIBUTE                : 0x06,
    HANDSHAKE                       : 0x07,
}


/// <#Description#>
var SCCP_STATUS = {
    SCCP_STATUS_OK                          : 0x00,
    SCCP_LL_NOT_INITIALIZED                 : 0x10,
    SCCP_LL_NO_FREE_TX_BUFFER               : 0x11,
    SCCP_LL_BAD_FRAME_LENGTH                : 0x12,
    SCCP_FD_BAD_PAYLOAD_LENGTH              : 0x20,
    SCCP_FD_BAD_DEST_ADDRESS                : 0x21,
    SCCP_FD_NOT_INITIALIZED                 : 0x22,
    SCCP_APP_UNSUPPORTED_ATTRIBUTE          : 0x40,
    SCCP_APP_OUT_OF_BOUNDS                  : 0x41,
    SCCP_APP_TYPE_MISMATCH                  : 0x42,
    SCCP_APP_ACCESS_DENIED                  : 0x43,
    SCCP_APP_UNREPORTABLE_ATTRIBUTE         : 0x44,
    SCCP_APP_UNKNOWN_TYPE                   : 0x45,
    SCCP_APP_BUFFER_TOO_SMALL               : 0x46,
    SCCP_APP_MESSAGE_BROKEN                 : 0x47,
    SCCP_APP_UNKNOWN_COMMAND                : 0x48,
    SCCP_APP_TOO_MANY_REPORTED_ATTRIBUTES   : 0x49
}


function getSafariSubtle(webkitSubtleObj){
    if(window.crypto.webkitSubtle){
        bjeLog(' subtle and assigning same')
         webkitSubtleObj = window.crypto.webkitSubtle;
         return window.crypto.webkitSubtle;
    }else{
        bjeLog('no subtle')
        return;
    }
}

 function  getFormattedDateTime() {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
    return str;
  }

function bjeLog(msg){
    if(bjeLogs == true)
        console.log('bje_detector_ui  '+ msg + '     ' + getFormattedDateTime());
}

function getHexDataOfData(data){
    var hexdata = [];
    var hexString = "";
    for(var i =0; i<data.length; i++){
        hexString = data[i].toString(16);
        hexString = hexString.toUpperCase();
        if(hexString.length == 1){
            hexString = "0x0" + hexString;
        }else if(hexString.length == 2){
            hexString = "0x" + hexString;
        }
        hexdata.push(hexString)
    }
    return hexdata;
}
function debugLog(msg){
    if(debugLogs == true)
        console.log('bje_detector_ui  '+ msg + '     ' + getFormattedDateTime());
}
function setDevicesCallBack(component) {
    welcomecomponent = component;
}

function setDemoMode(data){
    // bjeLog(JSON.stringify(data))
    isDemoMode = data.demomode;
    appDataService.setDemoMode(isDemoMode);
}

function retryConnection(){
    appDataService.retryConnection();
}


function BJ_updateScanList() {
    var devData = BJE.getDeviceData();
    welcomecomponent.onDevices(devData);
}

function setFlavor(data){
    appDataService.setIsAbbFlavor(data.isabb);
}

function setWebLanguage(data){
    var lang = data.language;
}

function operateDrumElement(element){
    $(element).drum({
        onChange: function(_this) {
            return function(e) {
                if(e.name =='hours'){
                    appDataService.setTimeHours(e.value)
                }if(e.name =='minutes'){
                    appDataService.setTimeMins(e.value)
                }if(e.name =='seconds'){
                    appDataService.setTimeSecs(e.value)
                }
                changed = false;
            }
        }(this)
    });
}

function connectDevice(deviceAddress){
    if(BJE != undefined)
        BJE.connectDevice(deviceAddress)
    else {
        var message = {"connect":deviceAddress}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function disConnectDevice() {
    if(BJE != undefined){
        BJE.disConnectDevice()
        debugLog("web interface disConnectDevice ")
    }
    else {
        var message = {"disconnect":deviceAddress}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function onDeviceConnected(deviceAddress){
    debugLog(' onDeviceConnected web interface')
    appDataService.onDeviceConnected(deviceAddress);
}

function onDeviceDisconnected(deviceAddress){
    debugLog(' onDeviceDisconnected web interface')
    appDataService.onDeviceDisconnected(deviceAddress);
}



function onFirwareUpdateState(data){
    var fwpercentage = data.percentage;
    appDataService.onFirwareUpdateState(fwpercentage)
}
function setCertData(certData){
    appDataService.setCertData(certData.data)
}

function setKeyData(keyData){
        appDataService.setKeyData(keyData.data)
}
function updateScanList(scanned) {
    scannedDevices = scanned
    var deviceData =  JSON.stringify(scannedDevices);
    // debugLog(deviceData)
    if(appDataService != undefined)
    appDataService.setScannedData(scanned);
}

function identifyLoad(type,time){
   var data =  getIdentifyLoadFrame(type,time)
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX  ILOAD PKT  ' + hexData.join(','))
    }

    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    } 
}


function identify(indata){
    var data =  getIdentifyCommanmdFrame(indata)
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX  IDEVICE PKT  ' + hexData.join(','))
    }

    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function updateDeviceFW(){
    if(BJE != undefined){
        BJE.updateDeviceFW();
    }
    else {
        var message = {"send":"updateDeviceFW"}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function getIdentifyLoadFrame(type,time){
    var frame = [];
    var crc;
    frame.push(0x08); // LENGTH AFTER THIS BYTE
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x12); // SEQUENCE
    frame.push(0x30); // command
    frame.push(type); // channel index
    frame.push(time);
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function getIdentifyCommanmdFrame(cmd){
    var frame = [];
    var crc;
    frame.push(0x07); // LENGTH AFTER THIS BYTE
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x11); // SEQUENCE
    frame.push(0x20); // command
    frame.push(cmd); // command
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function resetCmd(resetCmd) {
    var data = getResetCommandFrame(resetCmd);
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX RESET PKT  ' + hexData.join(','))
    }

    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function killMeFromJS(){
    if(BJE != undefined)
        BJE.killApp()
}


function readArrayAttr(readData) {
    var data = []
     data = getFrameForArrayRead(readData);
    if(BJE != undefined) {
        BJE.readAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX PKT ' + ++sendPacketCounter + ' read frame ' + hexData.join(','))
    }
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function getFrameForArrayRead(data){
    var frame = [];
    var crc;
    frame.push(6 + ((data.length/2) * 5)); // LENGTH AFTER THIS BYTE
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x89); // SEQUENCE
    frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
    
    for(var dd =0; dd<data.length; dd = dd +2) {
        var val = data[dd];
        frame.push(val & 0x00FF); // ADDR LOW
        frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
        frame.push(data[dd+1]);   // length of bytes
        frame.push(0x00);   // offset lower  byte
        frame.push(0x00);   // offset upper  byte
    }
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function readAttr(readData) {
    var data = []
     data = getRequestFrame(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, readData);
    if(BJE != undefined) {
        BJE.readAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX PKT ' + ++sendPacketCounter + ' read frame ' + hexData.join(','))
    }
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function writeAttr(writeData) {
    var data = []
    data = getRequestFrame(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST, writeData);
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX PKT' + ++sendPacketCounter +'  write frame  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function getConfigureFrame(cmd, data){
    var counter = 0;
    var frame = [];
    var crc;
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x10); // SEQUENCE
    frame.push(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST); // command
    
    for (var i=0; i < data.length; i+=1) {
        var val = data[i];
        frame.push(val & 0x00ff); // ADDR LOW
        frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
        frame.push(0x01); // MIN REPORTING INTERVAL HIGH
        frame.push((0x00)); // MIN REPORTING INTERVAL LOW
        frame.push(0x0A); // MAX REPORTING INTERVAL HIGH
        frame.push((0x00)); // MAX REPORTING INTERVAL LOW
        counter += 6;
    }
    
    frame.unshift(6 + counter); // LENGTH
    
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function getUnConfigureFrame(cmd, data){
    var counter = 0;
    var frame = [];
    var crc;
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x10); // SEQUENCE
    frame.push(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST); // command
    
    for (var i=0; i < data.length; i+=1) {
        var val = data[i];
        frame.push(val & 0x00ff); // ADDR LOW
        frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
        frame.push(0x01); // MIN REPORTING INTERVAL HIGH
        frame.push((0x00)); // MIN REPORTING INTERVAL LOW
        frame.push(0xFF); // MAX REPORTING INTERVAL HIGH
        frame.push((0xFF)); // MAX REPORTING INTERVAL LOW
        counter += 6;
    }
    
    frame.unshift(6 + counter); // LENGTH
    
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function unConfigureAttr(notifyData) {
    var data = getUnConfigureFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, notifyData);
    if(BJE != undefined) {
        BJE.configureAttr(data);
        if(debugLogs ==  true)
            var hexData = getHexDataOfData(data)
        bjeLog('TX UCFG PKT  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}


function configureAttr(notifyData) {
    var data = getConfigureFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, notifyData);
    if(BJE != undefined) {
        BJE.configureAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX CFG PKT ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}



function setBLEDataToService(indata){
    // decode frame data
    var databytes = [];
   var bytedata = indata.data;
    for (var i = 0; i < bytedata.length; ++i)
    {
        charCode = bytedata.charCodeAt(i);
        databytes.push(charCode);
    }
    var hexData = [];
    if(debugLogs ==  true)
        hexData = getHexDataOfData(databytes)
    debugLog('RX PKT ' + ++recvPacketCounter + '  recv frame  ' + hexData.join(','))
    var data  = prepareAttributeArray(databytes);
    appDataService.setBLEDataToService(data,databytes[4]);
}

function setDeviceDateTime(){
    var data = []
    data = getDateTimeFrame(SCCP_COMMAND.SET_DATE_TIME);
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX PKT ' + ++sendPacketCounter +'  write frame  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function getDateTimeFrame(cmd){
    var frame = [];
    var crc;
    frame.push(0x0C); // LENGTH AFTER THIS BYTE
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x60); // SEQUENCE
    frame.push(cmd); // command
    var date = new Date();
    var year =  date.getFullYear()
    var month =  date.getMonth() + 1
    var nowdate =  date.getDate()
    var hours =  date.getHours()
    var minutes =  date.getMinutes()
    var seconds =  date.getSeconds()
    frame.push(year-2000)
    frame.push(month)
    frame.push(nowdate)
    frame.push(hours)
    frame.push(minutes)
    frame.push(seconds)
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}

function setDeviceAccessLevel(accessLevel){
    var data = getRequestFrame(SCCP_COMMAND.SET_ACCESS_LEVEL, accessLevel);
     if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        debugLog('TX ACCESS PKT ' + ++sendPacketCounter + ' write frame ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function getGeneratedAuth(){
    appDataService.setAuthGenData([]);
    var data = getRequestFrame(SCCP_COMMAND.AUTH_GEN_RANDOM_REQUEST);
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX GENAUTH PKT  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function setPeerData(data){
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX PEER PKT  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}
function getReadPeerDataFrame(data){
    var frame = [];
    var crc;
    frame.push(6 + (data.length * 5)); // LENGTH AFTER THIS BYTE
    frame.push(0x08); // CONTROL DEVICE
    frame.push(0x51); // SEQUENCE
    frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
    
    for (var d in data) {
        var val = data[d];
        frame.push(val & 0x00FF); // ADDR LOW
        frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
        frame.push(0x04);   // length of bytes
        frame.push(0x00);   // offset lower  byte
        frame.push(0x00);   // offset upper  byte
    }
    crc = crcCCITT(frame)
    frame.push(crc >> 8); // CRC LOWER
    frame.push(crc & 0x00ff); // CRC UPPER
    
    frame.unshift(0x7e) // START BYTE
    frame.push(0x7e) // END BYTE
    return frame;
}


function peerSensivity(indata){
    var  data =  getReadPeerDataFrame(indata)
    if(BJE != undefined) {
        BJE.readAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX READ PKT ' + ++sendPacketCounter + ' read frame ' + hexData.join(','))
    }
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}
function setPwdToDevice(pwd,length,installer){
    var data = [];
    if(installer)
        data = getRequestFrame(SCCP_COMMAND.AUTH_SET_PWD_REQUEST, pwd,length,installer);
    else{
        data = getRequestFrame(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST, pwd,length,installer,true);
    }
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX SET PWD PKT  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function reademdb(offset){
    var data = []
     data = getEMDBRequestFrame(offset);
    if(BJE != undefined) {
        BJE.readAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('sending packet number ' + ++sendPacketCounter + ' read frame ' + hexData.join(','))
    }
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function readAddrAttr(){
    var data = []
     data = getAddrRequestFrame();
    if(BJE != undefined) {
        BJE.readAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX READ PKT ' + ++sendPacketCounter + ' read frame ' + hexData.join(','))
    }
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function authenticateDevice(pwdHash,length,installer){
    var data = [];
    data = getRequestFrame(SCCP_COMMAND.AUTH_REQUST, pwdHash,length,installer);
    if(BJE != undefined){
        BJE.writeAttr(data);
        var hexData = [];
        if(debugLogs ==  true)
            hexData = getHexDataOfData(data)
        bjeLog('TX AUTH PKT  ' + hexData.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function prepareAttributeArray(indata) {
    var bledata = {};
    var datas = [];
    bledata.datas = datas;

    if(indata[3] == 0x0F && indata[5] == 0x10 && authGenSent == true){
        appDataService.setAuthGenData(indata);
        authGenSent = false;
        return;
    }
    
    switch(indata[4]){
        case SCCP_COMMAND.STANDARD_RESPONSE: // standard response
        //bjeLog("standard response     " + indata);

        if(indata[3] == 0x11){
            return;
        }

        if(indata[3] == 0x0A){

            if(indata[5] == 0){
                appDataService.onAccessLevelUpdate(0);
                //setDeviceDateTime()
            }else {
                appDataService.onAccessLevelUpdate(-1);
                getGeneratedAuth();
            }
            return;
        }

        if(indata[3] == 0x60){
            if(indata[5] == 0)
                appDataService.onAccessLevelUpdate(0);
            else{

            }
            return;
        }
        if(indata[3] == 0x0B){
            if(indata[5] == 0){
                appDataService.onInstallerPwdSetSuccess()
             }else{
                 appDataService.onInstallerPwdSetFailed()
             }
             return;
        }
        if(indata[3] == 0x0C){
            if(indata[5] == 0){
                appDataService.onUserPwdSetSuccess()
             }else{
                 appDataService.onUserPwdSetFailed()
             }
             return;
        }
        if(indata[3] == 0x0D){
            if(indata[5] == 0){
                appDataService.onInstallerAccessSuccess()
             }else{
                appDataService.onInstallerAccessDenied()
                getGeneratedAuth();
             }
             return;
        }
        if(indata[3] == 0x0E){
            if(indata[5] == 0){
                appDataService.onUserAccessSuccess()
             }else{
                appDataService.onUserAccessDenied()
                getGeneratedAuth();
             }
             return;
        }

        break;
        case SCCP_COMMAND.READ_ATTRIBUTE_RESPONSE: // read attr resonse
            //bjeLog("read attr response     " + indata);
        if(indata[3] == 0x09){
            appDataService.appendEMDBRespones(indata)
            return;
        } 
        if(indata[3] == 0x08){
            appDataService.parseDeviceAddress(indata);
            return;
        }
        if(indata[3] == 0x51){
            appDataService.onPeerSensitivityData(indata)
            return;
        }
        var dataLength = indata.length - 6;
        var lastParseByteIndex = 4;
        while(lastParseByteIndex <= dataLength  ) {
            //bjeLog("lastParseByteIndex  " + lastParseByteIndex + "   dataLength  " + dataLength);
            var key,value = []; 
            switch(indata[lastParseByteIndex + 4]){
                case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                    key = (indata[lastParseByteIndex + 1 ] | (indata[lastParseByteIndex + 2] << 8 & 0xFF00));
                    value.push(indata[lastParseByteIndex+ 5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_STRING:
                    key = (indata[lastParseByteIndex + 1 ] | (indata[lastParseByteIndex + 2] << 8 & 0xFF00));
                    var strByteArray = [];
                    var i = 5;
                    while(indata[lastParseByteIndex + i] != 0){
                        strByteArray.push(indata[lastParseByteIndex + i])
                        i = i +1;
                    }
                    //strByteArray.push(indata[0])
                    var result = "";
                    for (var j = 0; j < strByteArray.length; j++) {
                        result += String.fromCharCode(strByteArray[j]);
                    }
                    value.push(result);
                    var data = {
                    "attrType": key,
                        "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5 + strByteArray.length;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push(indata[lastParseByteIndex+5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push(indata[lastParseByteIndex+5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push(((indata[lastParseByteIndex+7] * 3600) + (indata[lastParseByteIndex +6] * 60) + indata[lastParseByteIndex +5]));
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 8;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push(indata[lastParseByteIndex+5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push((indata[lastParseByteIndex+5] | (indata[lastParseByteIndex +6] << 8 & 0xFF00)));
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 6;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT32:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT64:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_INT8:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push(indata[lastParseByteIndex+5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_INT16:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value.push((indata[lastParseByteIndex+5] | (indata[lastParseByteIndex +6] << 8 & 0xFF00)));
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 6;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_INT32:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_INT64:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_AUINT8:
                {
                    var byteCounter = 0;
                    for(var ne = 0; ne < indata[lastParseByteIndex+5]; ne++){
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push(indata[lastParseByteIndex+8+ne]);
                    }
                    var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        // bledata.datas.push(data);
                    lastParseByteIndex = lastParseByteIndex + (indata[lastParseByteIndex+5])
                    lastParseByteIndex = lastParseByteIndex + 7;
                }
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_AUINT16:
                {
                    var byteCounter = 0;
                    for(var ne = 0, keyne =0; keyne < indata[lastParseByteIndex+5]; keyne=keyne+1,ne = ne + 2){
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push((indata[lastParseByteIndex+8+ne] | (indata[lastParseByteIndex +9+ne] << 8 & 0xFF00)));
                    }
                    var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        // bledata.datas.push(data);
                    lastParseByteIndex = lastParseByteIndex + (indata[lastParseByteIndex+5] * 2)
                    lastParseByteIndex = lastParseByteIndex + 7;
                }
                break;
                default:
                    bjeLog("WHO AM I " + indata[lastParseByteIndex + 4] +" AND AT " + lastParseByteIndex + 4)
                break;
            }
            //bjeLog("attrType  " + key + "   attrValue  " + value);
            bledata.datas.push(data);
        }
        break;
        case SCCP_COMMAND.WRITE_ATTRIBUTE_RESPONSE: // write attr response
           // bjeLog("write attr response     " + indata);
        break;
        case SCCP_COMMAND.CONFIGURE_REPORTING_RESPONSE: // configure attr response
            //bjeLog("configure attr response     " + indata);
        break;
        case SCCP_COMMAND.REPORT_ATTRIBUTE:
                //bjeLog("report attribute     " + indata);
            var dataLength = indata.length - 6;
            var lastParseByteIndex = 4;
            while(lastParseByteIndex <= dataLength  ) {
                var key,value = []; 
                switch(indata[lastParseByteIndex+3]){
                    case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push(indata[lastParseByteIndex+4])
                        lastParseByteIndex = lastParseByteIndex + 4;
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_STRING:
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push(indata[lastParseByteIndex+4])
                        lastParseByteIndex = lastParseByteIndex + 4;
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push(indata[lastParseByteIndex+5]);
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        lastParseByteIndex = lastParseByteIndex + 4;
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_TIME:
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push(indata[lastParseByteIndex+4])
                        lastParseByteIndex = lastParseByteIndex + 4;
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                        key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push((indata[lastParseByteIndex+4] | (indata[lastParseByteIndex +5] << 8 & 0xFF00)));
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        lastParseByteIndex = lastParseByteIndex + 5;
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT32:
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT64:
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT8:
                        key = indata[lastParseByteIndex+1];
                        value.push(indata[lastParseByteIndex+4]);
                        lastParseByteIndex = lastParseByteIndex + 4;
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT16:
                        key = (indata[lastParseByteIndex+1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                        value.push((indata[lastParseByteIndex+4] | (indata[lastParseByteIndex +5] << 8 & 0xFF00)));
                        var data = {
                        "attrType": key,
                        "attrValue": value
                        }
                        lastParseByteIndex = lastParseByteIndex + 5;
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT32:
                        break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT64:
                        break;
                    default:
                    break;
                }
                //bjeLog("attrType  " + key + "   attrValue  " + value);
                bledata.datas.push(data);
            }
        break;
    }
    return bledata;
}


function setDataServiceCallBack(dataService) {
    appDataService = dataService;
}

function getEMDBRequestFrame(offset){
        var frame = [];
        var crc;

        frame.push(11); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x09); // SEQUENCE
        frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
        frame.push(0xC6)
        frame.push(0x00)
        frame.push(0x1B)
        frame.push(0x00)
        frame.push(0x00)
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        return frame;
    
}

function getResetCommandFrame(cmd){
        var frame = [];
        var crc;
        frame.push(0x06); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x00); // SEQUENCE
        frame.push(cmd); // command
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        return frame;
}

function getAddrLenRequestFrame(){
    var frame = [];
        var crc;

        frame.push(11); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x08); // SEQUENCE
        frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
        frame.push(0x03)
        frame.push(0x00)
        frame.push(0x01)
        frame.push(0x00)
        frame.push(0x00)
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        return frame;
}

function getAddrRequestFrame(){
    var frame = [];
        var crc;

        frame.push(11); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x08); // SEQUENCE
        frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
        frame.push(0x02)
        frame.push(0x00)
        frame.push(0x06)
        frame.push(0x00)
        frame.push(0x00)
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        return frame;
}
function getRequestFrame(command, data,len,installer,isuserpwd) {
    var frame = [];
    var crc;
    if(isuserpwd == true){
            var counter = 0;
        
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x0C); // SEQUENCE
        frame.push(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST); // command
        frame.push(0xE2); // ADDR LOW
        frame.push(0x10); // ADDR HIGH
        frame.push(0x08);
        // frame.push(0x01);
        // frame.push(0x00);
        // frame.push(0x00);
        frame.push(len);
        frame.push(0xE1); // ADDR LOW
        frame.push(0x10); // ADDR HIGH
        frame.push(0x88);
        frame.push(len);
        frame.push(0x00);
        frame.push(0x00);
        for(var i= 0; i < len;i++){
            frame.push(data[i]);
        }
        frame.unshift(16 + len); // LENGTH            
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        return frame;
    }

    switch (command) {
    case SCCP_COMMAND.SET_ACCESS_LEVEL:
        frame.push(0x07); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x0A); // SEQUENCE
        frame.push(SCCP_COMMAND.SET_ACCESS_LEVEL); // command
        frame.push(data);
        crc=crcCCITT(frame);
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
    break;
    case SCCP_COMMAND.AUTH_GEN_RANDOM_REQUEST:
        frame.push(0x06);
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x0F); // SEQUENCE
        frame.push(SCCP_COMMAND.AUTH_GEN_RANDOM_REQUEST);
        authGenSent = true;
        crc=crcCCITT(frame);
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
    break;
    case SCCP_COMMAND.AUTH_SET_PWD_REQUEST:
        frame.push(0x07+len) // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x0B); // SEQUENCE
        frame.push(SCCP_COMMAND.AUTH_SET_PWD_REQUEST); // command
        frame.push(len);
        for (var d in data) {
            var val = data[d];
            frame.push(val & 0x00FF); // ADDR LOW
        }
        crc=crcCCITT(frame);
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00FF); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
    break;
    case SCCP_COMMAND.AUTH_REQUST:
        frame.push(0x08+len) // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        if(installer)
            frame.push(0x0D); // SEQUENCE
        else
            frame.push(0x0E)
        frame.push(SCCP_COMMAND.AUTH_REQUST); // command
        if(installer)
            frame.push(0x02); // SEQUENCE
        else
            frame.push(0x01)
        frame.push(len);
        for (var d in data) {
            var val = data[d];
            frame.push(val & 0x00FF); // ADDR LOW
        }
        crc=crcCCITT(frame);
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00FF); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
    break;
    case SCCP_COMMAND.RESET:
        frame.push(0x06); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x00); // SEQUENCE
        frame.push(SCCP_COMMAND.RESET); // command
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        break;
    case SCCP_COMMAND.RESET_FN:
        frame.push(0x06); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x00); // SEQUENCE
        frame.push(SCCP_COMMAND.RESET_FN); // command
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        break;
    case SCCP_COMMAND.READ_ATTRIBUTE_REQUEST:
        
        frame.push(6 + (data.length * 5)); // LENGTH AFTER THIS BYTE
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x00); // SEQUENCE
        frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
        
        for (var d in data) {
            var val = data[d];
            frame.push(val & 0x00FF); // ADDR LOW
            frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
            frame.push(0x01);   // length of bytes
            frame.push(0x00);   // offset lower  byte
            frame.push(0x00);   // offset upper  byte
        }
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        break;
    case SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST:
        
        var counter = 0;
        
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x00); // SEQUENCE
        frame.push(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST); // command
        for (var i=0; i < data.length; i+=1) {
            var val = data[i];
            frame.push(val & 0x00ff); // ADDR LOW
            frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
            i = i + 1; 
            val = data[i];
            frame.push(val); // DATA TYPE
            if(val == 0x05){
                frame.push(data[i+1]) 
                frame.push(data[i+2]) 
                frame.push(data[i+3]) 
                frame.push(data[i+4]) 
                counter += 7;
                i = i + 4;
            }else if(val == 0x02){
                arraylength = data[i+1].length;
                arraydata = data[i+1];
                for(var sl =0; sl<arraylength; sl++){
                    frame.push(arraydata[sl])
                }
                counter+=arraylength+3;
                i = i + 1;
            }
            else if(val == 0x01 || val == 0x03 ||
                    val == 0x08 || val == 0x0C){
                i = i + 1; 
                val = data[i];
                frame.push((val & 0x00FF)); // VAL LOW
                counter += 4;
            }else if(val == 0x88){
                frame.push(data[i+1]) 
                frame.push(data[i+2]) 
                frame.push(data[i+3]) 
                for(var ref =0; ref<data[i+1]; ref++){
                    frame.push(data[i+4+ref])  
                }
                counter += 6 + data[i+1];
                i = i + 3 + data[i+1];
            }else if(val == 0x89){
                frame.push(data[i+1]) 
                frame.push(data[i+2]) 
                frame.push(data[i+3]) 
                for(var ref =0; ref<data[i+1]; ref = ref +2){
                    frame.push(data[i+4+ref]) 
                    frame.push(data[i+5+ref])  
                }
                counter += 6 + (data[i+1] *2);
                i = i + 3 + (data[i+1] *2);
            }
            else {
                i = i + 1; 
                val = data[i];
                frame.push((val & 0x00ff)); // VAL LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // VAL HIGH
                counter += 5;
            }
        }
        frame.unshift(6 + counter); // LENGTH            
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        break;
    case SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST :
        
        var counter = 0;
        
        frame.push(0x08); // CONTROL DEVICE
        frame.push(0x10); // SEQUENCE
        frame.push(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST); // command
        
        for (var i=0; i < data.length; i+=1) {
            var val = data[i];
            frame.push(val & 0x00ff); // ADDR LOW
            frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
            frame.push(0x01); // MIN REPORTING INTERVAL HIGH
            frame.push((0x00)); // MIN REPORTING INTERVAL LOW
            frame.push(0x0A); // MAX REPORTING INTERVAL HIGH
            frame.push((0x00)); // MAX REPORTING INTERVAL LOW
            counter += 6;
        }
        
        frame.unshift(6 + counter); // LENGTH
        
        crc = crcCCITT(frame)
        frame.push(crc >> 8); // CRC LOWER
        frame.push(crc & 0x00ff); // CRC UPPER
        
        frame.unshift(0x7e) // START BYTE
        frame.push(0x7e) // END BYTE
        break;
    default:
        print("Unknown Command")
    }
    
    return frame;
}



var crc_table = [
                 0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5,
                 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b,
                 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210,
                 0x3273, 0x2252, 0x52b5, 0x4294, 0x72f7, 0x62d6,
                 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c,
                 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401,
                 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b,
                 0x8528, 0x9509, 0xe5ee, 0xf5cf, 0xc5ac, 0xd58d,
                 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6,
                 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738,
                 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5,
                 0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823,
                 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969,
                 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96,
                 0x1a71, 0x0a50, 0x3a33, 0x2a12, 0xdbfd, 0xcbdc,
                 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a,
                 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03,
                 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd,
                 0xad2a, 0xbd0b, 0x8d68, 0x9d49, 0x7e97, 0x6eb6,
                 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70,
                 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a,
                 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb,
                 0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1,
                 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067,
                 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c,
                 0xe37f, 0xf35e, 0x02b1, 0x1290, 0x22f3, 0x32d2,
                 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb,
                 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d,
                 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447,
                 0x5424, 0x4405, 0xa7db, 0xb7fa, 0x8799, 0x97b8,
                 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2,
                 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634,
                 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9,
                 0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827,
                 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c,
                 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a,
                 0x4a75, 0x5a54, 0x6a37, 0x7a16, 0x0af1, 0x1ad0,
                 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d,
                 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07,
                 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1,
                 0xef1f, 0xff3e, 0xcf5d, 0xdf7c, 0xaf9b, 0xbfba,
                 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74,
                 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0
                 
                 ];

var seed = 0xFFFF
function crcCCITT (input) {
    var result = seed;
    var temp;
    
    for (var i = 0, len = input.length; i < len; ++i) {
        temp = (input[i] ^ (result >> 8)) & 0xFF;
        result = (crc_table[temp] ^  (result << 8)) & 0xFFFF;
    }
    return result;
}



