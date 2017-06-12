import { Injectable, Inject } from '@angular/core';
import { KppRestService } from './kppRestService';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { Http, Headers, Response } from '@angular/http';
import { TokenProvider } from '../storage/tokenProvider';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from '../../models/userI';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class RegisterPushTokenRestService extends KppRestService {
    appointmentsList;
    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: TokenProvider,
        protected translate: TranslateService) {
        super(http, config, tokenProvider);
    }
    public setPushToken(user: IUser, pushNotificationToken: string): Observable<any> {
        let requestAddres = this.config.usmoServer + this.config.setPushNotificationsToken;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let body = {
            patientId: user.patientId,
            pushNotificationToken: pushNotificationToken
        }
        return super.request(requestAddres, body, headers)
            .map((res: Response) => res.json());
        
    }
}