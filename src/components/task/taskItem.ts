import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ITask } from '../../models/taskI';
import { ServicesManager } from '../../providers/servicesManager';
import { ToastIssuer } from '../../providers/toastIssuer';
import { PopoverController } from 'ionic-angular';
import * as moment from 'moment';
import { IPerformance } from '../../models/performation';
@Component({
  selector: 'task-component',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when the input changes
})
export class TaskItemComponent {
  
  @Input() task: ITask;
  @Input() day: number;
  @ViewChild("checkBox") checkBox;
  isDisabled = false;
  showMoreInfo = false;
  style = {};
  @Output() checkBoxClick: EventEmitter<any> = new EventEmitter();
  @Output() videoClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();
  constructor(public changeDetectorRef: ChangeDetectorRef,
    public manager: ServicesManager,
    public toaster: ToastIssuer,
    public popoverCtrl: PopoverController) {

  }

  ngOnInit() {
    this.showMoreInfo = (this.task.content != undefined && this.task.content != '')
      || (this.task.videoUrl != undefined && this.task.videoUrl != '');
      //We do this just for the first time, later we manage it from the agenda
      
  }

  ngAfterViewInit() {
    this.checkBox.checked = this.isTaskPerformed();
  }

  ngOnChanges() {
    this.isDisabled = this.day > Date.now() || this.day < moment(Date.now()).add(-7,'day').startOf('isoWeek').valueOf();
    this.style = this.taskStyle();

  }

  public checkMark(event) {
    this.checkBox.checked = false;
    this.checkBoxClick.emit({ event: event, taskComp: this });
  }

  public clickVideo() {
    this.videoClick.emit();
  }

  public clickInfo() {
    this.infoClick.emit();
  }

  public isTaskPerformed():boolean{
    let weekIsSaved: boolean = this.task.performedOn == undefined ? false :
      this.task.performedOn.has(moment(this.day).startOf('isoWeek').valueOf());
    let isTaskPerformed = false;
    if (weekIsSaved) {
      let performations: IPerformance[] = this.task.performedOn.get(moment(this.day).startOf('isoWeek').valueOf());
      for (let i = 0; i < performations.length; i++) {
        if (performations[i].date == this.day) {
          isTaskPerformed = true;
        }
      }
    }
    return isTaskPerformed;
  }
  /*Provides the style for the task */
  public taskStyle() {
    let actualWeekStarts = moment(this.day).startOf('isoWeek').valueOf();
    let performedThisWeek = this.task.performedOn.get(actualWeekStarts) != undefined ? this.task.performedOn.get(actualWeekStarts).length : 0;
    let daysLeft = moment(this.day).diff(moment(this.day).endOf('isoWeek'), 'days');

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
