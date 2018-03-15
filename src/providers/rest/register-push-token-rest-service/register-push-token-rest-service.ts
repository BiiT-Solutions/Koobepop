import { Injectable, Inject } from '@angular/core';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { IAppConfig, APP_CONFIG } from '../../../app/app.config';
import { Http, Response } from '@angular/http';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { SettingsProvider } from '../../storage/settings/settings';
@Injectable()
export class RegisterPushTokenRestService extends BasicRestService {
  appointmentsList;
  constructor(
    protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected translate: TranslateService,
    protected settings: SettingsProvider
  ) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  public setPushToken(pushNotificationToken: string): Observable<any> {
    const requestAddres = this.config.setPushNotificationsToken;
    const body = {
      pushNotificationToken: pushNotificationToken
    }
    return super.postWithToken(requestAddres, body)
      .map((res: Response) => res.json());

  }
}
