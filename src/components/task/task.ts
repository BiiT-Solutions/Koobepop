import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ITask } from '../../models/taskI';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'task-component',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when they are changed
})
export class TaskComponent {
  ONE_DAY_IN_MILIS: number = 24 * 60 * 60 * 1000;
  WEEK_DAYS = 7;
  ONE_WEEK_IN_MILIS: number = this.ONE_DAY_IN_MILIS * this.WEEK_DAYS;


  @Input() task: ITask;
  @Input() day: number;
  isPerformed = false;
  isDisabled = false;
  style = {};
  @Output() checkBoxClick: EventEmitter<any> = new EventEmitter();
  @Output() videoClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();
  constructor(public changeDetectorRef: ChangeDetectorRef) { }
  ngAfterViewInit() {

  }
  ngOnChanges() {
    this.isDisabled = this.day > Date.now() || this.day < Date.now() - this.ONE_WEEK_IN_MILIS;
    this.isPerformed = this.task.performedOn == undefined ? false : this.task.performedOn.has(this.day);
    this.style = this.taskStyle();
  }

  public check(event) {
    this.isPerformed = !this.isPerformed;
    this.checkBoxClick.emit({ event: event, task: this });
  }

  public clickVideo() {
    this.videoClick.emit(this.task.videoUrl);
  }
  public clickInfo() {
    this.infoClick.emit(this.task.infoUrl);
  }

  /*Provides the style for the task */
  public taskStyle() {
    let performedThisWeek = 0;
    let week = Math.trunc((this.day - this.task.startingTime) / this.ONE_WEEK_IN_MILIS);
    let daysLeft = this.WEEK_DAYS - Math.trunc(((this.day - this.task.startingTime) % this.ONE_WEEK_IN_MILIS) / this.ONE_DAY_IN_MILIS)
    let actualWeekStarts = this.task.startingTime + week * this.ONE_WEEK_IN_MILIS;

    if (this.task.performedOn != undefined) {
      this.task.performedOn.forEach((value, key) => {
        if (key > actualWeekStarts && key <= this.day) {
          performedThisWeek++;
        }
      });
    }
    if (performedThisWeek >= this.task.repetitions) {
      return { 'over-do-task': true };
    } else {
      if ((this.task.repetitions - performedThisWeek) > daysLeft) {
        return { 'due-task': true };
      } else if ((this.task.repetitions - performedThisWeek) == daysLeft) {
        return { 'just-in-time-task': true };
      } else {
        return { 'plenty-time-task': true };
      }
    }
  }
}
