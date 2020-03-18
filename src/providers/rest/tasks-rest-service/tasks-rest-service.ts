import { Inject, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { CompleteTask } from '../../../models/complete-task';
import { USMOTask } from '../../../models/usmo-task';
import { SettingsProvider } from '../../storage/settings/settings';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { TaskAction } from '../../tasksManager/tasksManager';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';

@Injectable()
export class TasksRestService extends BasicRestService {
  //TODO - Find a better solution for hardcoding a default value
  DEFAULT_EXERCISE_TYPE = 'body health'

  constructor(
    protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected settings: SettingsProvider) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  public requestTasks(): Observable<USMOTask[]> {
    const requestAddres = this.config.getTasksService;
    const body = {}
    return super.postWithToken(requestAddres, body)
      .map(this.extractData)
      .map((tasks) => this.formatTasks(tasks))
  }

  extractData(res: Response) {
    try {
      return res.json() || {};
    } catch (exception) {
      console.debug(exception)
      return undefined;
    }
  }

  private formatTasks(tasks: any): USMOTask[] {
    if (tasks) {
      const deserializedTasks: USMOTask[] = [];
      tasks.forEach((task) => {
        deserializedTasks.push(this.formatTask(task));
      });
      return deserializedTasks;
    } else {
      return [];
    }
  }

  public formatTask(task: any): USMOTask {
    let performedOn: CompleteTask[] = []
    
    if (task.performedOn) {
      for (let performed of task.performedOn) {
        const filledTime = performed.filledTime != undefined ? performed.filledTime : performed.time;
        performedOn.push(new CompleteTask(performed.time, filledTime, performed.score))
      }
    }

    const newTask = new USMOTask(
      task.comparationId,
      task.name,
      task.startTime,
      task.finishTime,
      task.repetitions,
      this.DEFAULT_EXERCISE_TYPE,
      performedOn,
      task.videoUrl,
      task.content,
      task.formUrl
      );
    return newTask;
  }

  /**Enviar performed y removed tasks TODO - Utilizar una lista y enviar periódicamente */
  public sendPerformedTask(taskName: string, score: number, performedTime: number, filledTime) {
    const requestAddres = this.config.addPerformedExercise;

    const body = {
      name: taskName,
      time: performedTime,
      filledTime: filledTime,
      score: score
    }
    return super.postWithToken(requestAddres, body).map(res => res.status);
  }

  public removePerformedTask(taskName: string, date: number): Observable<number> {
    const requestAddres = this.config.removePerformedExercise;
    const body = {
      name: taskName,
      time: date,
      score: 0
    }
    return super.postWithToken(requestAddres, body).map(res => res.status);
  }

  public sendTasksActions(tasks: TaskAction[]): Observable<Response> {
    const requestAddres = this.config.performActions;
    const body = {
      taskActions: tasks
    }
    return super.postWithToken(requestAddres, body);
  }
  
  public getTaskInfo(task: USMOTask): Observable<USMOTask> {
    const requestAddres = this.config.getTaskInfoService;
    const body = { name: task.name }
    return super.postWithToken(requestAddres, body)
      .map(this.extractData)
      .map((taskWithInfo) => {
        task.content = taskWithInfo.content
        task.videoUrl = taskWithInfo.videoUrl
        task.formUrl = taskWithInfo.formUrl
        return task
      })
  }
}



