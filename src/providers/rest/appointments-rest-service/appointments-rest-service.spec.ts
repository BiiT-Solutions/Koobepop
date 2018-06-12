import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TranslateService } from '@ngx-translate/core';
import { SettingsProviderMock, TokenProviderMock, TranslateServiceMock, UserProviderMock } from '../../../../test-config/mocks-ionic';
import { AppConfig, APP_CONFIG } from '../../../app/app.config';
import { SettingsProvider } from '../../storage/settings/settings';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { AppointmentsRestService } from '../appointments-rest-service/appointments-rest-service';



describe('Service: AppointmentsRestService', () => {
  var service: AppointmentsRestService;
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
        { provide: SettingsProvider, useClass:SettingsProviderMock},
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
  }));



  it('should be created', () => {
    expect(service instanceof AppointmentsRestService).toBe(true);
  })

  it('should request the updated apointments ', (done) => {
    const actualAppointments = [];
    service.requestModifiedAppointments(actualAppointments)
    .toPromise()
    .then(appointments => { 
      done();
    })
  })
})
