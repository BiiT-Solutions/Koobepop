import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
    let url = this.backend + endpoint;
    body["organizationName"] = this.organization;
    return this.http.post(url, body, { headers: headers });
  }

  public postWithToken(endpoint: string, body: any, headers?: Headers) {
    return this.tokenProvider.getToken()
      .flatMap((token: string) => {
        return this.userProvider.getUser().flatMap((user) => {
          body["token"] = token;
          body["patientId"] = user.patientId;
          return this.post(endpoint, body, headers);
        });
      });
  }

  private loadSettings() {
    if (this.settings.allSettings) {
      this.backend = this.settings.allSettings.backend;
      this.auth = this.settings.allSettings.access;
      this.organization = this.settings.allSettings.organization;
    }
  }

}
