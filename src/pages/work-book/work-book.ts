import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController, App, NavParams, ItemSliding } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TaskInformationPage } from './task-information/task-information';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { USMOTask } from '../../models/usmo-task';
import { ServicesManager } from '../../providers/servicesManager';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import * as moment from 'moment';
import { UnselConfirmationComponent } from '../../components/unsel-confirmation/unsel-confirmation'
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
/**
 *
 */
@Component({
  selector: 'page-work-book',
  templateUrl: 'work-book.html'
})
export class WorkBookPage {
  today: number = (new Date()).setHours(0, 0, 0, 0);
  actualDay: number;
  days: number[] = [];
  oldIndex = 1
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController) {
    this.goToToday();
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
    const lastWeek = moment().startOf("day").subtract(1, 'week');
    const tomorrow = moment().startOf("day").add(1, 'day');
    return !moment(date).isBetween(lastWeek, tomorrow);
  }

}

