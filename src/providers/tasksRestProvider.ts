import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { ITask } from '../models/taskI';
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../models/appointmentI';
import { AuthTokenService } from './authTokenService';
import { TaskAction } from './tasksManager';
import * as moment from 'moment';
import { IPerformance } from '../models/performation';
@Injectable()
export class TasksRestProvider {
  ONE_DAY_IN_MILIS = 24 * 60 * 60 * 1000;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthTokenService) { }

  public requestTasks(appointment: IAppointment, token: string): Observable<ITask[]> {
    let requestAddres = this.config.usmoServer + this.config.getTasksService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let criteria = {
      token: token,
      appointmentId: appointment.appointmentId
    }
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((tasks) => {
        if (tasks) {
          let deserializedTasks: ITask[] = [];
          tasks.forEach((task) => {
            //Map of performed exercises by week 
            let performedMap = new Map<number, IPerformance[]>();

            task.performedOn.forEach((performed) => {
              let week: number = moment(performed.time).startOf("isoWeek").valueOf();//Gets the start of the week (Monday)
              let performance: IPerformance = { date: performed.time, score: performed.score };
              if (!performedMap.has(week)) {
                performedMap.set(week, [performance]);
              } else {
                performedMap.get(week).push(performance);
              }
            });

            deserializedTasks.push({
              name: task.name,
              startingTime: task.startingTime,
              repetitions: task.repetitions,
              performedOn: performedMap,
              videoUrl: task.videoUrl,
              content: task.content,
              type:appointment.type
            });
          });

          return deserializedTasks;
        } else {
          return [];
        }
      });
  }

  public sendPerformedTask(appointmentId: number, taskName: string, time: number, score: number, token: string) {
    let requestAddres = this.config.usmoServer + this.config.addPerformedExercise;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let criteria = {
      token: token,
      appointmentId: appointmentId,
      name: taskName,
      time: time,
      score: score
    }
    headers.append('Authorization', this.config.password);
    return this.http.post(requestAddres, criteria, { headers: headers }).map(res => res.status);
  }

  public removePerformedTask(appointmentId: number, taskName: string, time: number, token: string): Observable<number> {
    let requestAddres = this.config.usmoServer + this.config.removePerformedExercise;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let criteria = {
      token: token,
      appointmentId: appointmentId,
      name: taskName,
      time: time,
      score: 0 //dummy score
    }
    headers.append('Authorization', this.config.password);
    return this.http.post(requestAddres, criteria, { headers: headers }).map(res => {
      return res.status
    });
  }


  extractData(res: Response) {
    return res.json() || {};
  }


  public sendTasks(actions: TaskAction[]): Observable<number> {
    //TODO - finish this with USMO's webService
    let requestAddres = this.config.usmoServer + this.config.removePerformedExercise;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let criteria = {}
    return this.http.post(requestAddres, criteria, { headers: headers }).map(res => {
      return res.status
    });
  }
}