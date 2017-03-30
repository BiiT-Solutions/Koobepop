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

    this.manager.getAppointments().subscribe(appointments=>this.setAppointments(appointments),(error)=> this.errorMessage(error));
    this.manager.getResults().subscribe(results=>this.setResults(results),(error)=>this.errorMessage(error));
    this.loadReports();

  }

  private setAppointments(appointments) {
    this.appointments = appointments;
  }

  private errorMessage(error) {
    console.error(error);
  }

  private setResults(results){
    this.results = results;
  }

  private loadReports(): void {
    console.log("loading Reports: "+this.appointments+"  "+this.results)
    console.log(this.appointments)
    console.log(this.results)

    if (this.appointments == undefined || this.appointments.length <= 0 || this.results == undefined || this.results.size<= 0) {
      setTimeout(() => this.loadReports(), 1000);
    } else {
      this.appointments.forEach((appointment: IAppointment) => {
        console.log("fill svg")
        if (this.results.has(appointment.appointmentId)) {
          console.log("has it!")
          let result = this.results.get(appointment.appointmentId);

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
          this.svgList.push(infographicjs.fillBasicReport(reportBuilder));
          //This prevents a change detection error on dev mode
         // this.changeDetector.detectChanges();
        }
      });
      console.log(this.svgList.length)
    }
  }

  isZoomActive(zoomActive: boolean) {
    this.testext = zoomActive;
    this.slider.lockSwipes(zoomActive);
  }
}
