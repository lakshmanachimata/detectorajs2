$( document ).ready(function() {
                    console.log( "ready!" );
                    });
function scan() {
    window.webkit.messageHandlers.api.postMessage("scan");
}
function connect() {
    window.webkit.messageHandlers.api.postMessage("connect");
}
function services() {
    window.webkit.messageHandlers.api.postMessage("services");
}
function devices() {
    window.webkit.messageHandlers.api.postMessage("devices");
}
function updateScanList(scanned) {
    console.log(scanned)
}
