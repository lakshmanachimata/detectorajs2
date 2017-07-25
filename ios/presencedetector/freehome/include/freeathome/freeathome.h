#ifndef FREEATHOME_H
#define FREEATHOME_H

#include "fh_cglobals.h"
#include <stdarg.h>

#ifdef __cplusplus
extern "C" {
#endif

#define FH_CRYPTO_EXTRA_BYTES_IN_BLOCK (24+16)
#define FH_CRYPTO_MAC_LENGTH (16)
#define FH_CRYPTO_PRIVATE_KEY_BYTE_LENGTH 32
#define FH_CRYPTO_PUBLIC_KEY_BYTE_LENGTH 32
#define FH_CRYPTO_SYMMETRIC_KEY_BYTE_LENGTH 32
#define FH_CRYPTO_HASH_BYTE_LENGTH 64

#define FH_SYSAP_LEGACY 1 // the sysap does not support our proxy mode (version < 1.3.2)
#define FH_SYSAP_HIDESPLASHSCREEN 2 // sysap sends hidesplashscreen after loading html data
#define FH_SYSAP_INITIAL 4 // uninitialized sysap - setup wizard needed
#ifdef FH_STATIC
#define FHSPEC
#else
#ifdef WIN32
#ifdef FH_BUILD_DLL
#define FHSPEC __declspec(dllexport)
#else
#define FHSPEC __declspec(dllimport)
#endif
#else
#define FHSPEC
#endif
#endif

typedef enum
{
    FH_LL_DEBUG = 0,
    FH_LL_INFO,
    FH_LL_WARN,
    FH_LL_ERROR,
    FH_LL_FATALERROR,
} fh_log_level;


typedef enum
{
    // Libfreeathome finished initializing.
    FH_EVENT_INITIALIZED = 0,

    // sent after call to fh_stop(), you should call fh_destroy() to finish libfreeathome
    FH_EVENT_STOPPED = 100,

    // A sysap was found via ssdp (upnp) or in the cloud (see fh_start_scanning).
    // data.m_pointer
    //   A pointer to a fh_sysap_info object containing information about the
    //   found sysap.
    // data.m_string
    //   If not empty, this is the uuid (ssid node) of a cloud sysap. If empty
    //   (data.m_string[0] == 0) this is a sysap found via ssdp in the local network
    //
    // NOTE: The fh_sysap_info object is destroyed when control leaves the scope of the
    //       event notification function.
    FH_EVENT_SYSAP_APPEARED = 1,

    // A local or cloud sysap disappeared.
    // data.m_string
    //   For local sysaps, this is the serial number of the sysap, for cloud sysaps
    //   it is the node of the sysap's cloud jid.
    FH_EVENT_SYSAP_DISAPPEARED = 2,

    // The library is connecting to a xmpp server.
    FH_EVENT_CONNECTING = 3,

    // The library is connected to the desired xmpp server.
    FH_EVENT_CONNECTED = 4,

    // Connecting to xmpp server failed.
    // data.m_error
    //   Reason why the connection attempt failed.
    FH_EVENT_CONNECT_FAILED = 5,

    // Connection succeeded or failed.
    // data.m_error
    //   FH_ERR_OK on success, otherwise the reason for the failed authentication.
    FH_EVENT_AUTH = 6,

    // The library disconnected from the xmpp server.
    // data.m_error
    //   FH_ERR_OK if the disconnect was intended, otherwise the reason for the unwanted disconnect.
    // data.m_string
    //   Unlocated detail reason in case of unintended connects for easier debugging.
    FH_EVENT_DISCONNECTED = 7,

    // fh_select_sysap succeeded
    FH_EVENT_SYSAP_SELECTED = 8,

    // A new cloud contact vcard was received.
    // data.m_pointer
    //  fh_contact* describing the new contact.
    FH_EVENT_NEW_CONTACT = 9,

    // A known cloud contact (FIXME) has been removed. (NOTE: currently not supported by the cloud server)
    FH_EVENT_CONTACT_REMOVED = 10,

    // A contact has changed its state to online/visible.
    // data.m_string
    //   The contact's bare jid.
    FH_EVENT_CONTACT_ONLINE = 11,

    // A contact has changed its state to offline.
    // data.m_string
    //   The contact's bare jid.
    FH_EVENT_CONTACT_OFFLINE = 12,


    FH_EVENT_SYSTEM_STATE_STORED = 13,
    FH_EVENT_RESUME = 14,

    // frontend download
    FH_EVENT_DOWNLOAD_STARTED = 15,
    FH_EVENT_DOWNLOAD_ENDED = 16, // with or without error code
    FH_EVENT_DOWNLOAD_PROGRESS = 17,

    // proxy
    FH_EVENT_PROXY_STARTED = 18,
    FH_EVENT_PROXY_STOPPED = 19,
    FH_EVENT_PROXY_XMPP_CONNECTED = 20,
    FH_EVENT_PROXY_XMPP_DISCONNECTED = 21,

    // sysap info
    FH_EVENT_SYSAP_INFO = 22,

    // A getall has been received from the sysap.
    // data.m_int64
    //   The id of the received state (see fh_sysap_get_state_by_id).
    // NOTE: FH_CCF_MANAGE_STATE must be set in m_flags of fh_connect_config to receive this event.
    FH_EVENT_SYSAP_RELOAD = 23,

    // A update has been received from the sysap.
    // data.m_int64
    //   The id of the received state (see fh_sysap_get_state_by_id).
    // NOTE: FH_CCF_MANAGE_STATE must be set in m_flags of fh_connect_config to receive this event.
    FH_EVENT_SYSAP_UPDATE = 24,

    // pairing
    FH_EVENT_PAIRING_STARTED = 25,
    FH_EVENT_PAIRING_FINISHED = 26,

    // certificate handling
    FH_EVENT_CERT_CREATING = 28,

    // fh_cert_create finished
    // data.m_error
    //   FH_ERR_OK if the certificate creation succeeded, otherwise an error code.
    FH_EVENT_CERT_CREATE_RESULT = 29,
    FH_EVENT_CERT_RENEWING = 30,

    // fh_cert_renew finished
    // data.m_error
    //   FH_ERR_OK if the renewal succeded, otherwise an error code.
    FH_EVENT_CERT_RENEW_RESULT = 31,
    FH_EVENT_CERT_REVOKING = 32,

    // fh_cert_revoke finished
    // data.m_error
    //   FH_ERR_OK if the operation succeded, otherwise an error code.
    //
    // NOTE: m_error will be FH_ERR_OK if the certificate is invalid and thus cannot be revoked by the
    //       internet service platform.
    FH_EVENT_CERT_REVOKE_RESULT = 33,
//    FH_EVENT_CERT_ERROR = 33,  DEPRECATED

    // push notification command result
    FH_EVENT_SEND_DEVICE_INFO_RESULT = 34,

    // shell exec result
    FH_EVENT_EXEC_RESULT = 35,


    // rpc result
    // data.m_error
    //   FH_ERR_OK after a successful rpc call, otherwise an error code
    // data.m_string
    //   the id of the rpc call
    // data.m_pointer
    //   fh_argument containing the return value (optional)
    FH_EVENT_RPC_RESULT = 36,

    // vbus
    FH_EVENT_VBUS = 37,

    // push notification command result (2)
    FH_EVENT_SEND_PUSH_NOTIFICATION_RESULT = 38,  /* Only the first send attempt triggers an event: On error, the lib *may* attempt to re-try later */
    FH_EVENT_SEND_EMAIL_NOTIFICATION_RESULT = 39, /* Only the first send attempt triggers an event: On error, the lib *may* attempt to re-try later */

    // exchange keys before pairing
    FH_EVENT_KEY_EXCHANGE_FINISHED = 40,

    // Sent before a sequence of FH_EVENT_SYSAP_RELOAD / FH_EVENT_SYSAP_UPDATE events are emitted
    FH_EVENT_SYSAP_UPDATE_SEQUENCE_START = 41,

    // Sent after a sequence of FH_EVENT_SYSAP_RELOAD / FH_EVENT_SYSAP_UPDATE events are emitted
    FH_EVENT_SYSAP_UPDATE_SEQUENCE_END = 42,

    // Send after each successful cloud xmpp connection
    // data.m_pointer
    //   Pointer to fh_subscription_info struct
    FH_EVENT_SUBSCRIPTION_INFO = 43,

    // Sent as result for each fh_query_sysap_info call
    // data.m_error
    //   query result
    // data.m_pointer
    //   if data.m_error == FH_ERR_OK, a pointer to a fh_sysap_info struct
    FH_EVENT_SYSAP_QUERY_RESULT = 44,

    // sms notification command result
    FH_EVENT_SEND_SMS_NOTIFICATION_RESULT = 45, /* Only the first send attempt triggers an event: On error, the lib *may* attempt to re-try later */

} fh_event;

//void setCloudCredentials(const QString& user, const QString& pwd);
//void cloudState();

typedef enum
{
    FH_ERR_OK = 0, // NOTE: never change the order of error codes since they are transfered via network
    FH_ERR_GENERIC = 1,
    FH_ERR_VERSION = 2,
    FH_ERR_SRVLOOKUPFAILED = 3,
    FH_ERR_NOCONN = 4,
    FH_ERR_AUTH = 5,
    FH_ERR_CSRGEN = 6,
    FH_ERR_NOCERT = 7,
    FH_ERR_CERTNOJID = 8,
    FH_ERR_NOPRIVATEKEY = 9,
    FH_ERR_CERTEXPIRED = 10,
    FH_ERR_PRIVATEKEYGEN = 11,
    FH_ERR_BUFTOOSMALL = 12,
    FH_ERR_INVALIDBUFSIZE = 13,
    FH_ERR_NAMEINUSE = 14,
    FH_ERR_NOAUTH = 15,
    FH_ERR_TIMEOUT = 16,
    FH_ERR_WAIT = 17,
    FH_ERR_LEGACY = 18,
    FH_ERR_CRYPTERROR = 19,
    FH_ERR_DOWNLOADFAILED = 20,
    FH_ERR_USER_ABORT = 21,
    FH_ERR_AUTHLOCKED = 22,
    FH_ERR_NOTFOUND = 23,
    FH_ERR_INVALIDCODE = 24,
    FH_ERR_ALREADYTHERE = 25,
    FH_ERR_TYPEERROR = 26,
    FH_ERR_INVALIDARGS = 27,
    FH_ERR_INDEXOUTOFRANGE = 28,
    FH_ERR_SSL = 29,
    FH_ERR_METHODNOTFOUND = 30,
    FH_ERR_NOSUBSCRIPTION = 31,
    FH_ERR_CLOUDCONNECTIONLOCKED = 32,
    FH_ERR_CLOUDCONNECTIONLOCKEDRETRY = 33,
    FH_ERR_MISSING_UPDATE_SEQUENCE = 34,
    FH_ERR_NOTPAIRED = 35,
    FH_ERR_CRYPTOCONTEXTDISABLED = 36,
} fh_error;

typedef enum
{
    FH_RES_OK,
    FH_RES_ERROR,
    FH_RES_AGAIN,
    FH_RES_NOMOREENTRIES,
    FH_RES_DIRTY,
} fh_result;

typedef enum
{
    FH_TYPE_MODEL,
    FH_TYPE_FLOOR,
    FH_TYPE_ROOM,
    FH_TYPE_DEVICE,
    FH_TYPE_CHANNEL,
    FH_TYPE_DATAPOINT,
    FH_TYPE_FUNCTION,
    FH_TYPE_PARAMETER,
    FH_TYPE_PARAMETER_OPTION
} fh_object_type;

typedef enum
{
    FH_PARAM_TYPE_FLOAT,
    FH_PARAM_TYPE_SIGNED,
    FH_PARAM_TYPE_UNSIGNED,
    FH_PARAM_TYPE_ENUM
} fh_parameter_type;

typedef enum
{
    FH_CONSTAGE_CONNECTING,
    FH_CONSTAGE_SECURING,
} fh_connect_stage;


typedef struct
{
    fh_error m_error;
    const char* m_string;
    float m_float;
    fh_int64 m_int64;
    void* m_pointer;
} fh_event_data;


typedef enum
{
    FH_CCS_NOT_FOUND,
    FH_CCS_EXIST,
    FH_CSS_HASOTHERSPUBLICKEY,
    FH_CCS_ENABLED,
} fh_crypto_context_state;


// fh_config::m_flags
#define FH_CF_DEVICE_TYPE_PHONE             0x00000001
#define FH_CF_DEVICE_TYPE_TABLET            0x00000002
#define FH_CF_DEVICE_TYPE_MASK              0x0000000f

#define FH_CF_PLATFORM_IOS                  0x00000010
#define FH_CF_PLATFORM_ANDROID              0x00000020
#define FH_CF_PLATFORM_WINDOWS              0x00000030
#define FH_CF_PLATFORM_MASK                 0x000000f0

#define FH_CF_COMPANY_ABB                   0x00000100
#define FH_CF_COMPANY_BUSCHJAEGER           0x00000200
#define FH_CF_COMPANY_MASK                  0x00000f00

#define FH_CF_APPLICATION_OTHER             0x00000000
#define FH_CF_APPLICATION_SYSAP             0x00001000
#define FH_CF_APPLICATION_FREEATHOME        0x00002000
#define FH_CF_APPLICATION_PRESENCEDETECTOR  0x00003000
#define FH_CF_APPLICATION_MASK              0x0000f000

#define FH_CF_SANDBOX_PUSH                  0x00010000 // use sandbox server for push messages
#define FH_CF_CLEAR_CACHED_STATE            0x00020000 // don't use stored getall


// fh_connect_config::m_flags
#define FH_CCF_CLOUD             0x00000001 // connect using the cloud
#define FH_CCF_SWITCHING         0x00000002 
#define FH_CCF_DOWNLOAD_FRONTEND 0x00000004 // download frontend package file if none is stored local or a newer one is available
#define FH_CCF_SET_PASSWORD      0x00000008 // set password for uninitialized user
#define FH_CCF_RESET_STATE       0x00000010 // don't use stored getall
#define FH_CCF_LOG_XMPP_STREAM   0x00000020 // log xmpp stream to and from server
#define FH_CCF_LOG_PROXY_STREAM  0x00000040 // log proxy xmpp stream to and from frontend
#define FH_CCF_MANAGE_STATE      0x00000080 // libfreeathome will request a getAll() and register for state updates
#define FH_CCF_SEND_VBUS_EVENTS  0x00000100 // register for vbus events (see FH_EVENT_VBUS) 
#define FH_CCF_SERVE_WEBVIEW     0x00000200 // internal use

typedef void fh_context;
typedef void fh_argument;
typedef void (*fh_event_callback) (fh_context* ctx, fh_event event, const fh_event_data* data, void* user_ptr);
typedef void (*fh_log_function)(fh_log_level level, const char* msg, const char* file, int line, void* user_ptr);

typedef struct
{
    fh_uint32 m_flags; // see FH_CF_ flags
    const char* m_language; // 'en', 'de', 'fr' ...
    const char* m_ca_path; // optional path containing ca certificates in openssl usable way (see c_rehash)
    const char* m_writable_app_data_dir; // app writable directory (should be private if available)
    const char* m_certificate_path; // path to client certificate in pem format
    const char* m_private_key_path; // path to private key in pem format
    const char* m_cloud_domain; // cloud domain: will be prefixed by _xmpp-client_tcp.xmpp for srv record lookup
    const char* m_fullstate_path; // path to read/store the latest full state (getall) from the sysap. if null [m_writable_app_datadir]/state.full will be used
    const char* m_app_instance_id; // id used in the getall/storeState call for the sysap to decide which state it could throw away
    // callback
    fh_event_callback m_event_callback;
    void* m_event_user_ptr;
} fh_config;

typedef struct
{
    fh_bool m_full;
    fh_int64 m_state_id;
    const char* m_xml;
} fh_sysap_state;

typedef struct
{
    const char* m_name;
    const char* m_jid;
    const char* m_role;
    fh_bool m_initial;
} fh_sysap_user;

typedef struct
{
    const char* m_version_string;
    fh_uint32 m_version[4]; // major, minor, revision, build
    const char* m_locale;
    const char* m_name;
    const char* m_address;
    const char* m_serial;
    const char* m_usn; // upnp usn: only valid in FH_EVENT_SYSAP_APPEARED
    fh_uint32 m_flags; // see FH_SYSAP_*
    int m_user_count;
    fh_sysap_user* m_users;
    fh_bool m_have_frontend_package;
    void* m_user_pointer;
} fh_sysap_info;

typedef struct
{
    const char* m_jid; // bare jid of the contact
    const char* m_serial; // sysap serial if known (app only)
    const char* m_friendly_name;
} fh_contact;

typedef struct
{
    fh_uint32 m_flags;
    fh_uint64 m_restore_state;
    const char* m_host;
    fh_uint16 m_port;
    const char* m_user;
    const char* m_password;
    const char* m_cloud_user;
    const char* m_friendly_device_name;
    const char* m_cloud_domain; // will be used instead of fh_config.m_cloud_domain if != "" and != nullptr
    const char* m_oauth2_token;
    const char* m_p2p_crypto_data;
} fh_connect_config;

// certificate handling
typedef struct
{
    int m_days_valid;
    const char* m_friendly_device_name;
    const char* m_device_uuid;
    const char* m_client_type_name;
    const char* m_cert_uuid;

    // certificate request subject name fields
    const char* m_cert_country; // 'C' COUNTRY (eg. 'DE')
    const char* m_cert_state; // 'ST' STATE (eg. 'NRW')
    const char* m_cert_locality; // 'L' LOCALITY (eg. 'Dortmund')
    const char* m_cert_organisation; // 'O' ORGANISATION (eg. 'ABB')
    const char* m_cert_organisational_unit; // 'OU'  ORGANISATIONAL UNIT (eg. '')
    const char* m_cert_common_name; // 'CN' COMMON NAME (eg 'Busch-Jaeger Elektro GmbH')
} fh_cert_info;

typedef enum
{
    FH_SUBSCRIPTION_NONE,
    FH_SUBSCRIPTION_TRIAL,
    FH_SUBSCRIPTION_SUBSCRIPTION,
    FH_SUBSCRIPTION_OTHER,
}fh_subscription_type;

typedef struct
{
    fh_subscription_type m_type;
    const char* m_start_date;
    const char* m_end_date;
    int32_t m_days_left;
} fh_subscription_info;

// logging
void fh_set_log_function(fh_log_function func, void* user_ptr);
void fh_set_log_level(fh_log_level log_level);
void fh_log(fh_log_level log_level, const char* filename, int line, const char* message, ...)
#ifdef __GNUC__
    __attribute__((format(printf, 4, 5)))
#endif
    ;

// struct helper functions
// fh_clear_*: frees the contents of the struct NOT the struct itself
// fh_delete_*: frees the contents of the struct AND the struct itself
// fh_copy_*: copys the struct and all its contents
FHSPEC void fh_clear_config(fh_config* config);
FHSPEC void fh_delete_config(fh_config* config);
FHSPEC fh_config* fh_copy_config(const fh_config* config);

FHSPEC void fh_clear_connect_config(fh_connect_config* config);
FHSPEC void fh_delete_connect_config(fh_connect_config* config);
FHSPEC fh_connect_config* fh_copy_connect_config(const fh_connect_config* config);

FHSPEC void fh_clear_sysap_info(fh_sysap_info* info);
FHSPEC void fh_delete_sysap_info(fh_sysap_info* info);
FHSPEC fh_sysap_info* fh_copy_sysap_info(const fh_sysap_info* info);

FHSPEC void fh_clear_cert_info(fh_cert_info* info);
FHSPEC void fh_delete_cert_info(fh_cert_info* info);
FHSPEC fh_cert_info* fh_copy_cert_info(const fh_cert_info* info);

FHSPEC void fh_clear_subscription_info(fh_subscription_info* info);
FHSPEC void fh_delete_subscription_info(fh_subscription_info* info);
FHSPEC fh_subscription_info* fh_copy_subscription_info(const fh_subscription_info* info);


FHSPEC fh_context* fh_init(fh_config* config);
FHSPEC void fh_stop(fh_context* ctx);
FHSPEC void fh_destroy(fh_context* ctx);

// scan for sysaps
FHSPEC void fh_start_scanning(fh_context* ctx, fh_bool local, fh_bool cloud);
FHSPEC void fh_stop_scanning(fh_context* ctx);

void fh_query_sysap_info(fh_context* ctx, fh_bool cloud, const char* host_or_jid, uint32_t timeout_seconds, int64_t user_data);
FHSPEC void fh_delete_frontend_packages(fh_context* ctx, const char** keep_versions, int version_count);

FHSPEC void fh_connect(fh_context* ctx, fh_connect_config* config);
FHSPEC void fh_disconnect(fh_context* ctx, fh_bool keep_state);

FHSPEC void fh_store_state(fh_context* ctx); // will disconnect too

// in local connect mode this call requests a getAll from the sysap if FH_CCF_MANAGE_STATE is enabled,
// otherwise this is a noop
// in cloud mode this will initiate authorization on the given sysap
FHSPEC void fh_select_sysap(fh_context* ctx, const char* jid);
FHSPEC void fh_exec(fh_context* ctx, const char* command);
FHSPEC void fh_set_ping_time(fh_context* ctx, uint32_t ping_time_ms); // ping_time_ms 0 disabled ping

// connection to cloud must be established
FHSPEC void fh_pair_exchange_keys(fh_context* ctx, const char* sysap_cloud_uuid);
FHSPEC void fh_pair_send_auth(fh_context* ctx, const char* sysap_cloud_uuid, const char* code);

FHSPEC void fh_sysap_set_datapoint_value(fh_context* ctx, const char* serial, const char* value);

FHSPEC void fh_start_proxy(fh_context* ctx, const char* password);
FHSPEC void fh_proxy_accept_login(fh_context* ctx);
FHSPEC void fh_proxy_reject_login(fh_context* ctx);

FHSPEC fh_bool fh_poll(fh_context* ctx);
FHSPEC void fh_wait_for_events(fh_context* ctx, int wait_milliseconds);
FHSPEC void fh_handle_events(fh_context* ctx, int wait_milliseconds);

// Checks if the current certificate is valid and returns certifiate information.
// ctx:
//  The context created using fh_init()
// cert_info
//  Optional pointer to a fh_cert_info pointer to be filled in with a pointer to an fh_cert_info
//  structure.
//
// If the function returns FH_ERR_OK or FH_ERR_EXPIRED, cert_info contains
// information about the certificate. The caller is responsible for cleaning up
// the fh_cert_info structure using fh_delete_cert_info()
FHSPEC fh_error fh_cert_check(fh_context* ctx, fh_cert_info** cert_info);

// Creates a certificate signing request and sends it to the internet service platform for signing.
// ctx:
//   the context created using fh_init()
// cloud_user:
//   my.abb-livingspace / my.busch-jaeger username
// cloud_password:
//   my.abb-livingspace / my.busch-jeager password
// cert_info:
//   The values of m_friendly_device_name, m_device_uuid, m_cert_country and m_cert_common_name must be set
//   up to create a valid certificate. Optionally m_cert_state, m_cert_locality, m_cert_organisation, m_cert_originasational_unit
//   may be used. Other members of this struct will be ignored by fh_cert_create.
//
// fh_cert_create is executed asynchronously. FH_EVENT_CERT_CREATE_RESULT will be emitted after the operation finished. On
// success, the resulting certificate and the private key can be found in the locations given to fh_init (m_certificate_path,
// m_private_key_path).
FHSPEC void fh_cert_create(fh_context* ctx, const char* cloud_user, const char* cloud_password, const fh_cert_info* cert_info);

// Asks the internet service platform to renew a valid certificate.
// ctx:
//   The context created using fh_init()
//
// This function asynchronously sends a certificate renewal request to the internet service platform and emits FH_EVENT_CERT_RENEW_RESULT
// afterwards.
FHSPEC void fh_cert_renew(fh_context* ctx);

// Asks the internet service platform to revoke a valid certificate.
// ctx:
//   The context created using fh_init()
//
// Anynchronoulsy sends a certificate revoke request to the internet service platform and emits FH_EVENT_CERT_REVOKE_RESULT aferwards.
FHSPEC void fh_cert_revoke(fh_context* ctx);


// push notifications
FHSPEC void fh_send_device_info(fh_context* ctx, const char* push_id, const char* software_version);
FHSPEC void fh_send_push_notification(fh_context* ctx, const char* receivers[], int receiver_count, const char* msg, const char* payload[], int payload_key_value_count, int severity);
FHSPEC void fh_send_email_notification(fh_context* ctx, const char* receivers[], int receiver_count, const char* subject, const char* message, int severity);
FHSPEC void fh_send_sms_notification(fh_context* ctx, const char* receivers[], int receiver_count, const char* subject, const char* message, int severity);

// access sysap states
// NOTE: the returned state is valid until the next call to one of the three functions
FHSPEC fh_result fh_sysap_get_first_state(fh_context* ctx, fh_sysap_state* state);
FHSPEC fh_result fh_sysap_get_next_state(fh_context* ctx, fh_sysap_state* state);
FHSPEC fh_result fh_sysap_get_state_by_id(fh_context* ctx, fh_int64 state_id, fh_sysap_state* state);
FHSPEC void fh_sysap_state_free(fh_context* ctx);

FHSPEC void fh_sysap_set_datapoint_value(fh_context* ctx, const char* serial, const char* value);

// crypto
typedef void fh_crypto_context;



// creates a disabled crypto context with a new key pair
FHSPEC fh_error fh_create_crypto_context(fh_context* ctx, const char* name);
FHSPEC fh_error fh_set_others_public_key(fh_context* ctx, const char* name, const fh_uint8* public_key, int public_key_length);
FHSPEC fh_error fh_get_our_public_key(fh_context* ctx, const char* name, fh_uint8* public_key, int public_key_length);
FHSPEC fh_error fh_delete_crypto_context(fh_context* ctx, const char* name);
FHSPEC fh_error fh_delete_all_crypto_contexts(fh_context* ctx, const char** keepNames, int nameCount);
FHSPEC fh_error fh_enable_crypto_context(fh_context* ctx, const char* name);
FHSPEC fh_error fh_unlock_crypto_context(fh_context* ctx, const char* name);
FHSPEC fh_crypto_context_state fh_get_crypto_context_state(fh_context* ctx, const char* name);

FHSPEC fh_error fh_crypto_set_user_data(fh_context* ctx, const char* name, fh_uint64 userdata);
FHSPEC fh_error fh_crypto_get_user_data(fh_context* ctx, const char* name, fh_uint64* userdata);
FHSPEC fh_error fh_crypto_context_by_user_data(fh_context* ctx, fh_uint64 uderdata, char* name);


FHSPEC fh_error fh_get_auth_salt(fh_context* ctx, const char* name, char* salt, int buf_len);
FHSPEC fh_error fh_create_auth_hash(fh_context* ctx, const char* name, const char* salt, fh_uint8* hash, int hash_length);
FHSPEC fh_error fh_verify_auth_hash(fh_context* ctx, const char* name, const char* salt, const fh_uint8* hash, int hash_length, int* tries_left);

FHSPEC fh_error fh_use_crypto_context(fh_context* ctx, fh_crypto_context** cctx, const char* name);

// assymetric encryption/decryption
FHSPEC fh_error fh_asymmetric_encrypt(fh_context* ctx, fh_crypto_context* cctx, const fh_uint8* input, int input_length, fh_uint8* output, int* output_buf_size);
FHSPEC fh_error fh_asymmetric_decrypt(fh_context* ctx, fh_crypto_context* cctx, const fh_uint8* input, int input_length, fh_uint8* output, int* output_buf_size);

FHSPEC fh_error fh_get_crypto_context(fh_context* ctx, const char* name, fh_crypto_context **cctx);

// NOTE: the crypted data needs 16 bytes more space than the unencrypted, output_buf_size must be exactly the size needed, otherwise FH_ERR_INVALIDARGS are returned
FHSPEC fh_error fh_asymmetric_encrypt2(fh_context* ctx, fh_crypto_context* cctx, const uint8_t* nonce, const uint8_t* input, int input_length, uint8_t* output, int output_buf_size);
FHSPEC fh_error fh_asymmetric_decrypt2(fh_context* ctx, fh_crypto_context* cctx, const uint8_t* nonce, const uint8_t* input, int input_length, uint8_t* output, int output_buf_size);

// symmetric encryption/decryption
FHSPEC fh_error fh_symmetric_create_key(fh_context* ctx);
FHSPEC fh_error fh_symmetric_set_key(fh_context* ctx, fh_uint8* key, int key_length);
FHSPEC fh_error fh_symmetric_get_key(fh_context* ctx, fh_uint8* key, int key_length);

FHSPEC fh_error fh_symmetric_encrypt(fh_context* ctx, const fh_uint8* input, int input_length, fh_uint8* output, int* output_buf_size);
FHSPEC fh_error fh_symmetric_decrypt(fh_context* ctx, const fh_uint8* input, int input_length, fh_uint8* output, int* output_buf_size);

FHSPEC char* fh_list_crypto_contexts(fh_context* ctx);

// file download helper
FHSPEC void fh_download_speech_file(fh_context* ctx, const char* lang, int version);
FHSPEC void fh_abort_speech_file_download(fh_context* ctx);

// helper and debug functions
FHSPEC const char* fh_event_name(fh_event event);

// rpc calls
FHSPEC fh_bool fh_call(fh_context* ctx, const char* callID, const char* methodName, fh_argument* args);

// valid types for the variable argument functions are:
// int: "%d"
// double: "%f"
// string (const char*, utf8 encoded): "%s"
// bool: "%b"
FHSPEC fh_bool fh_call_args(fh_context* ctx, const char* callID, const char* methodName, const char* args, ...);
FHSPEC fh_bool fh_call_vargs(fh_context* ctx, const char* callID, const char* methodName, const char* args, va_list lst);

// rpc arguments
FHSPEC fh_argument* fh_arg_create_int(fh_context* ctx, int value);
FHSPEC fh_argument* fh_arg_create_double(fh_context* ctx, double value);
FHSPEC fh_argument* fh_arg_create_bool(fh_context* ctx, fh_bool value);
FHSPEC fh_argument* fh_arg_create_string(fh_context* ctx, const char* value);
FHSPEC fh_argument* fh_arg_create_array(fh_context* ctx);
FHSPEC fh_argument* fh_arg_create_struct(fh_context* ctx);
FHSPEC void fh_delete_arg(fh_argument* args);

FHSPEC fh_error fh_arg_get_int(fh_argument* arg, int* value);
FHSPEC fh_error fh_arg_get_double(fh_argument* arg, double* value);
FHSPEC fh_error fh_arg_get_bool(fh_argument* arg, fh_bool* value);
FHSPEC fh_error fh_arg_get_string(fh_argument* arg, const char** value);
FHSPEC fh_error fh_arg_array_add_arg(fh_argument* arg, fh_argument* value);
FHSPEC fh_error fh_arg_array_get_size(fh_argument* arg, int* size);
FHSPEC fh_error fh_arg_array_get_arg(fh_argument* arg, int index, fh_argument** value);
FHSPEC fh_error fh_arg_struct_add_arg(fh_argument* arg, const char* name, fh_argument* value);
FHSPEC fh_error fh_arg_struct_get_size(fh_argument* arg, int* size);
FHSPEC fh_error fh_arg_struct_get_name(fh_argument* arg, int index, const char** name);
FHSPEC fh_error fh_arg_struct_get_arg_by_index(fh_argument* arg, int index, fh_argument** value);
FHSPEC fh_error fh_arg_struct_get_arg_by_name(fh_argument* arg, const char* name, fh_argument** value);

#ifdef __cplusplus
} // extern "C"
#endif

#endif


