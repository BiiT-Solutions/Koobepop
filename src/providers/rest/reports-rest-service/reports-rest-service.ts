
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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
    private httpClient: HttpClient,
    //protected headers: Headers,
    
    protected httpHeaders: HttpHeaders,

    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected translate: TranslateService,
    protected settings: SettingsProvider
  ) {
    super(http, config, tokenProvider, userProvider, settings);
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
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA");
    const report = new ReportModel(appointment.appointmentId, appointment.updateTime, []);
    data.forEach((item) => {
      try {
        /*var itemWithoutHTMLTags = this.filterHtmlTags(JSON.stringify(item));
        itemWithoutHTMLTags = JSON.parse(item);
        console.log("JSON: " + JSON.stringify(itemWithoutHTMLTags));
        report.infographicsList.push(infographicjs.infographicFromTemplate(itemWithoutHTMLTags.template, itemWithoutHTMLTags.content));*/
        console.log("Sending POST: " + item);
        report.infographicsList.push(this.postReport(item));
      } catch (e) {
        //console.log('infographic generation error:', itemWithoutHTMLTags.template, e);
        console.log('infographic generation error:', item.template, e);
      }
    });
    return report;
  }

  private postReport(content) {
    const URL = "https://m3sport.biit-solutions.com/infographicjs/getSvgFromTemplate";
    //let headersObject = new HttpHeaders();
    //const headers = headersObject.append('Content-Type', 'application/json');

    this.httpClient.post<any>(URL, content)
      .subscribe(data => {
        alert('POST Result: ' + data);
        return data;
      },
        error => {
          alert("POST Error: " + error);
        }
      );
  }

  private filterHtmlTags(text) {
    return text.replace(/(&([^>]+);|<([^>]+)>)/ig, '');
  }
}
