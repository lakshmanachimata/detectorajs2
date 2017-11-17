//
//  GenericSUOTAViewController.h
//  SUOTA
//
//  Created by Martijn Houtman on 18/12/14.
//  Copyright (c) 2014 Martijn Houtman. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "Defines.h"

@interface GenericSUOTAViewController : UIViewController

- (NSString*) getErrorMessage:(SPOTA_STATUS_VALUES)status;

@end
