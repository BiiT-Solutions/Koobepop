
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
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
    console.log("resports-rest-services | body: '" + JSON.stringify(body) + "'");
    return super.postWithToken(requestAddres, body)
      .map((res: Response) => this.extractData(res))
      .map((data) => this.generateInfographic(appointment, data));
  }

  private extractData(res) {
    return res.json() || [];
  }

  /**
   * InfographicJS SVGs must be added to assets/infographic-images/ in order to
   * show reports correctly. Other way it will show ERR_FILE_NOT_FOUND .
   */
  private generateInfographic(appointment: AppointmentModel, data: any[]): ReportModel {
    const report = new ReportModel(appointment.appointmentId, appointment.updateTime, []);
    data.forEach((item) => {
      try {
        let itemWithoutHTMLTagsString = this.filterHtmlTags(JSON.stringify(item));
        console.log("reports-rest-services | JSON without HTML tags: '" + itemWithoutHTMLTagsString + "'");
        var itemWithoutHTMLTagsJSON = JSON.parse(itemWithoutHTMLTagsString);
        console.log("reports-rest-services | JSON to infographic: " + JSON.stringify(itemWithoutHTMLTagsJSON));
        report.infographicsList.push(infographicjs.infographicFromTemplate(itemWithoutHTMLTagsJSON.template, itemWithoutHTMLTagsJSON.content));
        //report.infographicsList.push(this.postReport(item));
      } catch (e) {
        console.log('reports-rest-services | infographic generation error:', itemWithoutHTMLTagsJSON.template, e);
        //console.log('reports-rest-services | Infographic generation error: ', item.template, e);
      }
    });
    return report;
  }

  private postReport(content) {
    const URL = "https://m3sport.biit-solutions.com/infographicjs/getSvgFromTemplate";
    console.log("reports-rest-services | POST: " + content);
    this.http.post(URL, content)
      .subscribe(data => {
        console.log("reports-rest-services | POST Result: '" + data + "'");
        return data;
      },
        error => {
          console.log("reports-rest-services | POST Error: '" + error + "'");
        }
      );
  }

  private filterHtmlTags(text) {
    return text.replace(/(&([^>]+);|<([^>]+)>)/ig, '');
  }
}
