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
    
    var memoryType : UInt32 = 0
    var memoryBank : Int = 0
    var blockSize : Int = 0
    
    var spiMOSI : UInt32 = 0
    var spiMISO : UInt32 = 0
    var spiCS : UInt32 = 0
    var spiSCK : UInt32 = 0
    
    var spiMISOAddress : String = ""
    var spiMOSIAddress : String = ""
    var spiCSAddress : String = ""
    var spiSCKAddress : String = ""
    var blockSizetext : String = ""
    
    var step : Int = 0
    var nextStep : Int = 0
    var expectedVal : Int = 0
    var chunkSize : Int = 0
    var blockStartByte : Int = 0
    
    var fileData : Data? = Data()
    
    
    var titles: [String] = ["P0_0", "P0_1", "P0_2", "P0_3", "P0_4", "P0_5", "P0_6", "P0_7", "P1_0", "P1_1", "P1_2", "P1_3", "P2_0", "P2_1", "P2_2", "P2_3", "P2_4", "P2_5", "P2_6", "P2_7", "P2_8", "P2_9", "P3_0", "P3_1", "P3_2", "P3_3", "P3_4", "P3_5", "P3_6", "P3_7"]

    
    var manager :CBCentralManager? = nil
    var selectedperipheral:CBPeripheral!
    var peripherals:[CBPeripheral] = []
    
    var peripheralInfo:Dictionary<String,String> = [:]
    
    var rxBuffer:[UInt8] = [];
    var writeWithoutResponseCharacteristic: CBCharacteristic? = nil
    
    var blePacketStart:Bool = false;
    //let systemID = "2A23"
    //let pnpID = "2A50"
    
    var scannedDevices: [Dictionary<String,String>]  = []
    
    var selectedDevice:Dictionary<String,String> = [:]
    
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
        getImageListsFromBundle();
        scannedDevices = [];
        manager = CBCentralManager(delegate: self, queue: nil)
    }
    
    func startscan() {
        scannedDevices = [];
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.manager?.scanForPeripherals(withServices: nil, options: nil);
        }
    }
    
    func stopscan(){
        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.manager?.stopScan();
        }
    }
    
    func connect(device: String)  {
        peripherals.forEach { (iperipheral) in
            if(iperipheral.identifier.uuidString == device){
                selectedperipheral = iperipheral;
            }
        }
        scannedDevices.forEach { (scannedDevice) in
            if(scannedDevice["btAddress"] == device){
                selectedDevice = scannedDevice;
            }
        }
        
        manager?.connect(selectedperipheral, options: nil)
    }
    
    func disConnect(device: String)  {
        peripherals.forEach { (iperipheral) in
            if(iperipheral.identifier.uuidString == device){
                selectedperipheral = iperipheral;
            }
        }
        selectedDevice = [:];
        manager?.cancelPeripheralConnection(selectedperipheral)
    }
    
    func getServices(device: String)  {
        let services:[CBUUID] = [CBUUID.init(string: SCCP_SERVICE.DSPS_SERVICE.rawValue),CBUUID.init(string: SCCP_SERVICE.INFO_SERVICE.rawValue)]
        selectedperipheral.discoverServices(services)
    }
    
    func writeWithoutResponse(frame:  Data)  {
        
        selectedperipheral.writeValue(frame, for: writeWithoutResponseCharacteristic!,
                              type: CBCharacteristicWriteType.withoutResponse);
    }
    
    func writeValue(indata: Data, charcharcterstic: CBCharacteristic ){
        selectedperipheral.writeValue(indata, for: charcharcterstic,
                              type: CBCharacteristicWriteType.withResponse);
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
            let suotaUUID = CBUUID.init(string: SPOTA_UUID.SPOTA_SERVICE_UUID.rawValue);
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
                    detectorInfo["OTAsupported"] = String(services!.contains(suotaUUID));
                    if(modelNumberStr.contains("05")){
                        detectorInfo["deviceType"] = "daliMaster1c";
                    }
                    if(modelNumberStr.contains("03")){
                        detectorInfo["deviceType"] = "mosfet1c";
                    }
                    if(modelNumberStr.contains("01")){
                        detectorInfo["deviceType"] = "relay1c";
                    }
                    scannedDevices.insert(detectorInfo,at:0);
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
                    detectorInfo["OTAsupported"] = String(services!.contains(suotaUUID));
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
                    scannedDevices.insert(detectorInfo,at:scannedDevices.count);
                    peripherals.append(peripheral);
                    
                }
            }
            self.getScannedDevices();
        }
    }
    
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        self.selectedperipheral.delegate = self
        self.stopscan()
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
    
    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        
            for characteristic in service.characteristics! {
                if(service.uuid.uuidString.contains("180A")){
                    peripheral.readValue(for: characteristic)
                }
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
        else {
            if let string = String(data: characteristic.value!, encoding: .utf8) {
                print("value of characteristic  " + string)
            } else {
                print("not a valid UTF-8 sequence")
            }
        }
        
    }
    
    func peripheral(_ peripheral: CBPeripheral, didWriteValueFor descriptor: CBDescriptor, error: Error?) {
        print("didWriteValueFor");
    }
    
    
    
    func gpioScanner(with gpio: String, to output: UnsafeMutablePointer<UInt32>) {
        let values: [String] = ["0x00", "0x01", "0x02", "0x03", "0x04", "0x05", "0x06", "0x07", "0x10", "0x11", "0x12", "0x13", "0x20", "0x21", "0x22", "0x23", "0x24", "0x25", "0x26", "0x27", "0x28", "0x29", "0x30", "0x31", "0x32", "0x33", "0x34", "0x35", "0x36", "0x37"]
        let titles: [String] = ["P0_0", "P0_1", "P0_2", "P0_3", "P0_4", "P0_5", "P0_6", "P0_7", "P1_0", "P1_1", "P1_2", "P1_3", "P2_0", "P2_1", "P2_2", "P2_3", "P2_4", "P2_5", "P2_6", "P2_7", "P2_8", "P2_9", "P3_0", "P3_1", "P3_2", "P3_3", "P3_4", "P3_5", "P3_6", "P3_7"]
        for n in 0..<values.count {
            if gpio == titles[n] {
                Scanner(string: values[n]).scanHexInt32(output)
                
                
            }
        }
    }
    
    
    func configureDeviceConnectivityParam () {
        
        memoryType = UInt32(MEMTYPE_SUOTA.MEM_TYPE_SUOTA_SPI.rawValue)
        
        gpioScanner(with: spiMISOAddress, to: withUnsafeMutablePointer(to: &spiMISO, { $0 }))
        gpioScanner(with: spiMOSIAddress, to: withUnsafeMutablePointer(to: &spiMOSI, { $0 }))
        gpioScanner(with: spiCSAddress, to: withUnsafeMutablePointer(to: &spiCS, { $0 }))
        gpioScanner(with: spiSCKAddress, to: withUnsafeMutablePointer(to: &spiSCK, { $0 }))
        
        let defaultVal : UserDefaults = UserDefaults.standard
        defaultVal.set(spiMISOAddress, forKey: "spiMISOAddress")
        defaultVal.set(spiMOSIAddress, forKey: "spiMOSIAddress")
        defaultVal.set(spiCSAddress, forKey: "spiCSAddress")
        defaultVal.set(spiSCKAddress, forKey: "spiSCKAddress")
        
        defaultVal.set(memoryBank, forKey: "memoryBank")
        
        Scanner(string: blockSizetext).scanInt(&blockSize)
        defaultVal.set(blockSize, forKey: "blockSize")
        
        
        configureStepsForValidatingUpdate()
    }
    
    //2nd method towards updating
    func configureStepsForValidatingUpdate () {
        
        //    serviceManager?.notification(serviceManager?.int(toCBUUID: UInt16(SPOTA_UUID.SPOTA_SERVICE_UUID)), characteristicUUID: CBUUID(string:SPOTA_UUID.SPOTA_SERV_STATUS_UUID), p: serviceManager?.device, on: true)
        //
        //    NotificationCenter.default.addObserver(self, selector: #selector(DeviceViewController.didUpdateValueForCharacteristic(_:)), name: NSNotification.Name(rawValue: GenericServiceManagerDidReceiveValue), object: nil)
        //    NotificationCenter.default.addObserver(self, selector: #selector(DeviceViewController.didSendValueForCharacteristic(_:)), name: NSNotification.Name(rawValue: GenericServiceManagerDidSendValue), object: nil)
    }
    
    func didUpdateValueForCharacteristic(_ notification : NSNotification) {
        print("retrieve devices \(String(describing: notification.object))")
        
        let characteristics : CBCharacteristic = notification.object as! CBCharacteristic
        
        if characteristics.uuid == CBUUID(string:SPOTA_UUID.SPOTA_SERV_STATUS_UUID.rawValue){
            
            var value : UInt8 = 0
            
            if let val = characteristics.value {
                val.copyBytes(to: withUnsafeMutablePointer(to: &value, { $0 }), count: val.count)
            }
            
            var message : String = ""
            
            if value > 0 {
                
                message = getErrorMessage(status: SPOTA_STATUS(rawValue: Int(value))!)
                if value != UInt8(SPOTA_STATUS.SPOTAR_CMP_OK.rawValue) {
                    print ("message: \(message)")
                    
                }
            }
            
            if expectedVal != 0 {
                
                if Int(value) == expectedVal {
                    
                    step = nextStep
                    expectedVal = 0
                    
                    doStep()
                }
                else {
                    
                    let alertController = UIAlertController(title: "Error", message: message, preferredStyle: UIAlertControllerStyle.alert)
//                    self.present(alertController, animated: true, completion: nil)
                }
                
            }
        }
        
        
    }
    
    
    func  getCBCharectestic(charactersticUUID: String) -> CBCharacteristic?{
        for service in selectedperipheral.services! {
            let thisService = service as CBService
            for characteristic in thisService.characteristics!{
                if(characteristic.uuid.uuidString == charactersticUUID){
                    return characteristic;
                }
            }
        }
        return nil;
    }

    func getImageListsFromBundle () {
        let resourcePath : String = Bundle.main.resourcePath!
        let docPath : String = resourcePath.appending("/resource")
        
        do {
            let directoryContents = try FileManager.default.contentsOfDirectory(atPath: docPath)
            print("dir paths \(directoryContents)")
        }catch let error{
            print("error \(error.localizedDescription)")
        }
    }
    
    
    
    
    func didSendValueForCharacteristic(_ notification : NSNotification) {
        
        if step != 7 {
            doStep();
        }
    }
    
    func doStep() {
        
        switch step {
        case 1:
            // Step 1: Set memory type
            step = 0
            expectedVal = 0x10
            nextStep = 2
            var _memDevData: Int = (Int(memoryType) << 24) | (memoryBank & 0xff)
            
            let memDevData = Data(bytes: withUnsafeMutablePointer(to: &_memDevData, { $0 }), count: MemoryLayout<Int>.size)//Data(bytes: _memDevData, length: MemoryLayout<Int>.size)
            
            self.writeValue( indata: memDevData,charcharcterstic: self.getCBCharectestic(charactersticUUID: SPOTA_UUID.SPOTA_MEM_DEV_UUID.rawValue)!)
            break;
        case 2:
            // Step 2: Set memory params
            var _memInfoData: Int = Int((spiMISO << 24) | (spiMOSI << 16) | (spiCS << 8) | spiSCK)
            let memInfoData = Data(bytes: withUnsafeMutablePointer(to: &_memInfoData, { $0 }), count: MemoryLayout<Int>.size)
            step = 3
            self.writeValue( indata: memInfoData,charcharcterstic: self.getCBCharectestic(charactersticUUID: SPOTA_UUID.SPOTA_GPIO_MAP_UUID.rawValue)!)
            break
        case 3:
            
//            let storage : ParamaterStorage = ParamaterStorage.getInstance()
//            
//            do {
//                fileData = try Data(contentsOf: storage.file_url)
//                
//            }catch let error{
//                print(error.localizedDescription)
//            }
            
            appendChecksum()
            
            // Step 3: Set patch length
            chunkSize = 20
            blockStartByte = 0
            step = 4
            doStep()
            break
            
            
        case 4:
            
            let patchLengthData = Data(bytes: withUnsafeMutablePointer(to: &blockSize, { $0 }), count: MemoryLayout<UInt16>.size)
            step = 5
            
            self.writeValue( indata: patchLengthData,charcharcterstic: self.getCBCharectestic(charactersticUUID: SPOTA_UUID.SPOTA_PATCH_LEN_UUID.rawValue)!)
            break
            
        case 5:
            
            step = 0;
            expectedVal = 0x02;
            nextStep = 5;
            
            var dataLength : Int = (fileData?.count)!
            var chunkStartByte : Int = 0
            
            while chunkStartByte < blockSize {
                
                let bytesRemaining : Int = blockSize - chunkStartByte
                
                if bytesRemaining < chunkSize {
                    
                    chunkSize = bytesRemaining
                    
                }
                
                //Later required to show progress view //let progress : Double = Double(blockStartByte + chunkStartByte + chunkSize) / Double(dataLength)
                //progress view you can add
                
                //step 4 send next n bytes of the patch
                //val.copyBytes(to: withUnsafeMutablePointer(to: &value, { $0 }), count: val.count)
                
                var bytes : [UInt8] = [UInt8](repeating: UInt8(), count: chunkSize)
                //fileData?.copyBytes(withUnsafeMutablePointer(to: &bytes, { $0 }), from: NSRange(location: blockStartByte + chunkStartByte, length: chunkSize))
                
                let dataRange : Range = Int(blockStartByte + chunkStartByte)..<Int(blockStartByte + chunkStartByte + chunkSize + 1)
                
                fileData?.copyBytes(to: &bytes, from: dataRange)
                
                var byteData = Data(bytes: bytes, count: MemoryLayout<CChar>.size * chunkSize)
                
                // On to the chunk
                chunkStartByte += chunkSize
                // Check if we are passing the current block
                if chunkStartByte >= blockSize {
                    // Prepare for next block
                    blockStartByte += blockSize
                    var bytesRemaining: Int = dataLength - blockStartByte
                    if bytesRemaining == 0 {
                        nextStep = 6
                    }
                    else if bytesRemaining < blockSize {
                        blockSize = bytesRemaining
                        nextStep = 4
                        // Back to step 4, setting the patch length
                    }
                }
                
                self.writeValue( indata: byteData,charcharcterstic: self.getCBCharectestic(charactersticUUID: SPOTA_UUID.SPOTA_PATCH_DATA_UUID.rawValue)!)
                
            }
            
            break
        case 6:
            
            step = 0;
            expectedVal = 0x02;
            nextStep = 7;
            
            var suotaEnd : Int = 0xFE000000;
            
            let suotaEndData = Data(bytes: withUnsafeMutablePointer(to: &suotaEnd, { $0 }), count: MemoryLayout<Int>.size)
            
            self.writeValue( indata: suotaEndData,charcharcterstic: self.getCBCharectestic(charactersticUUID: SPOTA_UUID.SPOTA_MEM_DEV_UUID.rawValue)!)
            
            break
        case 7:
            
            let alertController = UIAlertController(title: "Device has been updated", message: "Do you wish to reboot the device?", preferredStyle: UIAlertControllerStyle.alert)
            
            let noAction = UIAlertAction(title: "No", style: UIAlertActionStyle.default) {
                (result : UIAlertAction) -> Void in
                
            }
            
            //alertController.addAction(DestructiveAction)
            //alertController.addAction(noAction)
            
            //let yesAction = UIAlertAction(title: "Yes", style: UIAlertActionStyle.default) {
            //    (result : UIAlertAction) -> Void in
            //}
            
            //alertController.addAction(DestructiveAction)
            //alertController.addAction(yesAction)
            
            
            //self.present(alertController, animated: true, completion: nil)
            break
        case 8:
            
            //self.navigationController?.popViewController(animated: true)
            break
            
        default:
            break
            
        }
    }
    
    func getErrorMessage(status: SPOTA_STATUS) -> String {
        var message: String = ""
        
        switch status {
        case SPOTA_STATUS.SPOTAR_SRV_STARTED:
            message = "Valid memory device has been configured by initiator. No sleep state while in this mode"
        case SPOTA_STATUS.SPOTAR_CMP_OK:
            message = "SPOTA process completed successfully."
        case SPOTA_STATUS.SPOTAR_SRV_EXIT:
            message = "Forced exit of SPOTAR service."
        case SPOTA_STATUS.SPOTAR_CRC_ERR:
            message = "Overall Patch Data CRC failed"
        case SPOTA_STATUS.SPOTAR_PATCH_LEN_ERR:
            message = "Received patch Length not equal to PATCH_LEN characteristic value"
        case SPOTA_STATUS.SPOTAR_EXT_MEM_WRITE_ERR:
            message = "External Mem Error (Writing to external device failed)"
        case SPOTA_STATUS.SPOTAR_INT_MEM_ERR:
            message = "Internal Mem Error (not enough space for Patch)"
        default:
            break
            
        }
        
        return message
        
    }
    
    func appendChecksum() {
        
        var crc_code: UInt8 = 0
        fileData?.withUnsafeBytes { (bytes:UnsafePointer<CChar>)->Void in
            
            for i in 0..<fileData!.count {
                crc_code ^= UInt8(bytes[i])
            }
            
            fileData!.append(withUnsafeMutablePointer(to: &crc_code, { $0 }), count: MemoryLayout<UInt8>.size)
        }
    }

}
