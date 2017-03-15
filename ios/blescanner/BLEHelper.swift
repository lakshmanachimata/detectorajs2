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
    
    let deviceInformationService = "180A"
    let manufacturerName = "2A29"
    let modelNumber = "2A24"
    let firmwareRevision = "2A26"
    let softwareRevision = "2A28"
    //let systemID = "2A23"
    //let pnpID = "2A50"
    
    var rxBufferLength = 0;
    
    var webView:WKWebView? = nil
    
    init(webView: WKWebView) {
        self.webView = webView;
    }
    
    deinit {
        // perform the deinitialization
        disConnect()
    }
    
    /// interface functions
    func setup() {
        manager = CBCentralManager(delegate: self, queue: nil)
    }
    
    func scan() {
        manager?.scanForPeripherals(withServices: nil, options: nil);
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            print("stop scanning")
            self.manager?.stopScan()
        }
    }

    func connect()  {
        peripheral = peripherals[0];
        peripheralInfo = [:]
        peripheralInfo["name"] = peripheral.name;
        print("connecting")
        manager?.connect(peripheral, options: nil)
    }

    func disConnect()  {
        peripheral = peripherals[0];
        print("disconnecting")
        manager?.cancelPeripheralConnection(peripheral)
    }

    func getServices()  {
        let services:[CBUUID] = [CBUUID.init(string: deviceInformationService), CBUUID.init(string: SCCP_SERVICE.DSPS_SERVICE.rawValue)]
        peripheral.discoverServices(services)
    }
    
    func writeWithoutResponse()  {
         //let frame = SCCPHelper.getRequestFrame(command: SCCP_COMMAND.READ_ATTRIBUTE_REQUEST, data: [0x61, 0x62, 0x63])
         let frame = SCCPHelper.getRequestFrame(command: SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST, data: [0x31, 0x03, 0x0A])
         peripheral.writeValue(frame, for: writeWithoutResponseCharacteristic!,
                               type: CBCharacteristicWriteType.withoutResponse);
    }
    
    func getScannedDevices() {
        
        DispatchQueue.global(qos: .background).async {
            var data = Dictionary<String, String>()
            data["name"] = self.peripherals[0].name!
            data["modelNumber"] = self.modelNumber
            data["firmwareRevision"] = self.firmwareRevision
            data["softwareRevision"] = self.softwareRevision
            let jData = Utilities.jsonStringify(data: data as AnyObject)
            let script: String = "updateScanList(\(jData))"
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
            scan();
        } else {
            print("Bluetooth not available.")
        }
    }
    
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        
        let services = advertisementData[CBAdvertisementDataServiceUUIDsKey] as? [CBUUID]
        
        if (services?.contains(CBUUID.init(string: SCCP_SERVICE.DSPS_SERVICE.rawValue))) != nil {
            if (peripherals.count == 0) {
                print("adding " + peripheral.identifier.uuidString);
                peripherals.append(peripheral);
                connect();
            }
            let index = peripherals.index(of: peripheral)
            if (index == nil) {
                print("adding " + peripheral.identifier.uuidString);
                peripherals.append(peripheral);
            }
        }
    }
    
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        
        print("connected " + peripheral.identifier.uuidString)
        self.peripheral.delegate = self
         getServices()
    }
    
    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        print("Filed to connect to" + peripheral.identifier.uuidString)
    }
    
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        print("Disconnected from " + peripheral.identifier.uuidString)
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        for service in peripheral.services! {
            let thisService = service as CBService
            //print(service.uuid.uuidString)
            peripheral.discoverCharacteristics(nil, for: thisService)
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverIncludedServicesFor service: CBService, error: Error?) {
        
    }
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        
        if (service.uuid.uuidString == deviceInformationService) {
            for characteristic in service.characteristics! {
                
                let deviceInformationAttributes = [manufacturerName, modelNumber,firmwareRevision,softwareRevision];
                
                if (deviceInformationAttributes.index(of: characteristic.uuid.uuidString) != nil) {
                    peripheral.readValue(for: characteristic);
                }
            }
        } else {
            for characteristic in service.characteristics! {
                if (characteristic.properties.contains(CBCharacteristicProperties.notify)) {
                    if (characteristic.uuid.uuidString == SCCP_SERVICE.SERVER_TX_DATA.rawValue) {
                        peripheral.setNotifyValue(true, for: characteristic);
                    }
                }
                if (characteristic.properties.contains(CBCharacteristicProperties.writeWithoutResponse)) {
                    if (characteristic.uuid.uuidString == SCCP_SERVICE.SERVER_RX_DATA.rawValue) {
                        writeWithoutResponseCharacteristic = characteristic
                    }
                }
            }
        }
    }
    
    func peripheral(_ peripheral: CBPeripheral, didUpdateNotificationStateFor characteristic: CBCharacteristic, error: Error?) {
        print("didUpdateNotificationState");
    }

    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        
        if (characteristic.uuid.uuidString.hasPrefix("2A")) {
            //print(String(data: characteristic.value!, encoding: String.Encoding.utf8)!)
            let val = String(data: characteristic.value!, encoding: String.Encoding.utf8);
            switch characteristic.uuid.uuidString {
            case self.manufacturerName:
                self.peripheralInfo["manufacturerName"] = val
            case self.modelNumber:
                self.peripheralInfo["modelNumber"] = val
            case self.firmwareRevision:
                self.peripheralInfo["firmwareRevision"] = val
            case self.softwareRevision:
                self.peripheralInfo["softwareRevision"] = val
            default:
                print("Unknown device information")
            }
            writeWithoutResponse();
        }

        let recvData = [UInt8](characteristic.value!);
        
        if (recvData[0] == 0x7e) {
            if (recvData.count == 2) {
                //Start of the packet
                self.rxBuffer = []
                self.rxBuffer.append(contentsOf: recvData)
                self.rxBufferLength = Int(recvData[1])
            } else {
                //End of packet
                self.rxBuffer.append(contentsOf: recvData)

                //Run in seperate queue
                DispatchQueue.global(qos: .background).async {
                    var data = ""
                    self.rxBuffer.forEach({ (d) in
                        data = data + String(format: "%02X ", d)
                    })
                        
                    // Background Thread
                    print(data)
                    
                    self.rxBufferLength = self.rxBufferLength - recvData.count
                    if (self.rxBufferLength == 0) {
                        print("Length Matched")
                    } else {
                        print("Length mis-matched")
                    }
                    
                    let message =  Data.init(bytes: self.rxBuffer[1...self.rxBuffer.count-2])
                    if (message.crcCCITT == 0) {
                        print("crc matched")
                    } else {
                        print("crc mismatch")
                    }
                    
                    //DispatchQueue.main.async {
                        // Run UI Updates
                    //}
                }

            }
        } else {
            //Bytes in between
            self.rxBuffer.append(contentsOf: recvData)
            self.rxBufferLength = self.rxBufferLength - recvData.count
        }

        
    }
    
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor descriptor: CBDescriptor, error: Error?) {
        print("didWriteValueFor");
    }
    
}
