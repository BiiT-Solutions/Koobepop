import { Injectable, Inject } from '@angular/core';
import { Device } from 'ionic-native';
import { Http, Response, Headers } from '@angular/http';
import { IAppConfig, APP_CONFIG } from '../app/app.config';
import { IToken } from '../models/tokenI';
@Injectable()
export class AuthTokenService {
    token: IToken;
    constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) { }
    public requestToken(id: string, code: string) {
        //Here we request the token to the server with the sms code, the id and the uuid
        let uuid = this.getUuid();
        let requestAddres = this.config.usmoServer + this.config.getAuthenticationToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        this.http.post(requestAddres, { user: id, authCode: code, uuid: uuid }, { headers: headers })
            .map(this.extractData)
            .subscribe((token: string) => this.token = this.parseToToken(token));
    }

    private getUuid() {
        return Device.uuid == undefined ? "There's no uuid on this device" : Device.uuid;
    }

    public getToken(): string {
        let realToken: string = this.parseToString(this.token);
        return realToken;
    }

    private extractData(res: Response): string {
        console.log(res.text());
        return res.text() || "";
    }

    private parseToToken(token: string): IToken {
        let splitToken: string[] = token.split(".");
        let payload = JSON.parse(atob(splitToken[1]));
        let finalToken: IToken = {
            head: splitToken[0],
            payload: {
                user: payload.user,
                exp: payload.exp
            },
            signature: splitToken[2]
        };
        return finalToken;
    }

    private parseToString(token: IToken): string {
        // Beware of dragons!!

        let payload = btoa('{"user":"' + token.payload.user + '","uuid":"' + this.getUuid() + '","exp":' + token.payload.exp + '}');
        // In case there's a necessary padding we remove it from the base64 encoded string
        // Info: http://stackoverflow.com/questions/6916805/why-does-a-base64-encoded-string-have-an-sign-at-the-end
        if (payload.endsWith("==")) payload = payload.slice(0, payload.length - 2);
        if (payload.endsWith("=")) payload = payload.slice(0, payload.length - 1);
        let realToken = token.head + "." + payload + "." + token.signature;
        console.log(realToken);
        return realToken;
    }
}