import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Device } from '@ionic-native/device';
import { StorageService } from './storageService';
import { IToken } from '../models/tokenI';

@Injectable()
export class AuthTokenProvider {
    constructor(protected storageService: StorageService,
        protected device: Device) {}

    public getToken(): Observable<string> {
        return Observable.fromPromise(this.storageService.getToken())//TODO - remove fromPromise
            .flatMap((token: IToken) => {
                return this.tokenToString(token);
            });
    }

    private tokenToString(token: IToken): Observable<string> {
        // Beware of dragons!!
        return Observable.from(this.storageService.getUser())
            .map(user => {
                let payload: string = btoa('{"user":"' + user.patientId + '","uuid":"' + this.getUuid() + '","exp":' + token.payload.exp + '}');
                // In case there's a necessary padding we remove it from the base64 encoded string 
                // Info: http://stackoverflow.com/questions/6916805/why-does-a-base64-encoded-string-have-an-sign-at-the-end
                //If we don't do this, the signature won't match the data.
                let suffix: string = "==";
                if (payload.indexOf(suffix, payload.length - suffix.length) >= 0) { payload = payload.slice(0, payload.length - 2); }
                suffix = "=";
                if (payload.indexOf(suffix, payload.length - suffix.length) >= 0) { payload = payload.slice(0, payload.length - 1); }
                let realToken = token.head + "." + payload + "." + token.signature;
                return realToken;
            })
    }

    private getUuid() {
        return this.device.uuid == undefined ? "This device has no uuid" : this.device.uuid;
    }
}