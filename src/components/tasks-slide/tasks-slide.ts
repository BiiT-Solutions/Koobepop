import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TasksProvider } from '../../providers/storage/tasksProvider';
import { TaskModel } from '../../models/task.model';
import { USMOTask } from '../../models/usmo-task';
import { TaskInformationPage } from '../../pages/work-book/task-information/task-information';
import { App } from 'ionic-angular';
import { TasksRestService } from '../../providers/rest/tasksRestService';
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
  constructor(private tasksProvider: TasksProvider, private tasksRestService: TasksRestService, private app: App) {
  }

  /**When object is changed*/
  protected ngOnChanges() {
    this.tasksProvider.getTasks()
      .subscribe((tasks) => this.setTasks(tasks));
  }

  private setTasks(usmoTasks: USMOTask[]): void {
    this.tasks = [];
    usmoTasks.forEach((usmoTask: USMOTask) => {
      if (usmoTask.startTime <= this.date && (usmoTask.finishTime == undefined || usmoTask.finishTime >= this.date)) {
        const taskScore: number = usmoTask.getScore(this.date);
        const taskHasInfo = usmoTask.videoUrl != undefined || usmoTask.content != undefined;
        this.tasks.push(new TaskModel(usmoTask.name, taskHasInfo, taskScore));
      }
    });
  }


  public gotoExerciseInfo(name: string) {
    this.tasksProvider.getTask(name)
      .subscribe((task: USMOTask) => this.app.getRootNav().push(TaskInformationPage, task));
  }

  public completeExercise(task: TaskModel) {
    this.setTask(task.name, task.score, this.date);
  }

  private setTask(name: string, score: number, date: number) {
    //console.log("TasksSlide  Task: "+name+" score: "+score);
    if (score >= 0) {
      this.tasksProvider.setScore(name, score, date);
      this.tasksRestService;
    } else {
      this.tasksProvider.removeScore(name, date);


    }
  }
}
