
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>


@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions

{

  self.moduleName = @"Wishaan";

  // You can add your custom initial props in the dictionary below.

  // They will be passed down to the ViewController used by React Native.

  self.initialProps = @{};


  return [super application:application didFinishLaunchingWithOptions:launchOptions];

}


- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge

{

  return [self bundleURL];

}


- (NSURL *)bundleURL

{

#if DEBUG

  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];

#else

  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

#endif

}


@end

// #import "AppDelegate.h"
// #import <React/RCTBundleURLProvider.h>
// #import <UserNotifications/UserNotifications.h>
// #import <RNCPushNotificationIOS.h>

// @implementation AppDelegate

// - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
// {
//   self.moduleName = @"Wishaan";
//   self.initialProps = @{};
  
//   // Set up User Notification Center for push notifications
//   // UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   // center.delegate = self;
//   // [center requestAuthorizationWithOptions:(UNAuthorizationOptionAlert | UNAuthorizationOptionSound | UNAuthorizationOptionBadge)
//   //                         completionHandler:^(BOOL granted, NSError * _Nullable error) {
//   //                             if (granted) {
//   //                                 dispatch_async(dispatch_get_main_queue(), ^{
//   //                                     [application registerForRemoteNotifications];
//   //                                 });
//   //                             }
//   //                         }];
  
//   return [super application:application didFinishLaunchingWithOptions:launchOptions];
// }

// Method to schedule a local notification
// - (void)scheduleLocalNotification {
//   // Create notification content
//   UNMutableNotificationContent *content = [[UNMutableNotificationContent alloc] init];
//   content.title = @"Test Notification";
//   content.body = @"This is a local notification test!";
//   content.sound = [UNNotificationSound defaultSound];  // Optional: add sound
  
//   // Create a trigger (e.g., trigger after 10 seconds)
//   UNTimeIntervalNotificationTrigger *trigger = [UNTimeIntervalNotificationTrigger triggerWithTimeInterval:10 repeats:NO];
  
//   // Create notification request with identifier
//   UNNotificationRequest *request = [UNNotificationRequest requestWithIdentifier:@"TestNotification"
//                                                                        content:content
//                                                                        trigger:trigger];
  
//   // Add the request to the notification center
//   UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//   [center addNotificationRequest:request withCompletionHandler:^(NSError * _Nullable error) {
//     if (error) {
//       NSLog(@"Error scheduling notification: %@", error.localizedDescription);
//     }
//   }];
// }

// - (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
// {
//   return [self bundleURL];
// }

// - (NSURL *)bundleURL
// {
// #if DEBUG
//   return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
// #else
//   return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
// #endif
// }

// Handle notification when app is in foreground
// - (void)userNotificationCenter:(UNUserNotificationCenter *)center
//        willPresentNotification:(UNNotification *)notification
//          withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
// {
//   completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
// }

// // Register device token with APNs
// - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
// {
//   [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
//   // Optionally, send this token to your server to enable remote notifications
// }

// // Handle received remote notification (when app is in background or closed)
// - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
//                                   fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
// {
//   [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
// }

// // Handle registration error for remote notifications
// - (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
// {
//   [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
// }

// // Handle user interaction with notification
// - (void)userNotificationCenter:(UNUserNotificationCenter *)center
//        didReceiveNotificationResponse:(UNNotificationResponse *)response
//        withCompletionHandler:(void (^)(void))completionHandler
// {
//   [RNCPushNotificationIOS didReceiveNotificationResponse:response];
  // completionHandler();
// }

// @end
