import { Component } from '@angular/core';
import { Platform, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TranslateService } from 'ng2-translate';
import { StorageService } from '../providers/storageService';
import { PersistenceManager } from '../providers/persistenceManager';
import { LoginPage } from '../pages/login/login';
import { ConnectivityService } from '../providers/connectivity-service';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage = HomePage;
  rootPage;

  constructor(platform: Platform, private translate: TranslateService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private manager: PersistenceManager,
    private connectivity: ConnectivityService,
    private toastCtrl: ToastController) {

    //if (connectivity.isOnline()){
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
        this.rootPage = LoginPage;
      }
      );
    // }else{
    //   this.rootPage = HomePage;
    // }

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      
      translate.use('en');
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
