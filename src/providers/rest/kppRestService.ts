import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { AuthTokenProvider } from '../authTokenProvider';

@Injectable()
export class KppRestService {
    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: AuthTokenProvider) { }

    /**General method for requests via posting*/
    public request(requestAddress, requestBody, headers): Observable<Response> {
        return this.tokenProvider.getToken()
            .flatMap((token: string) =>
                this.requestWithToken(requestAddress, requestBody, headers, token));
    }

    public requestWithoutToken(requestAddress, requestBody, headers): Observable<Response> {
        let criteria = requestBody;
        criteria["organizationName"] = this.config.organizationName;
        return this.http.post(requestAddress, criteria, { headers: headers });
    }

    private requestWithToken(requestAddress, requestBody, headers, token: string): Observable<Response> {
        let criteria = requestBody;
        criteria["token"] = token;
        criteria["organizationName"] = this.config.organizationName;
        return this.http.post(requestAddress, criteria, { headers: headers });
    }

}

