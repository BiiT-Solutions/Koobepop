import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/tokenProvider';

@Injectable()
export class KppRestService {
    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: TokenProvider) { }

    /**General method for requests via posting*/
    public request(requestAddress:string, requestBody:any, headers:Headers): Observable<Response> {
        return this.tokenProvider.getToken()
            .flatMap((token: string) =>{
                return this.requestWithToken(requestAddress, requestBody, headers, token)});
    }

    public requestWithoutToken(requestAddress:string, requestBody:any, headers:Headers): Observable<Response> {
        let criteria = requestBody;
        criteria["organizationName"] = this.config.organizationName;
        return this.http.post(requestAddress, criteria, { headers: headers });
    }

    private requestWithToken(requestAddress:string, requestBody:any, headers:Headers, token: string): Observable<Response> {
        let criteria = requestBody;
        criteria["token"] = token;
        criteria["organizationName"] = this.config.organizationName;
        return this.http.post(requestAddress, criteria, { headers: headers });
    }

}

