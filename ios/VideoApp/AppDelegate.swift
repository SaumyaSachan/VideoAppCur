// import UIKit
// import React
// import React_RCTAppDelegate
// import ReactAppDependencyProvider
// import FirebaseCore


// @main
// class AppDelegate: UIResponder, UIApplicationDelegate {
//   var window: UIWindow?

//   var reactNativeDelegate: ReactNativeDelegate?
//   var reactNativeFactory: RCTReactNativeFactory?

//   func application(
//     _ application: UIApplication,
//     didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
//   ) -> Bool {

//     FirebaseApp.configure()
//     let delegate = ReactNativeDelegate()
//     let factory = RCTReactNativeFactory(delegate: delegate)
//     delegate.dependencyProvider = RCTAppDependencyProvider()

//     reactNativeDelegate = delegate
//     reactNativeFactory = factory

//     window = UIWindow(frame: UIScreen.main.bounds)

//     factory.startReactNative(
//       withModuleName: "VideoApp",
//       in: window,
//       launchOptions: launchOptions
//     )
 
//     return true
//   }
// }

// class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
//   override func sourceURL(for bridge: RCTBridge) -> URL? {
//     self.bundleURL()
//   }

//   override func bundleURL() -> URL? {
// #if DEBUG
//     RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
// #else
//     Bundle.main.url(forResource: "main", withExtension: "jsbundle")
// #endif
//   }
// }

import UIKit
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import FirebaseCore // ✅ Import Firebase

@main
class AppDelegate: RCTAppDelegate {
  override func application(_ application: UIApplication,
                            didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    
    // ✅ Firebase Initialization
    FirebaseApp.configure()
    
    // React Native Setup
    self.moduleName = "VideoApp"
    self.dependencyProvider = RCTAppDependencyProvider()
    self.initialProps = [:]
    
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    return RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
#endif
  }
}

