import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { TaskModel } from '../../models/task.model';
import { EffortSelectorComponent } from '../effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../unsel-confirmation/unsel-confirmation';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { USMOTask } from '../../models/usmo-task';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { TasksRestService } from '../../providers/rest/tasks-rest-service/tasks-rest-service';
/**
 *
 */
@Component({
  selector: 'task-item',
  templateUrl: 'task-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskItemComponent implements OnInit {
  @Input() task: TaskModel;
  @Input() disabled: boolean;
  @Input() usmoTask: USMOTask;

  @Output() completeExercise: EventEmitter<TaskModel> = new EventEmitter();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();

  checked: boolean
  tasksInfo: USMOTask;
  public iconName = "";

  constructor(public popoverCtrl: PopoverController, private taskProvider: TasksProvider, public tasksRestService: TasksRestService,) {

  }


  ngOnInit(): void {
    let providedTask = this.taskProvider.getTask(this.task.name);
    console.log("provided task init", providedTask)

    if (providedTask.externalLink && providedTask.externalLink != "") {
      this.iconName = "menu"
    } else {
      this.iconName = "information-circle"
    }
  }


  protected ngOnChanges() {
    this.checked = this.task.score >= 0;
    //console.log(this.task.name,this.task.score)
    let providedTask = this.taskProvider.getTask(this.task.name);
    console.log("provided task changes", providedTask)
    this.tasksRestService.getTaskInfo(providedTask).subscribe(
      data => {
        if (providedTask.externalLink && providedTask.externalLink != "") {
          this.iconName = "menu"
        } else {
          this.iconName = "information-circle"
        }
      }
    );

  }

  public clickInfo(event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    this.infoClick.emit(this.task.name);
  }

  //countdown for code expiration

  /* When item is clicked */
  public click(event) {
    console.log(event)
    if (!this.disabled) {
      //Open popover
      let popover;
      let providedTask = this.taskProvider.getTask(this.task.name);
      if (providedTask.externalLink) {
        this.clickInfo(null);
      } else {
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
  }
}



