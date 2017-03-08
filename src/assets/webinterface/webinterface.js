
var welcomecomponent;
var CDEcallback;
var scannedDevices;

function setDevicesCallBack(component) {
    welcomecomponent = component;
}
function BJ_updateScanList() {
    var devData = BJE.getDeviceData();
    welcomecomponent.onDevices(devData);
}

function BJ_showToast(toast) {
    BJE.showToast(toast);
}
function BJ_startBLEScan(toast) {
    BJE.startBLEScan(toast);
}
function BJ_stopBLEScan(toast) {
    BJE.stopBLEScan(toast);
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

function BJ_getBrThreshold(){
    var brData = BJE.getBrThreshold();
    var brIntData = parseInt(brData, 10);
    CDEcallback.setBrThreshold(brIntData);
}

function setCDECallback(component) {
    CDEcallback = component;
}



function connect(uid) {
    console.log(uid)
    window.webkit.messageHandlers.api.postMessage('{ "command" : "connect", "data" : { "uid" : "' + uid + '" } }');
}
function devices() {
    $("#devices").empty();
    window.webkit.messageHandlers.api.postMessage('{ "command" : "devices" }');
}

function updateScanList(scanned) {
    scannedDevices = scanned
    console.log(scanned)
    $("#devices").empty();
    for (var device in scanned) {
        var node = "<p onclick=\"connect(\'" + scanned[device].uuidString + "\')\">" + scanned[device].name + "</p>"
        $("#devices").append(node)
    }
}

function reset() {
    var data = getRequestFrame(SCCP_COMMAND.RESET);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    window.webkit.messageHandlers.api.postMessage(args);
}

function readAttr() {
    var data = getRequestFrame(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, [0x31]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    window.webkit.messageHandlers.api.postMessage(args);
}

function writeAttr() {
    var data = getRequestFrame(SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST, [0x31, 0x9, 0x200]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    window.webkit.messageHandlers.api.postMessage(args);
}

function configureReporting() {
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, [0x31, 0x3, 0x0A]);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    window.webkit.messageHandlers.api.postMessage(args);    
}
