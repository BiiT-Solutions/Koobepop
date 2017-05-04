import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { ITask } from '../../models/taskI';
import { StorageService } from '../../providers/storageService';
import { ServicesManager } from '../../providers/servicesManager';
import { ToastIssuer } from '../../providers/toastIssuer';
import * as moment from 'moment';
/**
 * 
 */
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html'
})
export class AgendaPage {
  today: number = (new Date()).setHours(0, 0, 0, 0);
  actualDay: number;
  days: number[] = [];
  oldIndex = 1
  @ViewChild('slider') slider: Slides;
  tasksPlan: ITask[] = [];
  loading: Loading;

  // onChangeTrigger = true;
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
    this.loading.present().then(() => {
      this.manager.getTasks().subscribe((tasks: ITask[]) => {
        this.tasksPlan = tasks
        this.loading.dismiss()
          .catch(error => { console.error(error) });
      }, error => {
        console.error("ERROR in Agenda on getTasks subscription")
        console.error(error)
      });
    });


  }

  /* When item is clicked */
  checkMark(event) {
    //Init map in case it hasn't been
    if (event.task.task.performedOn == undefined) {
      event.task.task.performedOn = new Map<number, number>();
    }
    if (!event.task.task.performedOn.has(event.task.day)) {
      let popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: false });
      popover.onDidDismiss((score: number) => {

        if (score != undefined) {
          event.task.isPerformed = true;
          event.task.task.performedOn.set(event.task.day, score);
          //Need the subscription to force the Observable?
          this.manager.performTask(event.task.task, event.task.day)
            .subscribe(status => { });
          this.manager.setActualTasks(this.tasksPlan);
          this.toaster.goodToast(event.task.task.name + ' finished! Difficulty: ' + score);
        } else {

        }
      });
      popover.present({ ev: event.event });
    } else {
      //This is a hack and should be fixed :)
      event.task.isPerformed = false;
      //Need the subscription to force the Observable 
      this.manager.removeTask(event.task.task, event.task.day)
        .subscribe(status => { });
      event.task.task.performedOn.delete(event.task.day);
      this.manager.setActualTasks(this.tasksPlan);

    }
  }

  /* Listeners for when the slides are swiped */
  nextSlide() {
    // Make sure we moved forward
    if (this.oldIndex < this.slider.getActiveIndex()) {
      this.actualDay = moment(this.actualDay).add(1,"days").valueOf();
      if (this.days.indexOf(moment(this.actualDay).add(1,"days").valueOf()) >= 0) {
      } else {
        this.days.push(moment(this.actualDay).add(1,"days").valueOf());
        this.days.shift();
        this.slider.slidePrev(0);
      }
    }
  }

  prevSlide() {
    // Make sure we moved backwards
    if (this.oldIndex > this.slider.getActiveIndex()) {
      this.actualDay = moment(this.actualDay).add(-1,"days").valueOf();
      if (this.days.indexOf( moment(this.actualDay).add(-1,"days").valueOf()) >= 0) {
      } else {
        this.days.unshift( moment(this.actualDay).add(-1,"days").valueOf());
        this.slider.slideNext(0);
        this.days.pop();
      }
    }
  }

  public gotoExerciseVideo(task: ITask) {
    this.navCtrl.push(VideoPage, task);
  }
  public gotoExerciseInfo(task: ITask) {
    this.navCtrl.push(VideoPage, task);
  }

  public goToToday() {
    this.days = [
      moment(this.today).add(-1, "days").valueOf(),
      this.today,
      moment(this.today).add(1, "days").valueOf()
    ];
    this.actualDay = this.today;
  }

  ionViewWillLeave() {
    this.loading.dismiss();
  }
}