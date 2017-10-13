import { async, TestBed, getTestBed } from '@angular/core/testing';
import { AppointmentsProvider } from '../storage/appointments-provider';
import { AppConfig, APP_CONFIG } from '../../app/app.config';
import { TokenProvider } from '../storage/token-provider';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock, StorageMock, TokenProviderMock, UserProviderMock, DeviceMock } from '../../../test-config/mocks-ionic';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../storage/user-provider';
import { AuthTokenRestService } from './authentication-token-rest-service';
import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
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

describe('Service: AuthTokenRestService', () => {
  var service: AuthTokenRestService;
  var backend: MockBackend;
  var tokenProvider;
  var userProvider;

  const DEFAULT_LANG = "en"
  const REGISTERED_USER_ID = "00000000A"
  const NOT_REGISTERED_USER_ID = "11111111B"
  const VALID_CODE = "ASD123"
  const NOT_VALID_CODE = "123ASD"
  const VALID_TOKEN = "VAL1D.70K3N"
  const NOT_VALID_TOKEN = "1NVAL1D.70K3N"

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthTokenRestService,
        MockBackend,
        BaseRequestOptions,
        { provide: UserProvider, useClass: UserProviderMock },
        { provide: TokenProvider, useClass: TokenProviderMock },
        { provide: APP_CONFIG, useValue: AppConfig },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: Device, useClass: DeviceMock },
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
    service = testbed.get(AuthTokenRestService);
    backend = testbed.get(MockBackend);
    tokenProvider = testbed.get(TokenProvider);
    userProvider = testbed.get(UserProvider);
    setupConnections(backend)
  }));


  //This sets up the responses for the rest services calls
  function setupConnections(backend: MockBackend) {
    backend.connections.subscribe((connection: MockConnection) => {
      let options
      const request = connection.request.url.split('/')
      const service = request[request.length-1]
      switch (service) {
        case 'sendAuthCodeSMS':
          options = sendSMS(connection.request.json().patientId)
          break;
        case 'getAuthenticationToken':
          options = getAuthToken(connection.request.json())
          break;
        case 'verifyAuthenticationToken':
          options = verifyToken(connection.request.json().token)
          break;
        default:
          options = { body: { error: 'Unknown resource' }, status: 404 }
      }
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  it('should be created', () => {
    expect(service instanceof AuthTokenRestService).toBe(true);
  })

  it('should request an SMS with a verification code', () => {

    service.requestSendAuthCodeSMS(NOT_REGISTERED_USER_ID, DEFAULT_LANG)
      .subscribe(res => { expect(res.status).not.toBe(200) });

    service.requestSendAuthCodeSMS(REGISTERED_USER_ID, DEFAULT_LANG)
      .subscribe(res => { expect(res.status).toBe(200) });
  })

  it('should request an authentication token', () => {

    service.requestToken(REGISTERED_USER_ID, VALID_CODE)
      .subscribe(token => {
        expect(token).not.toBe('');
        expect(token).toBe(VALID_TOKEN);
      });

    service.requestToken(REGISTERED_USER_ID, NOT_VALID_CODE)
      .subscribe(token => {
        expect(token).not.toBe(VALID_TOKEN);
      });

  });

  it('should check the token status for an invalid token', () => {

    //Set Invalid token
    const getTokenSpy = spyOn(tokenProvider, "getToken").and.callFake(function () {
      return Observable.from([NOT_VALID_TOKEN]);
    });
    service.tokenStatus().subscribe(status => {
      expect(status).not.toBe(200);
    });
  });

  it('should check the token status for a valid token', () => {

    //Set Invalid token
    spyOn(tokenProvider, "getToken").and.callFake(function () {
      return Observable.from([VALID_TOKEN]);
    });
    service.tokenStatus().subscribe(status => {
      expect(status).toBe(200);
    });
  });

  //it('should ', () => {});
  function sendSMS(patientId) {
    if (patientId == REGISTERED_USER_ID) {
      return { body: {}, status: 200 }
    } else {
      return { body: { error: 'Unknown user' }, status: 422 }
    }
  }

  function verifyToken(token) {
    if (token == VALID_TOKEN) {
      return { body: {}, status: 200 }
    } else {
      return { body: { error: 'Unknown token' }, status: 422 }
    }
  }

  function getAuthToken(req) {
    //Registered user
    if (req.authCode == VALID_CODE) {
      return { body: VALID_TOKEN, status: 200 }
    } else {
      return { body: { error: 'User or code incorrect' }, status: 422 }
    }
    //Unknown user
  }
})
