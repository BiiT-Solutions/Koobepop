import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentModel } from '../../models/appointment.model';
import * as infographicjs from 'infographic-js';
import { ServicesManager } from '../../providers/servicesManager'
import { ToastIssuer } from '../../providers/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
/**
 * This page holds reports into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  testext;
  svgList = [];
  appointments: AppointmentModel[];
  @ViewChild('slider') slider: Slides;
  loading: Loading;
  timeout;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public changeDetector: ChangeDetectorRef,
    public manager: ServicesManager,
    public loadingCtrl: LoadingController,
    public toaster: ToastIssuer,
    public translate: TranslateService) {
  }

  protected ionViewWillLoad() {
    this.setAppointments();
    this.loading = this.loadingCtrl.create({
      content: this.translate.instant('REPORT.REPORTS-LOADING-TEXT')
    });
    this.loading.present().then(() => this.loadReports(this.loading, this));
  }

  protected ionViewDidLoad() {


  }

  protected ionViewWillEnter() {
  }


  protected ionViewDidEnter() {
  }

  private setAppointments() {
    this.manager.getAppointments()
      .subscribe(appointments => this.appointments = appointments, (error) => this.errorMessage(error));
  }

  private errorMessage(error) {
    this.translate.get("REPORT.ERROR-SETTING-APPOINTMENTS").subscribe(translation => this.toaster.badToast(translation));
    console.error(error);
  }


  private loadReports(loading: Loading, context: ReportPage): void {

    if (context.appointments == undefined || context.appointments.length <= 0) {
      this.setAppointments();
      context.timeout = setTimeout(() => context.loadReports(loading, context), 1000);
    } else {
      context.appointments.forEach((appointment: AppointmentModel) => {
        try {
          this.addReport(context, appointment)
        } catch (e) { console.error("ReportPage:", e) }
      });
      //This prevents a change detection error on dev mode
      try {
        context.changeDetector.detectChanges();
      } catch (exception) {
        console.error("ReportPage:", exception);
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

  addReport(context, appointment: AppointmentModel) {
    const results = appointment.results;
    const mentalExam = results['epworthslaperigheidsschaal'];
    let sleepScore = 0;
    if (mentalExam != undefined) {
      //For each key
      for (const element in mentalExam.situatie) {
        sleepScore += parseInt(mentalExam.situatie[element][0])
      }
    }
    //Init color depending on the score
    let sleepColor;
    let sleepScoreString;

    if (sleepScore < 11) {
      sleepColor = "#00aa00"
      sleepScoreString = "normal healthy sleep"
    } else if (sleepScore < 15) {
      sleepColor = "#fcd453"
      sleepScoreString = "mild insomnia"
    } else if (sleepScore < 18) {
      sleepColor = "#ffb33b"
      sleepScoreString = "strong insomnia"
    } else {
      sleepColor = "#ff0000"
      sleepScoreString = "severe insomnia"
    }

    const reportBuilder = {
      "width": 960.0,
      "height": 230.0,
      "type": "gridLayout",
      "numColumns": 3,
      "numRows": 1,
      "auxiliarLines": false,
      "cells": [
        {
          "xColumn": 0,
          "yColumn": 0,
          "margins": {
            "top": 40.0,
            "left": 10.0,
            "right": 10.0,
            "buttom": 0.0
          },
          "content": {
            "type": "basicshape",
            "id": "rect",
            "ry": 26.83,
            "style": "fill:#dbf5fc;fill-opacity:1.0;stroke:#800600;stroke-opacity:1.0;stroke-width:5.0;stroke-milimiterlimit:4.0"
          }
        },
        {
          "xColumn": 0,
          "yColumn": 0,
          "content": {
            "width": 320.0,
            "height": 230.0,
            "type": "freeLayout",
            "elements": [
              {
                "origin": {
                  "x": 150,
                  "y": 160
                },
                "size": {
                  "width": 60.0,
                  "height": 60.0
                },
                "content": {
                  "type": "basicshape",
                  "id": "circle",
                  "style": "fill:#00aa00;fill-opacity:1.0;stroke-width:0.0",
                  "r": 33.0
                }
              },
              {
                "origin": {
                  "x": 30,
                  "y": 10
                },
                "size": {
                  "width": 110.0,
                  "height": 90.0
                },
                "content": {
                  "type": "svg",
                  "id": "lungs"
                }
              },
              {
                "origin": {
                  "x": 160,
                  "y": 80
                },
                "content": {
                  "type": "text",
                  "id": "Lung function",
                  "contentText": "Lung function",
                  "maxLineSize": 5,
                  "style": "font-family:Sans;font-size:25px;font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;letter-spacing:0px;word-spacing:0px;line-height:125%;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1.0;stroke:none"
                }
              }
            ]
          }
        },
        {
          "xColumn": 1,
          "yColumn": 0,
          "cellSpan": {
            "columnSpan": 2,
            "rowSpan": 1
          },
          "margins": {
            "top": 40.0,
            "left": 0.0,
            "right": 0.0,
            "buttom": 0.0
          },
          "content": {
            "type": "basicshape",
            "id": "rect",
            "ry": 40.0,
            "style": "fill:#006680;fill-opacity:1.0;stroke-width:0.0"
          }
        },
        {
          "xColumn": 1,
          "yColumn": 0,
          "cellSpan": {
            "columnSpan": 2,
            "rowSpan": 1
          },
          "content": {
            "width": 700.0,
            "height": 200.0,
            "type": "freeLayout",
            "elements": [
              {
                "origin": {
                  "x": 50,
                  "y": 70
                },
                "content": {
                  "type": "text",
                  "contentText": "Lung function",
                  "maxLineSize": 50,
                  "style": "font-family:Sans;font-size:20px;font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;letter-spacing:0px;word-spacing:0px;line-height:125%;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1.0;stroke:none"
                }
              },
              {
                "origin": {
                  "x": 50,
                  "y": 95
                },
                "content": {
                  "type": "text",
                  "contentText": "Pulmonary function tests (PFTs) are a group of tests that measure how well your lungs work. This includes how well you’re able to breathe and how effective your lungs are able to bring oxygen to the rest of your body",
                  "maxLineSize": 80,
                  "style": "font-family:Sans;font-size:14px;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;letter-spacing:0px;word-spacing:0px;line-height:125%;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1.0;stroke:none"
                }
              }
            ]
          }
        }
      ]
    };
    //Show reports
    //1st- General idea
    try {
      context.svgList.push(infographicjs.newLayout(reportBuilder));
    } catch (ex) {
      console.log("Problem with infographics");
      console.error(ex);
    }
    //2nd- Specifics about each examination
  }
  choosleColor(index: number) {
    switch (index) {
      case 3:
        return '#00aa00';
      case 2:
        return '#fcd453';
      case 1:
        return '#ffb33b';
      case 0:
        return '#ff0000';
    }
  }
}
