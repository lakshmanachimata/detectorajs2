
var welcomecomponent;
var appDataService;
var scannedDevices;
//var BJE;

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

function setBLEDataToService(indata){
    // decode frame data
    var databytes = [];
   var bytedata = indata.data;
    for (var i = 0; i < bytedata.length; ++i)
    {
        charCode = bytedata.charCodeAt(i);
        databytes.push(charCode);
    }
    var data  = prepareAttributeArray(databytes);
    appDataService.setBLEDataToService(data);
}

function prepareAttributeArray(data) {
    var parsedData;
    switch(data[3]){
        case 128: // standard response
        break;
        case 131: // read attr resonse
        var dataLength = data.length - 6;
        var dataParased = 0;
        var bytesParsed = 0;
        var lastParseByteIndex = 3;
        while(dataParased <= dataLength  ) {
            switch(data[lastParseByteIndex+2]){
                case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_STRING:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT32:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT64:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT8:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT16:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT32:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT64:
                break;
                default:
                break;
            }
            dataParased = + bytesParsed;
        }
        break;
        case 132: // write attr response
        break;
        case 133: // configure attr response
        var dataLength = data.length - 6;
        var dataParased = 0;
        var bytesParsed = 0;
        var lastParseByteIndex = 3;
        while(dataParased <= dataLength  ) {
            switch(data[lastParseByteIndex+2]){
                case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_STRING:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT32:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_UINT64:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT8:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT16:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT32:
                break;
                    case SCCP_DATATYPES.SCCP_TYPE_INT64:
                break;
                default:
                break;
            }
            dataParased = + bytesParsed;
        }
        break;
    }
    return parsedData;
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
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, notifyData);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    BJE.configureAttr(data);
    //window.webkit.messageHandlers.api.postMessage(args);    
}
