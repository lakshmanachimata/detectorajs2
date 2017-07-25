//
//  fh_network.h
//  xmpptest
//
//  Created by christoph on 23.01.15.
//  Copyright (c) 2015 christoph. All rights reserved.
//

#ifndef xmpptest_fh_network_h
#define xmpptest_fh_network_h
#ifndef WIN32
typedef int SOCKET;
#else
#include <WinSock2.h>
#endif
#include <stdlib.h>
#include "fh_cglobals.h"
#include "freeathome.h"

#ifdef __cplusplus
extern "C" {
#endif

typedef struct _FHSocket FHSocket;

typedef enum _FHSocketError
{
    FHSE_CONFAILED,
    FHSE_UNKNOWN,
    FHSE_WRITEFAILED,
} FHSocketError;
typedef enum _FHSocket_Protocol
{
    FHSP_UDP,
    FHSP_TCP
} FHSocketProtocol;
typedef enum _FHSocketState
{
    FHSS_UNSED, // for udp sockets
    FHSS_LISTENING,
    FHSS_CONNECTING,
    FHSS_CONNECTED,
    FHSS_DISCONNECTED,
} FHSocketState;

// general network functions
void FHSys_Init(fh_context* ctx);
void FHSys_StopWorkerThread(fh_context* ctx);
void FHSys_Shutdown(void* systemData); /* NOTE: context already destroyed at this point, pointer is the FHSys_GetSystemData() ! */
void FHSys_SetSystemData(fh_context* ctx, void* systemData);
void* FHSys_GetSystemData(fh_context* ctx);
int FHSys_GetEventsPipe(fh_context* ctx);

void FHSys_RunNextCommandOnWorkThread(fh_context* ctx);
void FHSys_EmitNextEventOnMainThread(fh_context* ctx);

// timer
typedef void* FHSysTimer;
typedef void (*FHSysTimerFunc)(FHSysTimer timer, fh_context* ctx, void* userData);
FHSysTimer FHSys_CreateTimer(int intervalMS, fh_bool repeat, FHSysTimerFunc func, fh_context* ctx, void* userData, const char* dbgName);
void FHSys_DestroyTimer(FHSysTimer timer, fh_context* ctx);

// general callbacks
void FHSys_OnThreadStarted(fh_context* ctx);
void FHSys_OnThreadFinished(fh_context* ctx);

// sockets
FHSocket* FHSocket_CreateListening(void* userPtr, fh_uint32 addr, fh_uint16 port, const char* name);
FHSocket* FHSocket_CreateConnecting(const char* host, fh_uint16 port, void* userPtr, const char* name);
FHSocket* FHSocket_CreateConnected(int socketHandle, void* userPtr, const char* name);
FHSocket* FHSocket_CreateUDP(int socketHandle, void* userPtr, const char* name);
void FHSocket_Close(FHSocket* sock);
void* FHSocket_UserPtr(FHSocket* socket);

fh_uint32 FHSocket_Send(FHSocket* sock, const fh_uint8* data, size_t size);
int FHSocket_SendTo(FHSocket* sock, const void* data, int len, fh_uint32 addr, fh_uint16 port);

fh_bool FHSocket_Bind(FHSocket* sock, fh_uint32 addr, fh_uint16 port, fh_bool reuseAddress);
fh_bool FHSocket_JoinMulticastGroup(FHSocket* sock, fh_uint32 addr);
void FHSocket_EnableNagle(FHSocket* sock, fh_bool enable);

// callback functions to be implemented by the core library
void FHSocket_OnAccept(FHSocket* sock, SOCKET newSocket);
void FHSocket_OnDataReceived(FHSocket* sock, const char* from, const fh_uint8* data, fh_uint32 size);
void FHSocket_OnConnected(FHSocket* sock);
void FHSocket_OnError(FHSocket* sock, FHSocketError err);
void FHSocket_OnWrite(FHSocket* sock);
void FHSocket_OnClosed(FHSocket* sock);


#ifdef __cplusplus
} // extern "C"
#endif

#endif
