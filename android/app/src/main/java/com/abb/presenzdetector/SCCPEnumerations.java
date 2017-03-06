package com.abb.presenzdetector;

//
//  PMAttribues.swift
//  blescanner
//
//  Created by Sriharsha Vardhan on 24/02/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;


public class SCCPEnumerations {


    static final String DSPS_SERVICE   = "0783B03E-8535-B5A0-7140-A304D2495CB7";
    static final String  SERVER_TX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CB8";
    static final String   SERVER_RX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CBA";
    static final String   INFO_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb";




    static final int      SCCP_STATUS_OK                          = 0x00;
    static final int     SCCP_LL_NOT_INITIALIZED                 = 0x10;
    static final int    SCCP_LL_NO_FREE_TX_BUFFER               = 0x11;
    static final int    SCCP_LL_BAD_FRAME_LENGTH                = 0x12;
    static final int    SCCP_FD_BAD_PAYLOAD_LENGTH              = 0x20;
    static final int     SCCP_FD_BAD_DEST_ADDRESS                = 0x21;
    static final int    SCCP_FD_NOT_INITIALIZED                 = 0x22;
    static final int    SCCP_APP_UNSUPPORTED_ATTRIBUTE          = 0x40;
    static final int     SCCP_APP_OUT_OF_BOUNDS                  = 0x41;
    static final int     SCCP_APP_TYPE_MISMATCH                  = 0x42;
    static final int     SCCP_APP_ACCESS_DENIED                  = 0x43;
    static final int     SCCP_APP_UNREPORTABLE_ATTRIBUTE         = 0x44;
    static final int    SCCP_APP_UNKNOWN_TYPE                   = 0x45;
    static final int    SCCP_APP_BUFFER_TOO_SMALL               = 0x46;
    static final int    SCCP_APP_MESSAGE_BROKEN                 = 0x47;
    static final int     SCCP_APP_UNKNOWN_COMMAND                = 0x48;
    static final int     SCCP_APP_TOO_MANY_REPORTED_ATTRIBUTES   = 0x49;



    static final int FIRMWARE_VERSION                                        = 0x0000;
    static final int  BT_DEVICE_NAME                                          = 0x0020;
    static final int ARTICLE_NUMBER                                          = 0x0021;
    static final int DEVICE_TYPE                                             = 0x0022;
    static final int POTENTIOMETER_MODE                                      = 0x0030;
    static final int BRIGHTNESS_THRESHOLD                                    = 0x0031;
    static final int BRIGHTNESS_THRESHOLD_MIN                                = 0x0032;
    static final int    BRIGHTNESS_THRESHOLD_MAX                                = 0x0033;
    static final int    CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        = 0x0034;
    static final int    CONSTANT_LIGHT_CONTROL_ENABLE                           = 0x0038;
    static final int     CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     = 0x0039;
    static final int    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 = 0x003A;
    static final int    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 = 0x003B;
    static final int     CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE = 0x003C;
    static final int     SWITCH_OFF_DELAY                                        = 0x0041;
    static final int    SWITCH_OFF_DELAY_MIN                                    = 0x0042;
    static final int    SWITCH_OFF_DELAY_MAX                                    = 0x0043;
    static final int     OPERATION_MODE                                          = 0x0044;
    static final int    SLAVE_MODE_ENABLE                                       = 0x0045;
    static final int    OUTDOOR_APPLICATION_ENABLE                              = 0x0050;
    static final int    PIR_SENSITIVITY0                                        = 0x0051;
    static final int     PIR_SENSITIVITY1                                        = 0x0052;
    static final int    PIR_SENSITIVITY2                                        = 0x0053;
    static final int    PIR_SENSITIVITY3                                        = 0x0054;
    static final int    BRIGHTNESS_CORRECTION_ENABLE                            = 0x0058;
    static final int    BRIGHTNESS_CORRECTION_VALUE                             = 0x0059;
    static final int     DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         = 0x005A;
    static final int    CH1_CIRCUIT_LOGIC                                       = 0x0060;
    static final int    CH1_PERMANENT_ON_DURATION                               = 0x0061;
    static final int    CH1_PERMANENT_ON_DURATION_MIN                           = 0x0062;
    static final int    CH1_PERMANENT_ON_DURATION_MAX                           = 0x0063;
    static final int     CH1_PERMANENT_OFF_DURATION                              = 0x0064;
    static final int    CH1_PERMANENT_OFF_DURATION_MIN                          = 0x0065;
    static final int    CH1_PERMANENT_OFF_DURATION_MAX                          = 0x0066;
    static final int    SOFT_ON_ENABLE                                          = 0x0067;
    static final int     SOFT_ON_DURATION                                        = 0x0068;
    static final int     SOFT_ON_DURATION_MIN                                    = 0x0069;
    static final int     SOFT_ON_DURATION_MAX                                    = 0x006A;
    static final int     SOFT_OFF_ENABLE                                         = 0x006B;
    static final int    SOFT_OFF_DURATION                                       = 0x006C;
    static final int    SOFT_OFF_DURATION_MIN                                   = 0x006D;
    static final int     SOFT_OFF_DURATION_MAX                                   = 0x006E;
    static final int     PHASE_CUT_MODE                                          = 0x006F;
    static final int    CH1_MEMORY_FUNCTION_ENABLE                              = 0x0070;
    static final int    DELIMIT_LIGHTING_LEVEL_ENABLE                           = 0x0071;
    static final int     CH1_MIN_LEVEL_ENABLE                                    = 0x0072;
    static final int     CH1_MIN_LEVEL                                           = 0x0073;
    static final int    CH1_MAX_LEVEL_ENABLE                                    = 0x0074;
    static final int    CH1_MAX_LEVEL                                           = 0x0075;
    static final int     LEVEL_MIN                                               = 0x0076;
    static final int     LEVEL_MAX                                               = 0x0077;
    static final int     DALI_POWER_ON_LEVEL                                     = 0x0078;
    static final int     COLOR_TEMPERATURE                                       = 0x007C;
    static final int     COLOR_TEMPERATURE_MIN                                   = 0x007D;
    static final int     COLOR_TEMPERATURE_MAX                                   = 0x007E;
    static final int     BURN_IN_ENABLE                                          = 0x0080;
    static final int     BURN_IN_MODE                                            = 0x0081;
    static final int     BURN_IN_DURATION                                        = 0x0082;
    static final int     BURN_IN_DURATION_MIN                                    = 0x0083;
    static final int     BURN_IN_DURATION_MAX                                    = 0x0084;
    static final int     BASIC_BRIGHTNESS_MODE                                   = 0x0088;
    static final int     BASIC_BRIGHTNESS_LEVEL                                  = 0x0089;
    static final int     BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           = 0x008A;
    static final int     BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       = 0x008B;
    static final int    BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       = 0x008C;
    static final int    BASIC_BRIGHTNESS_START_TIME                             = 0x008D;
    static final int    BASIC_BRIGHTNESS_END_TIME                               = 0x008E;
    static final int     BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  = 0x008F;
    static final int     NIGHT_LIGHT_FUNCTION_ENABLE                             = 0x0094;
    static final int     NIGHT_LIGHT_START_TIME                                  = 0x0095;
    static final int     NIGHT_LIGHT_END_TIME                                    = 0x0096;
    static final int     NIGHT_LIGHT_LEVEL                                       = 0x0097;
    static final int     STEPWISE_SWITCH_OFF_DELAY_ENABLE                        = 0x0098;
    static final int     STEPWISE_SWITCH_OFF_DELAY                               = 0x0099;
    static final int    STEPWISE_SWITCH_OFF_DELAY_MIN                           = 0x009A;
    static final int    STEPWISE_SWITCH_OFF_DELAY_MAX                           = 0x009B;
    static final int    STEPWISE_SWITCH_OFF_LEVEL                               = 0x009C;
    static final int     PRESENCE_SIMULATION_ENABLE                              = 0x009D;
    static final int     PRESENCE_SIMULATION_START_TIME                          = 0x009E;
    static final int     PRESENCE_SIMULATION_END_TIME                            = 0x009F;
    static final int     PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               = 0x00A0;
    static final int     CH2_CIRCUIT_LOGIC                                       = 0x0100;
    static final int     CH2_MODE                                                = 0x0101;
    static final int    HVAC_DYNAMICAL_CONTROL_ENABLE                           = 0x0102;
    static final int     HVAC_SWITCH_ON_DELAY                                    = 0x0103;
    static final int     HVAC_SWITCH_ON_DELAY_MIN                                = 0x0104;
    static final int     HVAC_SWITCH_ON_DELAY_MAX                                = 0x0105;
    static final int     HVAC_SWITCH_OFF_DELAY                                   = 0x0106;
    static final int     HVAC_SWITCH_OFF_DELAY_MIN                               = 0x0107;
    static final int     HVAC_SWITCH_OFF_DELAY_MAX                               = 0x0108;
    static final int     TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     = 0x00B0;
    static final int     ENERGY_MONITOR_CONNECTED_LOAD                           = 0x00C0;
    static final int     ENERGY_MONITOR_CONNECTED_LOAD_MIN                       = 0x00C1;
    static final int    ENERGY_MONITOR_CONNECTED_LOAD_MAX                       = 0x00C2;
    static final int    ENERGY_MONITOR_LIGHTING_DURATION                        = 0x00C3;
    static final int      ENERGY_MONITOR_LIGHTING_DURATION_MIN                    = 0x00C4;
    static final int     ENERGY_MONITOR_LIGHTING_DURATION_MAX                    = 0x00C5;
    static final int     CONTACT                                                 = 0x00D0;
    static final int     BUILDING                                                = 0x00D1;
    static final int     ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    = 0x00E0;
    static final int     ENABLE_USER_SET_SWITCH_OFF_DELAY                        = 0x00E1;
    static final int     ENABLE_USER_ENERGY_MONITOR                              = 0x00E2;
    static final int     ENABLE_USER_BASIC_BRIGHTNESS                            = 0x00E3;
    static final int     ENABLE_USER_NIGHT_LIGHT_FUNCTION                        = 0x00E4;
    static final int    ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            = 0x00E5;
    static final int    CURRENT_BRIGHTNESS                                      = 0x1020;
    static final int    IDENTIFYING_DEVICE                                      = 0x1021;
    static final int     MOVEMENT                                                = 0x1040;
    static final int    CH1_IDENTIFYING_LOAD                                    = 0x1060;
    static final int    CH1_ON_OFF_STATE                                        = 0x1061;
    static final int    CH1_CURRENT_LEVEL                                       = 0x1062;
    static final int     CH2_IDENTIFYING_LOAD                                    = 0x10A0;
    static final int    CH2_ON_OFF_STATE                                        = 0x10A1;
    static final int    CH2_CURRENT_LEVEL                                       = 0x10A2;
    static final int    TEST_MODE_ACTIVE                                        = 0x10B0;
    static final int    ACCESS_LEVEL                                            = 0x10E0;
    static final int    TEST_BOOL                                               = 0x8001;
    static final int    TEST_STRING                                             = 0x8002;
    static final int    TEST_ENUM8                                              = 0x8003;
    static final int    TEST_ENUM16                                             = 0x8004;
    static final int    TEST_TIME                                               = 0x8005;
    static final int    TEST_UINT8                                              = 0x8008;
    static final int    TEST_UINT16                                             = 0x8009;
    static final int    TEST_UINT32                                             = 0x800A;
    static final int    TEST_INT8                                               = 0x800C;
    static final int    TEST_INT16                                              = 0x800D;
    static final int     TEST_INT32                                              = 0x800E;


    static final int  SCCP_TYPE_BOOL     = 0x01;
    static final int     SCCP_TYPE_STRING   = 0x02;
    static final int     SCCP_TYPE_ENUM8    = 0x03;
    static final int     SCCP_TYPE_ENUM16   = 0x04;
    static final int     SCCP_TYPE_TIME     = 0x05;
    static final int     SCCP_TYPE_UINT8    = 0x08;
    static final int     SCCP_TYPE_UINT16   = 0x09;
    static final int     SCCP_TYPE_UINT32   = 0x0A;
    static final int     SCCP_TYPE_UINT64   = 0x0B;
    static final int     SCCP_TYPE_INT8     = 0x0C;
    static final int    SCCP_TYPE_INT16    = 0x0D;
    static final int    SCCP_TYPE_INT32    = 0x0E;
    static final int     SCCP_TYPE_INT64    = 0x0F;



    static final int STANDARD_RESPONSE               = 0x80;
    static final int RESET                           = 0x01;
    static final int RESET_FN                        = 0x02;
    static final int READ_ATTRIBUTE_REQUEST          = 0x03;
    static final int READ_ATTRIBUTE_RESPONSE         = 0x83;
    static final int WRITE_ATTRIBUTE_REQUEST         = 0x04;
    static final int WRITE_ATTRIBUTE_RESPONSE        = 0x84;
    static final int CONFIGURE_REPORTING_REQUEST     = 0x05;
    static final int CONFIGURE_REPORTING_RESPONSE    = 0x85;
    static final int REPORT_ATTRIBUTE                = 0x06;


    static char seed = 0xFFFF;

    static char[] crcCCITTLookupTable = {
            0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7, 0x8108,
            0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF, 0x1231, 0x0210,
            0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6, 0x9339, 0x8318, 0xB37B,
            0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE, 0x2462, 0x3443, 0x0420, 0x1401,
            0x64E6, 0x74C7, 0x44A4, 0x5485, 0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE,
            0xF5CF, 0xC5AC, 0xD58D, 0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6,
            0x5695, 0x46B4, 0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D,
            0xC7BC, 0x48C4, 0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823,
            0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A, 0xB92B, 0x5AF5,
            0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12, 0xDBFD, 0xCBDC,
            0xFBBF, 0xEB9E, 0x9B79, 0x8B58, 0xBB3B, 0xAB1A, 0x6CA6, 0x7C87, 0x4CE4,
            0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41, 0xEDAE, 0xFD8F, 0xCDEC, 0xDDCD,
            0xAD2A, 0xBD0B, 0x8D68, 0x9D49, 0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13,
            0x2E32, 0x1E51, 0x0E70, 0xFF9F, 0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A,
            0x9F59, 0x8F78, 0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E,
            0xE16F, 0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067,
            0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D, 0xD31C, 0xE37F, 0xF35E, 0x02B1,
            0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256, 0xB5EA, 0xA5CB,
            0x95A8, 0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D, 0x34E2, 0x24C3, 0x14A0,
            0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xA7DB, 0xB7FA, 0x8799, 0x97B8,
            0xE75F, 0xF77E, 0xC71D, 0xD73C, 0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657,
            0x7676, 0x4615, 0x5634, 0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9,
            0xB98A, 0xA9AB, 0x5844, 0x4865, 0x7806, 0x6827, 0x18C0, 0x08E1, 0x3882,
            0x28A3, 0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A,
            0x4A75, 0x5A54, 0x6A37, 0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92, 0xFD2E,
            0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9, 0x7C26, 0x6C07,
            0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1, 0xEF1F, 0xFF3E, 0xCF5D,
            0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9, 0x9FF8, 0x6E17, 0x7E36, 0x4E55, 0x5E74,
            0x2E93, 0x3EB2, 0x0ED1, 0x1EF0,
    };


    static int  computeCRC(byte[] data)  {
        char sum = seed;

        byte[] array = (data);
        for(int i =0; i<array.length; i++){
            char indata = (char)(array[i] & 0x00FF);
            int index = (sum >> 8) ^ indata;
            char lookupdata = (char)crcCCITTLookupTable[index];
            sum =  (char)(lookupdata ^ (sum << 8));
        }


        return sum;
    }



//    static int computeCRC(byte[] val) {
//        int crc;
//        int q;
//        byte c;
//        crc = 0x0000;
//        for (int i = 0; i < val.length; i++) {
//            c = val[i];
//            q = (crc ^ c) & 0x0f;
//            crc = (crc >> 4) ^ (q * 0x1081);
//            q = (crc ^ (c >> 4)) & 0x0f;
//            crc = (crc >> 4) ^ (q * 0x1081);
//        }
//        int crcend = ((byte) crc << 8 | (byte) (crc >> 8)) & 0xffff;
////Swap bytes
//        int byte1 = (crcend & 0xff);
//        int byte2 = ((crcend >> 8) & 0xff);
//        int result = ((byte1 << 8) | (byte2));
////Swap
//        return result;
//    }

    static byte[] makeRequestFrame(int commandType, byte[] data) {
        ByteBuffer stream;
        int crcVal;
        int counter =0;
        ByteArrayOutputStream byteArrayOutputStream;
        ByteArrayOutputStream byteArrayOutputStream1;
        switch (commandType) {
            case  RESET:
            case RESET_FN:
                stream = ByteBuffer.allocate(7);
                stream.put((byte)0x7e);
                stream.put((byte)0x08); // CONTROL DEVICE
                stream.put((byte)0x00); // SEQUENCE
                stream.put((byte)commandType);
                crcVal = computeCRC(stream.array());
                stream.put((byte)(crcVal >> 8)); // CRC LOWER
                stream.put((byte)(crcVal & 0x00ff)); // CRC UPPER
                stream.put((byte)0x7e);
                break;
            case READ_ATTRIBUTE_REQUEST:
                stream = ByteBuffer.allocate(6+(data.length *2));
                stream.put((byte)0x7e);
                stream.put((byte)0x08); // CONTROL DEVICE
                stream.put((byte)0x00); // SEQUENCE
                stream.put((byte)commandType); // command

                for (int i =0;i < data.length; i++) {
                    stream.put((byte) (data[i] & 0x00FF)); // ADDR LOW
                    stream.put((byte) data[i] > 0xFF ? (byte) (data[i] >> 8) : 0x00); // ADDR HIGH
                }
                crcVal = computeCRC(stream.array());
                stream.put((byte)(crcVal >> 8)); // CRC LOWER
                stream.put((byte)(crcVal & 0x00ff)); // CRC UPPER

                stream.put((byte)0x7e); // END BYTE

                break;
            case  WRITE_ATTRIBUTE_REQUEST:

                byteArrayOutputStream =  new ByteArrayOutputStream();
                byteArrayOutputStream1 =  new ByteArrayOutputStream();
                byteArrayOutputStream.write((byte)0x08);
                byteArrayOutputStream.write((byte)0x00);
                byteArrayOutputStream.write((byte)commandType);
                for(int i = 0; i < data.length; i = i + 5) {
                    byteArrayOutputStream.write(data[i]); // ADDR LOW
                    byteArrayOutputStream.write(data[i+1]); // ADDR HIGH
                    byteArrayOutputStream.write(data[i+2]);
                    byteArrayOutputStream.write(data[i+3]);
                    byteArrayOutputStream.write(data[i+4]);
                    counter += 5;
                }

                byte len[] =  new byte[1];
                len[0] = (byte)(6+counter);
                byteArrayOutputStream1.write((byte)(6+counter));
                byteArrayOutputStream1.write(byteArrayOutputStream.toByteArray(),0,3+counter);
                stream = ByteBuffer.allocate(8+counter);
                stream.put((byte)0x7e);
                stream.put(byteArrayOutputStream1.toByteArray());
                crcVal = computeCRC(byteArrayOutputStream1.toByteArray());
                stream.put((byte)(crcVal >> 8)); // CRC LOWER
                stream.put((byte)(crcVal & 0x00ff)); // CRC UPPER
                stream.put((byte)0x7e); // END BYTE
                break;
            case CONFIGURE_REPORTING_REQUEST:

                byteArrayOutputStream = new ByteArrayOutputStream();
                byteArrayOutputStream1 =  new ByteArrayOutputStream();

                byteArrayOutputStream.write((byte)0x08);
                byteArrayOutputStream.write((byte)0x00);
                byteArrayOutputStream.write((byte)commandType);
                for(int i = 0; i < data.length; i = i + 6) {
                    byteArrayOutputStream.write((byte)(data[i] & 0x00ff)); // ADDR LOW
                    byteArrayOutputStream.write(data[i]); // ADDR LOW
                    byteArrayOutputStream.write(data[i+1]); // ADDR HIGH
                    byteArrayOutputStream.write(data[i+2]);
                    byteArrayOutputStream.write(data[i+3]);
                    byteArrayOutputStream.write(data[i+4]);
                    byteArrayOutputStream.write(data[i+5]);
                    counter += 6;
                }

                byte len1[] =  new byte[1];
                len1[0] = (byte)(6+counter);
                byteArrayOutputStream1.write((byte)(7+counter));
                byteArrayOutputStream1.write(byteArrayOutputStream.toByteArray(),0,3+counter);
                stream = ByteBuffer.allocate(8+counter);
                stream.put((byte)0x7e);
                stream.put(byteArrayOutputStream1.toByteArray());
                crcVal = computeCRC(byteArrayOutputStream1.toByteArray());
                stream.put((byte)(crcVal >> 8)); // CRC LOWER
                stream.put((byte)(crcVal & 0x00ff)); // CRC UPPER
                stream.put((byte)0x7e); // END BYTE
                stream.put((byte)0x7e); // END BYTE
                break;
//            case REPORT_ATTRIBUTE:
//                break;
//            case STANDARD_RESPONSE:
//                break;
//            case READ_ATTRIBUTE_RESPONSE:
//                break;
//            case WRITE_ATTRIBUTE_RESPONSE:
//                break;
//            case CONFIGURE_REPORTING_RESPONSE:
//                break;
            default:
                stream = ByteBuffer.allocate(1);
                break;
        }

        return stream.array();
    }


}
