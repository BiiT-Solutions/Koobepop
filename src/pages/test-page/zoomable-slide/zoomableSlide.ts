import { Component, ViewChild, ViewChildren, ElementRef,Input } from '@angular/core';
import { NavController , NavParams, Gesture,Slides } from 'ionic-angular';
import { CompaniesProvider } from '../../../providers/companies';
import * as infographicjs from 'infographic-js';

@Component({
  selector: 'zoomable-slide',
  templateUrl: 'zoomableSlide.html'
})
export class ZoomableSlide {
  private gesture: Gesture;
  @ViewChild('frame') element;
  newWidth = 300;
  newHeight = 400;
  oldWidth = 300;
  oldHeight = 400;
  zoomActive = false;
  mLeft = 0;
  mTop = 0;
  percentageOfImageAtPinchPointX = 0;
  percentageOfImageAtPinchPointY = 0;  
  hideHeader;
  @ViewChild("svgSlide") slide;
  jsonDefinition = {
        "width": window.outerWidth, "height": window.outerHeight, "background": "fill:#237245",
                "svgElements":  [{"id":"girlDoctor","href":"http://www.google.com", "attributes": {"width": 100,"height": 80,  "x":30, "y":40}},
                 {"id":"doctor", "attributes": {"width": 100,"height": 80,"x":200, "y":40}},
                 {"id":"medical-kit", "attributes": {"width": 66,"height": 53,"x":30, "y":200}},
                 {"id":"heart", "attributes": {"width": 53,"height": 53,"x":200, "y":200}}],
        "textElements": [{"id":"text1","contentText":"Doctor Infographic","attributes":{"font-family": "Purisa","font-size":20,"x":30, "y":150,"fill":"#660000;font-weight:bold"}}],
        "pngElements":  [{"id":"bitIcon","attributes": { "width": 75, "height": 75, "x":50, "y":250}}]
   };

   //@Input()//Soon
   svg;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) { }


   ngAfterViewInit() {
     console.log("ngAfterViewInit")
        this.svg = infographicjs.newFreeLayout(this.jsonDefinition);
        this.slide.nativeElement.innerHTML = this.svg; 
    //console.log(this.svg); 
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);
    //listen for the gesture
    this.gesture.listen();
    //turn on listening for pinch events
    this.gesture.on('pinchstart', e => this.pinchStartEvent(e));
    this.gesture.on('pinch', e => this.pinchEvent(e));
    this.gesture.on('pinchend', e => this.pinchEndEvent(e));
    this.newWidth = window.outerWidth ;
    this.newHeight = window.outerHeight;
    this.oldWidth = window.outerWidth ;
    this.oldHeight = window.outerHeight;
    this.hideHeader = true;

    }

  pinchStartEvent(e) {
    //console.log("PINCH START EVENT")
    this.startMove(e);
    this.zoomActive = true;
    this.gesture.off('panstart', e => this.startMove(e));
    this.gesture.off('pan', e => this.moveAround(e));
  }

  pinchEndEvent(e) {
    //console.log("PINCH END EVENT")
    this.oldWidth = this.newWidth;
    this.oldHeight = this.newHeight;

    if (this.newHeight < window.outerWidth ) {
      this.newWidth = window.outerWidth ;
      this.newHeight = window.outerHeight;
      this.oldWidth = window.outerWidth ;
      this.oldHeight = window.outerHeight;
      this.mLeft = 0;
      this.mTop = 0;
      this.zoomActive = false;
    }

    if (this.zoomActive) {
      this.gesture.on('panstart', e => this.startMove(e));
      this.gesture.on('pan', e => this.moveAround(e));
    }
  }

  pinchEvent(e) {
    this.newWidth = Math.min(this.oldWidth * e.scale,window.outerWidth*4);
    this.newHeight = Math.min(this.oldHeight * e.scale,window.outerHeight*4);  


    this.moveAround(e);
  }

  startMove(e) {
    this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft) / this.oldWidth;
    this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop) / this.oldHeight;
  }
  moveAround(e) {
    this.mLeft = - ((this.newWidth * this.percentageOfImageAtPinchPointX) - e.center.x);
    this.mTop = - ((this.newHeight * this.percentageOfImageAtPinchPointY) - e.center.y);
    //Limits
    //this.mLeft = Math.min(Math.max(this.mLeft, -this.newWidth + window.outerWidth / 3), window.outerHeight / 3);
    //this.mTop = Math.min(Math.max(this.mTop, -this.newHeight + window.outerHeight / 3), window.outerHeight / 3);
  }
  public isZoomActive(){
      return this.zoomActive;
  }
}