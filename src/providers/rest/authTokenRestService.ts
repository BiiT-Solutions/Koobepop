import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Observable } from 'rxjs/Rx';
import { KppRestService } from './kppRestService';
import { AuthTokenProvider } from '../authTokenProvider';
@Injectable()
export class AuthTokenRestService extends KppRestService {
    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: AuthTokenProvider) {
        super(http, config, tokenProvider)
    }

    /** Request the authentication  token to the server */
    public requestToken(id: string, code: string, uuid: string): Observable<string> {
        //Here we request the token to the server with the sms code, the id and the uuid
        let requestAddres = this.config.usmoServer + this.config.getAuthenticationToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let body = {
            user: id,
            authCode: code,
            uuid: uuid
        };

        return super.requestWithoutToken(requestAddres,body,headers)
        .map(this.extractData)
    }

    /** Request the user validation code to the server which will send an SMS with it*/
    public requestSendAuthCodeSMS(patientId: string, languageId: string): Observable<Response> {
        let requestAddres = this.config.usmoServer + this.config.sendAuthCodeSMS;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let body = { 
            patientId: patientId, 
            language: languageId };

        return super.requestWithoutToken(requestAddres,body,headers)
    }

    /** Checks if the token is a valid one*/
    public tokenStatus(token): Observable<number> {
        let requestAddres = this.config.usmoServer + this.config.verifyAuthenticationToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        return super.request(requestAddres,{},headers)
            .map((response) => { return response.status });
    }

    private extractData(res: Response): string {
        return res.text() || "";
    }
}