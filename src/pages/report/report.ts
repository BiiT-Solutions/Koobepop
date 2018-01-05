import { Component, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentModel } from '../../models/appointment.model';
import * as infographicjs from 'infographic-js';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { ReportsRestService } from '../../providers/rest/reports-rest-service/reports-rest-service';
import { Observable } from 'rxjs/Observable';
import { ReportModel } from '../../models/report.model';
import { ReportsProvider } from '../../providers/storage/reports-provider/reports-provider';
/**
 * This page holds reports into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  @ViewChild('slider') slider: Slides;
  isLoading: boolean = true;
  slideToLast: boolean = false;
  timeout;
  constructor(public navCtrl: NavController,
    public toaster: ToastIssuer,
    public translate: TranslateService,
    public reportsProvider: ReportsProvider) {
  }

  protected ionViewDidLoad() {
    //Preload reports into memory, remove loading page, allow slide to last
    this.reportsProvider.getReports().subscribe((reports) => {
      this.isLoading = reports != undefined ? false : true
      this.slideToLast = true;
    });
  }

  protected ionViewWillEnter() {
    this.updateReports();
  }

  protected ionViewDidEnter() {
  }

  private errorMessage(error) {
    this.translate.get("REPORT.ERROR-SETTING-APPOINTMENTS")
      .subscribe(translation => this.toaster.badToast(translation));
    //Stop trying to load reports
    clearTimeout(this.timeout);
    console.error(error);
  }

  ngDoCheck() {
    if (this.slideToLast && this.slider != undefined && this.slider._slides != undefined) {
      this.slider.slideTo(this.slider.length() - 1, 0);
      this.slideToLast = false;
    }
  }

  private updateReports() {
    this.reportsProvider.update().subscribe((reports) => {
      console.log("Updated reports:", reports)
      this.isLoading = reports != undefined ? false : true
      this.slideToLast = true;
    });
  }

  public lockSwipes(zoomActive: boolean) {
    this.slider.lockSwipes(zoomActive);
  }

  ionViewWillLeave() {
    clearTimeout(this.timeout);
  }

}
