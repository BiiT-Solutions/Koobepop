import { Component } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TranslateService } from 'ng2-translate';
import { StorageService } from '../providers/storageService';
import { ServicesManager } from '../providers/persistenceManager';
import { LoginPage } from '../pages/login/login';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  rootPage;

  constructor(platform: Platform,
    private translate: TranslateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private manager: ServicesManager,
    private connectivity: ConnectivityService,
    private toaster: ToastIssuer) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

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

        if (!connectivity.isOnline()) {
          translate.get("APP.UNABLE-TO-CONNECT-MSG")
            .subscribe((translation: string) => this.toaster.badToast(translation, 2500))
          if (error.status == 0) {
            this.rootPage = HomePage;
          } else { //Another async call failed on the process 
            this.rootPage = LoginPage;
          }
        }
        else {
          this.rootPage = LoginPage;
        }
      });

    platform.ready().then(() => {
      translate.use(platform.lang());

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
