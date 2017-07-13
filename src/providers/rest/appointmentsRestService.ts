
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Http, Response, Headers } from '@angular/http';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AppointmentModel } from '../../models/appointment.model';
import { TranslateService } from '@ngx-translate/core';
import { KppRestService } from './kppRestService';
import { TokenProvider } from '../storage/tokenProvider';

@Injectable()
export class AppointmentsRestService extends KppRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected translate: TranslateService) {
    super(http, config, tokenProvider);
  }

  public requestAppointments(user: UserModel): Observable<AppointmentModel[]> {
    const requestAddres = this.config.usmoServer + this.config.getAppointmentsService;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    const body = {
      patientId: user.patientId
    }
    return super.request(requestAddres, body, headers)
      .map((res: Response) => this.extractData(res))
      .map((appointments: AppointmentModel[]) => { return appointments ? appointments.reverse() : []; });
  }

  /**Sends a list of appointments with update time and retrieves new and edited appointments */
  public requestModifiedAppointments(appointments: AppointmentModel[], patient: UserModel): Observable<AppointmentModel[]> {
    const requestAddres = this.config.usmoServer + this.config.getUpdatedAppointmentsService;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    const appointmentsIdWithDate = [];
    appointments.forEach((appointment: AppointmentModel) => {
      appointmentsIdWithDate.push({
        appointmentId: appointment.appointmentId,
        updateTime: appointment.updateTime != undefined ? appointment.updateTime : 0
      });
    });

    const body = {
      appointments: appointmentsIdWithDate,
      patientId: patient.patientId
    }

    return super.request(requestAddres, body, headers)
      .map(res => this.extractData(res))
      .map((appointments: AppointmentModel[]) => {
        return appointments ? appointments.reverse() : [];
      });
  }

  /**Format appointments from USMO to a lighter form */
  private extractData(res: Response): AppointmentModel[] {
    const appointmentsFromResponse = res.json();
    appointmentsFromResponse.forEach(appointment => {
      appointment.results = this.formatResults(appointment.results);
      appointment.type = this.translate.instant("TRACKER-TAG." + appointment.type.name)
    });
    return appointmentsFromResponse || {};
  }

  private formatResults(results): any {
    const formResults = {};
    results.forEach(result =>
      formResults[result.formResult.label.toLocaleLowerCase()] = this.formatForm(result.formResult)
    );
    return formResults;
  }
  private formatForm(form): any {
    const formChildren = {};
    form.children.forEach(category => {
      formChildren[category.name.toLocaleLowerCase()] = this.formatCategory(category);
    });
    return formChildren;
  }

  private formatCategory(category): any {
    const categoryChildren = {};
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

}
