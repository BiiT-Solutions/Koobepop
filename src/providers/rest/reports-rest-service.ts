
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
export class ReportsRestService extends KppRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected translate: TranslateService) {
    super(http, config, tokenProvider);
  }

  public requestReports(appointmentId:number): Observable<any> {
    const requestAddres = this.config.usmoServer + this.config.getReportService;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    const body = {
      appointmentId: appointmentId
    }
    return super.request(requestAddres, body, headers)
      .map((res: Response) => this.extractData(res));

  }
    public extractData(res){
      return res.json() || [];
    }

}
