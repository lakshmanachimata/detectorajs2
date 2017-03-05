package com.abb.presenzdetector;

//
//  PMAttribues.swift
//  blescanner
//
//  Created by Sriharsha Vardhan on 24/02/17.
//  Copyright © 2017 ABB. All rights reserved.
//

import java.util.ArrayList;


public class SCCPEnumerations {


    static String DSPS_SERVICE   = "0783B03E-8535-B5A0-7140-A304D2495CB7";
    static String  SERVER_TX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CB8";
    static String   SERVER_RX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CBA";
    static String   INFO_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb";


    static int STANDARD_RESPONSE               = 0x80;
    static int RESET                           = 0x01;
    static int RESET_FN                        = 0x02;
    static int READ_ATTRIBUTE_REQUEST          = 0x03;
    static int READ_ATTRIBUTE_RESPONSE         = 0x83;
    static int WRITE_ATTRIBUTE_REQUEST         = 0x04;
    static int WRITE_ATTRIBUTE_RESPONSE        = 0x84;
    static int CONFIGURE_REPORTING_REQUEST     = 0x05;
    static int CONFIGURE_REPORTING_RESPONSE    = 0x85;
    static int REPORT_ATTRIBUTE                = 0x06;


    static int      SCCP_STATUS_OK                          = 0x00;
    static int     SCCP_LL_NOT_INITIALIZED                 = 0x10;
    static int    SCCP_LL_NO_FREE_TX_BUFFER               = 0x11;
    static int    SCCP_LL_BAD_FRAME_LENGTH                = 0x12;
    static int    SCCP_FD_BAD_PAYLOAD_LENGTH              = 0x20;
    static int     SCCP_FD_BAD_DEST_ADDRESS                = 0x21;
    static int    SCCP_FD_NOT_INITIALIZED                 = 0x22;
    static int    SCCP_APP_UNSUPPORTED_ATTRIBUTE          = 0x40;
    static int     SCCP_APP_OUT_OF_BOUNDS                  = 0x41;
    static int     SCCP_APP_TYPE_MISMATCH                  = 0x42;
    static int     SCCP_APP_ACCESS_DENIED                  = 0x43;
    static int     SCCP_APP_UNREPORTABLE_ATTRIBUTE         = 0x44;
    static int    SCCP_APP_UNKNOWN_TYPE                   = 0x45;
    static int    SCCP_APP_BUFFER_TOO_SMALL               = 0x46;
    static int    SCCP_APP_MESSAGE_BROKEN                 = 0x47;
    static int     SCCP_APP_UNKNOWN_COMMAND                = 0x48;
    static int     SCCP_APP_TOO_MANY_REPORTED_ATTRIBUTES   = 0x49;



    static int FIRMWARE_VERSION                                        = 0x0000;
    static int  BT_DEVICE_NAME                                          = 0x0020;
    static int ARTICLE_NUMBER                                          = 0x0021;
    static int DEVICE_TYPE                                             = 0x0022;
    static int POTENTIOMETER_MODE                                      = 0x0030;
    static int BRIGHTNESS_THRESHOLD                                    = 0x0031;
    static int BRIGHTNESS_THRESHOLD_MIN                                = 0x0032;
    static int    BRIGHTNESS_THRESHOLD_MAX                                = 0x0033;
    static int    CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        = 0x0034;
    static int    CONSTANT_LIGHT_CONTROL_ENABLE                           = 0x0038;
    static int     CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     = 0x0039;
    static int    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 = 0x003A;
    static int    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 = 0x003B;
    static int     CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE = 0x003C;
    static int     SWITCH_OFF_DELAY                                        = 0x0041;
    static int    SWITCH_OFF_DELAY_MIN                                    = 0x0042;
    static int    SWITCH_OFF_DELAY_MAX                                    = 0x0043;
    static int     OPERATION_MODE                                          = 0x0044;
    static int    SLAVE_MODE_ENABLE                                       = 0x0045;
    static int    OUTDOOR_APPLICATION_ENABLE                              = 0x0050;
    static int    PIR_SENSITIVITY0                                        = 0x0051;
    static int     PIR_SENSITIVITY1                                        = 0x0052;
    static int    PIR_SENSITIVITY2                                        = 0x0053;
    static int    PIR_SENSITIVITY3                                        = 0x0054;
    static int    BRIGHTNESS_CORRECTION_ENABLE                            = 0x0058;
    static int    BRIGHTNESS_CORRECTION_VALUE                             = 0x0059;
    static int     DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         = 0x005A;
    static int    CH1_CIRCUIT_LOGIC                                       = 0x0060;
    static int    CH1_PERMANENT_ON_DURATION                               = 0x0061;
    static int    CH1_PERMANENT_ON_DURATION_MIN                           = 0x0062;
    static int    CH1_PERMANENT_ON_DURATION_MAX                           = 0x0063;
    static int     CH1_PERMANENT_OFF_DURATION                              = 0x0064;
    static int    CH1_PERMANENT_OFF_DURATION_MIN                          = 0x0065;
    static int    CH1_PERMANENT_OFF_DURATION_MAX                          = 0x0066;
    static int    SOFT_ON_ENABLE                                          = 0x0067;
    static int     SOFT_ON_DURATION                                        = 0x0068;
    static int     SOFT_ON_DURATION_MIN                                    = 0x0069;
    static int     SOFT_ON_DURATION_MAX                                    = 0x006A;
    static int     SOFT_OFF_ENABLE                                         = 0x006B;
    static int    SOFT_OFF_DURATION                                       = 0x006C;
    static int    SOFT_OFF_DURATION_MIN                                   = 0x006D;
    static int     SOFT_OFF_DURATION_MAX                                   = 0x006E;
    static int     PHASE_CUT_MODE                                          = 0x006F;
    static int    CH1_MEMORY_FUNCTION_ENABLE                              = 0x0070;
    static int    DELIMIT_LIGHTING_LEVEL_ENABLE                           = 0x0071;
    static int     CH1_MIN_LEVEL_ENABLE                                    = 0x0072;
    static int     CH1_MIN_LEVEL                                           = 0x0073;
    static int    CH1_MAX_LEVEL_ENABLE                                    = 0x0074;
    static int    CH1_MAX_LEVEL                                           = 0x0075;
    static int     LEVEL_MIN                                               = 0x0076;
    static int     LEVEL_MAX                                               = 0x0077;
    static int     DALI_POWER_ON_LEVEL                                     = 0x0078;
    static int     COLOR_TEMPERATURE                                       = 0x007C;
    static int     COLOR_TEMPERATURE_MIN                                   = 0x007D;
    static int     COLOR_TEMPERATURE_MAX                                   = 0x007E;
    static int     BURN_IN_ENABLE                                          = 0x0080;
    static int     BURN_IN_MODE                                            = 0x0081;
    static int     BURN_IN_DURATION                                        = 0x0082;
    static int     BURN_IN_DURATION_MIN                                    = 0x0083;
    static int     BURN_IN_DURATION_MAX                                    = 0x0084;
    static int     BASIC_BRIGHTNESS_MODE                                   = 0x0088;
    static int     BASIC_BRIGHTNESS_LEVEL                                  = 0x0089;
    static int     BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           = 0x008A;
    static int     BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       = 0x008B;
    static int    BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       = 0x008C;
    static int    BASIC_BRIGHTNESS_START_TIME                             = 0x008D;
    static int    BASIC_BRIGHTNESS_END_TIME                               = 0x008E;
    static int     BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  = 0x008F;
    static int     NIGHT_LIGHT_FUNCTION_ENABLE                             = 0x0094;
    static int     NIGHT_LIGHT_START_TIME                                  = 0x0095;
    static int     NIGHT_LIGHT_END_TIME                                    = 0x0096;
    static int     NIGHT_LIGHT_LEVEL                                       = 0x0097;
    static int     STEPWISE_SWITCH_OFF_DELAY_ENABLE                        = 0x0098;
    static int     STEPWISE_SWITCH_OFF_DELAY                               = 0x0099;
    static int    STEPWISE_SWITCH_OFF_DELAY_MIN                           = 0x009A;
    static int    STEPWISE_SWITCH_OFF_DELAY_MAX                           = 0x009B;
    static int    STEPWISE_SWITCH_OFF_LEVEL                               = 0x009C;
    static int     PRESENCE_SIMULATION_ENABLE                              = 0x009D;
    static int     PRESENCE_SIMULATION_START_TIME                          = 0x009E;
    static int     PRESENCE_SIMULATION_END_TIME                            = 0x009F;
    static int     PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               = 0x00A0;
    static int     CH2_CIRCUIT_LOGIC                                       = 0x0100;
    static int     CH2_MODE                                                = 0x0101;
    static int    HVAC_DYNAMICAL_CONTROL_ENABLE                           = 0x0102;
    static int     HVAC_SWITCH_ON_DELAY                                    = 0x0103;
    static int     HVAC_SWITCH_ON_DELAY_MIN                                = 0x0104;
    static int     HVAC_SWITCH_ON_DELAY_MAX                                = 0x0105;
    static int     HVAC_SWITCH_OFF_DELAY                                   = 0x0106;
    static int     HVAC_SWITCH_OFF_DELAY_MIN                               = 0x0107;
    static int     HVAC_SWITCH_OFF_DELAY_MAX                               = 0x0108;
    static int     TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     = 0x00B0;
    static int     ENERGY_MONITOR_CONNECTED_LOAD                           = 0x00C0;
    static int     ENERGY_MONITOR_CONNECTED_LOAD_MIN                       = 0x00C1;
    static int    ENERGY_MONITOR_CONNECTED_LOAD_MAX                       = 0x00C2;
    static int    ENERGY_MONITOR_LIGHTING_DURATION                        = 0x00C3;
    static int      ENERGY_MONITOR_LIGHTING_DURATION_MIN                    = 0x00C4;
    static int     ENERGY_MONITOR_LIGHTING_DURATION_MAX                    = 0x00C5;
    static int     CONTACT                                                 = 0x00D0;
    static int     BUILDING                                                = 0x00D1;
    static int     ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    = 0x00E0;
    static int     ENABLE_USER_SET_SWITCH_OFF_DELAY                        = 0x00E1;
    static int     ENABLE_USER_ENERGY_MONITOR                              = 0x00E2;
    static int     ENABLE_USER_BASIC_BRIGHTNESS                            = 0x00E3;
    static int     ENABLE_USER_NIGHT_LIGHT_FUNCTION                        = 0x00E4;
    static int    ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            = 0x00E5;
    static int    CURRENT_BRIGHTNESS                                      = 0x1020;
    static int    IDENTIFYING_DEVICE                                      = 0x1021;
    static int     MOVEMENT                                                = 0x1040;
    static int    CH1_IDENTIFYING_LOAD                                    = 0x1060;
    static int    CH1_ON_OFF_STATE                                        = 0x1061;
    static int    CH1_CURRENT_LEVEL                                       = 0x1062;
    static int     CH2_IDENTIFYING_LOAD                                    = 0x10A0;
    static int    CH2_ON_OFF_STATE                                        = 0x10A1;
    static int    CH2_CURRENT_LEVEL                                       = 0x10A2;
    static int    TEST_MODE_ACTIVE                                        = 0x10B0;
    static int    ACCESS_LEVEL                                            = 0x10E0;
    static int    TEST_BOOL                                               = 0x8001;
    static int    TEST_STRING                                             = 0x8002;
    static int    TEST_ENUM8                                              = 0x8003;
    static int    TEST_ENUM16                                             = 0x8004;
    static int    TEST_TIME                                               = 0x8005;
    static int    TEST_UINT8                                              = 0x8008;
    static int    TEST_UINT16                                             = 0x8009;
    static int    TEST_UINT32                                             = 0x800A;
    static int    TEST_INT8                                               = 0x800C;
    static int    TEST_INT16                                              = 0x800D;
    static int     TEST_INT32                                              = 0x800E;


    static int  SCCP_TYPE_BOOL     = 0x01;
    static int     SCCP_TYPE_STRING   = 0x02;
    static int     SCCP_TYPE_ENUM8    = 0x03;
    static int     SCCP_TYPE_ENUM16   = 0x04;
    static int     SCCP_TYPE_TIME     = 0x05;
    static int     SCCP_TYPE_UINT8    = 0x08;
    static int     SCCP_TYPE_UINT16   = 0x09;
    static int     SCCP_TYPE_UINT32   = 0x0A;
    static int     SCCP_TYPE_UINT64   = 0x0B;
    static int     SCCP_TYPE_INT8     = 0x0C;
    static int    SCCP_TYPE_INT16    = 0x0D;
    static int    SCCP_TYPE_INT32    = 0x0E;
    static int     SCCP_TYPE_INT64    = 0x0F;


    static int ComputeCRC(byte[] val) {
        int crc;
        int q;
        byte c;
        crc = 0x0000;
        for (int i = 0; i < val.length; i++) {
            c = val[i];
            q = (crc ^ c) & 0x0f;
            crc = (crc >> 4) ^ (q * 0x1081);
            q = (crc ^ (c >> 4)) & 0x0f;
            crc = (crc >> 4) ^ (q * 0x1081);
        }
        int crcend = ((byte) crc << 8 | (byte) (crc >> 8)) & 0xffff;
//Swap bytes
        int byte1 = (crcend & 0xff);
        int byte2 = ((crcend >> 8) & 0xff);
        int result = ((byte1 << 8) | (byte2));
//Swap
        return result;
    }
}
