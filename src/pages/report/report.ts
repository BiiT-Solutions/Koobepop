import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import * as infographicjs from 'infographic-js';
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
  @ViewChild('slider') slider: Slides;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public appointmentsProvider: AppointmentsProvider,
    public changeDetector: ChangeDetectorRef,
    public storageService: StorageService) {
    this.loadReports();
  }
  isZoomActive(zoomActive: boolean) {
    this.testext = zoomActive;
    this.slider.lockSwipes(zoomActive);
  }

  private loadReports(): void {
    this.storageService.getAppointments()
      .then((appointments: IAppointment[]) => {
        if (appointments == undefined || appointments == null || appointments.length <= 0) {
          console.log("ReportPage: Appointments is null");//TODO Error Log
          setTimeout(()=>{this.loadReports()}, 3000);
        } else {
          appointments.forEach((appointment: IAppointment) => {
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
          //We check for changes because this is done outside of the regular angular detections
          //More info: https://github.com/angular/angular/issues/10131
          this.changeDetector.detectChanges();
        }
      });
  }
}
