import { Component, ViewChild, ViewChildren, ElementRef, Input } from '@angular/core';
import { NavController, NavParams, Gesture, Slides } from 'ionic-angular';
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

  viewWidth;
  viewHeight;
  viewMarginTop;
  viewMarginLeft;


  percentageOfImageAtPinchPointX = 0;
  percentageOfImageAtPinchPointY = 0;
  hideHeader;
  @ViewChild("svgSlide") slide;
  @Input() svg;
  intervalId;

  constructor(public companiesProvider: CompaniesProvider) { }


  ngAfterViewInit() {
    this.slide.nativeElement.innerHTML = this.svg;
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);
    //listen for the gesture
    this.gesture.listen();
    //turn on listening for pinch events
    this.gesture.on('pinchstart', e => this.pinchStartEvent(e));
    this.gesture.on('pinch', e => this.pinchEvent(e));
    this.gesture.on('pinchend', e => this.pinchEndEvent(e));

    this.newWidth = window.outerWidth;
    this.newHeight = window.outerHeight;
    this.oldWidth = window.outerWidth;
    this.oldHeight = window.outerHeight;
    this.changeSize();
    this.startRendering();
  }

  pinchStartEvent(e) {
    //console.log("PINCH START EVENT")
    this.startMove(e);
    this.zoomActive = true;
    this.gesture.off('panstart', e => this.startMove(e));
    this.gesture.off('pan', e => this.moveAround(e));
  }

  pinchEvent(e) {
    this.newWidth = Math.max(Math.min(this.oldWidth * e.scale, window.outerWidth * 4),window.outerWidth);
    this.newHeight = Math.max(Math.min(this.oldHeight * e.scale, window.outerHeight * 4),window.outerHeight);
    this.moveAround(e);
  }
  
  pinchEndEvent(e) {
    //console.log("PINCH END EVENT")
    this.oldWidth = this.newWidth;
    this.oldHeight = this.newHeight;

    if (this.newHeight < window.outerWidth) {
      this.newWidth = window.outerWidth;
      this.newHeight = window.outerHeight;
      this.oldWidth = window.outerWidth;
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

  startMove(e) {
    this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft) / this.oldWidth;
    this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop) / this.oldHeight;
  }

  moveAround(e) {
    this.mLeft = - ((this.newWidth * this.percentageOfImageAtPinchPointX) - e.center.x);
    this.mTop = - ((this.newHeight * this.percentageOfImageAtPinchPointY) - e.center.y);
    //Limits
    this.mLeft = Math.min(Math.max(this.mLeft, window.outerWidth -this.newWidth), 0);
    this.mTop = Math.min(Math.max(this.mTop,  window.outerHeight - this.newHeight),0);
  }  
  
  ngOnDestroy(){
   this.stopRendering();
  }
  startRendering() {
    this.intervalId = setInterval(() => this.render(), 1000 /25);
  }
  stopRendering() {
    clearInterval(this.intervalId);
  }

  /* We change the image once every 1/25 of second while zoom is changing so it's not processor dependent*/
  render(){
    this.changeSize();
  }
  changeSize(){
    this.viewHeight = this.newHeight;
    this.viewWidth=this.newWidth;
    this.viewMarginTop = this.mTop;
    this.viewMarginLeft = this.mLeft;
  }
  public isZoomActive() {
    return this.zoomActive;
  }
}