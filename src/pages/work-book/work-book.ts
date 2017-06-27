import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Loading, LoadingController, App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { TaskInformationPage } from './task-information/task-information';
import { EffortSelectorComponent } from '../../components/effort-selector/effort-selector';
import { PopoverController } from 'ionic-angular';
import { TaskModel } from '../../models/task.model';
import { ServicesManager } from '../../providers/servicesManager';
import { ToastIssuer } from '../../providers/toastIssuer';
import * as moment from 'moment';
import { UnselConfirmationComponent } from '../../components/unsel-confirmation/unsel-confirmation'
import { TaskItemComponent } from '../../components/task/taskItem';
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
  tasksPlan: TaskModel[] = [];
  loading: Loading;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public toaster: ToastIssuer,
    public popoverCtrl: PopoverController,
    public manager: ServicesManager,
    public loadingCtrl: LoadingController,
    private app: App) {

    this.goToToday();
  }

  protected ionViewWillLoad() {
  }

  protected ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading tasks'//WAIT-FOR-REPORTS-LOAD-TEXT
    });
    this.loading.present().then(() => {
      this.manager.getTasks().subscribe((tasks: TaskModel[]) => {
        this.tasksPlan = tasks;
        console.log("TASKS")
        console.log(tasks);
        this.loading.dismiss()
          .catch(error => { console.error(error) });
      }, error => {
        console.error("ERROR in WorkBookPage on getTasks subscription")
        console.error(error)
      });
    });
  }

  protected ionViewWillLeave() {
    this.loading.dismiss();
  }

  /* When item is clicked */
  public checkMark(event) {
    //Init map if it is undefined
    if (event.taskComp.task.performedOn == undefined) {
      event.taskComp.task.performedOn = new Map<number, Map<number, number>>();
    }
    const weekStartingTime = moment(event.taskComp.day).startOf('isoWeek').valueOf();
    const weekPerformed: Map<number, number> = event.taskComp.task.performedOn.get(weekStartingTime);
    if (weekPerformed != undefined) {
      const performation = weekPerformed.get(event.taskComp.day);
      if (performation != undefined) {
        const popover = this.popoverCtrl
          .create(UnselConfirmationComponent, {}, { cssClass: 'unsel-confirmation-popover', enableBackdropDismiss: true })
        popover.onDidDismiss((unsel) => {
          if (unsel) {
            //Need the subscription to force the resolution of the Observable
            this.manager.removeTask(event.taskComp.task, event.taskComp.day)
              .subscribe();
            event.taskComp.isChecked = false;
            event.taskComp.ngOnChanges();
          } else {
            event.taskComp.isChecked = true;
            event.taskComp.ngOnChanges() ;
          }
        });
        popover.present({ ev: event.event });
      } else {
        const popover = this.popoverCtrl
          .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
        popover.onDidDismiss((score: number) => {
          if (score != undefined) {
            //Need the subscription to force the Observable?
            this.manager.performTask(event.taskComp.task, { date: event.taskComp.day, score: score })
              .subscribe(()=> this.toaster.goodToast(event.taskComp.task.name + ' finished!'));

            event.taskComp.isChecked = true;
            event.taskComp.ngOnChanges() ;
          }
        });
        popover.present({ ev: event.event });
      }
    } else {
      const popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
      popover.onDidDismiss((score: number) => {
        if (score != undefined) {
          this.manager.performTask(event.taskComp.task, { date: event.taskComp.day, score: score })
            .subscribe(()=>this.toaster.goodToast(event.taskComp.task.name + ' finished!'));
          event.taskComp.isChecked = true;
          event.taskComp.ngOnChanges();
        }
      });
      popover.present({ ev: event.event });
    }
  }

  //TODO - Separate popover dismiss funcitons
  private addTask(taskComp:TaskItemComponent,score){
    if (score != undefined) {
            //Need the subscription to force the Observable?
            this.manager.performTask(taskComp.task, { date: taskComp.day, score: score })
              .subscribe();
            this.toaster.goodToast(taskComp.task.name + ' finished!');
            taskComp.checkBox.checked = true;
          }
  }

  private addWeekAndTask(taskComp:TaskItemComponent,score){
     if (score != undefined) {
          this.manager.performTask(taskComp.task, { date: taskComp.day, score: score })
            .subscribe();
          this.toaster.goodToast(taskComp.task.name + ' finished!');
          taskComp.checkBox.checked = true;
        }
  }

  private removeTask(taskComp:TaskItemComponent, unsel){
     if (unsel) {
            //Need the subscription to force the resolution of the Observable
            this.manager.removeTask(taskComp.task, taskComp.day)
              .subscribe();
            taskComp.checkBox.checked = false;
          } else {
            taskComp.checkBox.checked = true;
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

  public gotoExerciseVideo(task: TaskModel) {
    this.app.getRootNav().push(TaskInformationPage, task);
  }

  public gotoExerciseInfo(task: TaskModel) {
    this.app.getRootNav().push(TaskInformationPage, task);
  }

  public goToToday() {
    this.days = [
      moment(this.today).add(-1, "days").valueOf(),
      this.today,
      moment(this.today).add(1, "days").valueOf()
    ];
    this.actualDay = this.today;
  }

  public isPerformed(task: TaskModel, day: number) {
    const weekTasks: Map<number, number> = task.performedOn.get(moment(day).startOf('isoWeek').valueOf());
    return weekTasks == undefined ? false : weekTasks.has(day);
  }

  public isShown(day:number,task:TaskModel):boolean{
    //Soon to be deprecated
    const isBefore = moment(day).isBefore(moment(task.startTime));
    const isAfter = task.finishTime==undefined?false:moment(day).isAfter(moment(task.finishTime))
    return !isBefore && !isAfter;
  }
}
