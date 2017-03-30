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


  public requestTasks(appointment: IAppointment,token:string): Observable<ITask[]> {
    let requestAddres = this.config.usmoServer + this.config.getTasksService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let criteria = {
      token:token,
      appointmentId: appointment.appointmentId
    }
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((tasks) => {
        return tasks ? tasks : [];
      });
  }

  public sendPerformedTask(appointment: IAppointment, task: ITask, time: number,token:string) {
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
    this.http.post(requestAddres, criteria, { headers: headers }).subscribe(res => console.log(res));
  }
  public removePerformedTask(appointment: IAppointment, task: ITask, time: number,token:string) {
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
    this.http.post(requestAddres, criteria, { headers: headers }).subscribe(res => console.log(res));
  }

  extractData(res: Response) {
    return res.json() || {};
  }

}