import { async, TestBed, getTestBed } from '@angular/core/testing';
import { LoginPage } from './login';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ToastIssuer } from '../../providers/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service';
import { AuthTokenRestServiceMock, TokenProviderMock } from '../../../test-config/mocks-ionic';
import { TokenProvider } from '../../providers/storage/token-provider';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ToastIssuerMock,
  NavMock,
  UserProvMock
} from '../../../test-config/mocks-ionic';

describe('LoginPage', () => {
  let fixture;
  let component:LoginPage;

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
