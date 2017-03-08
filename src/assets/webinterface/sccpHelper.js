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
            
            for (var i=0; i < data.length; i+=1) {
                var val = data[i];
                frame.push(val & 0x00ff); // ADDR LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // ADDR HIGH
                i = i + 1; val = data[i];
                frame.push(val); // DATA TYPE
                i = i + 1; val = data[i];
                frame.push((val & 0x00ff)); // VAL LOW
                frame.push(val > 0xFF ? (val >> 8) : 0x00); // VAL HIGH
                counter += 5;
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
