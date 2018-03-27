
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { BasicRestService } from '../rest/basic-rest-service/basic-rest-service';
import { TokenProvider } from '../storage/token-provider/token-provider';
import { UserProvider } from '../storage/user-provider/user-provider';
import { SettingsProvider } from '../storage/settings/settings';

@Injectable()
export class UserGuardProvider extends BasicRestService {
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

  public requestUserGuard(): Observable<any> {
    const requestAddres = this.config.getUserGuard;
    const body = {}    
    return super.postWithToken(requestAddres, body)
      .map((res: Response) => this.extractData(res))
      .map((res: any[]) => this.toUserGuard(res));
  }

  private extractData(res) {
    return res.json() || [];
  }

  private toUserGuard(res: any[]) {
    return res;
  }
}
