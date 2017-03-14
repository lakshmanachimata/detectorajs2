
var welcomecomponent;
var appDataService;
var scannedDevices;

if(BJE == undefined) {
    //BJE = window.webkit.messageHandlers.webapi;
}


function setDevicesCallBack(component) {
    welcomecomponent = component;
}
function BJ_updateScanList() {
    var devData = BJE.getDeviceData();
    welcomecomponent.onDevices(devData);
}

function connectDevice(deviceAddress){
    BJE.connectDevice(deviceAddress)
}

function setBLEDataToService(data){
    appDataService.setBLEDataToService(data);
}

function setDataServiceCallBack(dataService) {
    appDataService = dataService;
}


function scan() {
}
function connect(uid) {
    console.log(uid)
    //window.webkit.messageHandlers.api.postMessage('{ "command" : "connect", "data" : { "uid" : "' + uid + '" } }');
}
function devices() {
    $("#devices").empty();
    //window.webkit.messageHandlers.api.postMessage('{ "command" : "devices" }');
}

function updateScanList(scanned) {
    scannedDevices = scanned
    var deviceData =  JSON.stringify(scannedDevices);
    appDataService.setScannedData(scanned);
}

function reset() {
    var data = getRequestFrame(SCCP_COMMAND.RESET);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    BJE.writeAttr(data);

   // window.webkit.messageHandlers.api.postMessage(args);
}

function readAttr(readData) {
    var data = getRequestFrame(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, readData);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    //window.webkit.messageHandlers.api.postMessage(args);
    BJE.readAttr(data);
}

function writeAttr(writeData) {
    var data = getRequestFrame(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST, writeData);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    BJE.writeAttr(data);
    //window.webkit.messageHandlers.api.postMessage(args);
}

function configureReporting(notifyData) {
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, [0x31, 0x3, 0x0A]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    BJE.configureAttr(data);
    //window.webkit.messageHandlers.api.postMessage(args);    
}
