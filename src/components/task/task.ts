import { Component,ChangeDetectionStrategy } from '@angular/core';
import { ITask } from '../../models/taskI';


@Component({
  selector: 'task',
  templateUrl: 'task.html',
  changeDetection: ChangeDetectionStrategy.OnPush //Only detects changes when they are changed
})
export class TaskComponent {
  task:ITask;
  
  constructor() {
  }

}
