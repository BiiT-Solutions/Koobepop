import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ITask } from '../../models/taskI';
import { Observable } from 'rxjs/Observable';
import { ServicesManager } from '../../providers/persistenceManager';
import { EffortSelectorComponent } from '../effort-selector/effort-selector';
import { ToastIssuer } from '../../providers/toastIssuer';
import { PopoverController } from 'ionic-angular';

@Component({
  selector: 'task-component',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when the input changes
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
  constructor(public changeDetectorRef: ChangeDetectorRef,
              public manager: ServicesManager,
              public toaster:ToastIssuer,
              public popoverCtrl:PopoverController) { }
  ngAfterViewInit() {

  }
  ngOnChanges() {
    console.log("Changes")
    this.isDisabled = this.day > Date.now() || this.day < Date.now() - this.ONE_WEEK_IN_MILIS;
    this.isPerformed = this.task.performedOn == undefined ? false : this.task.performedOn.has(this.day);
    this.style = this.taskStyle();
  }

  public checkM(event) {
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


   check(event) {
    console.log("Click checkbox");
    //Init map in case it hasn't been
    if (this.task.performedOn == undefined) {
      this.task.performedOn = new Map<number, number>();
    }

    if (!this.task.performedOn.has(this.day)) {
      console.log("IF");
      let popover = this.popoverCtrl
        .create(EffortSelectorComponent, {}, { cssClass: 'effort-selector-popover', enableBackdropDismiss: true });

      popover.onDidDismiss((score: number) => {

        if (score!=undefined){
        this.task.performedOn.set(this.day, score);
        //Need the subscription to force the Observable 
        this.manager.performTask(this.task, this.day).subscribe(status => {
          console.log(status)
        });
        this.toaster.goodToast(this.task.name + ' finished! difficulty: ' + score);      
      }
      });
      popover.present({ ev: event });
    } else {
      console.log("ELSE")
      //Need the subscription to force the Observable 
      this.manager.removeTask(this.task, this.day).subscribe(status => console.log(status));
      this.task.performedOn.delete(this.day);
    }
    this.isPerformed = this.task.performedOn == undefined ? false : this.task.performedOn.has(this.day);
    
    console.log(this.isPerformed)
  }
}
