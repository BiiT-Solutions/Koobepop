import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';
import { IUser } from '../models/userI';
import { AuthTokenService } from './authTokenService';
import { Observable } from 'rxjs/Observable';
import { FormResult, CategoryResult, QuestionResult } from '../models/results';

@Injectable()
export class AppointmentsProvider {
  appointmentsList;
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthTokenService) {
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
      patientId: user.patientId
    }
    return this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(res=>this.extractData(res))
      .map((appointments: IAppointment[]) => {
        return appointments ? appointments.reverse() : [];
      });
  }

  private extractData(res: Response): IAppointment[] {
    let appointmentsFromResponse = res.json();
    //console.log(appointmentsFromResponse)
    //console.log(appointmentsFromResponse[2].results)
    appointmentsFromResponse.forEach(appointment=>{
      appointment.results = this.formatResults(appointment.results)
    });
    return appointmentsFromResponse || {};
  }

  private formatResults(results): FormResult[] {
    let formResults: FormResult[] = [];
    results.forEach(result =>
      formResults.push(this.formatForm(result.formResult))
    );
    return formResults;
  }
  private formatForm(form): FormResult {
    let formChildren: CategoryResult[] = [];
    form.children.forEach(category => {
      formChildren.push(this.formatCategory(category));
    });
    return {
      name: form.label,
      children: formChildren
    }
  }
  private formatCategory(category): CategoryResult {
    let categoryChildren: any[] = [];
    category.children.forEach(child => {
      if (child.class == "com.biit.form.result.RepeatableGroupResult") {
        categoryChildren.push(this.formatCategory(child));
      }
      else if (child.class == "com.biit.form.result.QuestionWithValueResult") {
        categoryChildren.push(this.formatQuestion(child));
      }
    })
    return { name: category.name, children: categoryChildren }
  }

  private formatQuestion(question): QuestionResult {
    return { name: question.name, values: question.values }
  }
}