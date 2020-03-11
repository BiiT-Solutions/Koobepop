import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { TaskModel } from '../../models/task.model';
import { EffortSelectorComponent } from '../effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../unsel-confirmation/unsel-confirmation';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
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
  checked: boolean;

  @Output() completeExercise: EventEmitter<TaskModel> = new EventEmitter();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();

  constructor(public popoverCtrl: PopoverController,private iab: InAppBrowser) {}

  protected ngOnChanges() {
    this.checked = this.task.score >= 0;
    //console.log(this.task.name,this.task.score)
  }

  public clickInfo(event) {
    //This is so the ion-item's click event doesn't fire
    if(this.task.name == 'Intake Form'){
      this.iab.create('https://m3sport.biit-solutions.com/formrunner/?form=LEC%20Cool%20Intake&organization=Centrum%20voor%20Bewegen&appointment_type=Leefstijlcoach')
    }
    event.stopPropagation();
    event.preventDefault();
    this.infoClick.emit(this.task.name);
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
            this.task = new TaskModel(this.task.comparationId,this.task.name, this.task.hasInfo, score);
            this.completeExercise.emit(this.task);
            this.checked = this.task.score >= 0;
          }
        });
      } else {
        popover = this.popoverCtrl
          .create(UnselConfirmationComponent, {}, { cssClass: 'unsel-confirmation-popover', enableBackdropDismiss: true });
        popover.onDidDismiss((unsel) => {
          if (unsel) {
            this.task = new TaskModel(this.task.comparationId,this.task.name, this.task.hasInfo, -1);
            this.completeExercise.emit(this.task);
            this.checked = this.task.score >= 0;
          }
        });
      }
      popover.present({ ev: event });
    }
  }
}
