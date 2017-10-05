import { async, TestBed, getTestBed } from '@angular/core/testing';
import { AppointmentsRestService } from './appointments-rest-service';
import { AppointmentsProvider } from '../storage/appointments-provider';
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/token-provider';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock, StorageMock, TokenProviderMock, UserProviderMock } from '../../../test-config/mocks-ionic';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../storage/user-provider';
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

describe('Service: AppointmentsRestService', () => {
  var service: AppointmentsRestService;
  var backend: MockBackend;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentsRestService,
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
    })
    const testbed = getTestBed();
    service = testbed.get(AppointmentsRestService);
    backend = testbed.get(MockBackend);
  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {

      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);

    });
  }

  it('should be created', () => {
    expect(service instanceof AppointmentsRestService).toBe(true);
  })

  it('should request the updated apointments ', () => {
    const actualAppointments = [];
    service.requestModifiedAppointments(actualAppointments)
      .subscribe(appointments => { })

  })
})
