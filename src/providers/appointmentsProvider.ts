import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';
import { IUser } from '../models/userI';
import { AuthTokenService } from './authTokenService';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppointmentsProvider {
  appointmentsList;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthTokenService,private translate: TranslateService) {
  }

  public getAppointments() {
    return this.appointmentsList;
  }

  public requestAppointments(user: IUser, token): Observable<IAppointment[]> {
    let requestAddres = this.config.usmoServer + this.config.getAppointmentsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    let criteria = {
      token: token,
      patientId: user.patientId,
      organizationName: this.config.organizationName
    }
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(res => this.extractData(res))
      .map((appointments: IAppointment[]) => {
        return appointments ? appointments.reverse() : [];
      });
  }

  private extractData(res: Response): IAppointment[] {
    let appointmentsFromResponse = res.json();
    appointmentsFromResponse.forEach(appointment => {
      appointment.results = this.formatResults(appointment.results); 
      appointment.type = this.translate.instant("TRACKER-TAG."+appointment.type)
    });
    return appointmentsFromResponse || {};
  }

  private formatResults(results): any {
    let formResults = {};
    results.forEach(result =>
      formResults[result.formResult.label.toLocaleLowerCase()] = this.formatForm(result.formResult)
    );
    return formResults;
  }
  private formatForm(form): any {
    let formChildren = {};
    form.children.forEach(category => {
      formChildren[category.name.toLocaleLowerCase()] = this.formatCategory(category);
    });
    return formChildren;
  }

  private formatCategory(category): any {
    let categoryChildren = {};
    category.children.forEach(child => {
      if (child.class == "com.biit.form.result.RepeatableGroupResult") {
        categoryChildren[child.name.toLocaleLowerCase()] = this.formatCategory(child);
      } else if (child.class == "com.biit.form.result.QuestionWithValueResult") {
        categoryChildren[child.name.toLocaleLowerCase()] = this.formatQuestion(child);
      }
    });
    return categoryChildren;
  }

  private formatQuestion(question): any {
    return question.values;
  }

  public requestModifiedAppointments(appointments: IAppointment[], token:string ,patient:IUser): Observable<IAppointment[]> {
    let requestAddres = this.config.usmoServer + this.config.getUpdatedAppointmentsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let appointmentsIdWithDate = [];
    appointments.forEach((appointment: IAppointment) => {
      appointmentsIdWithDate.push({
        appointmentId: appointment.appointmentId,
        updateTime: appointment.updateTime!=undefined?appointment.updateTime:0
    });
    });
    let criteria = {
      token: token,
      appointments:appointmentsIdWithDate,
      patientId:patient.patientId,
      organizationName: this.config.organizationName
    }
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(res => this.extractData(res))
      .map((appointments: IAppointment[]) => {
        return appointments ? appointments.reverse() : [];
      });
  }
}