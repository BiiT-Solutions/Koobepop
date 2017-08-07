import { Component, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentModel } from '../../models/appointment.model';
import * as infographicjs from 'infographic-js';
import { ServicesManager } from '../../providers/servicesManager'
import { ToastIssuer } from '../../providers/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { ReportsRestService } from '../../providers/rest/reports-rest-service';
import { Observable } from 'rxjs/Observable';
import { ZoomPanDirective } from '../../directives/zoom-pan/zoom-pan';
/**
 * This page holds reports into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  testext;
  reports = [];
  appointments: AppointmentModel[];
  @ViewChild('slider') slider: Slides;
  @ViewChildren(ZoomPanDirective) zoomPan;
  loading: Loading;
  timeout;
  slideToLast: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public changeDetector: ChangeDetectorRef,
    public manager: ServicesManager,
    public loadingCtrl: LoadingController,
    public toaster: ToastIssuer,
    public translate: TranslateService,
    public reportsRest: ReportsRestService) {
  }

  protected ionViewWillLoad() {
    this.setAppointments();

    this.loadReports(this)
  }

  protected ionViewDidLoad() {

  }

  protected ionViewWillEnter() {
  }


  protected ionViewDidEnter() {
  }

  private setAppointments() {
    this.manager.getAppointments()
      .subscribe(appointments => this.appointments = appointments, (error) => this.errorMessage('MSG ' + error));
  }

  private errorMessage(error) {
    this.translate.get("REPORT.ERROR-SETTING-APPOINTMENTS").subscribe(translation => this.toaster.badToast(translation));
    console.error(error);
  }

  ngDoCheck() {
    if (this.slideToLast && this.slider != undefined && this.reports != undefined && this.slider.length() == this.reports.length) {
      this.slider.slideTo(this.reports.length - 1, 0);
      this.slideToLast = false;
    }
  }

  private loadReports(context: ReportPage): void {
    if (context.appointments == undefined || context.appointments.length <= 0) {
      context.setAppointments();
      context.timeout = setTimeout(() => context.loadReports(context), 1000);
    } else {
      context.setReports(context.appointments)
        .subscribe((value) => {
          this.slideToLast = true;
        }, (error: any) => {
          this.toaster.badToast(this.translate.instant("REPORT.ERROR-SETTING-REPORTS"))
        });
    }
  }

  setReports(appointments: AppointmentModel[]): Observable<boolean> {
    return Observable.concat(appointments.reduce((observable: Observable<boolean>, currentAppointment: AppointmentModel) => {
      try {
        return observable.merge(this.addReport(currentAppointment))
      } catch (e) { console.error("ReportPage:", e) }
    }, Observable.of(true))).reduce((acc: boolean, val: boolean) => acc && val);
  }

  addReport(appointment: AppointmentModel): Observable<boolean> {
    return this.reportsRest.requestReports(appointment.appointmentId)
      .map((report) => {
        try {
          //Might cause some syncronization issues (?)
          this.reports.unshift(this.getReport(report));

        } catch (ex) {
          console.log("Problem with infographics");
          console.error(ex);
        }
        return true;
      });
  }

  getReport(reportData: any[]): any[] {
    const report = [];
    for (let i = 0; i < reportData.length; i++) {
      report.push(this.getInfographic(reportData[i].template, reportData[i].content));
    }
    return report;
  }

  getInfographic(template, content) {
    return infographicjs.infographicFromTemplate(template, content);
  }

  isZoomActive(zoomActive: boolean) {
    this.testext = zoomActive;
    this.slider.lockSwipes(zoomActive);
  }

  ionViewWillLeave() {
    clearTimeout(this.timeout);
  }

}
