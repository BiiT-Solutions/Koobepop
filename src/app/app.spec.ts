import { async, TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { ServicesManager } from '../providers/servicesManager';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ServicesManagerMock,
  ConnectivityServiceMock,
  ToastIssuerMock
} from '../../test-config/mocks-ionic';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: LoadingController, useClass: LoadingControllerMock },
        { provide: ServicesManager, useClass: ServicesManagerMock },
        { provide: ConnectivityService, useClass: ConnectivityServiceMock },
        { provide: ToastIssuer, useClass: ToastIssuerMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should initialize with a root page of HomePage', () => {
    expect(component['rootPage']).toBe(HomePage);
  });
});
