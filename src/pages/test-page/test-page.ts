import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { NavController , NavParams, Gesture,Slides } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';

import * as infographicjs from 'infographic-js';

/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector:'test-page',
  templateUrl:'test-page.html'
})
export class TestPage{
  @ViewChild("sider") slider;
  hideHeader;
   constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) { }
   ionViewDidLoad(){
     this.hideHeader = true;
   }
}



//@Component({
//  selector: 'test-zoom',
//  templateUrl: 'zoom-test.html'
//})
//export class TestPage {
//  private gesture: Gesture;
//  @ViewChild('frame') element;
//  newWidth = 30;
//  newHeight = 40;
//  oldWidth = 300;
//  oldHeight = 400;
//  zoomActive = false;
//  mLeft = 0;
//  mTop = 0;
//  percentageOfImageAtPinchPointX = 0;
//  percentageOfImageAtPinchPointY = 0;  
//  hideHeader;
//  @ViewChild("slider") slider;
//  @ViewChildren("svgSlide") slides;
//  jsonDefinition = {
//        "width": window.outerWidth, "height": window.outerHeight, "background": "fill:#FFE4C4",
//                "svgElements":  [{"id":"girlDoctor","href":"http://www.google.com", "attributes": {"width": 300,"height": 250,  "x":30, "y":40}},
//                 {"id":"doctor", "attributes": {"width": 300,"height": 250,"x":400, "y":40}},
//                 {"id":"medical-kit", "attributes": {"width": 200,"height": 160,"x":450, "y":600}},
//                 {"id":"heart", "attributes": {"width": 150,"height": 150,"x":600, "y":600}}],
//        "textElements": [{"id":"text1","contentText":"Doctor Infographic","attributes":{"font-family": "Purisa","font-size":60,"x":100, "y":400,"fill":"#660000;font-weight:bold"}}],
//        "pngElements":  [{"id":"bitIcon","attributes": { "width": 75, "height": 75, "x":50, "y":700}}]
//   };
//   svg;
//  constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) { }
//
//
//   ngAfterViewInit() {
//        this.svg = infographicjs.newFreeLayout(this.jsonDefinition);
//        this.slides.forEach(slide => { slide.nativeElement.innerHTML = this.svg; });
//  
//        console.log("SVG: "+this.svg);
//
//    console.log(this.slider);
//    }
//  ionViewDidLoad() {
//    //create gesture obj w/ ref to DOM element
//    this.gesture = new Gesture(this.element.nativeElement);
//    //listen for the gesture
//    this.gesture.listen();
//    //turn on listening for pinch events
//    this.gesture.on('pinchstart', e => this.pinchStartEvent(e));
//    this.gesture.on('pinch', e => this.pinchEvent(e));
//    this.gesture.on('pinchend', e => this.pinchEndEvent(e));
//    this.newWidth = window.outerWidth ;
//    this.newHeight = window.outerHeight;
//    this.oldWidth = window.outerWidth ;
//    this.oldHeight = window.outerHeight;
//    this.hideHeader = true;
//
//  }
//
//  pinchStartEvent(e) {
//    //console.log("PINCH START EVENT")
//    this.startMove(e);
//    if(!this.zoomActive) this.slider.lockSwipes();
//    this.zoomActive = true;
//    this.gesture.off('panstart', e => this.startMove(e));
//    this.gesture.off('pan', e => this.moveAround(e));
//  }
//
//  pinchEndEvent(e) {
//    //console.log("PINCH END EVENT")
//    this.oldWidth = this.newWidth;
//    this.oldHeight = this.newHeight;
//
//    if (this.newHeight < window.outerWidth ) {
//      this.newWidth = window.outerWidth ;
//      this.newHeight = window.outerHeight;
//      this.oldWidth = window.outerWidth ;
//      this.oldHeight = window.outerHeight;
//      this.mLeft = 0;
//      this.mTop = 0;
//      this.zoomActive = false;
//      this.slider.lockSwipes()
//    }
//
//    if (this.zoomActive) {
//      this.gesture.on('panstart', e => this.startMove(e));
//      this.gesture.on('pan', e => this.moveAround(e));
//    }
//  }
//
//  pinchEvent(e) {
//    this.newWidth = this.oldWidth * e.scale;
//    this.newHeight = this.oldHeight * e.scale;  
//    this.moveAround(e);
//  }
//
//  startMove(e) {
//    this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft) / this.oldWidth;
//    this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop) / this.oldHeight;
//  }
//  moveAround(e) {
//    this.mLeft = - ((this.newWidth * this.percentageOfImageAtPinchPointX) - e.center.x);
//    this.mTop = - ((this.newHeight * this.percentageOfImageAtPinchPointY) - e.center.y);
//    //Limits
//    //this.mLeft = Math.min(Math.max(this.mLeft, -this.newWidth + window.outerWidth / 3), window.outerHeight / 3);
//    //this.mTop = Math.min(Math.max(this.mTop, -this.newHeight + window.outerHeight / 3), window.outerHeight / 3);
//  }
//}
