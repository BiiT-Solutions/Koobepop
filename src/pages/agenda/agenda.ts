import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { ITask } from '../../models/taskI';
import { StorageService } from '../../providers/storageService';
import { ServicesManager } from '../../providers/persistenceManager';
import { ToastIssuer } from '../../providers/toastIssuer';
/**
 * 
 */
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  ONE_DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  ONE_WEEK_IN_MILIS: number = this.ONE_DAY_IN_MILIS * 7;
  today: number = (new Date()).setHours(0, 0, 0, 0);
  actualDay: number;
  days: number[] = [];
  oldIndex = 1
  @ViewChild('slider') slider: Slides;
  tasksPlan: ITask[] = [];
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public toaster: ToastIssuer,
    public popoverCtrl: PopoverController,
    public storageService: StorageService,
    public manager: ServicesManager,
    public loadingCtrl: LoadingController) {
    this.goToToday();
  }

  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading tasks'//WAIT-FOR-REPORTS-LOAD-TEXT
    });
    this.loading.present();
    this.manager.getActualTasks().subscribe((tasks: ITask[]) => {
      this.tasksPlan = tasks
      this.loading.dismiss();
    });
  }

  /* When item is clicked */
  //TODO Define event's Type
  checkMark(event) {
    //console.log("Click checkbox");
    //Init map in case it hasn't been
    if (event.task.task.performedOn == undefined) {
      event.task.task.performedOn = new Map<number, number>();
    }

    if (!event.task.task.performedOn.has(event.task.day)) {
      console.log("IF");
      let popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: false });

      popover.onDidDismiss((score: number) => {

        if (score != undefined) {
          event.task.task.performedOn.set(event.task.day, score);
          //Need the subscription to force the Observable 
          this.manager.performTask(event.task.task, event.task.day).subscribe(status => {
            console.log(status)
          });
          this.manager.setActualTasks(this.tasksPlan);
          
          this.toaster.goodToast(event.task.task.name + ' finished! Difficulty: ' + score);
        }
      });
      popover.present({ ev: event.event });
    } else {
      console.log("ELSE")
      //Need the subscription to force the Observable 
      this.manager.removeTask(event.task.task, event.task.day).subscribe(status => console.log(status));
      event.task.task.performedOn.delete(event.task.day);
      this.manager.setActualTasks(this.tasksPlan);
    }
  }

  /* Listeners for when the slides are swiped TODO FIX!!*/
  nextSlide() {
    // Make sure we moved forward
    if (this.oldIndex < this.slider.getActiveIndex()) {
      this.actualDay += this.ONE_DAY_IN_MILIS;
      if (this.days.indexOf(this.actualDay + this.ONE_DAY_IN_MILIS) >= 0) {
      } else {
        this.days.push(this.actualDay + this.ONE_DAY_IN_MILIS);
        this.days.shift();
        this.slider.slidePrev(0);
      }
    }
  }
  prevSlide() {
    // Make sure we moved backwards
    if (this.oldIndex > this.slider.getActiveIndex()) {
      this.actualDay -= this.ONE_DAY_IN_MILIS;
      if (this.days.indexOf(this.actualDay - this.ONE_DAY_IN_MILIS) >= 0) {
      } else {
        this.days.unshift(this.actualDay - this.ONE_DAY_IN_MILIS);
        this.slider.slideNext(0);
        this.days.pop();
      }
    }
  }

  public gotoExerciseVideo(videoUrl: string) {
    this.navCtrl.push(VideoPage, { videoUrl: videoUrl });
  }
  public gotoExerciseInfo(infoUrl: string) {
    window.open(infoUrl);
  }

  public goToToday() {
    this.days = [
      this.today - this.ONE_DAY_IN_MILIS,
      this.today,
      this.today + this.ONE_DAY_IN_MILIS
    ];
    this.actualDay = this.today;
  }
  ionViewWillLeave() {
    this.loading.dismiss();
    // clearTimeout(this.timeout);
  }
}