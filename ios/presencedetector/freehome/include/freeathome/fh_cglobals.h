//
//  fh_cglobals.h
//  xmpptest
//
//  Created by christoph on 23.01.15.
//  Copyright (c) 2015 christoph. All rights reserved.
//

#ifndef FH_CGLOBALS_H
#define FH_CGLOBALS_H

#include <stdint.h>

#ifdef __cplusplus
extern "C" {
#endif


typedef unsigned char fh_bool;
typedef int8_t fh_int8;
typedef int16_t fh_int16;
typedef int32_t fh_int32;
typedef int64_t fh_int64;
typedef uint8_t fh_uint8;
typedef uint16_t fh_uint16;
typedef uint32_t fh_uint32;
typedef uint64_t fh_uint64;

#define FHDebug(...)  fh_log(FH_LL_DEBUG, __FILE__, __LINE__, __VA_ARGS__)
#define FHInfo(...) fh_log(FH_LL_INFO, __FILE__, __LINE__, __VA_ARGS__)
#define FHWarn(...) fh_log(FH_LL_WARN, __FILE__, __LINE__, __VA_ARGS__)
#define FHError(...) fh_log(FH_LL_ERROR, __FILE__, __LINE__, __VA_ARGS__)
#define FHFatalError(...) fh_log(FH_LL_FATALERROR, __FILE__, __LINE__, __VA_ARGS__)

#define FH_UNUSED(expr) do { (void)(expr); } while (0)

#ifdef __cplusplus
#if (__cplusplus > 199711L)
    static_assert(sizeof(fh_uint64) == 8, "fh_uint64 is not 64 bit");
    static_assert(sizeof(fh_int64) == 8, "fh_int64 is not 64 bit");
#endif
}
#endif

#define FH_CLOUD_SRV_RECORD_PREFIX "_xmpp-client._tcp.xmpp."
#define FH_CLOUD_DOMAIN_PREFIX "xmpp."
#define FH_XMPP_DOMAIN_LOCAL "busch-jaeger.de"
#endif
