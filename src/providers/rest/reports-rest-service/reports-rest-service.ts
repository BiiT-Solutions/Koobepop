
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AppointmentModel } from '../../../models/appointment.model';
import { TranslateService } from '@ngx-translate/core';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { ReportModel } from '../../../models/report.model';
import * as infographicjs from 'infographic-js';
import { SettingsProvider } from '../../storage/settings/settings';

@Injectable()
export class ReportsRestService extends BasicRestService {
  constructor(
    protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected translate: TranslateService,
    protected settings: SettingsProvider
  ) {
    super(http, config, tokenProvider, userProvider,settings);
  }

  public requestReports(appointment: AppointmentModel): Observable<ReportModel> {
    const requestAddres = this.config.getReportService;
    const body = {
      appointmentId: appointment.appointmentId
    }
    return super.postWithToken(requestAddres, body)
      .map((res: Response) => this.extractData(res))
      .map((data) => this.generateInfographic(appointment, data));
  }

  private extractData(res) {
    return res.json() || [];
  }

  private generateInfographic(appointment: AppointmentModel, data: any[]): ReportModel {
    const report = new ReportModel(appointment.appointmentId, appointment.updateTime, []);
    data.forEach((item) => {
     try{
      report.infographicsList.push(infographicjs.infographicFromTemplate(item.template, item.content))
     }catch(e){console.log('infographic generation error:',item.template,e)}
    });
    return report;
  }

}
