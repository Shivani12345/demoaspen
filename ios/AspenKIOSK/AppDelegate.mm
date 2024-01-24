#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <CardScan/CardScan.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [NSThread sleepForTimeInterval:2.0];
  self.moduleName = @"Aspen KIOSK";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
//  ScanViewController.configure();
//  Bouncer.configure(apiKey: "abcdefghijklmnopqrstuvwxyz123456")
//  [ScanViewController configureWithApiKey:@"abcdefghijklmnopqrstuvwxyz123456"];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
