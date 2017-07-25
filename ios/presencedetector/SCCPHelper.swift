//
//  SCCPHelper.swift
//  presence detector
//
//  Created by Sriharsha Vardhan on 23/02/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import Foundation

public class SCCPHelper {
    
    static func getRequestFrame(command: SCCP_COMMAND, data: [UInt16]) -> Data {
        var frame: Data = Data.init()
        
        switch command {
        case SCCP_COMMAND.RESET:
            frame.append(0x06); // LENGTH AFTER THIS BYTE
            frame.append(0x08); // CONTROL DEVICE
            frame.append(0x00); // SEQUENCE
            frame.append(UInt8.init(exactly: command.rawValue)!); // command
            let crc = frame.crcCCITT
            frame.append(UInt8(crc >> 8)); // CRC LOWER
            frame.append(UInt8(crc & 0x00ff)); // CRC UPPER
            
            frame.insert(0x7e, at: 0) // START BYTE
            frame.append(0x7e) // END BYTE
            
        case SCCP_COMMAND.RESET_FN:
            frame.append(0x06); // LENGTH AFTER THIS BYTE
            frame.append(0x08); // CONTROL DEVICE
            frame.append(0x00); // SEQUENCE
            frame.append(UInt8.init(exactly: command.rawValue)!); // command
            let crc = frame.crcCCITT
            frame.append(UInt8(crc >> 8)); // CRC LOWER
            frame.append(UInt8(crc & 0x00ff)); // CRC UPPER
            
            frame.insert(0x7e, at: 0) // START BYTE
            frame.append(0x7e) // END BYTE

        case SCCP_COMMAND.READ_ATTRIBUTE_REQUEST:
            
            frame.append(6 + UInt8.init(exactly: data.count * 2)!); // LENGTH AFTER THIS BYTE
            frame.append(0x08); // CONTROL DEVICE
            frame.append(0x00); // SEQUENCE
            frame.append(UInt8.init(exactly: command.rawValue)!); // command
            
            for (_, val) in (data.enumerated()) {
                frame.append(UInt8(val & 0x00ff)); // ADDR LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // ADDR HIGH
            }
            let crc = frame.crcCCITT
            frame.append(UInt8(crc >> 8)); // CRC LOWER
            frame.append(UInt8(crc & 0x00ff)); // CRC UPPER
            
            frame.insert(0x7e, at: 0) // START BYTE
            frame.append(0x7e) // END BYTE

        case SCCP_COMMAND.WRITE_ATTRIBUTE_REQUEST:
            
            var counter:UInt8 = 0;
            
            frame.append(0x08); // CONTROL DEVICE
            frame.append(0x00); // SEQUENCE
            frame.append(UInt8.init(exactly: command.rawValue)!); // command

            var iterator = data.makeIterator()
            
            while var val = iterator.next() {
                frame.append(UInt8(val & 0x00ff)); // ADDR LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // ADDR HIGH
                val = (iterator.next())!
                frame.append(UInt8.init(exactly: val)!); // DATA TYPE
                val = (iterator.next())!
                frame.append(UInt8(val & 0x00ff)); // VAL LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // VAL HIGH
                counter += 5;
            }

            frame.insert(6 + counter, at: 0); // LENGTH

            let crc = frame.crcCCITT
            frame.append(UInt8(crc >> 8)); // CRC LOWER
            frame.append(UInt8(crc & 0x00ff)); // CRC UPPER
            
            frame.insert(0x7e, at: 0) // START BYTE
            frame.append(0x7e) // END BYTE

        case SCCP_COMMAND.CONFIGURE_REPORTING_REQUEST :
            
            var counter:UInt8 = 0;
            
            frame.append(0x08); // CONTROL DEVICE
            frame.append(0x00); // SEQUENCE
            frame.append(UInt8.init(exactly: command.rawValue)!); // command
            
            var iterator = data.makeIterator()
            
            while var val = iterator.next() {
                frame.append(UInt8(val & 0x00ff)); // ADDR LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // ADDR HIGH
                val = (iterator.next())!
                frame.append(UInt8(val & 0x00ff)); // MIN REPORTING INTERVAL LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // MIN REPORTING INTERVAL HIGH
                val = (iterator.next())!
                frame.append(UInt8(val & 0x00ff)); // MAX REPORTING INTERVAL LOW
                frame.append(val > 0xFF ? UInt8(val >> 8) : 0x00); // MAX REPORTING INTERVAL HIGH
                counter += 6;
            }
            
            frame.insert(6 + counter, at: 0); // LENGTH
            
            let crc = frame.crcCCITT
            frame.append(UInt8(crc >> 8)); // CRC LOWER
            frame.append(UInt8(crc & 0x00ff)); // CRC UPPER
            
            frame.insert(0x7e, at: 0) // START BYTE
            frame.append(0x7e) // END BYTE

        default:
            print("Unknown Command")
        }

        return frame;
    }
}
