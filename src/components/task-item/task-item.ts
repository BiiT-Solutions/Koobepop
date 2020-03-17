import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { TaskModel } from '../../models/task.model';
import { EffortSelectorComponent } from '../effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../unsel-confirmation/unsel-confirmation';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { UserGuardProvider } from '../../providers/user-guard/user-guard';
import * as moment from 'moment';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { USMOTask } from '../../models/usmo-task';
/**
 *
 */
@Component({
  selector: 'task-item',
  templateUrl: 'task-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent {
  @Input() task: TaskModel;
  @Input() disabled: boolean;
  @Input() usmoTask: USMOTask;

  @Output() completeExercise: EventEmitter<TaskModel> = new EventEmitter();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();

  checked: boolean
  userCode = " ";
  tasksInfo: USMOTask;

  constructor(public popoverCtrl: PopoverController, private iab: InAppBrowser, public userGuardService: UserGuardProvider, public tasksProvider: TasksProvider) { }


  protected ngOnChanges() {
    this.checked = this.task.score >= 0;
    //console.log(this.task.name,this.task.score)

  }

  public clickInfo(event) {

  //can't find a way to get the task passed as a task modal

  this.getCurrentExercise(this.task).subscribe()

    if (this.tasksInfo.formUrl != undefined && this.tasksInfo.formUrl.length > 0) {
      
      if (this.userCode == " ") {
        this.getGuard()
          .subscribe(() => this.getLinkStartCounter(this.tasksInfo.formUrl, this.userCode))
        event.stopPropagation();

      } else {
        this.iab.create(this.tasksInfo.formUrl + this.userCode, '_blank')
        event.stopPropagation();
      }
    } else {
      event.stopPropagation();
      event.preventDefault();
      this.infoClick.emit(this.task.name);
    }
  }
  //countdown for code expiration
  startCountdownuntdown(seconds) {
    var counter = seconds;

    var interval = setInterval(() => {
      counter--;
      //if usercode is less that 5 will consider as expired
      if (counter < 5) {
        this.userCode = " "
        clearInterval(interval);
      };
    }, 1000);
  }
  /* When item is clicked */
  public click(event) {
    console.log(event)
    if (!this.disabled) {
      //Open popover
      let popover;
      if (this.task.score < 0) {
        popover = this.popoverCtrl
          .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
        popover.onDidDismiss((score: number) => {
          if (score != undefined) {
            this.task = new TaskModel(this.task.comparationId, this.task.name, this.task.hasInfo, score);
            this.completeExercise.emit(this.task);
            this.checked = this.task.score >= 0;

          }
        });
      } else {
        popover = this.popoverCtrl
          .create(UnselConfirmationComponent, {}, { cssClass: 'unsel-confirmation-popover', enableBackdropDismiss: true });
        popover.onDidDismiss((unsel) => {
          if (unsel) {
            this.task = new TaskModel(this.task.comparationId, this.task.name, this.task.hasInfo, -1);
            this.completeExercise.emit(this.task);
            this.checked = this.task.score >= 0;
          }
        });
      }
      popover.present({ ev: event });
    }
  }
  getGuard() {
    return this.userGuardService.requestUserGuard()
      .map(guard => {
        this.userCode = guard.code
        return guard;
      })
  }
  //returns a task with information
  getCurrentExercise(taskItem) {
    return this.tasksProvider.getTaskInfo(taskItem).map(task =>{
      this.tasksInfo = task
      return task;
    })
  }
  getLinkStartCounter(url, userCode) {
    this.iab.create(url + userCode, '_blank')
    this.startCountdownuntdown(120)
  }
}



