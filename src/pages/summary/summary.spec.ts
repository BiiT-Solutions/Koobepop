import { async, TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';
import { SummaryPage } from './summary';
import { DomSanitizer } from '@angular/platform-browser';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ConnectivityServiceMock,
  ToastIssuerMock,
  NavMock,
  UserProvMock,
  DomSanitizerMock
} from '../../../test-config/mocks-ionic';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { TasksProviderMock, UserProviderMock } from '../../../test-config/mocks-ionic';

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
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: DomSanitizer, useClass: DomSanitizerMock },
        { provide: TasksProvider, useClass: TasksProviderMock },
        { provide: UserProvider, useClass: UserProviderMock },
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
