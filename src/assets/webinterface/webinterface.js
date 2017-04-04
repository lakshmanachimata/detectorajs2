
var welcomecomponent;
var appDataService;
var scannedDevices;
var BJE;

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

function disConnectDevice(deviceAddress) {
    BJE.disConnectDevice(deviceAddress)
}

function onDeviceConnected(deviceAddress){
    appDataService.onDeviceConnected(deviceAddress);
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

function configureAttr(notifyData) {
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, notifyData);
    var args = '{ "command" : "sccp", "data" : { "bytes" : [' + data + '] } }';
    BJE.configureAttr(data);
    //window.webkit.messageHandlers.api.postMessage(args);    
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
    console.log("just check data here " +  JSON.stringify(databytes));
    var data  = prepareAttributeArray(databytes);
    appDataService.setBLEDataToService(data,databytes[4]);
}


function prepareAttributeArray(indata) {
    var bledata = {};
    var datas = [];
    bledata.datas = datas;

    
    switch(indata[4]){
        case 128: // standard response
        break;
        case 131: // read attr resonse
        var dataLength = indata.length - 6;
        var lastParseByteIndex = 4;
        while(lastParseByteIndex <= dataLength  ) {
            var key,value; 
            switch(indata[lastParseByteIndex + 4]){
                case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                    key = (indata[lastParseByteIndex + 1 ] | (indata[lastParseByteIndex + 2] << 8 & 0xFF00));
                    value = indata[lastParseByteIndex+ 5];
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_STRING:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = indata[lastParseByteIndex+5];
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = indata[lastParseByteIndex+5];
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                    
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = (indata[lastParseByteIndex+5] | (indata[lastParseByteIndex +6] << 8 & 0xFF00));
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
            bledata.datas.push(data);
        }
        break;
        case 132: // write attr response
        break;
        case 133: // configure attr response
         var dataLength = indata.length - 6;
        var lastParseByteIndex = 4;
        while(lastParseByteIndex <= dataLength  ) {
            var key,value; 
            switch(indata[lastParseByteIndex+3]){
                case SCCP_DATATYPES.SCCP_TYPE_BOOL:
                    key = indata[lastParseByteIndex];
                    value = indata[lastParseByteIndex+4]
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_STRING:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM8:
                    key = indata[lastParseByteIndex];
                    value = indata[lastParseByteIndex+4]
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_ENUM16:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT8:
                    key = indata[lastParseByteIndex];
                    value = indata[lastParseByteIndex+4]
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_UINT16:
                    
                    key = (indata[lastParseByteIndex] | (indata[lastParseByteIndex +1] << 8 & 0xFF00));
                    value = (indata[lastParseByteIndex+4] | (indata[lastParseByteIndex +5] << 8 & 0xFF00));
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
            bledata.datas.push(data);
        }
        break;
    }
    return bledata;
}
function setDataServiceCallBack(dataService) {
    appDataService = dataService;
}


