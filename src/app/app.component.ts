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
import { PushNotificationsHandlerProvider } from '../providers/push-notifications-handler/push-notifications-handler';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  rootPage;

  constructor(platform: Platform,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private manager: ServicesManager,
    private connectivity: ConnectivityService,
    private toaster: ToastIssuer,
    private splashscreen: SplashScreen,
    private statusBar: StatusBar,
    private pushHandler: PushNotificationsHandlerProvider) {
    let loading;
    translate.setDefaultLang('en');
    translate.get("APP.LOAD-MESSAGE").subscribe((message) =>{
      loading = this.loadingCtrl.create({
        content: message
      });
      loading.present();
    });
    

    this.manager.tokenStatus()
      .subscribe((status) => {
        loading.dismiss();
        if (status == 200) {
          this.rootPage = HomePage;
        } else if (!connectivity.isOnline()) {//
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      }, error => {
        loading.dismiss();
        if (error.status == 0) {
          this.rootPage = HomePage;
        } else { //Another async call failed on the process 
          this.rootPage = LoginPage;
        }
        if (!connectivity.isOnline()) {
          translate.get("APP.UNABLE-TO-CONNECT-MSG")
            .subscribe((translation: string) => this.toaster.badToast(translation, 2500))
        }
      });

    platform.ready().then(() => {
      translate.use(platform.lang());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      
      //Init push notifications handler
      pushHandler.init();
      
      try {
        this.splashscreen.hide();
      } catch (e) {
        console.error(this + " ERROR:");
        console.error(e);
      }
    });
  }
}
