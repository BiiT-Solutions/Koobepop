import { Component, ViewChild, Input } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
/**
 * 
 */
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  item1;
  item2;
  item3;
  today: number;
  day: number;
  DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  @ViewChild('slider') slider: Slides;

  events:{[id:number]:IEvent[];}={};
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
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
      { name: 'Day -1' }
    ];

    this.events[this.day + this.DAY_IN_MILIS]=[
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Day + 1' }
    ];
  }

  ionViewDidLoad() {

  }

  finish(item) {
    //this.removeItem(item)
    let toast = this.toastCtrl.create({
      message: item.name + ' finished!',
      duration: 3000,
      cssClass: 'good-toast'
    });

    toast.present();
  }
  cancel(item) {
    // this.removeItem(item);
    let toast = this.toastCtrl.create({
      message: item.name + ' cancelled!',
      duration: 3000,
      cssClass: 'bad-toast'
    });
    toast.present();
  }

  log(){
    console.log(this.slider.getActiveIndex());
  }

  openCalendar() { }
  
  public nextArrow(){
    this.slider.slideNext();
  }
  public prevArrow(){
    this.slider.slidePrev();
  }

  /**
   * ionSlide methods are triggered by slideNext() and slidePrev()
   */
  nextSlide(){
    let oldIndex = 1;
    // Make sure we moved forward
    console.log("Next. "+this.slider.getActiveIndex())
    if(oldIndex < this.slider.getActiveIndex()){
      this.day += this.DAY_IN_MILIS;
      this.slider.slideTo(1,0,true);
    }
    this.slider.update();
  }

  prevSlide(){
    let oldIndex = 1;
    //TODO loop slides
    console.log("Prev. "+this.slider.getActiveIndex())
    if(oldIndex > this.slider.getActiveIndex()){
      this.day -= this.DAY_IN_MILIS;
      this.slider.slideTo(1,0,true);
    }
    this.slider.update();
  }

  //TODO Fill with relevant data from somewhere a provider?
  public gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }

  private removeItem(item) {
    //for (let i = 0; i < this.itemsList[0].length; i++) {
    //  if (this.itemsList[0][i] == item) {
    //    this.itemsList[0].splice(i, 1);
    //  }
    //}
  }

  check(item){
    console.log("Item");
    console.log(item);
  }
}
export interface IEvent{
  name:string;
  videoUrl?:string;
}

//TODO separate AgendaSlider from the day

