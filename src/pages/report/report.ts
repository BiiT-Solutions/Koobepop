import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as infographicjs from 'infographic-js';
/**
 * This page holds a report into a slider consisting on several pages (zoomable-slide)
 */
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {

  mySlideOptions = {
    //loop: true
  };
  // Definition of the objet to pass to infographicJS.
  // TODO Generate it from the appointment
  jsonDefinition = {
    "width": window.outerWidth, "height": window.outerHeight, "background": "fill:#ffffff",
    "svgElements": [{ "id": "girlDoctor", "href": "http://www.google.com", "attributes": { "width": 100, "height": 80, "x": 30, "y": 40 } },
    { "id": "doctor", "attributes": { "width": 100, "height": 80, "x": 200, "y": 40 } },
    { "id": "medical-kit", "attributes": { "width": 66, "height": 53, "x": 30, "y": 200 } },
    { "id": "heart", "attributes": { "width": 53, "height": 53, "x": 200, "y": 200 } }],
    "textElements": [{ "id": "text1", "contentText": "Doctor Infographic", "attributes": { "font-family": "Purisa", "font-size": 20, "x": 30, "y": 150, "fill": "#660000;font-weight:bold" } }],
    "pngElements": [{ "id": "bitIcon", "attributes": { "width": 75, "height": 75, "x": 50, "y": 250 } }]
  };
  svgList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   // console.log("constructor");
    this.svgList=this.svgList.concat(infographicjs.basicReport());//infographicjs.newFreeLayout(this.jsonDefinition));

  }
  ngAfterViewInit() {
   // console.log("avi");
  }
  ionViewDidLoad() {
  //  console.log("ivdl");
  }

}
