import { Component, ChangeDetectionStrategy, Output, Input, EventEmitter } from '@angular/core';
import { ITask } from '../../models/taskI';


@Component({
  selector: 'task',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when they are changed
})
export class TaskComponent {
  @Input() task: ITask;
  @Input() day: number;
  @Input() isPerformed;
  @Output() ckeckBoxClick: EventEmitter<any> = new EventEmitter();
  @Output() videoClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() infoClick: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
  }
  isFuture(){
    return this.day>Date.now();
  }

  public check(event) {
    //task,day
    this.ckeckBoxClick.emit({event:event,task:this.task,day:this.day});
  }
  public video(url: string) {
    this.videoClick.emit(url);
  }
  public info(url: string) {
    this.infoClick.emit(url);
  }

}
