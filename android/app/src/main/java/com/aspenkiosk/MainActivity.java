package com.aspenkiosk;

import android.os.Bundle;
import android.os.PersistableBundle;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.getbouncer.RNCardscanModule;


import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  public void onCreate(@Nullable Bundle savedInstanceState) {
//    SplashScreen.show(this);
    org.devio.rn.splashscreen.SplashScreen.show(this, true);
    super.onCreate(savedInstanceState);
    RNCardscanModule.apiKey = "abcdefghijklmnopqrstuvwxyz123456";

    // set to true for experimental name extraction
    RNCardscanModule.enableNameExtraction = true;

    // set to true for experimental expiry extraction
    RNCardscanModule.enableExpiryExtraction = true;

    // set to true to display an "Enter Card Manually" button
    RNCardscanModule.enableEnterCardManually = false;
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "Aspen KIOSK";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
            this,
            getMainComponentName(),
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
}
