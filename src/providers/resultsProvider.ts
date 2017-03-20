import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { IAppConfig,APP_CONFIG } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';

@Injectable()
export class ResultsProvider {

  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig){

  }

  requestResults(criteria:IAppointment):any {
    let requestAddres = this.config.usmoServer + this.config.getResultsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    return this.http.post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((tasks) => {
        return tasks ? tasks : [];
      });
  }
  extractData(res: Response) {
    return res.json() || {};
  }

}
