import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TranslateService } from 'ng2-translate';
import { StorageService } from '../providers/storageService';
import { PersistenceManager } from '../providers/persistenceManager';
import { LoginPage } from '../pages/login/login';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

  //rootPage = HomePage;
  rootPage;

  constructor(platform: Platform, private translate: TranslateService,
    private storageService: StorageService,
    private loadingCtrl:LoadingController,
    private manager: PersistenceManager) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();

      this.manager.tokenStatus()
        .subscribe((status) => {
          loading.dismiss();

          if (status==200) {
            this.rootPage = HomePage;
          }else{
            this.rootPage = LoginPage;
          }
        }, error => {
          loading.dismiss();
          this.rootPage = LoginPage;
        }
        );
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      

      //TODO We must choose the first page depending on having or not a defined user.

      translate.use('en');

      //storageService.setUser({ name: "Alejandro", surname: "Melcón", patientId: "21008286V" })
      //  .then(() => persistenceManager.setUp());


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
