import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TasksProvider } from '../../providers/storage/tasksProvider';
import { TaskModel } from '../../models/task.model';
import { USMOTask } from '../../models/usmo-task';
import * as moment from 'moment';
import { TaskInformationPage } from '../../pages/work-book/task-information/task-information';
import { App } from 'ionic-angular';
/**
 * List of tasks from a given date
 */
@Component({
  selector: 'tasks-slide',
  templateUrl: 'tasks-slide.html'
})
export class TasksSlideComponent {
  @Input() date: number;
  @Input() disabled: boolean;
  tasks: TaskModel[];
  constructor(private tasksProvider: TasksProvider, private app: App) {
  }

  /**When object is initialized*/
  protected ngOnInit() {
    this.tasksProvider.getTasks()
      .subscribe((tasks) => this.setTasks(tasks));
  }

  private setTasks(usmoTasks: USMOTask[]): void {
    this.tasks = [];
    const dateWeek = moment(this.date).startOf("isoWeek").valueOf();
    usmoTasks.forEach((usmoTask: USMOTask) => {
      const taskScore: number = usmoTask.getScore(dateWeek, this.date);
      const taskHasInfo = usmoTask.videoUrl != undefined || usmoTask.content != undefined;
      this.tasks.push(new TaskModel(usmoTask.name, taskHasInfo, taskScore));
    });
  }


  public gotoExerciseInfo(name:string) {
    this.tasksProvider.getTask(name)
    .subscribe((task:USMOTask)=>this.app.getRootNav().push(TaskInformationPage, task));
  }

  public completeExercise(event) {

  }
}
