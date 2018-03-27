import { Component, Input } from '@angular/core';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { TaskModel } from '../../models/task.model';
import { USMOTask } from '../../models/usmo-task';
import { TaskInformationPage } from '../../pages/work-book/task-information/task-information';
import { App } from 'ionic-angular';
import { TasksRestService } from '../../providers/rest/tasks-rest-service/tasks-rest-service';
import * as moment from 'moment';
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
    //this.requestTasks(this);

  }

  /**When object is changed*/
  protected ngOnChanges() {
    this.requestTasks(this);
  }

  private requestTasks(context) {
    this.tasksProvider.update()
      .subscribe((tasks) => {
          context.setTasks(this.tasksProvider.allTasks)
          context.loading = false;
          context.tasksAvaliable = this.tasksProvider.allTasks != undefined && this.tasksProvider.allTasks.length > 0;       
      }, e => console.log(e));
  }

  private setTasks(usmoTasks: USMOTask[]): void {
    const tasks = [];
    usmoTasks.forEach((usmoTask: USMOTask) => {
      if (moment(usmoTask.startTime).startOf('day').valueOf() <= this.date && (usmoTask.finishTime == undefined || moment(usmoTask.finishTime).startOf('day').valueOf() >= this.date)) {
        const taskScore: number = usmoTask.getScore(this.date);
        const taskHasInfo = usmoTask.videoUrl != undefined || usmoTask.content != undefined;
        tasks.push(new TaskModel(usmoTask.name, taskHasInfo, taskScore));
      }
    });
    this.tasks = tasks;
    //this.loading = false;
    //this.tasksAvaliable = tasks && tasks.length>0 ? true:false;
    //console.log(this.tasks)
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
      this.tasksProvider.setScore(name, score, date, moment().valueOf())
        .subscribe(task => {
          this.tasksRestService.sendPerformedTask(task.appointmentId, name, score, date, moment().valueOf())
            .subscribe();
        }, error => console.error('Unable to set score for task ' + name))
    } else {
      this.tasksProvider.removeScore(name, date)
        .subscribe((task: USMOTask) => {
          this.tasksRestService.removePerformedTask(task.appointmentId, name, date)
            .subscribe();
        });
    }
  }
}
