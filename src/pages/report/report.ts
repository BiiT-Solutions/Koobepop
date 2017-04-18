import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import * as infographicjs from 'infographic-js';
import { ServicesManager } from '../../providers/persistenceManager';
import { FormResult } from '../../models/results';
import { ToastIssuer } from '../../providers/toastIssuer';
import { TranslateService } from 'ng2-translate';
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
    public loadingCtrl: LoadingController,
    public toaster: ToastIssuer,
    public translate: TranslateService) {
    this.setAppointments();
   }

  protected ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading reports'//WAIT-FOR-REPORTS-LOAD-TEXT
    });
    this.loading.present();
  }

  protected ionViewDidEnter() {
    this.loadReports(this.loading, this);
  }
  
  private setAppointments() {
     this.manager.getAppointments()
      .subscribe(appointments => this.appointments = appointments, (error) => this.errorMessage(error));
  }

  private errorMessage(error) {
    this.translate.get("REPORT.ERROR-SETTING-APPOINTMENTS").subscribe(translation=>this.toaster.badToast(translation));
    console.error(error);
  }


  private loadReports(loading: Loading, context: ReportPage): void {
    if (context.appointments == undefined || context.appointments.length <= 0) {
      context.timeout = setTimeout(() => context.loadReports(loading, context), 1000);
    } else {
      context.appointments.forEach((appointment: IAppointment) => {
        let reportBuilder = {
          "width": 540,
          "height": 960,
          "dataText": {
            "date": new Date(appointment.startTime).toLocaleDateString(),
            "doctorName": appointment.doctorLastName + ", " + appointment.doctorFirstName,
            "conclusion": "",
            "patientName": "",
            "patientBirthday": "",
            "patientMail": "",
            "patientPhone": "",
            "height": appointment.results["1 antropometrie"].anthropometry.height[0],
            "weight": appointment.results["1 antropometrie"].anthropometry.weight[0],
            "bloodPressure": appointment.results["1 antropometrie"].anthropometry.bloodpressurediastolic[0],
            "waist": appointment.results["1 antropometrie"].anthropometry.waistcircumference[0],
            "folds": appointment.results["1 antropometrie"].anthropometry.skinfoldtotal[0],
            "nextAppointmentDate": "",
            "nextAppointmentTime": ""
          }
        };
        context.svgList.push(infographicjs.fillBasicReport(reportBuilder));
      });
      //This prevents a change detection error on dev mode
      try {
        context.changeDetector.detectChanges();
      } catch (exception) {
        console.debug(exception);
      }
      context.loading.dismiss();
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
