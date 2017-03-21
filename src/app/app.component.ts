import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { TranslateService } from 'ng2-translate';
import { AppointmentsProvider } from '../providers/appointmentsProvider';
import { TasksRestProvider } from '../providers/tasksProvider';
import { StorageService } from '../providers/storageService';
import { IAppointment } from '../models/appointmentI';
import { ITask } from '../models/taskI';
import { ResultsProvider } from '../providers/resultsProvider';
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

      translate.use('en');
      // Right now this overrides the local database when it initializes, gotta fix that!
      storageService.setUser({ name: "Alejandro", surname: "Melcón", patientId: "21008286V" });
      
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
