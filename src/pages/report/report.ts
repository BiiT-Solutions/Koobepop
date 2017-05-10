import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import * as infographicjs from 'infographic-js';
import { ServicesManager } from '../../providers/servicesManager'
import { ToastIssuer } from '../../providers/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
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
       /* let reportBuilder = {
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
        */
        this.setReport(context)
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
  setReport(context){
    var reportBuilder = {
    width: 960,
    height: 2300,
    type: 'gridLayout',
    columns: 1,
    rows: 10,
    cells: [{
        xCell: 0,
        yCell: 0,
        element: {
            type: 'text',
            text: 'Advisory report',
            verticalAlign: 'middle',
            attributes: { x: 10, "font-size": "80px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
        }
    }, {
        xCell: 0,
        yCell: 0,
        element: {
            type: 'basicShape',
            tag: 'line',
            attributes: { x1: 0, y1: 200, x2: 960, y2: 200, style: 'stroke:#800600;stroke-width:10;' }
        }
    }, {
        xCell: 0,
        yCell: 1,
        element: {
            type: 'gridLayout',
            columns: 2,
            rows: 1,
            cells: [{
                xCell: 0,
                yCell: 0,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0'}
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#00aa00' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 80, y1: 49.8, x2: 190, y2: 49.8, style: 'stroke:#f7fcf9;stroke-width:6.5;' }
                    }
                    ],
                    svgElements: [{
                        id: 'lungs',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Lung ',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    },
                    {
                        id: 'testName',
                        contentText: 'function',
                        attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 1,
                yCell: 0,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#00aa00' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.9;' }
                    }
                    ],
                    svgElements: [{
                        id: 'bodyComposition',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Body',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }, {
                        id: 'name',
                        contentText: 'composition',
                        attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 0,
                yCell: 1,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style:'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#ffb33b' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:6;' }
                    }
                    ],
                    svgElements: [{
                        id: 'heart',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Heart ',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    },{
                        id: 'testName',
                        contentText: 'function',
                        attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 1,
                yCell: 1,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#00aa00' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.2;' }
                    }
                    ],
                    svgElements: [{
                        id: 'sleep',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Sleep',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 0,
                yCell: 2,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#00aa00' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.2;' }
                    }
                    ],
                    svgElements: [{
                        id: 'movement',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Movement ',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    },{
                        id: 'testName',
                        contentText: 'function',
                        attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 1,
                yCell: 2,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#ffb33b' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.2;' }
                    }
                    ],
                    svgElements: [{
                        id: 'energyBalance',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Energy ',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    },{
                        id: 'testName',
                        contentText: 'balance',
                        attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 0,
                yCell: 3,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style:'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#ff0000' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.2;' }
                    }
                    ],
                    svgElements: [{
                        id: 'condition',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Condition',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }, {
                xCell: 1,
                yCell: 3,
                element: {
                    type: 'freeLayout',
                    width: 560,
                    height: 270,
                    svgShapes: [{
                        tag: 'rect',
                        attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
                    }, {
                        tag: 'rect',
                        attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: '#ff0000' }
                    }, {
                        tag: 'line',
                        attributes: { x1: 20, y1: 50, x2: 200, y2: 50, style: 'stroke:#f7fcf9;stroke-width:5.2;' }
                    }
                    ],
                    svgElements: [{
                        id: 'stress',
                        attributes: { width: 'default', height: 'default', x: 60, y: 10 }
                    },
                    ],
                    textElements: [{
                        id: 'testName',
                        contentText: 'Stress',
                        attributes: { x: 250, y: 100, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                    }
                    ],
                },
            }]



        }
    }]

}
    context.svgList.push(infographicjs.newLayout(reportBuilder));
  }
}