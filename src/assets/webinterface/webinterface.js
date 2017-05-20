
var welcomecomponent;
var appDataService;
var scannedDevices;
var BJE;
var debugLogs = true;

function setDevicesCallBack(component) {
    welcomecomponent = component;
}
function BJ_updateScanList() {
    var devData = BJE.getDeviceData();
    welcomecomponent.onDevices(devData);
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

function disConnectDevice(deviceAddress) {
    if(BJE != undefined)
        BJE.disConnectDevice(deviceAddress)
}

function onDeviceConnected(deviceAddress){
    appDataService.onDeviceConnected(deviceAddress);
}

function onDeviceDisconnected(deviceAddress){
    appDataService.onDeviceDisconnected(deviceAddress);
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
    appDataService.setScannedData(scanned);
}

function reset() {
    var data = getRequestFrame(SCCP_COMMAND.RESET);
    if(BJE != undefined)
        BJE.writeAttr(data);
    else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function readAttr(readData) {
    var data = []
     data = getRequestFrame(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, readData);
    if(BJE != undefined) {
        BJE.readAttr(data);
        if(debugLogs == true)
            console.log('sending BLE READ Frame   ' + data.join(','))
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
        if(debugLogs == true)
            console.log('sending BLE WRITE Frame  ' + data.join(','))
    }
     else {
        var message = {"send":data}
        var sendMessage =  JSON.stringify(message)
        window.webkit.messageHandlers.webapi.postMessage(sendMessage);
    }
}

function configureAttr(notifyData) {
    var data = getRequestFrame(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, notifyData);
    if(BJE != undefined) {
        BJE.configureAttr(data);
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
    var data  = prepareAttributeArray(databytes);
    appDataService.setBLEDataToService(data,databytes[4]);
}


function prepareAttributeArray(indata) {
    var bledata = {};
    var datas = [];
    bledata.datas = datas;

    
    switch(indata[4]){
        case 128: // standard response
        if(debugLogs ==  true)
            console.log("standard response     " + indata);
        break;
        case 131: // read attr resonse
        if(debugLogs ==  true)
            console.log("read attr response     " + indata);
        var dataLength = indata.length - 6;
        var lastParseByteIndex = 4;
        while(lastParseByteIndex <= dataLength  ) {
            // if(debugLogs ==  true)
            //     console.log("lastParseByteIndex  " + lastParseByteIndex + "   dataLength  " + dataLength);
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
                    var data = {
                    "attrType": key,
                    "attrValue": result
                    }
                    value = result;
                    lastParseByteIndex = lastParseByteIndex + 5 + strByteArray.length;
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
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = indata[lastParseByteIndex+5];
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_TIME:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = ((indata[lastParseByteIndex+7] * 3600) + (indata[lastParseByteIndex +6] * 60) + indata[lastParseByteIndex +5]);
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 8;
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
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = indata[lastParseByteIndex+5];
                    var data = {
                    "attrType": key,
                    "attrValue": value
                    }
                    lastParseByteIndex = lastParseByteIndex + 5;
                    break;
                case SCCP_DATATYPES.SCCP_TYPE_INT16:
                    key = (indata[lastParseByteIndex + 1] | (indata[lastParseByteIndex +2] << 8 & 0xFF00));
                    value = (indata[lastParseByteIndex+5] | (indata[lastParseByteIndex +6] << 8 & 0xFF00));
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
                default:
                break;
            }
            if(debugLogs == true)
             console.log("attrType  " + key + "   attrValue  " + value);
            bledata.datas.push(data);
        }
        break;
        case 132: // write attr response
        if(debugLogs ==  true)
            console.log("write attr response     " + indata);
        break;
        case 133: // configure attr response
        if(debugLogs ==  true)
            console.log("configure attr response     " + indata);
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
            if(debugLogs == true)
             console.log("attrType  " + key + "   attrValue  " + value);
            bledata.datas.push(data);
        }
        break;
    }
    return bledata;
}
function setDataServiceCallBack(dataService) {
    appDataService = dataService;
}
//  Created by Sriharsha Vardhan on 23/02/17.
//  Copyright © 2017 ABB. All rights reserved.

    function getRequestFrame(command, data) {
        var frame = [];
        var crc;
        
        switch (command) {
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
            
            frame.push(6 + (data.length * 2)); // LENGTH AFTER THIS BYTE
            frame.push(0x08); // CONTROL DEVICE
            frame.push(0x00); // SEQUENCE
            frame.push(SCCP_COMMAND.READ_ATTRIBUTE_REQUEST); // command
            
            for (var d in data) {
                var val = data[d];
                frame.push(val & 0x00ff); // ADDR LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
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
            console.log("data length is " + data.length)
            for (var i=0; i < data.length; i+=1) {
                var val = data[i];
                frame.push(val & 0x00ff); // ADDR LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
                i = i + 1; 
                val = data[i];
                frame.push(val); // DATA TYPE
                if(val == 5){
                    frame.push(data[i+1]) 
                    frame.push(data[i+2]) 
                    frame.push(data[i+3]) 
                    frame.push(data[i+4]) 
                    counter += 7;
                    i = i + 4;
                }else {
                    i = i + 1; 
                    val = data[i];
                    if(val > 0xFF){
                        frame.push((val & 0x00ff)); // VAL LOW
                        frame.push(val > 0xFF ? (val >> 8) : 0x00); // VAL HIGH
                        counter += 5;
                    }else {
                        frame.push((val & 0x00ff)); // VAL LOW
                        counter += 4;
                    }
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
            frame.push(0x00); // SEQUENCE
            frame.push(SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST); // command
            
            for (var i=0; i < data.length; i+=1) {
                var val = data[i];
                frame.push(val & 0x00ff); // ADDR LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
                i = i + 1; val = data[i];
                frame.push((val & 0x00ff)); // MIN REPORTING INTERVAL LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // MIN REPORTING INTERVAL HIGH
                i = i + 1; val = data[i];
                frame.push((val & 0x00ff)); // MAX REPORTING INTERVAL LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // MAX REPORTING INTERVAL HIGH
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



