
var welcomecomponent;
$( document ).ready(function() {
                    console.log( "ready!" );
                    });
function scan() {
    window.webkit.messageHandlers.api.postMessage("scan");
    console.log('scan start');
}
function connect() {
    window.webkit.messageHandlers.api.postMessage("connect");
}
function services() {
    window.webkit.messageHandlers.api.postMessage("services");
}
function devices(component) {
    welcomecomponent = component;
    window.webkit.messageHandlers.api.postMessage("devices");
}
function updateScanList(scanned) {
    welcomecomponent.onDevices(scanned);
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

