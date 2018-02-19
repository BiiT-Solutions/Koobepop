import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { AppointmentModel } from '../../../models/appointment.model';
import { Observable } from 'rxjs/Observable';
import { USMOTask } from '../../../models/usmo-task';
import * as moment from 'moment';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { TaskAction } from '../../tasksManager/tasksManager';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { CompleteTask } from '../../../models/complete-task';
import { SettingsProvider } from '../../storage/settings/settings';

@Injectable()
export class TasksRestService extends BasicRestService {

  constructor(
    protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected settings: SettingsProvider) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  public requestTasks(appointment: AppointmentModel): Observable<USMOTask[]> {
    const requestAddres = this.config.getTasksService;
    const body = { appointmentId: appointment.appointmentId }
    return super.postWithToken(requestAddres, body)
      .map(this.extractData)
      .map((tasks) => this.formatTasks(appointment, tasks))
  }

  extractData(res: Response) {
    try {
      return res.json() || {};
    } catch (exception) {
      console.debug(exception)
      return undefined;
    }
  }

  private formatTasks(appointment: AppointmentModel, tasks: any): USMOTask[] {
    if (tasks) {
      const deserializedTasks: USMOTask[] = [];
      tasks.forEach((task) => {
        //Map of performed exercises by week
        const performedMap = new Map<number, CompleteTask[]>();
        if (task.performedOn) {
          task.performedOn.forEach((performed) => {
            const weekKey: number = moment(performed.time).startOf("isoWeek").valueOf();//Gets the start of the week (Monday)
            const filledTime = performed.filledTime != undefined ? performed.filledTime : performed.time;

            if (!performedMap.has(weekKey)) {
              const weekValue: CompleteTask[] = [];

              weekValue.push(new CompleteTask(performed.time, filledTime, performed.score));
              performedMap.set(weekKey, weekValue);
            } else {
              performedMap.get(weekKey).push(new CompleteTask(performed.time, filledTime, performed.score));
            }
          });
        }
        const newTask = new USMOTask(
          task.name,
          task.startTime,
          task.finishTime,
          task.repetitions,
          appointment.type,
          appointment.appointmentId,
          performedMap,
          task.videoUrl,
          task.content);
        newTask.updateTime = appointment.updateTime != undefined ? appointment.updateTime : appointment.startTime;
        deserializedTasks.push(newTask);
      });
      return deserializedTasks;
    } else {
      return [];
    }
  }

  /**Enviar performed y removed tasks TODO - Utilizar una lista y enviar periódicamente */
  public sendPerformedTask(appointmentId: number, taskName: string, score: number, performedTime: number, filledTime) {
    const requestAddres =  this.config.addPerformedExercise;

    const body = {
      appointmentId: appointmentId,
      name: taskName,
      time: performedTime,
      filledTime: filledTime,
      score: score
    }
    return super.postWithToken(requestAddres, body).map(res => res.status);
  }

  public removePerformedTask(appointmentId: number, taskName: string, date: number): Observable<number> {
    const requestAddres =  this.config.removePerformedExercise;
    const body = {
      appointmentId: appointmentId,
      name: taskName,
      time: date,
      score: 0
    }
    return super.postWithToken(requestAddres, body).map(res => res.status);
  }

  public sendTasksActions(tasks: TaskAction[]): Observable<Response> {
    const requestAddres =  this.config.performActions;
    const body = {
      taskActions: tasks
    }
    return super.postWithToken(requestAddres, body);
  }
}



