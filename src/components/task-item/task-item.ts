import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { PopoverController } from 'ionic-angular';
import { EffortSelectorComponent } from '../effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../unsel-confirmation/unsel-confirmation';

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

  constructor(public popoverCtrl: PopoverController) { }

  protected ngOnChanges() {
    this.checked = this.task.score >= 0;
  }

  public clickInfo(event) {
    //This is so the ion-item's click event doesn't fire
    event.stopPropagation();
    this.infoClick.emit(this.task.name);
  }

  /* When item is clicked */
  public click(event) {
    //Open popover
    let popover;
    if (this.task.score <= 0) {
      popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });
      popover.onDidDismiss((score: number) => {
        if (score) {
          this.task = new TaskModel(this.task.name, this.task.hasInfo, score);
          this.completeExercise.emit(this.task);
           this.checked = this.task.score >= 0;
        }
      });
    } else {
      popover = this.popoverCtrl
        .create(UnselConfirmationComponent, {}, { cssClass: 'unsel-confirmation-popover', enableBackdropDismiss: true });
      popover.onDidDismiss((unsel) => {
        if (unsel) {
          this.task = new TaskModel(this.task.name, this.task.hasInfo, -1);
          this.completeExercise.emit(this.task);
           this.checked = this.task.score >= 0;
        }
      });
      //Uncheck?
    }
    popover.present({ ev: event.event });

  }

}
