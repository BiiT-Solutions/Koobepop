import { async, TestBed, getTestBed } from '@angular/core/testing';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { UserProviderMock, TokenProviderMock, TranslateServiceMock, InfographicJSMock } from '../../../../test-config/mocks-ionic';
import { AppConfig, APP_CONFIG } from '../../../app/app.config';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { TranslateService } from '@ngx-translate/core';
import { ReportsRestService } from './reports-rest-service';
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
import { AppointmentModel } from '../../../models/appointment.model';
import * as infographicjs from 'infographic-js';

describe('Service: ReportsRestService', () => {
    var service: ReportsRestService;
    var backend: MockBackend;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ReportsRestService,
                MockBackend,
                BaseRequestOptions,
                { provide: UserProvider, useClass: UserProviderMock },
                { provide: TokenProvider, useClass: TokenProviderMock },
                { provide: APP_CONFIG, useValue: AppConfig },
                { provide: TranslateService, useClass: TranslateServiceMock },
                { provide: infographicjs, useClass:InfographicJSMock},
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
        service = testbed.get(ReportsRestService);
        backend = testbed.get(MockBackend);
        setupConnections(backend);
    }));
    const APPOINTMENT = new AppointmentModel();
    APPOINTMENT.appointmentId=1;

    const RESPONSE = [
        {"template":"T","content":"c"}
    ]

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
        expect(service instanceof ReportsRestService).toBe(true);
    });

    /*it('should request reports for an appointment', () => {
       
        service.requestReports(APPOINTMENT)
            .subscribe((report:ReportModel) => {
                console.log(report);
                expect(report.getInfographics()).toEqual(["<svg></svg>"]);
            });
    });*/
});
