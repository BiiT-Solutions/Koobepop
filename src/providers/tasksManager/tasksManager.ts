import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CompleteTask } from '../../models/complete-task';
import { TasksRestService } from '../rest/tasks-rest-service/tasks-rest-service';
//TODO - Integrate on the app
/* This class is suposed to manage the sending of performed and removed tasks to the server*/
@Injectable()
export class TasksManager {
  private taskActions: TaskAction[] = [];
  public constructor(public tasksServices: TasksRestService) {
  }

  public finishTask(id: string, name: string, completeTask: CompleteTask) {
    const action: TaskAction = new TaskAction(id, name, completeTask.performedTime, completeTask.score, TaskFlag.TASK_FINISHED)
    this.taskActions.push(action);
  }

  public unfinishTask(id: string, name: string, completeTask: CompleteTask) {
    const action: TaskAction = new TaskAction(id, name, completeTask.performedTime, 0, TaskFlag.TASK_UNFINISHED)
    this.taskActions.push(action);
  }

  public sendStagedActions() {

    if (this.taskActions && this.taskActions.length > 0) {
      //TODO remove
      console.log("Send staged actions:", this.taskActions)
      return this.tasksServices.sendTasksActions(this.taskActions).map((res) => {
        if (res.status == 200) {
          this.taskActions = [];
          return true;
        } else {
          console.error("Error sending tasks");
          return false
        }
      }, error => console.error("Error sending tasks"));
    } else {
      console.log("No tasks to send")
      return Observable.of(false)
    }
  }

}
export class TaskAction {
  comparationId: string;
  name: string;
  time: number;
  score: any;
  action: TaskFlag;
  constructor(comparationId: string, name: string, time: number, score: any, action: TaskFlag) {
    this.comparationId = comparationId;
    this.name = name;
    this.time = time;
    this.score = score;
    this.action = action;
  }
}

export enum TaskFlag {
  TASK_FINISHED = 1,
  TASK_UNFINISHED = 0
}
