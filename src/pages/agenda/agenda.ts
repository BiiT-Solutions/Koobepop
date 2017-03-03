import { Component, ViewChild } from '@angular/core';
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
  itemsList;
  day;
  slides = [1, 2, 3, 4, 5];
  sliderOptions = {autoHeight:'true',onlyExternal:'true',zoom:'true'};
  @ViewChild('slider') slider: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
   
    this.itemsList = [[
      { name: 'Bruggetje op een oefenbal' },

      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up Walkout' },
      { name: 'Single Leg Lowering' }
    ],[
      { name: 'Core stability exercises' },
      { name: 'Hip flexed torso rotation' },
      { name: 'Push-up Walkout' },
      { name: 'Single Leg Lowering' }
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
// private removeItem(item: ItemSliding) {
//   for (let i = 0; i < this.items.length; i++) {
//     if (this.items[i] == item) {
//       this.items.splice(i, 1);
//     }
//   }
// }

  openCalendar() { }
  nextDay() {
    this.day += 24 * 60 * 60 * 1000;
    this.slider.slideNext();
  }
  prevDay() {
    this.day -= 24 * 60 * 60 * 1000;
    this.slider.slidePrev();
  }

//TODO Fill with relevant data from somewhere 
  gotoExerciseInfo() {
    window.open("https://www.sportzorg.nl/oefeningen/core-stabilityoefeningen-rompstabiliteit");
  }

  gotoExerciseVideo() {
    this.navCtrl.push(VideoPage);
  }
}

//this.slider.options.onlyExternal = isZoomActive;
//TODO separate AgendaSlider from the day

