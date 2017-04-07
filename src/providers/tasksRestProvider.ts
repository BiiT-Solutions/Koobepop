import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { ITask } from '../models/taskI';
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../models/appointmentI';
import { AuthTokenService } from './authTokenService';
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
            let performedMap = new Map<any,any>()

            task.performedOn.forEach((performed)=>{
              performedMap.set(performed.time,performed.score);
            });
            deserializedTasks.push({
              name: task.name,
              startingTime: task.startingTime,
              repetitions: task.repetitions,
              performedOn: performedMap, 
              videoUrl: task.videoUrl,
              infoUrl: task.infoUrl
            });
          });
           return deserializedTasks;
        } else {
          return [];
        }
      });
  }

  public sendPerformedTask(appointment: IAppointment, task: ITask, time: number, token: string) {
    let requestAddres = this.config.usmoServer + this.config.addPerformedExercise;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let criteria = {
      token: token,
      appointmentId: appointment.appointmentId,
      name: task.name,
      time: time,
      score: task.performedOn.get(time)
    }
    headers.append('Authorization', this.config.password);
    return this.http.post(requestAddres, criteria, { headers: headers }).map(res => res.status );
  }
  public removePerformedTask(appointment: IAppointment, task: ITask, time: number, token: string) {
    let requestAddres = this.config.usmoServer + this.config.removePerformedExercise;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let criteria = {
      token: token,
      appointmentId: appointment.appointmentId,
      name: task.name,
      time: time,
      score: 0 //dummy score
    }
    headers.append('Authorization', this.config.password);
    return this.http.post(requestAddres, criteria, { headers: headers }).map(res => {
      return res.status });
  }

  extractData(res: Response) {
    return res.json() || {};
  }

}