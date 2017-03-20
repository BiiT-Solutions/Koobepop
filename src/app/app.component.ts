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
@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform, private translate: TranslateService,
    private appointmentsProvider: AppointmentsProvider,
    private tasksProvider: TasksRestProvider,
    private storageService: StorageService,
    private resultsProvider: ResultsProvider) {
    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      translate.use('en');
      // Right now this overrides the local database when it initializes, gotta fix that!

      storageService.setUser({ name: "Alejandro", surname: "Melcón", patientId: "21008286V" })
        .then((user) =>
          storageService.getUser()
            .then(user => {
              appointmentsProvider.requestAppointments(user)
                .subscribe((appointments: IAppointment[]) => {
                  storageService.setAppointments(appointments);
                  let resultsMap: Map<number, any[]> = new Map<number, any[]>();
                  let lastAppointment: IAppointment;
                  let resultsBarrier = 0;
                  appointments.forEach(appointment => {
                    resultsBarrier++;
                     console.log("ForEach Appointment ResBarr: "+resultsBarrier);
                    resultsProvider.requestResults(appointment)
                      .subscribe((results: any) => {
                        resultsMap.set(appointment.appointmentId, results);
                        resultsBarrier--;
                         console.log("Callback Appointment ResBarr: "+resultsBarrier);
                        if (resultsBarrier == 0) {
                          console.log("Saved Results")
                          storageService.setResults(resultsMap)
                        }
                      });

                    if (lastAppointment == undefined) {
                      lastAppointment = appointment;
                    } else {
                      if (lastAppointment.startTime < appointment.startTime) {
                        lastAppointment = appointment;
                      }
                    }
                  })
                  tasksProvider.requestTasks(lastAppointment)
                    .subscribe((tasks: ITask[]) => {
                      storageService.setTasks(tasks)
                    })

                })
            }).catch(e => console.log("Server error " + e))
        ).catch(e => console.log("Data storage error " + e));






      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
