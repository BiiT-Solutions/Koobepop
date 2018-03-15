import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Observable } from 'rxjs/Observable';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { Device } from '@ionic-native/device';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { SettingsProvider } from '../../storage/settings/settings';
@Injectable()
export class AuthTokenRestService extends BasicRestService {
  constructor(
    protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected device: Device,
    protected settings: SettingsProvider) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  /** Request the user validation code to the server which will send an SMS with it*/
  public requestSendAuthCodeSMS(patientId: string, languageId: string): Observable<Response> {
    const requestAddres = this.config.sendCodeSMS;
    const body = {
      patientId: patientId,
      language: languageId
    };
    return super.post(requestAddres, body)
  }

  /** Request the authentication  token to the server */
  public requestToken(id: string, code: string): Observable<string> {
    //Here we request the token to the server with the sms code, the id and the uuid
    const requestAddres = this.config.getAuthenticationToken;
    const body = {
      patientId: id,
      authCode: code,
      uuid: this.getUuid()
    };
    return super.post(requestAddres, body)
      .map(this.extractData)
  }

  /** Checks if the token is a valid one*/
  public tokenStatus(): Observable<number> {
    const requestAddres = this.config.verifyAuthenticationToken;
    return super.postWithToken(requestAddres, {})
      .map((response) => { return response.status });
  }

  private extractData(res: Response): string {
    return res.text() || "";
  }

  private getUuid() {
    return this.device.uuid == undefined ? "This device has no uuid" : this.device.uuid;
  }
}
