import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TranslateService } from 'ng2-translate';
import { StorageService } from '../providers/storageService';
import { PersistenceManager } from '../providers/persistenceManager';
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  
  rootPage = HomePage;

  constructor(platform: Platform, private translate: TranslateService,
    private storageService: StorageService,
    private persistenceManager: PersistenceManager) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.      

      //TODO We must choose the first page depending on having or not a defined user.

      translate.use('en');

      // TODO Right now this overrides the local database when it initializes, gotta fix that!
      storageService.setUser({ name: "Alejandro", surname: "Melcón", patientId: "21008286V" })
        .then(() => persistenceManager.setUp());


      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
