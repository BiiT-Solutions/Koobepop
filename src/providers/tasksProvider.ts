import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { ITask } from '../models/taskI'
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../models/appointmentI';
@Injectable()
export class TasksRestProvider {
  ONE_DAY_IN_MILIS = 24 * 60 * 60 * 1000
  taskList: ITask[];
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {  }

  getTasks() {
    return this.taskList;
  }

  //
  requestTasks(criteria:IAppointment):Observable<ITask[]> {
    let requestAddres = this.config.usmoServer + this.config.getTasksService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((tasks) => {
        return tasks ? tasks : [];
      });
  }

  extractData(res: Response) {
    return res.json() || {};
  }
}