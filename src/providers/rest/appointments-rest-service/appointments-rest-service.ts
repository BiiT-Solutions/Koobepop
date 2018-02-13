
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppointmentModel } from '../../../models/appointment.model';
import { TranslateService } from '@ngx-translate/core';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { SettingsProvider } from '../../storage/settings/settings';

@Injectable()
export class AppointmentsRestService extends BasicRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected translate: TranslateService,
    protected settings: SettingsProvider
  ) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  public requestAppointments(): Observable<AppointmentModel[]> {
    const endpoint = this.config.getAppointmentsService;
    const body = {};
    return super.postWithToken(endpoint, body)
      .map((res: Response) => this.extractData(res))
      .map((appointments: AppointmentModel[]) => { return appointments ? appointments.reverse() : []; });
  }

  /**Sends a list of appointments with update time and retrieves new and edited appointments */
  public requestModifiedAppointments(appointments: AppointmentModel[]): Observable<AppointmentModel[]> {
    const endpoint = this.config.getUpdatedAppointmentsService;   
    const appointmentsIdWithDate = [];
    appointments.forEach((appointment: AppointmentModel) => {
      appointmentsIdWithDate.push({
        appointmentId: appointment.appointmentId,
        updateTime: appointment.updateTime != undefined ? appointment.updateTime : 0
      });
    });

    const body = {
      appointments: appointmentsIdWithDate
    }

    return super.postWithToken(endpoint, body)
      .map(res => this.extractData(res))
  }

  /**Format appointments from USMO to a lighter form */
  private extractData(res: Response): AppointmentModel[] {
    const appointmentsFromResponse = res.json();
    appointmentsFromResponse.forEach(appointment => {
      appointment.type = this.translate.instant("TRACKER-TAG." + appointment.type.name)
    });
    return appointmentsFromResponse || [];
  }

}
