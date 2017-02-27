import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Company } from '../models/company-interfaces';
import { APP_CONFIG, IAppConfig } from '../app/app.config';

@Injectable()
export class AppointmentsProvider {
  companiesList: Array<Company> = [];
  appointmentsList;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  
  }
  //TODO Remove when infographicsJS is integrated
  getAppointments() {
    return this.appointmentsList;
  }

  requestAppointments(criteria,callback?) {
    let requestAddres = this.config.usmoServer + this.config.getAppointmentsService;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let response = this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData);
    response.forEach(el => this.appointmentsList = el).then(()=>callback(this.appointmentsList));
  }

  extractData(res: Response) {
    return res.json() || {};
  }
}