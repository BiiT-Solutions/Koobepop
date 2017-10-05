import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/token-provider';
import { UserProvider } from '../storage/user-provider';

@Injectable()
export class BasicRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider) { }

  /**General method for requests via posting*/
  public request(requestAddress: string, requestBody: any, headers: Headers): Observable<Response> {
    return this.tokenProvider.getToken()
      .flatMap((token: string) => {
        return this.userProvider.getUser().flatMap((user) => {
          return this.requestWithToken(requestAddress, requestBody, headers, token, user.patientId)
        });
      });
  }

  public requestWithoutToken(requestAddress: string, requestBody: any, headers: Headers): Observable<Response> {
    const criteria = requestBody;
    criteria["organizationName"] = this.config.organizationName;
    return this.http.post(requestAddress, criteria, { headers: headers });
  }

  private requestWithToken(requestAddress: string, requestBody: any, headers: Headers, token: string, userId:string): Observable<Response> {
    const criteria = requestBody;
    criteria["token"] = token;
    criteria["patientId"] = userId;
    return this.requestWithoutToken(requestAddress,criteria,headers);
  }

}
