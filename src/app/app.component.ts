import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { LandingPage } from '../pages/landing/landing';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(
    public platform: Platform,
    public translate: TranslateService,
    public splashscreen: SplashScreen) {
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
