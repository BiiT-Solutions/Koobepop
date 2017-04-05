import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import * as infographicjs from 'infographic-js';
import { ServicesManager } from '../../providers/persistenceManager';
import { FormResult } from '../../models/results';
/**
 * This page holds a report into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  testext;
  svgList = [];
  appointments: IAppointment[];
  // results: Map<number, FormResult[]>;
  @ViewChild('slider') slider: Slides;
  loading: Loading;
  timeout;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appointmentsProvider: AppointmentsProvider,
    public changeDetector: ChangeDetectorRef,
    public storageService: StorageService,
    public manager: ServicesManager,
    public loadingCtrl: LoadingController) {
    this.manager.getAppointments()
      .subscribe(appointments => this.setAppointments(appointments), (error) => this.errorMessage(error));
    this.loading = this.loadingCtrl.create({
      content: 'Loading reports'//WAIT-FOR-REPORTS-LOAD-TEXT
    });
    this.loading.present();
    this.loadReports(this.loading);
  }

  private setAppointments(appointments) {
    this.appointments = appointments;
  }

  private errorMessage(error) {
    console.error(error);
  }

  private setResults(results) {
  }

  private loadReports(loading: Loading): void {
    if (this.appointments == undefined || this.appointments.length <= 0) {
      this.timeout = setTimeout(() => this.loadReports(loading), 1000);
    } else {
      this.appointments.forEach((appointment: IAppointment) => {
        let reportBuilder = {
          "width": 540,
          "height": 960,
          "dataText": {
            "date": appointment.startTime,
            "doctorName": appointment.doctorLastName + ", " + appointment.doctorFirstName,
            "conclusion": "",//appointment.appointmentId.toString(),
            "patientName": "",
            "patientBirthday": "",
            "patientMail": "",
            "patientPhone": "",
            "height": "",
            "weight": "",
            "bloodPressure": "",
            "waist": "",
            "folds": "",
            "nextAppointmentDate": "",
            "nextAppointmentTime": ""
          }
        };
        this.svgList.push(infographicjs.fillBasicReport(reportBuilder));
      });
      //This prevents a change detection error on dev mode
      this.changeDetector.detectChanges();
      this.loading.dismiss();
    }
  }

  isZoomActive(zoomActive: boolean) {
    this.testext = zoomActive;
    this.slider.lockSwipes(zoomActive);
  }
  ionViewWillLeave() {
    this.loading.dismiss();
    clearTimeout(this.timeout);
  }
}
