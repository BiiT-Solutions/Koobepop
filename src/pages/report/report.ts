import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import * as infographicjs from 'infographic-js';
import { PersistenceManager } from '../../providers/persistenceManager';
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
  results: Map<number, FormResult[]>;
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appointmentsProvider: AppointmentsProvider,
    public changeDetector: ChangeDetectorRef,
    public storageService: StorageService,
    public manager: PersistenceManager) {

    let context = this;
    this.loadAppointments(context);
    this.loadResults(context);
    this.loadReports(context);
  }

  private loadAppointments(context) {
    context.appointments = context.manager.getAppointments();
    if (context.appointments == undefined || context.appointments.length <= 0) {
      setTimeout(() => context.loadAppointments(context), 1000);
    }
  }
  private loadResults(context) {
    context.results = context.manager.getResults();
    if (context.results == undefined || context.results.keys().length <= 0) {
      setTimeout(() => context.loadResults(context), 1000);
    }
  }
  private loadReports(context): void {
    if (context.appointments == undefined || context.appointments.length <= 0 || context.results == undefined || context.results.keys().length <= 0) {
      setTimeout(() => context.loadReports(context), 1000);
    } else {
      context.appointments.forEach((appointment: IAppointment) => {
        if (context.results.has(appointment.appointmentId)) {
          let result = context.results.get(appointment.appointmentId);

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
              "height": result[0].children[0].children[3].values[0],
              "weight": "",
              "bloodPressure": "",
              "waist": "",
              "folds": "",
              "nextAppointmentDate": "",
              "nextAppointmentTime": ""
            }
          };
          context.svgList.push(infographicjs.fillBasicReport(reportBuilder));
        }
      });
    }
  }

  isZoomActive(zoomActive: boolean) {
    this.testext = zoomActive;
    this.slider.lockSwipes(zoomActive);
  }
}
