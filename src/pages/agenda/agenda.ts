import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { VideoPage } from '../video/video';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { ITask } from '../../models/taskI';
import { ServicesManager } from '../../providers/servicesManager';
import { ToastIssuer } from '../../providers/toastIssuer';
import * as moment from 'moment';
import { IPerformance } from '../../models/performation';
import { UnselConfirmationComponent } from '../../components/unsel-confirmation/unsel-confirmation'
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

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public toaster: ToastIssuer,
    public popoverCtrl: PopoverController,
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
  public checkMark(event) {
    //Init map in case it hasn't been
    if (event.taskComp.task.performedOn == undefined) {
      event.taskComp.task.performedOn = new Map<number, IPerformance[]>();
    }

    let weekStartingTime = moment(event.taskComp.day).startOf('isoWeek').valueOf();
    let alreadyPerformed = false;

    //If the week is in there    
    if (event.taskComp.task.performedOn.has(weekStartingTime)) {
      //Check if the date is also there
      let weekPerformances: IPerformance[] = event.taskComp.task.performedOn.get(weekStartingTime);
      for (let i = 0; i < weekPerformances.length; i++) {
        if (weekPerformances[i].date == event.taskComp.day) {
          let popover = this.popoverCtrl
            .create(UnselConfirmationComponent, {}, { cssClass: 'unsel-confirmation-popover', enableBackdropDismiss: true })
          popover.onDidDismiss((unsel) => {
            if (unsel) {
              //Need the subscription to force the resolution of the Observable 
              this.manager.removeTask(event.taskComp.task, event.taskComp.day)
                .subscribe();
              event.taskComp.checkBox.checked = false;
            } else {
              event.taskComp.checkBox.checked = true;
            }
          });
          popover.present({ ev: event.event });
          alreadyPerformed = true;
        }
      }

      //Insert the day into the week
      if (!alreadyPerformed) {
        let popover = this.popoverCtrl
          .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
        popover.onDidDismiss((score: number) => {
          if (score != undefined) {
            //Need the subscription to force the Observable?
            this.manager.performTask(event.taskComp.task, { date: event.taskComp.day, score: score })
              .subscribe();
            this.toaster.goodToast(event.taskComp.task.name + ' finished! Difficulty: ' + score);
            event.taskComp.checkBox.checked = true;
          }
        });
        popover.present({ ev: event.event });
        alreadyPerformed = true;
      }
    }
    //Insert week with the day
    if (!alreadyPerformed) {

      let popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
      popover.onDidDismiss((score: number) => {
        if (score != undefined) {
          //Need the subscription to force the Observable resolution
          this.manager.performTask(event.taskComp.task, { date: event.taskComp.day, score: score })
            .subscribe();
          this.toaster.goodToast(event.taskComp.task.name + ' finished! Difficulty: ' + score);
          event.taskComp.checkBox.checked = true;
        }
      });
      popover.present({ ev: event.event });
    }
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