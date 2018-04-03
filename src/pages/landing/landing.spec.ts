import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { LandingPage } from '../landing/landing';
import { LoadingComponent } from '../../components/loading/loading';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { SettingsProvider } from '../../providers/storage/settings/settings';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ConnectivityServiceMock,
  ToastIssuerMock,
  NavMock,
  AuthTokenRestServiceMock,
  SettingsProviderMock
} from '../../../test-config/mocks-ionic';

describe('LandingPage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LandingPage, LoadingComponent],
      imports: [
        IonicModule.forRoot(LandingPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: AuthTokenRestService, useClass: AuthTokenRestServiceMock },
        { provide: ConnectivityService, useClass: ConnectivityServiceMock },
        { provide: ToastIssuer, useClass: ToastIssuerMock },
        { provide: NavController, useClass: NavMock },
        { provide: SettingsProvider, useClass:SettingsProviderMock}
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof LandingPage).toBe(true);
  });
});
