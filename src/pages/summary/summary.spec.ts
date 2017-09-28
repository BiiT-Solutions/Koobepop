import { async, TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ServicesManager } from '../../providers/servicesManager';
import { ConnectivityService } from '..7../providers/connectivity-service';
import { ToastIssuer } from '../../providers/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider';
import { SummaryPage } from './summary';
import { DomSanitizer } from '@angular/platform-browser';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ServicesManagerMock,
  ConnectivityServiceMock,
  ToastIssuerMock,
  NavMock,
  UserProvMock,
  DomSanitizerMock
} from '../../../test-config/mocks-ionic';

describe('SummaryPage', () => {
  let fixture;
  let component: SummaryPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryPage],
      imports: [
        IonicModule.forRoot(SummaryPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: ServicesManager, useClass: ServicesManagerMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: DomSanitizer, useClass: DomSanitizerMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof SummaryPage).toBe(true);
  });

});
