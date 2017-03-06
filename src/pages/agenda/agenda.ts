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
  itemsList =[];
  day;
  slides = [1, 2, 3, 4, 5];
  sliderOptions;
  @ViewChild('slider') slider: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {

    this.itemsList = [[
      { name: 'Bridge with exercise ball', videoUrl: "https://www.youtube.com/embed/sesXc7GIU1A" },
      { name: 'Crunches', videoUrl: "https://www.youtube.com/embed/PmxpXW_vWLw" },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ], [
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ],[
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ],
    [
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ],
    [
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up walkout' },
      { name: 'Single leg lowering' }
    ]]

    this.day = Date.now();
    //console.log(this.day);

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
   * onSlide methods are triggered by slideNext() and slidePrev()
   */
  public onSlideNext(){

    this.nextDay();
  }
  public onSlidePrev(){
    this.prevDay();
  }
  //slideNum = 0 //init
  // onSlideNext
  //this.day += this.slideNum*24 * 60 * 60 * 1000;

  private nextDay() {
    this.day += 24 * 60 * 60 * 1000;
  }
  private prevDay() {
    this.day -= 24 * 60 * 60 * 1000;
  }


  //TODO Fill with relevant data from somewhere 
  public gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }

  private removeItem(item) {
    for (let i = 0; i < this.itemsList[0].length; i++) {
      if (this.itemsList[0][i] == item) {
        this.itemsList[0].splice(i, 1);
      }
    }
  }
}

//TODO separate AgendaSlider from the day

