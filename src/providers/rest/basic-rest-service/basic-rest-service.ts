import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { IAppConfig, APP_CONFIG } from '../../../app/app.config';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { SettingsProvider } from '../../storage/settings/settings';

@Injectable()
export class BasicRestService {
  backend: string;
  auth: string;

  organization: string;

  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected settings: SettingsProvider
  ) {
    this.settings.load().subscribe();
  }

  public post(endpoint: string, body: any, headers?: Headers) {
    this.loadSettings();
    if (!headers) {
      headers = new Headers({ 'Content-Type': 'application/json' });
    }
    headers.append('Authorization', this.auth);
    const url = this.backend + endpoint;
    body["organizationName"] = this.organization;
    try {
      console.log("basic-rest-service | POST endPoint: '" + endpoint + "' body: '" + JSON.stringify(body) + "' headers: '" + JSON.stringify(headers) + "'");
      return this.http.post(url, body, { headers: headers });
    } catch (error) {
      console.log("reports-rest-services | POST Error: " + error);
    }
  }

  public postWithToken(endpoint: string, body: any, headers?: Headers) {
    return this.tokenProvider.getToken()
      .flatMap((token: string) => {
        return this.userProvider.getUser().flatMap((user) => {
          body["token"] = token;
          if (user) {
            body["patientId"] = user.patientId;
            console.log("basic-rest-service | POST WITH TOKEN token: '" + token + "' patientId: '" + user.patientId + "'");
          } else {
            console.log("basic-rest-service | POST WITH TOKEN token: '" + token + "'");
          }
          console.log("basic-rest-service | POST WITH TOKEN endPoint: '" + endpoint + "' body: '" + JSON.stringify(body) + "' headers: '" + JSON.stringify(headers) + "'");
          return this.post(endpoint, body, headers);
        });
      });
  }

  private loadSettings() {
    if (this.settings.allSettings) {
      this.backend = this.settings.allSettings.backend;
      this.auth = btoa(this.settings.allSettings.webservicesUser + ':' + this.settings.allSettings.webservicesPassword);
      this.organization = this.settings.allSettings.organization;
    }
  }

}
