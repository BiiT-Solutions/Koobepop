import { async, TestBed, getTestBed } from '@angular/core/testing';
import { KnowPage } from './know';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ConnectivityService } from '..7../providers/connectivity-service';
import { ToastIssuer } from '../../providers/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider';
import { ChangeDetectorRef } from '@angular/core';
import { MessagesListComponent } from '../../components/messages-list/messages-list';
import { NotificationMessageComponent } from '../../components/notification-message/notification-message';
import { MessagesProvider } from '../../providers/storage/messages-provider';


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
  ChangeDetectorRefMock,
  MessagesProvMock
} from '../../../test-config/mocks-ionic';

describe('KnowPage', () => {
  let fixture;
  let component: KnowPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KnowPage, MessagesListComponent, NotificationMessageComponent],
      imports: [
        IonicModule.forRoot(KnowPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: MessagesProvider, useClass: MessagesProvMock },
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRefMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof KnowPage).toBe(true);
  });
});
