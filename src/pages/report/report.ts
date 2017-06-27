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

    const reportBuilder ={
  "width": 960.0,
  "height": 2300.0,
  "background": {
    "backgroundColor": "#f7fcf9"
  },
  "type": "gridLayout",
  "numColumns": 1,
  "numRows": 10,
  "auxiliarLines": true,
  "cells": [
    {
      "xColumn": 0.0,
      "yColumn": 0.0,
      "content": {
        "type": "text",
        "id": "title",
        "contentText": "Advisory report",
        "font-size": 80.0,
        "font-family": "Sans",
        "maxLineSize": 50,
        "verticalAlign": "middle",
        "style": "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold"
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 0.0,
      "content": {
        "width": 960.0,
        "height": 230.0,
        "type": "freeLayout",
        "elements": [
          {
            "origin": {
              "x": 0.0,
              "y": 200.0
            },
            "size": {
              "width": 960.0,
              "height": 10.0
            },
            "content": {
              "type": "basicshape",
              "id": "line",
              "stroke": "#800600",
              "strokeWidth": 10.0,
              "endPoint": {
                "x": 960.0,
                "y": 200.0
              }
            }
          }
        ]
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 1.0,
      "content": {
        "type": "gridLayout",
        "numColumns": 2,
        "numRows": 1,
        "cells": [
          {
            "xColumn": 0.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#00aa00",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "lungs"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Lung function",
                    "contentText": "Lung function",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          },
          {
            "xColumn": 1.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#ff0000",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 90.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "bodyComposition"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Body composition",
                    "contentText": "Body composition",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 2.0,
      "content": {
        "type": "gridLayout",
        "numColumns": 2,
        "numRows": 1,
        "cells": [
          {
            "xColumn": 0.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#ffb33b",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "heart"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Heart function",
                    "contentText": "Heart function",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          },
          {
            "xColumn": 1.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#00aa00",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "sleep"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Sleep",
                    "contentText": "Sleep",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 3.0,
      "content": {
        "type": "gridLayout",
        "numColumns": 2,
        "numRows": 1,
        "cells": [
          {
            "xColumn": 0.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#ff0000",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 90.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "movement"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Movement function",
                    "contentText": "Movement function",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          },
          {
            "xColumn": 1.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#00aa00",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "energyBalance"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Energy balance",
                    "contentText": "Energy balance",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 4.0,
      "content": {
        "type": "gridLayout",
        "numColumns": 2,
        "numRows": 1,
        "cells": [
          {
            "xColumn": 0.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#00aa00",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "condition"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Condition",
                    "contentText": "Condition",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          },
          {
            "xColumn": 1.0,
            "yColumn": 0.0,
            "content": {
              "width": 560.0,
              "height": 270.0,
              "type": "freeLayout",
              "elements": [
                {
                  "origin": {
                    "x": 30.0,
                    "y": 50.0
                  },
                  "size": {
                    "width": 500.0,
                    "height": 220.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "rect",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 5.0,
                    "rx": 26.83,
                    "style": "fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0"
                  }
                },
                {
                  "origin": {
                    "x": 300.0,
                    "y": 200.0
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "circle",
                    "stroke": "#ffb33b",
                    "strokeWidth": 0.0,
                    "r": 45.0
                  }
                },
                {
                  "origin": {
                    "x": 80.0,
                    "y": 49.8
                  },
                  "size": {
                    "width": 90.0,
                    "height": 90.0
                  },
                  "content": {
                    "type": "basicshape",
                    "id": "line",
                    "stroke": "#dbf5fc",
                    "strokeWidth": 6.0,
                    "endPoint": {
                      "x": 190.0,
                      "y": 49.8
                    }
                  }
                },
                {
                  "origin": {
                    "x": 60.0,
                    "y": 10.0
                  },
                  "size": {
                    "width": -1.0,
                    "height": -1.0
                  },
                  "content": {
                    "type": "svg",
                    "id": "stress"
                  }
                },
                {
                  "origin": {
                    "x": 230.0,
                    "y": 90.0
                  },
                  "content": {
                    "type": "text",
                    "id": "Stress",
                    "contentText": "Stress",
                    "font-size": 32.0,
                    "font-family": "Sans",
                    "maxLineSize": 10,
                    "style": "font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;fill:#804600"
                  }
                }
              ]
            }
          }
        ]
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 5.0,
      "content": {
        "type": "text",
        "id": "Descrition",
        "contentText": "Description",
        "font-size": 60.0,
        "font-family": "Sans",
        "maxLineSize": 50,
        "verticalAlign": "middle",
        "style": "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold"
      }
    },
    {
      "xColumn": 0.0,
      "yColumn": 0.0,
      "content": {
        "width": 960.0,
        "height": 230.0,
        "type": "freeLayout",
        "elements": [
          {
            "origin": {
              "x": 0.0,
              "y": 200.0
            },
            "size": {
              "width": 960.0,
              "height": 10.0
            },
            "content": {
              "type": "basicshape",
              "id": "line",
              "stroke": "#800600",
              "strokeWidth": 10.0,
              "endPoint": {
                "x": 960.0,
                "y": 200.0
              }
            }
          }
        ]
      }
    }
  ]
}



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
