import { Component, ViewChild } from '@angular/core';
import { NavController, Slides } from 'ionic-angular';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
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
  reportsAvailable: boolean = false;
  timeout;
  constructor(public navCtrl: NavController,
    public toaster: ToastIssuer,
    public translate: TranslateService,
    public reportsProvider: ReportsProvider) {
  }

  protected ionViewDidLoad() {
    //Preload reports into memory, remove loading page, allow slide to last
   /* this.reportsProvider.getReports()
      .subscribe((reports) => {
        this.isLoading = false;
        this.slideToLast = true;
        this.reportsAvailable = reports != undefined && reports.length > 0 ? true : false;
      });
  */
    }

  protected ionViewWillEnter() {
    console.log("report willenter")
    this.updateReports();
  }

  protected ionViewDidEnter() {
  }

  public errorMessage(error) {
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
    this.reportsProvider.update()
      .subscribe((reports) => {
        this.isLoading = false;
        this.slideToLast = true;
        this.reportsAvailable = reports != undefined && reports.length > 0 ? true : false;
      },e=>{console.log("error")});
  }

  public lockSwipes(zoomActive: boolean) {
    this.slider.lockSwipes(zoomActive);
  }

  ionViewWillLeave() {
    clearTimeout(this.timeout);
  }

}
