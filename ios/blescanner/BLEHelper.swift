//
//  BLEHelper.swift
//  blescanner
//
//  Created by Sriharsha Vardhan on 24/02/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import Foundation
import CoreBluetooth
import WebKit
/// BLE Helper class
class BLEHelper : NSObject, CBCentralManagerDelegate, CBPeripheralDelegate {
    
    
    var manager :CBCentralManager? = nil
    var peripheral:CBPeripheral!
    var peripherals:[CBPeripheral] = []
    
    var peripheralInfo:Dictionary<String,String> = [:]
    
    var rxBuffer:[UInt8] = [];
    var writeWithoutResponseCharacteristic: CBCharacteristic? = nil
    
    var blePacketStart:Bool = false;
    //let systemID = "2A23"
    //let pnpID = "2A50"
    
    var scannedDevices: NSArray = []
    
    var rxBufferLength = 0;
    
    var webView:WKWebView? = nil
    
    var mainView:ViewController? = nil
    
    init(webView: WKWebView, topView: ViewController) {
        self.webView = webView;
        self.mainView = topView;
    }
    
    deinit {
        // perform the deinitialization
        //disConnect()
    }
    
    /// interface functions
    func setup() {
        manager = CBCentralManager(delegate: self, queue: nil)
    }
    
    func startscan() {
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.manager?.scanForPeripherals(withServices: nil, options: nil);
        }
    }
    
    func connect(device: String)  {
        peripherals.forEach { (iperipheral) in
            if(iperipheral.identifier.uuidString == device){
                peripheral = iperipheral;
            }
        }
        manager?.connect(peripheral, options: nil)
    }
    
    func disConnect(device: String)  {
        peripherals.forEach { (iperipheral) in
            if(iperipheral.identifier.uuidString == device){
                peripheral = iperipheral;
            }
        }
        manager?.cancelPeripheralConnection(peripheral)
    }
    
    func getServices(device: String)  {
        let services:[CBUUID] = [CBUUID.init(string: SCCP_SERVICE.DSPS_SERVICE.rawValue)]
        peripheral.discoverServices(services)
    }
    
    func writeWithoutResponse(frame:  Data)  {
        
        peripheral.writeValue(frame, for: writeWithoutResponseCharacteristic!,
                              type: CBCharacteristicWriteType.withoutResponse);
    }
    
    func getScannedDevices() {
        
        DispatchQueue.global(qos: .background).async {
            
            
            let jsData = Utilities.jsonStringify(data: self.scannedDevices as AnyObject)
            
            let script: String = "updateScanList(\(jsData))"
            DispatchQueue.main.async {
                //Run UI Updates
                self.webView?.evaluateJavaScript(script);
            }
        }
        
    }
    
    
    ///  Delegate functions
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == CBManagerState.poweredOn {
            print("Bluetooth available.")
            startscan();
        } else {
            print("Bluetooth not available.")
        }
    }
    
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        
        let services = advertisementData[CBAdvertisementDataServiceUUIDsKey] as? [CBUUID]
        
        
        if(services != nil) {
            
            let cbuuid = CBUUID.init(string: SCCP_SERVICE.DSPS_SERVICE.rawValue);
            let isServiceExists = services!.contains(cbuuid)
            let manufactorData = advertisementData[CBAdvertisementDataManufacturerDataKey] as? NSData
            
            if ( isServiceExists == true && manufactorData != nil) {
                
                var firmwareVersion = [UInt8](repeating:0, count:3)
                var modelNumber = [UInt8](repeating:0, count:3)
                
                manufactorData?.getBytes(&firmwareVersion, range: NSRange(location: 4, length: 3))
                var firmwareStr="";
                var modelNumberStr="";
                for value in firmwareVersion {
                    firmwareStr.append(String(format:"%02X", value));
                    firmwareStr.append(".");
                }
                manufactorData?.getBytes(&modelNumber, range: NSRange(location: 8, length: 3))
                
                modelNumberStr.append(String(format:"%02X", modelNumber[0]));
                modelNumberStr.append(String(format:"%02X", modelNumber[2]));
                modelNumberStr.append("/");
                modelNumberStr.append(String(format:"%02X", modelNumber[1]));
                
                
                
                if (peripherals.count == 0) {
                    print("adding " + peripheral.identifier.uuidString);
                    let nameofDevice =  advertisementData[CBAdvertisementDataLocalNameKey] as? String
                    var detectorInfo:Dictionary<String,String> = [:]
                    detectorInfo["btDeviceName"] = nameofDevice!;
                    detectorInfo["btAddress"] = peripheral.identifier.uuidString;
                    detectorInfo["rssi"] = RSSI.stringValue;
                    detectorInfo["firmwareVersion"] = firmwareStr;
                    detectorInfo["modelNumber"] = modelNumberStr;
                    detectorInfo["hashCode"] = String(peripheral.hash);
                    if(modelNumberStr.contains("05")){
                        detectorInfo["deviceType"] = "daliMaster1c";
                    }
                    if(modelNumberStr.contains("03")){
                        detectorInfo["deviceType"] = "mosfet1c";
                    }
                    if(modelNumberStr.contains("01")){
                        detectorInfo["deviceType"] = "relay1c";
                    }
                    scannedDevices = scannedDevices.adding(detectorInfo) as NSArray;
                    peripherals.append(peripheral);
                    
                }
                let index = peripherals.index(of: peripheral)
                if (index == nil) {
                    print("adding " + peripheral.identifier.uuidString);
                    let nameofDevice =  advertisementData[CBAdvertisementDataLocalNameKey] as? String
                    var detectorInfo:Dictionary<String,String> = [:]
                    detectorInfo["btDeviceName"] = nameofDevice!;
                    detectorInfo["btAddress"] = peripheral.identifier.uuidString;
                    detectorInfo["firmwareVersion"] = firmwareStr;
                    detectorInfo["rssi"] = RSSI.stringValue;
                    detectorInfo["modelNumber"] = modelNumberStr;
                    if(modelNumberStr.contains("05")){
                        detectorInfo["deviceType"] = "daliMaster1c";
                    }
                    if(modelNumberStr.contains("03")){
                        detectorInfo["deviceType"] = "mosfet1c";
                    }
                    if(modelNumberStr.contains("01")){
                        detectorInfo["deviceType"] = "relay1c";
                    }
                    detectorInfo["hashCode"] = String(peripheral.hash);
                    scannedDevices = scannedDevices.adding(detectorInfo) as NSArray;
                    peripherals.append(peripheral);
                    
                }
                self.getScannedDevices();
            }
        }
    }
    
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        self.peripheral.delegate = self
        getServices(device: peripheral.identifier.uuidString)
    }
    
    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        print("Filed to connect to" + peripheral.identifier.uuidString)
    }
    
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
         DispatchQueue.global(qos: .background).async {
            let script: String = "onDeviceDisconnected(\(peripheral.identifier.uuidString))"
            DispatchQueue.main.async {
                //Run UI Updates
                self.webView?.evaluateJavaScript(script);
            }
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        for service in peripheral.services! {
            let thisService = service as CBService
            peripheral.discoverCharacteristics(nil, for: thisService)
        }

    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverIncludedServicesFor service: CBService, error: Error?) {
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        
            for characteristic in service.characteristics! {
                if (characteristic.properties.contains(CBCharacteristicProperties.notify)) {
                    if (characteristic.uuid.uuidString == SCCP_SERVICE.SERVER_TX_DATA.rawValue) {
                        peripheral.setNotifyValue(true, for: characteristic);
                    }
                }
                if (characteristic.properties.contains(CBCharacteristicProperties.writeWithoutResponse)) {
                    if (characteristic.uuid.uuidString == SCCP_SERVICE.SERVER_RX_DATA.rawValue) {
                        writeWithoutResponseCharacteristic = characteristic
                                DispatchQueue.global(qos: .background).async {
                        
                                    var deviceAddr:Dictionary<String,String> = [:]
                                    deviceAddr["deviceaddress"] = peripheral.identifier.uuidString;
                                    let jsData = Utilities.jsonStringify(data: deviceAddr as AnyObject)
                                    let script: String = "onDeviceConnected(\(jsData))"
                                    print("Device  connected",peripheral.identifier.uuidString)
                                    DispatchQueue.main.async {
                                        //Run UI Updates
                                        self.webView?.evaluateJavaScript(script);
                                    }
                                }
                    }
                }
            }

    }
    
    func peripheral(_ peripheral: CBPeripheral, didUpdateNotificationStateFor characteristic: CBCharacteristic, error: Error?) {
        print("didUpdateNotificationState");
    }
    
    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        
        
        let recvData = [UInt8](characteristic.value!);
    
        if (recvData[0] == 0x7e) {
            blePacketStart = true;
            if(recvData[recvData.count-1] == 0x7e)
            {
                //End of packet
                
                var newBleData: [UInt8] = []
                var isEscapeExists:Bool =  false;
                newBleData.append(contentsOf: recvData)
                
                for (index, _) in (recvData.enumerated()){
                    if((recvData[index] == 125 && recvData[index+1]  == 125) || (recvData[index] == 125 && recvData[index+1]  == 126) )
                    {
                        if(index != 0 && index < ((recvData.count)-2)) {
                            isEscapeExists = true;
                            newBleData.remove(at:index)
                        }
                    }
                }
                
                DispatchQueue.global(qos: .background).async
                {
                    if(isEscapeExists == true){
                    
                        if (newBleData[1] == (UInt8)(newBleData.count - 2)) {
                        } else {
                            print("Length mis-matched")
                        }
                    
                        let message =  Data.init(bytes: newBleData[1...newBleData.count-2])
                        if (message.crcCCITT == 0) {
                            self.mainView?.sendBleDataToApp(indata:newBleData)
                        } else {
                            print("crc mismatch")
                        }
                    }
                    else {
                        if (recvData[1] == (UInt8)(recvData.count - 2)) {
                        } else {
                            print("Length mis-matched")
                        }
                        
                        let message =  Data.init(bytes: recvData[1...recvData.count-2])
                        if (message.crcCCITT == 0) {
                            self.mainView?.sendBleDataToApp(indata:recvData)
                        } else {
                            print("crc mismatch")
                        }

                    }
                }
            }
        }
        
    }
    
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor descriptor: CBDescriptor, error: Error?) {
        print("didWriteValueFor");
    }
    
}
