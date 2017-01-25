import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Gesture } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';
/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  companies = [{name:" :D"}];
  private gesture: Gesture;
  @ViewChild('frame') element;
  @ViewChild('contenedor') contenedor;
  newWidth =300;
  newHeight = 400;
  oldWidth=300;
  oldHeight= 400;

  src = "assets/infografies/commomfojmddoekd.png";
  mLeft = 0;
  mTop = 0
  pinchX=0;
  pinchY=0;
  oldCenterX=0;
  oldCenterY=0;
  percentageOfImageAtPinchPointX = 0;
  percentageOfImageAtPinchPointY = 0;
  translateFromZoomingX=0;
  translateFromZoomingY=0;
  translateFromTranslatingX=0;
  translateFromTranslatingY=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) {}



 ionViewDidLoad() {
	//create gesture obj w/ ref to DOM element
	this.gesture = new Gesture(this.element.nativeElement);
	//listen for the gesture
	this.gesture.listen();
	//turn on listening for pinch events
	this.gesture.on('pinchstart', e => this.pinchStartEvent(e));
  this.gesture.on('pinch', e => this.pinchEvent(e));
  this.gesture.on('pinchend', e => this.pinchEndEvent(e));

  this.gesture.on('panstart', e => this.startMove(e));
  this.gesture.on('pan', e =>this.move(e));
}

pinchStartEvent(e){
  console.log("PINCH START EVENT")
  this.startMove(e);
  this.gesture.off('panstart', e => this.startMove(e));
  this.gesture.off('pan', e =>this.move(e));
}

pinchEndEvent(e){
  console.log("PINCH END EVENT")
   this.oldWidth = this.newWidth;
   this.oldHeight = this.newHeight;
   this.gesture.on('panstart', e => this.startMove(e));
  this.gesture.on('pan', e =>this.move(e));
}

pinchEvent(e){
  console.log("PINCH EVENT CONTROLLER RUNNING")
  // TODO: ADD max y min
  this.newWidth = this.oldWidth * e.scale;
  this.newHeight = this.oldHeight * e.scale;
  //this.newWidth = Math.min(Math.max(this.oldWidth * e.scale,window.outerWidth-4),window.outerWidth*10);
  //this.newHeight =Math.min(Math.max(this.oldHeight * e.scale,window.outerHeight-4),window.outerHeight*10);

  this.move(e);
}

startMove(e){
 this.percentageOfImageAtPinchPointX = (e.center.x - this.mLeft)/this.oldWidth;
  this.percentageOfImageAtPinchPointY = (e.center.y - this.mTop)/this.oldHeight;
}
move(e){
  this.translateFromZoomingX = - ((this.newWidth * this.percentageOfImageAtPinchPointX) -e.center.x) ;
  this.translateFromZoomingY = - ((this.newHeight * this.percentageOfImageAtPinchPointY) -e.center.y) ;
  this.mLeft = this.translateFromZoomingX;
  this.mTop = this.translateFromZoomingY;
  //Limits
  this.mLeft = Math.min(Math.max(this.mLeft,-this.newWidth+window.outerWidth),2);
  this.mTop = Math.min(Math.max(this.mTop,-this.newHeight+window.outerHeight),2);
  }
}
