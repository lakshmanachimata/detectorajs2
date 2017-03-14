//  Created by Sriharsha Vardhan on 24/02/17.
//  Copyright © 2017 ABB. All rights reserved.
//

var SCCP_SERVICE = {
    DSPS_SERVICE   : "0783B03E-8535-B5A0-7140-A304D2495CB7",
    SERVER_TX_DATA : "0783B03E-8535-B5A0-7140-A304D2495CB8",
    SERVER_RX_DATA : "0783B03E-8535-B5A0-7140-A304D2495CBA"
}


/// <#Description#>
var SCCP_COMMAND = {
    STANDARD_RESPONSE               : 0x80,
    RESET                           : 0x01,
    RESET_FN                        : 0x02,
    READ_ATTRIBUTE_REQUEST          : 0x03,
    READ_ATTRIBUTE_RESPONSE         : 0x83,
    WRITE_ATTRIBUTE_REQUEST         : 0x04,
    WRITE_ATTRIBUTE_RESPONSE        : 0x84,
    CONFIGURE_REPORTING_REQUEST     : 0x05,
    CONFIGURE_REPORTING_RESPONSE    : 0x85,
    REPORT_ATTRIBUTE                : 0x06
}


/// <#Description#>
var SCCP_STATUS = {
    SCCP_STATUS_OK                          : 0x00,
    SCCP_LL_NOT_INITIALIZED                 : 0x10,
    SCCP_LL_NO_FREE_TX_BUFFER               : 0x11,
    SCCP_LL_BAD_FRAME_LENGTH                : 0x12,
    SCCP_FD_BAD_PAYLOAD_LENGTH              : 0x20,
    SCCP_FD_BAD_DEST_ADDRESS                : 0x21,
    SCCP_FD_NOT_INITIALIZED                 : 0x22,
    SCCP_APP_UNSUPPORTED_ATTRIBUTE          : 0x40,
    SCCP_APP_OUT_OF_BOUNDS                  : 0x41,
    SCCP_APP_TYPE_MISMATCH                  : 0x42,
    SCCP_APP_ACCESS_DENIED                  : 0x43,
    SCCP_APP_UNREPORTABLE_ATTRIBUTE         : 0x44,
    SCCP_APP_UNKNOWN_TYPE                   : 0x45,
    SCCP_APP_BUFFER_TOO_SMALL               : 0x46,
    SCCP_APP_MESSAGE_BROKEN                 : 0x47,
    SCCP_APP_UNKNOWN_COMMAND                : 0x48,
    SCCP_APP_TOO_MANY_REPORTED_ATTRIBUTES   : 0x49
}


/// <#Description#>
var SCCP_ATTRIBUTES = {
    FIRMWARE_VERSION                                        : 0x0000,
    BT_DEVICE_NAME                                          : 0x0020,
    ARTICLE_NUMBER                                          : 0x0021,
    DEVICE_TYPE                                             : 0x0022,
    POTENTIOMETER_MODE                                      : 0x0030,
    BRIGHTNESS_THRESHOLD                                    : 0x0031,
    BRIGHTNESS_THRESHOLD_MIN                                : 0x0032,
    BRIGHTNESS_THRESHOLD_MAX                                : 0x0033,
    CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        : 0x0034,
    CONSTANT_LIGHT_CONTROL_ENABLE                           : 0x0038,
    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     : 0x0039,
    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 : 0x003A,
    CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 : 0x003B,
    CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE : 0x003C,
    SHORT_TIME_PULSE_ENABLE                                 : 0x0040,
    SWITCH_OFF_DELAY                                        : 0x0041,
    SWITCH_OFF_DELAY_MIN                                    : 0x0042,
    SWITCH_OFF_DELAY_MAX                                    : 0x0043,
    OPERATION_MODE                                          : 0x0044,
    SLAVE_MODE_ENABLE                                       : 0x0045,
    OUTDOOR_APPLICATION_ENABLE                              : 0x0050,
    PIR_SENSITIVITY0                                        : 0x0051,
    PIR_SENSITIVITY1                                        : 0x0052,
    PIR_SENSITIVITY2                                        : 0x0053,
    PIR_SENSITIVITY3                                        : 0x0054,
    BRIGHTNESS_CORRECTION_ENABLE                            : 0x0058,
    BRIGHTNESS_CORRECTION_VALUE                             : 0x0059,
    DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         : 0x005A,
    CH1_CIRCUIT_LOGIC                                       : 0x0060,
    CH1_PERMANENT_ON_DURATION                               : 0x0061,
    CH1_PERMANENT_ON_DURATION_MIN                           : 0x0062,
    CH1_PERMANENT_ON_DURATION_MAX                           : 0x0063,
    CH1_PERMANENT_OFF_DURATION                              : 0x0064,
    CH1_PERMANENT_OFF_DURATION_MIN                          : 0x0065,
    CH1_PERMANENT_OFF_DURATION_MAX                          : 0x0066,
    SOFT_ON_ENABLE                                          : 0x0067,
    SOFT_ON_DURATION                                        : 0x0068,
    SOFT_ON_DURATION_MIN                                    : 0x0069,
    SOFT_ON_DURATION_MAX                                    : 0x006A,
    SOFT_OFF_ENABLE                                         : 0x006B,
    SOFT_OFF_DURATION                                       : 0x006C,
    SOFT_OFF_DURATION_MIN                                   : 0x006D,
    SOFT_OFF_DURATION_MAX                                   : 0x006E,
    PHASE_CUT_MODE                                          : 0x006F,
    CH1_MEMORY_FUNCTION_ENABLE                              : 0x0070,
    DELIMIT_LIGHTING_LEVEL_ENABLE                           : 0x0071,
    CH1_MIN_LEVEL_ENABLE                                    : 0x0072,
    CH1_MIN_LEVEL                                           : 0x0073,
    CH1_MAX_LEVEL_ENABLE                                    : 0x0074,
    CH1_MAX_LEVEL                                           : 0x0075,
    LEVEL_MIN                                               : 0x0076,
    LEVEL_MAX                                               : 0x0077,
    DALI_POWER_ON_LEVEL                                     : 0x0078,
    COLOR_TEMPERATURE                                       : 0x007C,
    COLOR_TEMPERATURE_MIN                                   : 0x007D,
    COLOR_TEMPERATURE_MAX                                   : 0x007E,
    BURN_IN_ENABLE                                          : 0x0080,
    BURN_IN_MODE                                            : 0x0081,
    BURN_IN_DURATION                                        : 0x0082,
    BURN_IN_DURATION_MIN                                    : 0x0083,
    BURN_IN_DURATION_MAX                                    : 0x0084,
    BASIC_BRIGHTNESS_MODE                                   : 0x0088,
    BASIC_BRIGHTNESS_LEVEL                                  : 0x0089,
    BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           : 0x008A,
    BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       : 0x008B,
    BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       : 0x008C,
    BASIC_BRIGHTNESS_START_TIME                             : 0x008D,
    BASIC_BRIGHTNESS_END_TIME                               : 0x008E,
    BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  : 0x008F,
    NIGHT_LIGHT_FUNCTION_ENABLE                             : 0x0094,
    NIGHT_LIGHT_START_TIME                                  : 0x0095,
    NIGHT_LIGHT_END_TIME                                    : 0x0096,
    NIGHT_LIGHT_LEVEL                                       : 0x0097,
    STEPWISE_SWITCH_OFF_DELAY_ENABLE                        : 0x0098,
    STEPWISE_SWITCH_OFF_DELAY                               : 0x0099,
    STEPWISE_SWITCH_OFF_DELAY_MIN                           : 0x009A,
    STEPWISE_SWITCH_OFF_DELAY_MAX                           : 0x009B,
    STEPWISE_SWITCH_OFF_LEVEL                               : 0x009C,
    PRESENCE_SIMULATION_ENABLE                              : 0x009D,
    PRESENCE_SIMULATION_START_TIME                          : 0x009E,
    PRESENCE_SIMULATION_END_TIME                            : 0x009F,
    PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               : 0x00A0,
    CH2_CIRCUIT_LOGIC                                       : 0x0100,
    CH2_MODE                                                : 0x0101,
    HVAC_DYNAMICAL_CONTROL_ENABLE                           : 0x0102,
    HVAC_SWITCH_ON_DELAY                                    : 0x0103,
    HVAC_SWITCH_ON_DELAY_MIN                                : 0x0104,
    HVAC_SWITCH_ON_DELAY_MAX                                : 0x0105,
    HVAC_SWITCH_OFF_DELAY                                   : 0x0106,
    HVAC_SWITCH_OFF_DELAY_MIN                               : 0x0107,
    HVAC_SWITCH_OFF_DELAY_MAX                               : 0x0108,
    TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     : 0x00B0,
    ENERGY_MONITOR_CONNECTED_LOAD                           : 0x00C0,
    ENERGY_MONITOR_CONNECTED_LOAD_MIN                       : 0x00C1,
    ENERGY_MONITOR_CONNECTED_LOAD_MAX                       : 0x00C2,
    ENERGY_MONITOR_LIGHTING_DURATION                        : 0x00C3,
    ENERGY_MONITOR_LIGHTING_DURATION_MIN                    : 0x00C4,
    ENERGY_MONITOR_LIGHTING_DURATION_MAX                    : 0x00C5,
    CONTACT                                                 : 0x00D0,
    BUILDING                                                : 0x00D1,
    ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    : 0x00E0,
    ENABLE_USER_SET_SWITCH_OFF_DELAY                        : 0x00E1,
    ENABLE_USER_ENERGY_MONITOR                              : 0x00E2,
    ENABLE_USER_BASIC_BRIGHTNESS                            : 0x00E3,
    ENABLE_USER_NIGHT_LIGHT_FUNCTION                        : 0x00E4,
    ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            : 0x00E5,
    CURRENT_BRIGHTNESS                                      : 0x1020,
    IDENTIFYING_DEVICE                                      : 0x1021,
    MOVEMENT                                                : 0x1040,
    CH1_IDENTIFYING_LOAD                                    : 0x1060,
    CH1_ON_OFF_STATE                                        : 0x1061,
    CH1_CURRENT_LEVEL                                       : 0x1062,
    CH2_IDENTIFYING_LOAD                                    : 0x10A0,
    CH2_ON_OFF_STATE                                        : 0x10A1,
    CH2_CURRENT_LEVEL                                       : 0x10A2,
    TEST_MODE_ACTIVE                                        : 0x10B0,
    ACCESS_LEVEL                                            : 0x10E0,
    TEST_BOOL                                               : 0x8001,
    TEST_STRING                                             : 0x8002,
    TEST_ENUM8                                              : 0x8003,
    TEST_ENUM16                                             : 0x8004,
    TEST_TIME                                               : 0x8005,
    TEST_UINT8                                              : 0x8008,
    TEST_UINT16                                             : 0x8009,
    TEST_UINT32                                             : 0x800A,
    TEST_INT8                                               : 0x800C,
    TEST_INT16                                              : 0x800D,
    TEST_INT32                                              : 0x800E
};


/// <#Description#>
var SCCP_DATATYPES = {
    SCCP_TYPE_BOOL     : 0x01,
    SCCP_TYPE_STRING   : 0x02,
    SCCP_TYPE_ENUM8    : 0x03,
    SCCP_TYPE_ENUM16   : 0x04,
    SCCP_TYPE_TIME     : 0x05,
    SCCP_TYPE_UINT8    : 0x08,
    SCCP_TYPE_UINT16   : 0x09,
    SCCP_TYPE_UINT32   : 0x0A,
    SCCP_TYPE_UINT64   : 0x0B,
    SCCP_TYPE_INT8     : 0x0C,
    SCCP_TYPE_INT16    : 0x0D,
    SCCP_TYPE_INT32    : 0x0E,
    SCCP_TYPE_INT64    : 0x0F
}


/// <#Description#>
var SCCP_ATTRIBUTE_DATATYPES = {
   FIRMWARE_VERSION                                        :SCCP_DATATYPES.SCCP_TYPE_UINT32,
   BT_DEVICE_NAME                                          :SCCP_DATATYPES.SCCP_TYPE_STRING,
   ARTICLE_NUMBER                                          :SCCP_DATATYPES.SCCP_TYPE_STRING,
   DEVICE_TYPE                                             :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   POTENTIOMETER_MODE                                      :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   BRIGHTNESS_THRESHOLD                                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BRIGHTNESS_THRESHOLD_MIN                                :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BRIGHTNESS_THRESHOLD_MAX                                :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CONSIDER_SLAVE_BRIGHTNESS_ENABLE                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CONSTANT_LIGHT_CONTROL_ENABLE                           :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CONSTANT_LIGHT_BRIGHTNESS_SET_POINT                     :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MIN                 :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CONSTANT_LIGHT_BRIGHTNESS_SET_POINT_MAX                 :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CONSTANT_LIGHT_CONTROL_CONSIDER_SLAVE_BRIGHTNESS_ENABLE :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   SHORT_TIME_PULSE_ENABLE                                 :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   SWITCH_OFF_DELAY                                        :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   SWITCH_OFF_DELAY_MIN                                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   SWITCH_OFF_DELAY_MAX                                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   OPERATION_MODE                                          :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   SLAVE_MODE_ENABLE                                       :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   OUTDOOR_APPLICATION_ENABLE                              :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   PIR_SENSITIVITY0                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   PIR_SENSITIVITY1                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   PIR_SENSITIVITY2                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   PIR_SENSITIVITY3                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   BRIGHTNESS_CORRECTION_ENABLE                            :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   BRIGHTNESS_CORRECTION_VALUE                             :SCCP_DATATYPES.SCCP_TYPE_INT16,
   DYNAMIC_SWITCH_OFF_DELAY_ENABLE                         :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_CIRCUIT_LOGIC                                       :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   CH1_PERMANENT_ON_DURATION                               :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CH1_PERMANENT_ON_DURATION_MIN                           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CH1_PERMANENT_ON_DURATION_MAX                           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CH1_PERMANENT_OFF_DURATION                              :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CH1_PERMANENT_OFF_DURATION_MIN                          :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CH1_PERMANENT_OFF_DURATION_MAX                          :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   SOFT_ON_ENABLE                                          :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   SOFT_ON_DURATION                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   SOFT_ON_DURATION_MIN                                    :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   SOFT_ON_DURATION_MAX                                    :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   SOFT_OFF_ENABLE                                         :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   SOFT_OFF_DURATION                                       :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   SOFT_OFF_DURATION_MIN                                   :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   SOFT_OFF_DURATION_MAX                                   :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   PHASE_CUT_MODE                                          :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   CH1_MEMORY_FUNCTION_ENABLE                              :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   DELIMIT_LIGHTING_LEVEL_ENABLE                           :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_MIN_LEVEL_ENABLE                                    :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_MIN_LEVEL                                           :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   CH1_MAX_LEVEL_ENABLE                                    :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_MAX_LEVEL                                           :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   LEVEL_MIN                                               :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   LEVEL_MAX                                               :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   DALI_POWER_ON_LEVEL                                     :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   COLOR_TEMPERATURE                                       :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   COLOR_TEMPERATURE_MIN                                   :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   COLOR_TEMPERATURE_MAX                                   :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BURN_IN_ENABLE                                          :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   BURN_IN_MODE                                            :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   BURN_IN_DURATION                                        :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   BURN_IN_DURATION_MIN                                    :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   BURN_IN_DURATION_MAX                                    :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   BASIC_BRIGHTNESS_MODE                                   :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   BASIC_BRIGHTNESS_LEVEL                                  :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MIN       :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BASIC_BRIGHTNESS_AMBIENT_BRIGHTNESS_THRESHOLD_MAX       :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   BASIC_BRIGHTNESS_START_TIME                             :SCCP_DATATYPES.SCCP_TYPE_TIME,
   BASIC_BRIGHTNESS_END_TIME                               :SCCP_DATATYPES.SCCP_TYPE_TIME,
   BASIC_BRIGHTNESS_ASTRO_FUNCTION_ENABLE                  :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   NIGHT_LIGHT_FUNCTION_ENABLE                             :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   NIGHT_LIGHT_START_TIME                                  :SCCP_DATATYPES.SCCP_TYPE_TIME,
   NIGHT_LIGHT_END_TIME                                    :SCCP_DATATYPES.SCCP_TYPE_TIME,
   NIGHT_LIGHT_LEVEL                                       :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   STEPWISE_SWITCH_OFF_DELAY_ENABLE                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   STEPWISE_SWITCH_OFF_DELAY                               :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   STEPWISE_SWITCH_OFF_DELAY_MIN                           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   STEPWISE_SWITCH_OFF_DELAY_MAX                           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   STEPWISE_SWITCH_OFF_LEVEL                               :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   PRESENCE_SIMULATION_ENABLE                              :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   PRESENCE_SIMULATION_START_TIME                          :SCCP_DATATYPES.SCCP_TYPE_TIME,
   PRESENCE_SIMULATION_END_TIME                            :SCCP_DATATYPES.SCCP_TYPE_TIME,
   PRESENCE_SIMULATION_ASTRO_FUNCTION_ENABLE               :SCCP_DATATYPES.SCCP_TYPE_TIME,
   CH2_CIRCUIT_LOGIC                                       :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   CH2_MODE                                                :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   HVAC_DYNAMICAL_CONTROL_ENABLE                           :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   HVAC_SWITCH_ON_DELAY                                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   HVAC_SWITCH_ON_DELAY_MIN                                :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   HVAC_SWITCH_ON_DELAY_MAX                                :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   HVAC_SWITCH_OFF_DELAY                                   :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   HVAC_SWITCH_OFF_DELAY_MIN                               :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   HVAC_SWITCH_OFF_DELAY_MAX                               :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   TEST_MODE_DEACTIVATE_OUTPUTS_ENABLE                     :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENERGY_MONITOR_CONNECTED_LOAD                           :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   ENERGY_MONITOR_CONNECTED_LOAD_MIN                       :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   ENERGY_MONITOR_CONNECTED_LOAD_MAX                       :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   ENERGY_MONITOR_LIGHTING_DURATION                        :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   ENERGY_MONITOR_LIGHTING_DURATION_MIN                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   ENERGY_MONITOR_LIGHTING_DURATION_MAX                    :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   CONTACT                                                 :SCCP_DATATYPES.SCCP_TYPE_STRING,
   BUILDING                                                :SCCP_DATATYPES.SCCP_TYPE_STRING,
   ENABLE_USER_SET_BRIGHTNESS_THRESHOLD                    :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENABLE_USER_SET_SWITCH_OFF_DELAY                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENABLE_USER_ENERGY_MONITOR                              :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENABLE_USER_BASIC_BRIGHTNESS                            :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENABLE_USER_NIGHT_LIGHT_FUNCTION                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ENABLE_USER_COLOR_TEMPERATURE_CONTROL_ENABLE            :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CURRENT_BRIGHTNESS                                      :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   IDENTIFYING_DEVICE                                      :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   MOVEMENT                                                :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_IDENTIFYING_LOAD                                    :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_ON_OFF_STATE                                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH1_CURRENT_LEVEL                                       :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   CH2_IDENTIFYING_LOAD                                    :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH2_ON_OFF_STATE                                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   CH2_CURRENT_LEVEL                                       :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   TEST_MODE_ACTIVE                                        :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   ACCESS_LEVEL                                            :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   TEST_BOOL                                               :SCCP_DATATYPES.SCCP_TYPE_BOOL,
   TEST_STRING                                             :SCCP_DATATYPES.SCCP_TYPE_STRING,
   TEST_ENUM8                                              :SCCP_DATATYPES.SCCP_TYPE_ENUM8,
   TEST_ENUM16                                             :SCCP_DATATYPES.SCCP_TYPE_ENUM16,
   TEST_TIME                                               :SCCP_DATATYPES.SCCP_TYPE_TIME,
   TEST_UINT8                                              :SCCP_DATATYPES.SCCP_TYPE_UINT8,
   TEST_UINT16                                             :SCCP_DATATYPES.SCCP_TYPE_UINT16,
   TEST_UINT32                                             :SCCP_DATATYPES.SCCP_TYPE_UINT32,
   TEST_INT8                                               :SCCP_DATATYPES.SCCP_TYPE_INT8,
   TEST_INT16                                              :SCCP_DATATYPES.SCCP_TYPE_INT16,
   TEST_INT32                                              :SCCP_DATATYPES.SCCP_TYPE_INT32
};
