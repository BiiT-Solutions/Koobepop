import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter } from '@angular/core';
import { ITask } from '../../models/taskI';

@Component({
  selector: 'task-component',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when they are changed
})
export class TaskComponent {
  ONE_DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  ONE_WEEK_IN_MILIS: number = this.ONE_DAY_IN_MILIS * 7;

  @Input() task: ITask;
  @Input() day: number;
  isPerformed = false;
  isDisabled = false;
  @Output() checkBoxClick: EventEmitter<any> = new EventEmitter();
  @Output() videoClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnChanges() {
    //console.log("TaskComponent on changes")
    this.isPerformed = this.task.performedOn == undefined ? false : this.task.performedOn.has(this.day);
    this.isDisabled = this.day > Date.now() || this.day < Date.now() - this.ONE_WEEK_IN_MILIS;
  }

  public check(event) {
    this.isPerformed = !this.isPerformed;
    this.checkBoxClick.emit({ event: event, task: this.task, day: this.day });
  }

  public clickVideo() {
    this.videoClick.emit(this.task.videoUrl);
  }
  public clickInfo() {
    this.infoClick.emit(this.task.infoUrl);
  }

  /*Gets the number of times this task has been performed until this day on a week*/
  private getPerformedThisWeek(task: ITask, day: number) {
    let performedThisWeek = 0;
    if (task.performedOn != undefined) {
      let week = Math.trunc((day - task.startingTime) / this.ONE_WEEK_IN_MILIS);
      let actualWeekStarts = task.startingTime + week * this.ONE_DAY_IN_MILIS;
      for (let i = 0; i < task.performedOn.keys.length; i++) {
        if (task.performedOn.keys[i] > actualWeekStarts && task.performedOn.keys[i] <= day) {
          performedThisWeek++;
        }
      }
    }
    return performedThisWeek;
  }
}
