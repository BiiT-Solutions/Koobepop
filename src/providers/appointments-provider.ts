import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Company } from '../models/company-interfaces';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';

@Injectable()
export class AppointmentsProvider {
  appointmentsList;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
  
  }
  //TODO Remove when infographicsJS is integrated
  public getAppointments() {
    return this.appointmentsList;
  }

  public requestAppointments(criteria) {
    let requestAddres = this.config.usmoServer + this.config.getAppointmentsService;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((appointments:IAppointment[])=>{
        let response = [];
        if(appointments){
        appointments.forEach((appointment:IAppointment)=>{
          response = response.concat(appointment);//TODO transform to a desired object TYPES!
        })
      }
        return response.reverse();
      });
    }

  extractData(res: Response) {
    return res.json() || {};
  }
}