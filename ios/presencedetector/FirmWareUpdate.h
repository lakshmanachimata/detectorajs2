//
//  FirmWareUpdate.h
//  SUOTA
//
//  Created by apple on 13/11/17.
//  Copyright © 2017 Dialog Semiconductor. All rights reserved.
//

#import "GenericSUOTAViewController.h"
#import "Defines.h"
#import "ParamaterStorage.h"
#import "SUOTAServiceManager.h"
#import "GenericSUOTAViewController.h"

@class BLEHelper;

@interface FirmWareUpdate : GenericSUOTAViewController {
    int step, nextStep;
    int expectedValue;
    
    int chunkSize;
    int blockStartByte;
    
    ParamaterStorage *storage;
    SUOTAServiceManager *manager;
    NSMutableData *fileData;
    NSTimer *autoscrollTimer;
    BLEHelper *blehelper;

}
@property char memoryType;
@property int memoryBank;
@property UInt16 blockSize;

@property int i2cAddress;
@property char i2cSDAAddress;
@property char i2cSCLAddress;

@property char spiMOSIAddress;
@property char spiMISOAddress;
@property char spiCSAddress;
@property char spiSCKAddress;
- (void)initalValues:(BLEHelper*) helper;

@end
