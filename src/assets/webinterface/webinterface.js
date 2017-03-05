
var welcomecomponent;

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

