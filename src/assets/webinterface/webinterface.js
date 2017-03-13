
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
function BJ_updateBrightnessThreshold(value) {
    BJE.writeBrightnessThreshold(value);
}
function BJ_updateBrightnessThresholdMin(value) {
    BJE.writeBrightnessThresholdMin(value);
}
function BJ_updateBrightnessThresholdMax(value) {
    BJE.writeBrightnessThresholdMax(value);
}
function BJ_updateBrightnessThresholdSubscribe(value){
    BJE.writeBrightnessThresholdSubscribe(value);
}

function setBLEDataToService(data){
    var typeAttr = data.AttrType;
    var dataAttr = data.AttrValue;
    appDataService.setBLEDataToService(typeAttr,dataAttr);
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
   // window.webkit.messageHandlers.api.postMessage(args);
}

function readAttr() {
    var data = getRequestFrame(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, [0x31]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    //window.webkit.messageHandlers.api.postMessage(args);
}

function writeAttr() {
    var data = getRequestFrame(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST, [0x31, 0x9, 0x200]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    //window.webkit.messageHandlers.api.postMessage(args);
}

function configureReporting() {
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, [0x31, 0x3, 0x0A]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    //window.webkit.messageHandlers.api.postMessage(args);    
}
