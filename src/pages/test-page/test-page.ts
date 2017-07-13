import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ItemSliding, Platform, Slides } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { Push, } from '@ionic-native/push';
import { MessageModel } from '../../models/message.model';
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
    today: number = (new Date()).setHours(0, 0, 0, 0);
  actualDay: number;
  days: number[] = [];
  oldIndex = 1
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager,
    public push: Push,
    public platform: Platform,
    public changeDetRef: ChangeDetectorRef) {
      this.goToToday();
    }

  ionViewDidLoad() {
  }



  public open(itemSlide: ItemSliding) {
    console.log(itemSlide.getOpenAmount());
  }

  public update(item: any) {
    //this.manager.updateAppointments();
  }

  public close(itemSlide: ItemSliding) {
    itemSlide.close();
  }

  public navTaskInfo() {
  }
   /* Listeners for when the slides are swiped */
  public nextSlide() {
    // Make sure we moved forward
    if (this.oldIndex < this.slider.getActiveIndex()) {
      this.actualDay = moment(this.actualDay).add(1, "days").valueOf();
      if (this.days.indexOf(moment(this.actualDay).add(1, "days").valueOf()) >= 0) {
      } else {
        this.days.push(moment(this.actualDay).add(1, "days").valueOf());
        this.days.shift();
        this.slider.slidePrev(0);
      }
    }
  }

  public prevSlide() {
    // Make sure we moved backwards
    if (this.oldIndex > this.slider.getActiveIndex()) {
      this.actualDay = moment(this.actualDay).add(-1, "days").valueOf();
      if (this.days.indexOf(moment(this.actualDay).add(-1, "days").valueOf()) >= 0) {
      } else {
        this.days.unshift(moment(this.actualDay).add(-1, "days").valueOf());
        this.slider.slideNext(0);
        this.days.pop();
      }
    }
  }

  public goToToday() {
    this.days = [
      moment(this.today).add(-1, "days").valueOf(),
      this.today,
      moment(this.today).add(1, "days").valueOf()
    ];
    this.actualDay = this.today;
  }

  public isDisabled(date: number): boolean {
    console.debug("Check day disabled: " + moment(date));
    const lastWeek = moment().startOf("day").subtract(1, 'week');
    const tomorrow = moment().startOf("day").add(1, 'day');
    return !moment(date).isBetween(lastWeek, tomorrow);
  }

}
