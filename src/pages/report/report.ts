import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, LoadingController, Loading } from 'ionic-angular';
import { IAppointment } from '../../models/appointmentI';
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
    appointments: IAppointment[];
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
    
    protected ionViewWillLoad(){
        this.setAppointments();
        this.loading = this.loadingCtrl.create({
            content: this.translate.instant('REPORT.REPORTS-LOADING-TEXT')
        });
        this.loading.present();
    }

    protected ionViewDidLoad() {
         this.loadReports(this.loading, this);
    }

    protected ionViewWillEnter(){
       
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
            context.appointments.forEach((appointment: IAppointment) => {
                try {
                    this.addReport(context, appointment)
                } catch (e) { console.error("ReportPage:",e) }
            });
            //This prevents a change detection error on dev mode
            try {
                context.changeDetector.detectChanges();
            } catch (exception) {
                console.error(exception);
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

    addReport(context, appointment: IAppointment) {
        let results = appointment.results;
        let mentalExam = results['epworthslaperigheidsschaal'];
        let sleepScore = 0;
        if (mentalExam != undefined) {
            //For each key 
            for (let element in mentalExam.situatie) {
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


        var reportBuilder = {
            width: 960,
            height: 2300,
            type: 'gridLayout',
            columns: 1,
            rows: 10,
            //auxiliarLines: true,
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
                    type: 'text',
                    text: new Date(appointment.startTime).toLocaleDateString(),
                    verticalAlign: 'middle',
                    attributes: { x: 10, y: 50, "font-size": "60px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
                }
            },
            {
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
                                attributes: { width: 500, height: 220, ry: 26.83, x: 30, y: 50, style: 'fill:#dbf5fc;stroke:#800600;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0' }
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
                    }
                    ]
                }
            }, {
                xCell: 0,
                yCell: 2,
                element: {
                    type: 'gridLayout',
                    columns: 2,
                    rows: 1,
                    cells: [
                        {
                            xCell: 0,
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
                                }, {
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
                                    attributes: { width: 90, height: 90, x: 250, y: 150, ry: 45, fill: sleepColor }
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
                                ]
                            }
                        }
                    ]
                }
            }, {
                xCell: 0,
                yCell: 3,
                element: {
                    type: 'gridLayout',
                    columns: 2,
                    rows: 1,
                    cells: [
                        {
                            xCell: 0,
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
                                }, {
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
                                }, {
                                    id: 'testName',
                                    contentText: 'balance',
                                    attributes: { x: 250, y: 132, 'font-size': '32px', 'fill': '#804600', style: 'font-weight:bold;font-stretch:normal;line-height:125%;fill-opacity:1;stroke:none;font-family:Sans' }
                                }
                                ],
                            },
                        }
                    ]
                }
            }, {
                xCell: 0,
                yCell: 4,
                element: {
                    type: 'gridLayout',
                    columns: 2,
                    rows: 1,
                    cells: [
                        {
                            xCell: 0,
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
                        }
                    ]
                }
            }, {
                xCell: 0,
                yCell: 5,
                element: {
                    type: 'text',
                    text: 'Descriptions',
                    verticalAlign: 'middle',
                    attributes: { x: 10, "font-size": "60px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#2c89a0;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
                }
            },
            {
                xCell: 0,
                yCell: 5,
                element: {
                    type: 'basicShape',
                    tag: 'line',
                    attributes: { x1: 10, y1: 1350, x2: 480, y2: 1350, style: 'stroke:#800600;stroke-width:6;' }
                }
            }, {
                xCell: 0,
                yCell: 6,
                element: {
                    type: 'freeLayout',
                    width: 920,
                    height: 250,
                    svgShapes: [{
                        type: 'basicShape',
                        tag: 'rect',
                        attributes: { x: 10, y: 20, ry: 40, width: 900, height: 230, style: 'fill:#006680;fill-opacity:1;fill-rule:evenodd;stroke:none' }
                    }],
                    svgElements: [{
                        id: 'sleep2',
                        attributes: { width: 'default', height: 'default', x: 60, y: 60, style: 'fill:#FFFFFF' }
                    },
                    ]
                }
            }, {
                xCell: 0,
                yCell: 6,
                element: {
                    type: 'text',
                    maxLineSize: 40,
                    text: 'Your actual sleep score is: ' + sleepScore + ' points. Which means ' + sleepScoreString + ".",
                    verticalAlign: 'middle',
                    attributes: { x: 250, "font-size": "20px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" }

                }
            }, {
                xCell: 0,
                yCell: 6,
                element: {
                    type: 'text',
                    text: 'Sleep',
                    verticalAlign: 'top',
                    attributes: { y: 1450, x: 250, "font-size": "22px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
                }
            }, {
                xCell: 0,
                yCell: 7,
                element: {
                    type: 'freeLayout',
                    width: 920,
                    height: 250,
                    svgShapes: [{
                        type: 'basicShape',
                        tag: 'rect',
                        attributes: { x: 10, y: 20, ry: 40, width: 900, height: 230, style: 'fill:#006680;fill-opacity:1;fill-rule:evenodd;stroke:none' }
                    }],
                    svgElements: [{
                        id: 'lungs2',
                        attributes: { width: 'default', height: 'default', x: 60, y: 60, style: 'fill:#FFFFFF' }
                    },
                    ]
                }
            }, {
                xCell: 0,
                yCell: 7,
                element: {
                    type: 'text',
                    maxLineSize: 70,
                    text: 'Pulmonary function tests (PFTs) are a group of tests that measure how well your lungs work. This includes how well you’re able to breathe and how effective your lungs are able to bring oxygen to the rest of your body.',
                    verticalAlign: 'middle',
                    attributes: { x: 250, "font-size": "17px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" }

                }
            }, {
                xCell: 0,
                yCell: 7,
                element: {
                    type: 'text',
                    text: 'Lung function',
                    verticalAlign: 'top',
                    attributes: { y: 1680, x: 250, "font-size": "22px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
                }
            },
            {
                xCell: 0,
                yCell: 8,
                element: {
                    type: 'freeLayout',
                    width: 920,
                    height: 250,
                    svgShapes: [{
                        type: 'basicShape',
                        tag: 'rect',
                        attributes: { x: 10, y: 20, ry: 40, width: 900, height: 230, style: 'fill:#006680;fill-opacity:1;fill-rule:evenodd;stroke:none' }
                    }],
                    svgElements: [{
                        id: 'heart2',
                        attributes: { width: 'default', height: 'default', x: 60, y: 60, style: 'fill:#FFFFFF' }
                    },
                    ]
                }
            }, {
                xCell: 0,
                yCell: 8,
                element: {
                    type: 'text',
                    maxLineSize: 70,
                    text: 'There are many different tests to find out how your heart is doing or to diagnose a condition. Heart tests give you and your doctor more information about the condition of your heart and can help you find out which treatment(s) may be best for you',
                    verticalAlign: 'middle',
                    attributes: { x: 250, "font-size": "17px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;stroke:none;font-family:Sans;-inkscape-font-specification:Sans" }

                }
            }, {
                xCell: 0,
                yCell: 8,
                element: {
                    type: 'text',
                    text: 'Heart function',
                    verticalAlign: 'top',
                    attributes: { y: 1910, x: 250, "font-size": "22px", style: "font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;line-height:125%;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;fill:#ffffff;fill-opacity:1;stroke:none;font-family:Sans;-inkscape-font-specification:Sans Bold" }
                }
            }

            ]
        };

        //Show reports 
        //1st- General idea
        context.svgList.push(infographicjs.newLayout(reportBuilder));
        //2nd- Specifics about each examination


    }
}