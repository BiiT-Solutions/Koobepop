import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Observable } from 'rxjs/Rx';
import { BasicRestService } from './basic-rest-service';
import { Device } from '@ionic-native/device';
import { TokenProvider } from '../storage/token-provider';
import { UserProvider } from '../storage/user-provider';
@Injectable()
export class AuthTokenRestService extends BasicRestService {
    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: TokenProvider,
        protected userProvider: UserProvider,
        protected device:Device) {
        super(http, config, tokenProvider,userProvider)
    }

    /** Request the authentication  token to the server */
    public requestToken(id: string, code: string): Observable<string> {
        //Here we request the token to the server with the sms code, the id and the uuid
        const requestAddres = this.config.usmoServer + this.config.getAuthenticationToken;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        const body = {
            user: id,
            authCode: code,
            uuid: this.getUuid()
        };

        return super.requestWithoutToken(requestAddres,body,headers)
        .map(this.extractData)
    }

    /** Request the user validation code to the server which will send an SMS with it*/
    public requestSendAuthCodeSMS(patientId: string, languageId: string): Observable<Response> {
        const requestAddres = this.config.usmoServer + this.config.sendAuthCodeSMS;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        const body = {
            patientId: patientId,
            language: languageId };

        return super.requestWithoutToken(requestAddres,body,headers)
    }

    /** Checks if the token is a valid one*/
    public tokenStatus(): Observable<number> {
        const requestAddres = this.config.usmoServer + this.config.verifyAuthenticationToken;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);

        return super.request(requestAddres,{},headers)
            .map((response) => { return response.status });
    }

    private extractData(res: Response): string {
        return res.text() || "";
    }

    private getUuid() {
        return this.device.uuid == undefined ? "This device has no uuid" : this.device.uuid;
    }
}
