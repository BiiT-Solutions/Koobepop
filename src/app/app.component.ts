import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { LandingPage } from '../pages/landing/landing';
import { MessagesProvider } from '../providers/storage/messages-provider/messages-provider';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(
    public platform: Platform,
    public translate: TranslateService,
    public splashscreen: SplashScreen,
    public globalization: Globalization,
    public msgProv: MessagesProvider) {
    this.translate.addLangs(["en", "es", "nl"]);
    this.translate.setDefaultLang('en');
    platform.ready().then(() => {
      // Language
      this.translate.setDefaultLang("en");
      this.translate.use("en");
      console.log("Default lang: '" + this.translate.getDefaultLang() + "' Browser lang: '" + this.translate.getBrowserLang() + "'");
      if (this.translate.getLangs().indexOf(translate.getBrowserLang())) {
        this.translate.use(this.translate.getBrowserLang());
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('Platform ready');
      try {
        this.splashscreen.hide();
      } catch (e) {
        console.error(this + " ERROR:");
        console.error(e);
      }
      platform.resume.subscribe((event) => {
        this.msgProv.loadMessages().subscribe(() => this.msgProv.update());
      })
    });
  }
}
