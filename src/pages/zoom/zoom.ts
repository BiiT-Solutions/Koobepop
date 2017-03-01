import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams, Gesture } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';

@Component({
  selector: 'page-zoom',
  templateUrl: 'zoom.html'
})
export class ZoomPage {
  private gesture: Gesture;
  @ViewChild('frame') element;
  @ViewChild('book') book;
  newWidth = 30;
  newHeight = 40;
  oldWidth = 300;
  oldHeight = 400;
  zoomActive = false;
  mLeft = 0;
  mTop = 0;
  percentageOfImageAtPinchPointX = 0;
  percentageOfImageAtPinchPointY = 0;
  
  hideHeader;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) { }



  ionViewDidLoad() {
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(this.element.nativeElement);
    //listen for the gesture
    this.gesture.listen();
    //turn on listening for pinch events
    this.gesture.on('pinchstart', e => this.pinchStartEvent(e));
    this.gesture.on('pinch', e => this.pinchEvent(e));
    this.gesture.on('pinchend', e => this.pinchEndEvent(e));
    this.newWidth = window.outerWidth * 2;
    this.newHeight = window.outerHeight;
    this.oldWidth = window.outerWidth * 2;
    this.oldHeight = window.outerHeight;
    this.hideHeader = true;
  }

  pinchStartEvent(e) {
    //console.log("PINCH START EVENT")
    this.startMove(e);
    this.zoomActive = true;
    this.gesture.off('panstart', e => this.startMove(e));
    this.gesture.off('pan', e => this.move(e));
  }

  pinchEndEvent(e) {
    //console.log("PINCH END EVENT")
    this.oldWidth = this.newWidth;
    this.oldHeight = this.newHeight;

    if (this.newHeight < window.outerWidth * 2) {
      this.newWidth = window.outerWidth * 2;
      this.newHeight = window.outerHeight;
      this.oldWidth = window.outerWidth * 2;
      this.oldHeight = window.outerHeight;
      this.mLeft = 0;
      this.mTop = 0;
      this.zoomActive = false;
    }

    if (this.zoomActive) {
      this.gesture.on('panstart', e => this.startMove(e));
      this.gesture.on('pan', e => this.move(e));
    }
  }

  pinchEvent(e) {
    // console.log("PINCH EVENT CONTROLLER RUNNING")
    this.newWidth = this.oldWidth * e.scale;
    this.newHeight = this.oldHeight * e.scale;
    this.newWidth = Math.min(Math.max(this.oldWidth * e.scale, window.outerWidth * 2 * 0.5), window.outerWidth * 2 * 5);
    this.newHeight = Math.min(Math.max(this.oldHeight * e.scale, window.outerHeight * 0.5), window.outerHeight * 5);

    this.move(e);
  }

  startMove(e) {
    this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft) / this.oldWidth;
    this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop) / this.oldHeight;
  }
  move(e) {
    this.mLeft = - ((this.newWidth * this.percentageOfImageAtPinchPointX) - e.center.x);
    this.mTop = - ((this.newHeight * this.percentageOfImageAtPinchPointY) - e.center.y);
    //Limits
    this.mLeft = Math.min(Math.max(this.mLeft, -this.newWidth + window.outerWidth / 3), window.outerHeight / 3);
    this.mTop = Math.min(Math.max(this.mTop, -this.newHeight + window.outerHeight / 3), window.outerHeight / 3);
  }
  ionViewWillEnter() {
    this.book.startRendering();
  }
  ionViewDidLeave() {
    this.book.stopRendering();
  }
}

