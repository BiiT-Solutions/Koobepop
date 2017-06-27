import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { Checkbox } from 'ionic-angular';
import { TaskModel } from '../../models/task.model';
import * as moment from 'moment';

/** Component showing a task from USMO*/
@Component({
  selector: 'task-component',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when the input changes (needs digging)
})
export class TaskItemComponent {
  //Inputs
  @Input() task: TaskModel;
  @Input() day: number;
  @Input() isChecked:boolean;

  //Outputs (events)
  @Output() checkBoxClick: EventEmitter<any> = new EventEmitter();
  @Output() videoClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild("checkBox") checkBox: Checkbox;
  isDisabled = false;
  showMoreInfo = false;
  style = {};



  constructor() { }

  ngOnInit() {
    this.showMoreInfo = (this.task.content != undefined && this.task.content != '')
      || (this.task.videoUrl != undefined && this.task.videoUrl != '');
  }

  ngAfterViewInit() {
    //We do this just for the initialization, later we manage it from the workbook
    //this.isChecked = this.isTaskPerformed();
    //console.log("Is checked: " + this.checkBox.checked + "\t at day " + moment(this.day).toISOString() + " Task " + this.task.name);
  }

  ngOnChanges() {
    this.isDisabled = this.day > Date.now() || this.day < moment(Date.now()).add(-7, 'day').startOf('isoWeek').valueOf();
    this.style = this.taskStyle();
    this.isChecked = this.isTaskPerformed();
  }

  public checkMark(event) {
    //When a checkbox is clicked, it changes it's checked property
    //So we reset it to the apropriate value
    this.checkBox.checked = this.isChecked;
    this.checkBoxClick.emit({ event: event, taskComp: this });
  }

  public clickVideo() {
    this.videoClick.emit();
  }

  public clickInfo() {
    this.infoClick.emit();
  }

  public isTaskPerformed(): boolean {
    const weekStarts: number = moment(this.day).startOf('isoWeek').valueOf();
    const weekIsSaved: boolean = this.task.performedOn == undefined ? false :
      this.task.performedOn.has(weekStarts);
    return weekIsSaved ? this.task.performedOn.get(weekStarts).has(this.day) : false;
  }

  /*Provides the style for the task */
  public taskStyle() {
    const actualWeekStarts = moment(this.day).startOf('isoWeek').valueOf();
    const performedThisWeek = this.task.performedOn.has(actualWeekStarts) ? this.task.performedOn.get(actualWeekStarts).size : 0;
    const daysLeft = moment(this.day).diff(moment(this.day).endOf('isoWeek'), 'days');
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
