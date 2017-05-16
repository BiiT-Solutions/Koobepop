import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IAppConfig, APP_CONFIG } from '../app/app.config';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthTokenService {
    constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }
   
    /** Request the authentication  token to the server */
    public requestToken(id: string, code: string,uuid:string):Observable<string> {
        //Here we request the token to the server with the sms code, the id and the uuid
        let requestAddres = this.config.usmoServer + this.config.getAuthenticationToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        return this.http.post(requestAddres, { user: id, authCode: code,organizationName:this.config.organizationName, uuid: uuid }, { headers: headers })
            .map(this.extractData);
    }

    private extractData(res: Response): string {
        return res.text() || "";
    }

    public tokenStatus(token): Observable<number>{
        let requestAddres = this.config.usmoServer + this.config.verifyAuthenticationToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        return this.http.post(requestAddres, {token:token }, { headers: headers })
            .map((response)=>{return response.status});
    }

    public sendAuthCodeSMS(patientId: string, languageId:string):Observable<Response>{
       let requestAddres = this.config.usmoServer + this.config.sendAuthCodeSMS;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let criteria = {patientId:patientId,organizationName:this.config.organizationName,language:languageId};

        return this.http.post(requestAddres, criteria, { headers: headers });
            //.map((response:Response)=>{return response.text()}); 
    }
    
}