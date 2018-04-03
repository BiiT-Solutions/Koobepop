import { async, TestBed } from '@angular/core/testing';
import { LoginPage } from './login';
import { IonicModule, LoadingController, NavController } from 'ionic-angular';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { AuthTokenRestServiceMock, TokenProviderMock, SettingsProviderMock, ConnectivityServiceMock } from '../../../test-config/mocks-ionic';
import { TokenProvider } from '../../providers/storage/token-provider/token-provider';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';

import {
  TranslateServiceMock,
  LoadingControllerMock,
  ToastIssuerMock,
  NavMock,
  UserProvMock
} from '../../../test-config/mocks-ionic';

describe('LoginPage', () => {
  let fixture;
  let component: LoginPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        IonicModule.forRoot(LoginPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: ToastIssuer, useClass: ToastIssuerMock },
        { provide: NavController, useClass: NavMock },
        { provide: UserProvider, useClass: UserProvMock },
        { provide: AuthTokenRestService, useClass: AuthTokenRestServiceMock },
        { provide: TokenProvider, useClass: TokenProviderMock },
        { provide: SettingsProvider, useClass: SettingsProviderMock },
        { provide: ConnectivityService, useClass: ConnectivityServiceMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof LoginPage).toBe(true);
  });

});
