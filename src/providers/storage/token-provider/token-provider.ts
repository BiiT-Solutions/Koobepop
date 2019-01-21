import { Injectable } from '@angular/core';
import { StorageServiceProvider } from '../storage-service/storage-service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { IToken } from '../../../models/tokenI';
import { Device } from '@ionic-native/device';
import { UserProvider } from '../user-provider/user-provider';


@Injectable()
export class TokenProvider extends StorageServiceProvider {
    private token: string;
    constructor(public storage: Storage, protected device: Device,public userProvider:UserProvider) {
        super(storage);
    }

    public getToken(): Observable<string> {
        if (this.getAllocToken() == undefined) {
            return super.retrieveItem(StorageServiceProvider.TOKEN_STORAGE_ID)
                .flatMap(token=>{return this.tokenToString(token)})
                .map(token=>this.setAllocToken(token));
        } else {
            return Observable.of(this.getAllocToken());
        }
    }

    public setToken(token: string) {
        this.setAllocToken(token);
        return super.storeItem(StorageServiceProvider.TOKEN_STORAGE_ID,this.stringToToken(token))

    }

    private getAllocToken(): string {
        return this.token;
    }

    private setAllocToken(token: string): string {
        this.token = token;
        return this.token
    }

    private tokenToString(token: IToken): Observable<string> {
        return this.userProvider.retrieveItem(StorageServiceProvider.USER_STORAGE_ID)
            .map(user => {
                if(user){
                let payload: string =
                    btoa('{"patientId":"' + user.patientId +'"'
                        + ',"uuid":"' + this.getUuid() +'"'
                        + ',"exp":' + token.payload.exp + '}');
                // In case there's a necessary padding we remove it from the base64 encoded string
                // Info: http://stackoverflow.com/questions/6916805/why-does-a-base64-encoded-string-have-an-sign-at-the-end
                //If we don't do this, the signature won't match the data.
                let suffix: string = "==";
                if (payload.indexOf(suffix, payload.length - suffix.length) >= 0) { payload = payload.slice(0, payload.length - 2); }
                suffix = "=";
                if (payload.indexOf(suffix, payload.length - suffix.length) >= 0) { payload = payload.slice(0, payload.length - 1); }
                const realToken = token.head + "." + payload + "." + token.signature;

                return realToken;
                }
                return null
            })
    }

    private stringToToken(token: string): IToken {
      const splitToken: string[] = token.split(".");
      const payload = JSON.parse(atob(splitToken[1]));
        //Here we lose some information of the token which will be gathered later when we rebuild it
      const finalToken: IToken = {
            head: splitToken[0],
            payload: {
                exp: payload.exp
            },
            signature: splitToken[2]
        };
        return finalToken;
    }

    private getUuid() {
        return this.device.uuid == undefined ? "This device has no uuid" : this.device.uuid;
    }
}
