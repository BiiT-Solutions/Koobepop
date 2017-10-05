import { async, TestBed, getTestBed } from '@angular/core/testing';
import { BasicRestService } from './basic-rest-service';
import { UserProvider } from '../storage/user-provider';
import { UserProviderMock, TokenProviderMock } from '../../../test-config/mocks-ionic';
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/token-provider';
import { Headers } from '@angular/http';
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
describe('Service: BasicRestService', () => {
  var service: BasicRestService;
  var backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BasicRestService,
        MockBackend,
        BaseRequestOptions,
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: TokenProvider, useClass: TokenProviderMock },
        { provide: APP_CONFIG, useValue: AppConfig },
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
    service = testbed.get(BasicRestService);
    backend = testbed.get(MockBackend);
    setupConnections(backend);
  }));

  function setupConnections(backend: MockBackend) {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = { body: "Whatever", status: 200 };
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  it('should be created', () => {
    expect(service instanceof BasicRestService).toBe(true);
  })

  it('should request with token', () => {
    service.request('/', {}, new Headers())
      .subscribe(res => expect(res.status).toBe(200))
  })

  it('should request without token', () => {
    service.requestWithoutToken('/', {}, new Headers())
      .subscribe(res => expect(res.status).toBe(200))
  })

});
