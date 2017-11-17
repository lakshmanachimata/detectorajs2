//
//  FirmWareUpdate.m
//  SUOTA
//
//  Created by apple on 13/11/17.
//  Copyright © 2017 Dialog Semiconductor. All rights reserved.
//

#import "FirmWareUpdate.h"
#import "presencedetector-Swift.h"


#define UIALERTVIEW_TAG_REBOOT 1

@interface FirmWareUpdate ()

@end

@implementation FirmWareUpdate
@synthesize blockSize;


-(id)init
{
    //self does not have a meaningful value prior to the call to [super init]
    self = [super init];
    if (self != nil)
    {
        //ensure addObserver is called in the if code block
    }
    return self;
}
- (void)viewDidLoad {
    [super viewDidLoad];


    // Do any additional setup after loading the view.
}

- (void)initalValues:(BLEHelper *)helper {
    [self getSPIAddress];
    
    storage = [ParamaterStorage getInstance];
    manager = storage.manager;
    manager.device = storage.device;
    blehelper = helper;

    
    // Enable notifications on the status characteristic
    [manager notification:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_SERV_STATUS_UUID] p:manager.device on:YES];
    autoscrollTimer = [NSTimer scheduledTimerWithTimeInterval:(35.0/1000.0)
                                                       target:self
                                                     selector:@selector(autoscrollTimerFired:)
                                                     userInfo:nil
                                                      repeats:YES];
    
    
    
    // Enable notifications for BLE events
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(didUpdateValueForCharacteristic:)
                                                 name:GenericServiceManagerDidReceiveValue
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(didSendValueForCharacteristic:)
                                                 name:GenericServiceManagerDidSendValue
                                               object:nil];
    
    step = 1;
    [self doStep];
   
}
- (void)getSPIAddress {
    
    int blockSizes = 240;
    unsigned int spiMOSI, spiMISO, spiCS, spiSCK = 0;
    
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    [defaults setObject:[NSNumber numberWithInteger:1] forKey:@"memoryType"];
    
    
    [self gpioScannerWithString:@"P0_5" toInt:&spiMISO];
    [self gpioScannerWithString:@"P0_6" toInt:&spiMOSI];
    [self gpioScannerWithString:@"P0_3" toInt:&spiCS];
    [self gpioScannerWithString:@"P0_0" toInt:&spiSCK];
    
    [self setMemoryType:MEM_TYPE_SUOTA_SPI];
    [self setSpiMOSIAddress:spiMOSI];
    [self setSpiMISOAddress:spiMISO];
    [self setSpiCSAddress:spiCS];
    [self setSpiSCKAddress:spiSCK];
    
    [defaults setObject:@"P0_5" forKey:@"spiMISOAddress"];
    [defaults setObject:@"P0_6" forKey:@"spiMOSIAddress"];
    [defaults setObject:@"P0_3" forKey:@"spiCSAddress"];
    [defaults setObject:@"P0_0" forKey:@"spiSCKAddress"];
    
    
    int memoryBank = 0;
    [defaults setObject:[NSNumber numberWithInt:memoryBank] forKey:@"memoryBank"];
//    [set setMemoryBank:memoryBank];
    
   // [[NSScanner scannerWithString:self.blockSize.text] scanInt:&blockSize];
    [defaults setObject:[NSNumber numberWithInt:blockSizes] forKey:@"blockSize"];
    [self setBlockSize:blockSizes];
    
    [defaults synchronize];
}

- (void) gpioScannerWithString:(NSString*)gpio toInt:(unsigned*)output {
    NSArray *values = [NSArray arrayWithObjects:@"0x00", @"0x01", @"0x02", @"0x03", @"0x04", @"0x05", @"0x06", @"0x07", @"0x10", @"0x11", @"0x12", @"0x13", @"0x20", @"0x21", @"0x22", @"0x23", @"0x24", @"0x25", @"0x26", @"0x27", @"0x28", @"0x29", @"0x30", @"0x31", @"0x32", @"0x33", @"0x34", @"0x35", @"0x36", @"0x37", nil];
    NSArray *titles = [NSArray arrayWithObjects:@"P0_0", @"P0_1", @"P0_2", @"P0_3", @"P0_4", @"P0_5", @"P0_6", @"P0_7", @"P1_0", @"P1_1", @"P1_2", @"P1_3", @"P2_0", @"P2_1", @"P2_2", @"P2_3", @"P2_4", @"P2_5", @"P2_6", @"P2_7", @"P2_8", @"P2_9", @"P3_0", @"P3_1", @"P3_2", @"P3_3", @"P3_4", @"P3_5", @"P3_6", @"P3_7", nil];
    
    for (int n=0; n<[values count]; n++) {
        if ([gpio isEqualToString:[titles objectAtIndex:n]]) {
            [[NSScanner scannerWithString:[values objectAtIndex:n]] scanHexInt:output];
        }
    }
}

- (void) viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];


}

- (void) viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    
    // Disable notifications for BLE events
    [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidReceiveValue object:nil];
    [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidSendValue object:nil];
}
- (void) didUpdateValueForCharacteristic: (NSNotification*)notification {
    CBCharacteristic *characteristic = (CBCharacteristic*) notification.object;
    if ([characteristic.UUID isEqual:[CBUUID UUIDWithString:SPOTA_SERV_STATUS_UUID]]) {
        char value;
        [characteristic.value getBytes:&value length:sizeof(char)];
        
        NSString *message = [self getErrorMessage:value];
        [self debug:message UILog:(value != SPOTAR_CMP_OK)];
        
        if (expectedValue != 0) {
            // Check if value equals the expected value
            if (value == expectedValue) {
                // If so, continue with the next step
                step = nextStep;
                
                expectedValue = 0; // Reset
                
                [self doStep];
            } else {
                // Else display an error message
                UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"Error" message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
                [alertView show];
                
                expectedValue = 0; // Reset
                [autoscrollTimer invalidate];
            }
        }
    }
}

- (void) didSendValueForCharacteristic: (NSNotification*)notification {
    if (step && step != 7) {
        [self doStep];
    }
}

- (void) doStep {
    [self debug:[NSString stringWithFormat:@"*** Next step: %d", step] UILog:NO];
    
    switch (step) {
        case 1: {
            // Step 1: Set memory type
            step = 0;
            expectedValue = 0x10;
            nextStep = 2;
            
            int _memDevData = (self.memoryType << 24) | (self.memoryBank & 0xFF);
            [self debug:[NSString stringWithFormat:@"Set SPOTA_MEM_DEV: %#010x", _memDevData] UILog:YES];
            NSData *memDevData = [NSData dataWithBytes:&_memDevData length:sizeof(int)];
            [manager writeValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_MEM_DEV_UUID] p:manager.device data:memDevData];
            break;
        }
            
        case 2: {
            // Step 2: Set memory params
            int _memInfoData;
            if (self.memoryType == MEM_TYPE_SUOTA_SPI) {
                _memInfoData = (self.spiMISOAddress << 24) | (self.spiMOSIAddress << 16) | (self.spiCSAddress << 8) | self.spiSCKAddress;
            } else if (self.memoryType == MEM_TYPE_SUOTA_I2C) {
                _memInfoData = (self.i2cAddress << 16) | (self.i2cSCLAddress << 8) | self.i2cSDAAddress;
            }
            [self debug:[NSString stringWithFormat:@"Set SPOTA_GPIO_MAP: %#010x", _memInfoData] UILog:YES];
            NSData *memInfoData = [NSData dataWithBytes:&_memInfoData length:sizeof(int)];
            
            step = 3;
            [manager writeValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_GPIO_MAP_UUID] p:manager.device data:memInfoData];
            break;
        }
            
        case 3: {
            // Load patch data
            [self debug:[NSString stringWithFormat:@"Loading data from %@", [storage.file_url absoluteString]] UILog:YES];
            fileData = [[NSData dataWithContentsOfURL:storage.file_url] mutableCopy];
            [self appendChecksum];
            [self debug:[NSString stringWithFormat:@"Size: %d", (int) [fileData length]] UILog:YES];
            
            // Step 3: Set patch length
            chunkSize = 20;
            blockStartByte = 0;
            
            step = 4;
            [self doStep];
            break;
        }
            
        case 4: {
            // Set patch length
            //UInt16 blockSizeLE = (blockSize & 0xFF) << 8 | (((blockSize & 0xFF00) >> 8) & 0xFF);
            [self debug:[NSString stringWithFormat:@"Set SPOTA_PATCH_LEN: %d", blockSize] UILog:YES];
            NSData *patchLengthData = [NSData dataWithBytes:&blockSize length:sizeof(UInt16)];
            
            step = 5;
            
            [manager writeValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_PATCH_LEN_UUID] p:manager.device data:patchLengthData];
            //[manager readValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_PATCH_LEN_UUID] p:manager.device];
            break;
        }
            
        case 5: {
            // Send current block in chunks of 20 bytes
            if (blockStartByte == 0)
                [self debug:@"Upload procedure started" UILog:YES];
            
            step = 0;
            expectedValue = 0x02;
            nextStep = 5;
            
            int dataLength = (int) [fileData length];
            int chunkStartByte = 0;
            
            while (chunkStartByte < blockSize) {
                
                // Check if we have less than current block-size bytes remaining
                int bytesRemaining = blockSize - chunkStartByte;
                if (bytesRemaining < chunkSize) {
                    chunkSize = bytesRemaining;
                }
                
                [self debug:[NSString stringWithFormat:@"Sending bytes %d to %d (%d/%d) of %d", blockStartByte + chunkStartByte, blockStartByte + chunkStartByte + chunkSize, chunkStartByte, blockSize, dataLength] UILog:NO];
                
                double progress = (double)(blockStartByte + chunkStartByte + chunkSize) / (double)dataLength;
                [self updateProgress:progress];

                // Step 4: Send next n bytes of the patch
                char bytes[chunkSize];
                [fileData getBytes:bytes range:NSMakeRange(blockStartByte + chunkStartByte, chunkSize)];
                NSData *byteData = [NSData dataWithBytes:&bytes length:sizeof(char)*chunkSize];
                
                // On to the chunk
                chunkStartByte += chunkSize;
                
                // Check if we are passing the current block
                if (chunkStartByte >= blockSize) {
                    // Prepare for next block
                    blockStartByte += blockSize;
                    
                    int bytesRemaining = dataLength - blockStartByte;
                    if (bytesRemaining == 0) {
                        nextStep = 6;
                        
                    } else if (bytesRemaining < blockSize) {
                        blockSize = bytesRemaining;
                        nextStep = 4; // Back to step 4, setting the patch length
                    }
                }
                
                [manager writeValueWithoutResponse:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_PATCH_DATA_UUID] p:manager.device data:byteData];
            }
            
            break;
        }
            
        case 6: {
            // Send SUOTA END command
            step = 0;
            expectedValue = 0x02;
            nextStep = 7;
            
            int suotaEnd = 0xFE000000;
            [self debug:[NSString stringWithFormat:@"Send SUOTA END command: %#010x", suotaEnd] UILog:YES];
            NSData *suotaEndData = [NSData dataWithBytes:&suotaEnd length:sizeof(int)];
            [manager writeValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_MEM_DEV_UUID] p:manager.device data:suotaEndData];
            break;
        }
            
        case 7: {
            [self debug:@"Upload completed" UILog:YES];
            [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidReceiveValue object:nil];
            [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidSendValue object:nil];
            //UIApplication.sharedApplication().keyWindow?.rootViewController = storyboard!.instantiateViewControllerWithIdentifier("Root_View")
             [blehelper resetCommand];
            [self relaunch];
            //[blehelper manager] cancelPeripheralConnection:manager.device];
           // [blehelper resetCommand];
            
            //ViewController *viewController = [[ViewController alloc] init];
            //[viewController viewDidLoad];
            
           // NSLog(@"%ld",(long)blehelper.manager.state);
            // Wait for user to confirm reboot
//            UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Device has been updated" message:@"Do you wish to reboot the device?" delegate:self cancelButtonTitle:@"No" otherButtonTitles:@"Yes, reboot", nil];
//            [alert setTag:UIALERTVIEW_TAG_REBOOT];
//            [alert show];
            break;
        }
            
//        case 8: {
//            // Go back to overview of devices
//            [self.navigationController popToRootViewControllerAnimated:YES];
//            
//            break;
//        }
    }
}

- (void)relaunch {
    UIStoryboard *mystoryboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    [[[UIApplication sharedApplication] keyWindow] setRootViewController:[mystoryboard instantiateViewControllerWithIdentifier:@"Root_View"]];
}

-(void)updateProgress:(double)value {
    NSLog(@"%f",value*100);
    [blehelper updateProgressWithValue:value*100];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex {
    [autoscrollTimer invalidate];
    
    if (alertView.tag == UIALERTVIEW_TAG_REBOOT) {
        if (buttonIndex != alertView.cancelButtonIndex) {
            // Send reboot signal to device
           // step = 8;
            int suotaEnd = 0xFD000000;
            [self debug:[NSString stringWithFormat:@"Send SUOTA REBOOT command: %#010x", suotaEnd] UILog:YES];
            //NSData *suotaEndData = [NSData dataWithBytes:&suotaEnd length:sizeof(int)];
           // [manager writeValue:[manager IntToCBUUID:SPOTA_SERVICE_UUID] characteristicUUID:[CBUUID UUIDWithString:SPOTA_MEM_DEV_UUID] p:manager.device data:suotaEndData];
            // Disable notifications for BLE events
            [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidReceiveValue object:nil];
            [[NSNotificationCenter defaultCenter] removeObserver:self name:GenericServiceManagerDidSendValue object:nil];
            
        }
    }
}

- (void) debug:(NSString*)message UILog:(BOOL)uiLog {
    if (uiLog)
    NSLog(@"%@", message);
}

- (void)autoscrollTimerFired:(NSTimer*)timer {
//    [self.textView scrollRangeToVisible:NSMakeRange([self.textView.text length], 0)];
}

- (void) appendChecksum {
    uint8_t crc_code = 0;
    
    const char *bytes = [fileData bytes];
    for (int i = 0; i < [fileData length]; i++) {
        crc_code ^= bytes[i];
    }
    
    [self debug:[NSString stringWithFormat:@"Checksum for file: %#4x", crc_code] UILog:YES];
    
    [fileData appendBytes:&crc_code length:sizeof(uint8_t)];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

/*
#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
}
*/

@end
