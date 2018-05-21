import { Component, Input } from '@angular/core';
import { App } from 'ionic-angular';
import * as moment from 'moment';
import { TaskModel } from '../../models/task.model';
import { USMOTask } from '../../models/usmo-task';
import { TaskInformationPage } from '../../pages/work-book/task-information/task-information';
import { TasksRestService } from '../../providers/rest/tasks-rest-service/tasks-rest-service';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
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

  loading = true;
  tasksAvaliable = false;
  tasks: TaskModel[];
  constructor(
    private tasksProvider: TasksProvider,
    private tasksRestService: TasksRestService,
    private app: App) {

    this.tasksProvider.getObservableTasks()
      .subscribe((tasks) => {
        this.loading = tasks == undefined;
        this.tasksAvaliable = tasks != undefined && tasks.length > 0;
        if (tasks) { this.setTasks(tasks) }
      }, e => console.error(e));
  }

  /**When object is changed*/
  protected ngOnChanges() {
    let tasks = this.tasksProvider.getCurrentTaks()
    if (tasks) { this.setTasks(tasks) };
  }

  ngAfterViewInit() {
  }


  public setTasks(usmoTasks: USMOTask[]): void {
    const tasks = [];
    usmoTasks.forEach((usmoTask: USMOTask) => {
      if (moment(usmoTask.startTime).startOf('day').valueOf() <= this.date && (usmoTask.finishTime == undefined || moment(usmoTask.finishTime).startOf('day').valueOf() >= this.date)) {
        const taskScore: number = usmoTask.getScore(this.date);
        const taskHasInfo = usmoTask.videoUrl != undefined || usmoTask.content != undefined;
        tasks.push(new TaskModel(usmoTask.name, taskHasInfo, taskScore));
      }
    });
    this.tasks = tasks;
  }

  public gotoExerciseInfo(name: string) {
    let task = this.tasksProvider.getTask(name)
    this.app.getRootNav().push(TaskInformationPage, task)
  }

  public completeExercise(task: TaskModel) {
    this.setTask(task.name, task.score, this.date);
  }

  private setTask(name: string, score: number, date: number) {
    if (score >= 0) {
      this.tasksProvider.setScore(name, score, date, moment().valueOf())
    } else {
      this.tasksProvider.removeScore(name, date)  
    }
  }
}
