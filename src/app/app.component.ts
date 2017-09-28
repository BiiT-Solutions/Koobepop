import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';
import { ServicesManager } from '../providers/servicesManager';
import { LoginPage } from '../pages/login/login';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
import { LandingPage } from '../pages/landing/landing';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(platform: Platform,
    private translate: TranslateService,
    private splashscreen: SplashScreen) {
    translate.setDefaultLang('en');

    platform.ready().then(() => {
      translate.use(platform.lang());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      try {
        this.splashscreen.hide();
      } catch (e) {
        console.error(this + " ERROR:");
        console.error(e);
      }
    });
  }
}
