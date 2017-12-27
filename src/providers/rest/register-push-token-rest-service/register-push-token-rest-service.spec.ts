import { async, TestBed, getTestBed } from '@angular/core/testing';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { UserProviderMock, TokenProviderMock, TranslateServiceMock } from '../../../../test-config/mocks-ionic';
import { AppConfig, APP_CONFIG } from '../../../app/app.config';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { Headers } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { RegisterPushTokenRestService } from './register-push-token-rest-service';
import {
    BaseRequestOptions,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
describe('Service: RegisterPushTokenRestService', () => {
    var service: RegisterPushTokenRestService;
    var backend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                RegisterPushTokenRestService,
                MockBackend,
                BaseRequestOptions,
                { provide: UserProvider, useClass: UserProviderMock },
                { provide: TokenProvider, useClass: TokenProviderMock },
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: TranslateService, useClass: TranslateServiceMock },
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                }
            ]
        });

        const testbed = getTestBed();
        service = testbed.get(RegisterPushTokenRestService);
        backend = testbed.get(MockBackend);
        setupConnections(backend);
    }));
    const DUMMY_TOKEN = "token"

    const RESPONSE = {body:"Token registration successful"}

    function setupConnections(backend: MockBackend) {
        backend.connections.subscribe((connection: MockConnection) => {
            const options = {
                body: RESPONSE,
                status: 200
            };
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);
        });
    }

    it('should be created', () => {
        expect(service instanceof RegisterPushTokenRestService).toBe(true);
    });

    it('should set the push notifications token', () => {
        service.setPushToken(DUMMY_TOKEN)
            .subscribe(response => {
               expect(response).toEqual(RESPONSE);
            });
    });
});
