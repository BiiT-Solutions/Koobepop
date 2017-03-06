import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import * as infographicjs from 'infographic-js';
import { AppointmentsProvider } from '../../providers/appointments-provider';

/**
 * This page holds a report into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  svgList = [];
  @ViewChild('slider') slider: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public appointmentsProvider: AppointmentsProvider, public changeDetector: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.appointmentsProvider.requestAppointments({ patientId: "21008286V" })
      .subscribe(res => {
        res.forEach((appointment) => {
          this.svgList.push(infographicjs.basicReport());
        });
        //We check for changes because this is done outside of the regular angular detections
        //More info: https://github.com/angular/angular/issues/10131
        this.changeDetector.detectChanges();
      });
  }
  ionViewDidLoad() {

  }
  isZoomActive(zoomActive:boolean){
    
    //this.slider.lockSwipes(zoomActive);
  }

}
