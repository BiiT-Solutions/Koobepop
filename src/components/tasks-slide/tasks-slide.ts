import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TasksProvider } from '../../providers/storage/tasksProvider';
import { TaskModel } from '../../models/task.model';
import { USMOTask } from '../../models/usmo-task';
import { TaskInformationPage } from '../../pages/work-book/task-information/task-information';
import { App } from 'ionic-angular';
import { TasksRestService } from '../../providers/rest/tasksRestService';
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
  tasks: TaskModel[];
  constructor(private tasksProvider: TasksProvider, private tasksRestService: TasksRestService, private app: App) {
   //this.requestTasks(this);
   this.tasksProvider.getTasks().subscribe(usmoTasks=>this.setTasks(usmoTasks));
  }

  /**When object is changed*/
  protected ngOnChanges() {
    this.requestTasks(this);
  }

  private requestTasks(context) {
    this.tasksProvider.getTasks()
      .subscribe((tasks) => {
        if (tasks == undefined || tasks.length <= 0) {
          const timeout = setTimeout(()=>context.requestTasks(context), 2000)
        } else {
          context.setTasks(tasks)
        }
      });
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
      this.tasksProvider.setScore(name, score, date,moment().valueOf());
      this.tasksProvider.getTask(name)
        .subscribe((task: USMOTask) => {
          this.tasksRestService.sendPerformedTask(task.appointmentId, name, score, date, moment().valueOf()).subscribe();
        });
    } else {
      this.tasksProvider.removeScore(name, date);
      this.tasksProvider.getTask(name)
        .subscribe((task: USMOTask) => {
          this.tasksRestService.removePerformedTask(task.appointmentId, name, date).subscribe();
        });
    }
  }
}
