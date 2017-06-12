
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Http, Response, Headers } from '@angular/http';
import { IUser } from '../../models/userI';
import { Observable } from 'rxjs/Observable';
import { IAppointment } from '../../models/appointmentI';
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

    public requestAppointments(user: IUser): Observable<IAppointment[]> {
        let requestAddres = this.config.usmoServer + this.config.getAppointmentsService;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let body = {
            patientId: user.patientId
        }
        return super.request(requestAddres, body, headers)
            .map((res:Response)=>this.extractData(res))
            .map((appointments: IAppointment[]) => { return appointments ? appointments.reverse() : []; })
            ;
    }

    /**Sends a list of appointments with update time and retrieves new and edited appointments */
    public requestModifiedAppointments(appointments: IAppointment[], patient: IUser): Observable<IAppointment[]> {
        let requestAddres = this.config.usmoServer + this.config.getUpdatedAppointmentsService;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let appointmentsIdWithDate = [];
        appointments.forEach((appointment: IAppointment) => {
            appointmentsIdWithDate.push({
                appointmentId: appointment.appointmentId,
                updateTime: appointment.updateTime != undefined ? appointment.updateTime : 0
            });
        });

        let body = {
            appointments: appointmentsIdWithDate,
            patientId: patient.patientId
        }

        return super.request(requestAddres,body,headers)
            .map(res => this.extractData(res))
            .map((appointments: IAppointment[]) => {
                return appointments ? appointments.reverse() : [];
            });
    }

    /**Format appointments from USMO to a lighter form */
    private extractData(res: Response): IAppointment[] {
        let appointmentsFromResponse = res.json();
        appointmentsFromResponse.forEach(appointment => {
            appointment.results = this.formatResults(appointment.results);
            appointment.type = this.translate.instant("TRACKER-TAG." + appointment.type)
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

}