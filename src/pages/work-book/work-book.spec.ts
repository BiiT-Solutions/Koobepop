import { async, TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';
import { WorkBookPage } from './work-book';
import { TasksSlideComponent } from '../../components/tasks-slide/tasks-slide';
import { TaskItemComponent } from '../../components/task-item/task-item';
import { LoadingComponent } from '../../components/loading/loading';
import { KppCheckBoxComponent } from '../../components/kpp-check-box/kpp-check-box';

import {
  PlatformMock,
  StatusBarMock,
  SplashScreenMock,
  TranslateServiceMock,
  LoadingControllerMock,
  ConnectivityServiceMock,
  ToastIssuerMock,
  NavMock,
  UserProvMock
} from '../../../test-config/mocks-ionic';

describe('WorkBookPage', () => {
  let fixture;
  let component:WorkBookPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkBookPage, TasksSlideComponent,TaskItemComponent,LoadingComponent,KppCheckBoxComponent],
      imports: [
        IonicModule.forRoot(WorkBookPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkBookPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof WorkBookPage).toBe(true);
  });

});
