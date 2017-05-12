import { Component, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { Gesture, ToastController } from 'ionic-angular'; @Component({
  selector: 'zoomable-slide',
  templateUrl: 'zoomableSlide.html'
})
export class ZoomableSlide {
  private gesture: Gesture;
  @ViewChild('frame') element;
  FRAME_WIDTH = 0;
  FRAME_HEIGHT = 0;
  MIN_SLIDE_HEIGHT = 0;
  newWidth = 300;
  newHeight = 400;
  oldWidth = 300;
  oldHeight = 400;
  mLeft = 0;
  mTop = 0;
  viewWidth;
  viewHeight;
  viewMarginTop;
  viewMarginLeft;
  zoomActive = false;
  percentageOfImageAtPinchPointX = 0;
  percentageOfImageAtPinchPointY = 0;
  hideHeader;
  @ViewChild("svgSlide") slide;
  @Input() svg;
  intervalId;
  @Output() zooming: EventEmitter<boolean> = new EventEmitter<boolean>();
  pinchString: string = "";
  constructor(public toastCtrl: ToastController) { }

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
    
    this.gesture.on('panstart', e => this.startMove(e));
    this.gesture.on('pan', e => this.moveAround(e));
    
    this.FRAME_WIDTH = this.element.nativeElement.getBoundingClientRect().width;
    this.FRAME_HEIGHT = this.element.nativeElement.getBoundingClientRect().height;
    this.MIN_SLIDE_HEIGHT = this.slide.nativeElement.getBoundingClientRect().height;

    this.newWidth = this.FRAME_WIDTH;
    this.newHeight = this.MIN_SLIDE_HEIGHT;
    this.oldWidth = this.FRAME_WIDTH;
    this.oldHeight = this.MIN_SLIDE_HEIGHT;
    this.applyResize();
    this.startRendering();
  }

  pinchStartEvent(e) {
    this.startMove(e);
    this.gesture.off('panstart', e => this.startMove(e));
    this.gesture.off('pan', e => this.moveAround(e));
    this.zooming.emit(true);
  }

  pinchEvent(e) {
    this.newWidth = Math.max(Math.min(this.oldWidth * e.scale, this.FRAME_WIDTH * 4), this.FRAME_WIDTH);
    this.newHeight = Math.max(Math.min(this.oldHeight * e.scale, this.MIN_SLIDE_HEIGHT * 4), this.MIN_SLIDE_HEIGHT);
    this.moveAround(e);
  }

  pinchEndEvent(e) {
    this.oldWidth = this.newWidth;
    this.oldHeight = this.newHeight;

    if (this.newWidth <= this.FRAME_WIDTH * 1.05) {
      this.newWidth = this.FRAME_WIDTH;
      this.newHeight = this.MIN_SLIDE_HEIGHT;
      this.oldWidth = this.FRAME_WIDTH;
      this.oldHeight = this.MIN_SLIDE_HEIGHT;
      this.mLeft = 0;
      this.mTop = 0;
      this.zooming.emit(false);
    }
    this.gesture.on('panstart', e => this.startMove(e));
    this.gesture.on('pan', e => this.moveAround(e));
    /*if (this.zoomActive) {
      this.gesture.on('panstart', e => this.startMove(e));
      this.gesture.on('pan', e => this.moveAround(e));
    } else {
      this.zooming.emit(this.zoomActive);
    }*/
  }

  startMove(e) {
    this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft) / this.oldWidth;
    this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop) / this.oldHeight;
  }

  moveAround(e) {
    this.mLeft = - ((this.newWidth * this.percentageOfImageAtPinchPointX) - e.center.x);
    this.mTop = - ((this.newHeight * this.percentageOfImageAtPinchPointY) - e.center.y);
    //Limits
    this.mLeft = Math.min(Math.max(this.mLeft, this.FRAME_WIDTH - this.newWidth), 0);
    this.mTop = Math.min(Math.max(this.mTop, this.FRAME_HEIGHT - this.newHeight), 0);
  }

  ngOnDestroy() {
    this.stopRendering();
  }
  startRendering() {
    this.intervalId = setInterval(() => this.render(), 1000 / 25);
  }
  stopRendering() {
    clearInterval(this.intervalId);
  }

  /* We change the image once every 1/25 of second while zoom is changing so it's not processor dependent*/
  render() {
    this.applyResize();
  }
  applyResize() {
    this.viewHeight = this.newHeight;
    this.viewWidth = this.newWidth;
    this.viewMarginTop = this.mTop;
    this.viewMarginLeft = this.mLeft;
  }

  showToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      cssClass: 'good-toast'
    });
    toast.present();
  }
}