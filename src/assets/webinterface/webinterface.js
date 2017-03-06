
var welcomecomponent;
var CDEcallback;
function scan() {
    //window.webkit.messageHandlers.api.postMessage("scan");
    console.log('scan start');
}
function connect() {
    //window.webkit.messageHandlers.api.postMessage("connect");
}
function services() {
    //window.webkit.messageHandlers.api.postMessage("services");
}
function devices(component) {
    welcomecomponent = component;
    //window.webkit.messageHandlers.api.postMessage("devices");
}
function updateScanList(devData) {
    //welcomecomponent.onDevices(scanned);
    console.log("whats  this " + devData);
}



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

