import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { LandingPage } from '../pages/landing/landing';
import { MessagesProvider } from '../providers/storage/messages-provider/messages-provider';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LandingPage;

  constructor(
    public platform: Platform,
    public translate: TranslateService,
    public splashscreen: SplashScreen,
    public msgProv: MessagesProvider) {
    translate.setDefaultLang('en');
    platform.ready().then(() => {
      translate.use(platform.lang());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('Platform ready')
      try {
        this.splashscreen.hide();
      } catch (e) {
        console.error(this + " ERROR:");
        console.error(e);
      }
      platform.resume.subscribe((event)=>{
        this.msgProv.loadMessages().subscribe(() => this.msgProv.update());
      })
    });
  }
}
