import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Slides} from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
/**
 * 
 */
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  items;
  today;
  slides = [1,2,3,4,5];
  sliderOptions ={loop:true}
  @ViewChild('slider') slider:Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl:ToastController) {
    this.items = [
      { name: 'Task 1' },
      { name: 'Task 2' },
      { name: 'Task 3' },
      { name: 'Task 4' }
    ]
    this.today = Date.now();
  }

  ionViewDidLoad() {
  }

  finish(item: ItemSliding) {
   this.removeItem(item)
   let toast = this.toastCtrl.create({
      message: 'Task finished!',
      duration: 3000,
      cssClass:'good-toast'
    });

    toast.present();
  }
  cancel(item: ItemSliding) {
    this.removeItem(item);
    let toast = this.toastCtrl.create({
      message: 'Task cancelled!',
      duration: 3000,
      cssClass:'bad-toast'
    });
    toast.present();
  }
  private removeItem(item: ItemSliding){
     for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
      }
    }
  }

  openCalendar(){}
  nextDay()
  {
    this.slider.slideNext()
  }
  previousDay(){
    this.slider.slidePrev();
  }
}
