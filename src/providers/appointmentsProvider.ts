import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';
import { IUser } from '../models/userI';

@Injectable()
export class AppointmentsProvider {
  appointmentsList;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  }

  public getAppointments() {
    return this.appointmentsList;
  }

  public requestAppointments(criteria:IUser) {
    let requestAddres = this.config.usmoServer + this.config.getAppointmentsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((appointments: IAppointment[]) => {
        return appointments ? appointments.reverse() : [];
      });
  }

  extractData(res: Response): IAppointment[] {
    return res.json() || {};
  }
}