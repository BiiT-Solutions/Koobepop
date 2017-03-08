import { Component, ViewChild, ViewChildren, ElementRef } from '@angular/core';
import { NavController, NavParams, Gesture, Slides } from 'ionic-angular';
import { AppointmentsProvider } from '../../providers/appointments-provider';
import {DpDatePickerModule} from 'ng2-date-picker';
import * as moment from 'moment';
/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector: 'test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {
  @ViewChild('slider') slider: Slides;
  hideHeader;
  count = 0;
  datePikerConfig = {
    format:"DD-MM-YYYY"
  };
  itemsList = ['item0','item1','item2','item3','item4','item5','item6','item7','item8','item9'];
  item1;
  item2;
  item3;
  today: number =0;
  day: number = 0;
  DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  events:{[id:number]:IEvent[];};
  selectedDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appointmentsProvider: AppointmentsProvider) { 
    this.item1 = this.itemsList[this.itemsList.length-1];
    this.item2 = this.itemsList[0];
    this.item3 = this.itemsList[1];
    this.today = Date.now();
    this.day = Date.now();
    this.events={};
    this.events[this.day] = [
      { name: 'Bridge with exercise ball', videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A" },
      { name: 'Crunches', videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw" },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ];
    this.events[this.day- this.DAY_IN_MILIS]=
     [
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ];
    this.events[this.day + this.DAY_IN_MILIS]=[
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ];


    this.selectedDate = moment(this.day);
  }
  
  ionViewDidLoad() {
    this.hideHeader = true;
  }

  plus(){    
    this.count++;
  }
  
  nextSlide(){
    let oldIndex = 1;
    // Make sure we moved forward
    if(oldIndex < this.slider.getActiveIndex()){
      this.day += this.DAY_IN_MILIS;
      this.item1 = this.item2;
      this.item2 = this.item3;
      this.slider.slideTo(1,0,true);
      this.item3 = this.nextItem();
    }
    this.slider.update();
  }

  prevSlide(){
    let oldIndex = 1;
    //TODO loop slides
    if(oldIndex > this.slider.getActiveIndex()){
      this.day -= this.DAY_IN_MILIS;
      this.item3 = this.item2;
      this.item2 = this.item1;
      this.slider.slideTo(1,0,true);
      this.item1 = this.prevItem();
    }
  }

  nextItem(){
      return this.itemsList[ (this.itemsList.length+((this.day+1)%(this.itemsList.length)))%(this.itemsList.length) ];
    }

  prevItem(){
      return this.itemsList[(this.itemsList.length+((this.day-1)%(this.itemsList.length)))%(this.itemsList.length)];
    }

  goto0(){
    
  }
  getItem(day:number):string{
    return "This is the item for the day \n"+new Date(day).toDateString();
  }
  check(event){
    console.log(event.checked);
    if(event.checked){
      (this.day)
    }
  }
}
export interface IEvent{
  name:string;
  videoUrl?:string;
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
