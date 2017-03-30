import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { IAppConfig, APP_CONFIG } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';
import { AuthTokenService } from './authTokenService';
import { Observable } from 'rxjs/Observable';
import { FormResult } from '../models/results';

@Injectable()
export class ResultsProvider {

  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthTokenService) {
  }

  requestResults(appointment: IAppointment,token:string): Observable< Map<number, FormResult[]>> {
    let requestAddres = this.config.usmoServer + this.config.getResultsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    let criteria = {
      token: token,
      appointmentId: appointment.appointmentId
    }

    return this.http.post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((results) => {
        return results ? results : [];
      });
  }
  extractData(res: Response) {
    return res.json() || {};
  }

}
