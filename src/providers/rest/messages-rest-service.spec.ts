import { async, TestBed, getTestBed } from '@angular/core/testing';
import { UserProvider } from '../storage/user-provider';
import { UserProviderMock, TokenProviderMock, TranslateServiceMock } from '../../../test-config/mocks-ionic';
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/token-provider';
import { Headers } from '@angular/http';
import { MessagesRestService } from './messages-rest-service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
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
  var service: MessagesRestService;
  var backend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MessagesRestService,
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
    service = testbed.get(MessagesRestService);
    backend = testbed.get(MockBackend);
    setupConnections(backend);
  }));

  const DOCTOR_NAME = "Fernando"
  const MESSAGE_TEXT = ""
  const TIME = 10;
  function setupConnections(backend: MockBackend) {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = {
        body: [{
          title: DOCTOR_NAME,
          body: MESSAGE_TEXT,
          time: TIME,
        }],
        status: 200
      };
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  it('should be created', () => {
    expect(service instanceof MessagesRestService).toBe(true);
  });

  it('should request messages from a given date to today', () => {
    service.requestMessages(moment().valueOf())
      .subscribe(messages => {
        expect(messages.length).toEqual(1);
        expect(messages[0].name).toEqual(DOCTOR_NAME);
        expect(messages[0].text).toEqual(MESSAGE_TEXT);
        expect(messages[0].title).toEqual("");
        expect(messages[0].time).toEqual(TIME);

      });
  });
});
