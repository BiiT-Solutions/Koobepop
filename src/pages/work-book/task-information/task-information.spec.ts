import { async, TestBed, getTestBed } from '@angular/core/testing';
import { IonicModule, Platform, LoadingController, NavController, NavParams } from 'ionic-angular';
import { TranslateService, TranslatePipe, TranslateModule } from '@ngx-translate/core';
import { ConnectivityService } from '../../../providers/connectivity-service';
import { DomSanitizer } from '@angular/platform-browser';
import { TaskInformationPage } from './task-information';

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
  NavParamsMock
} from '../../../../test-config/mocks-ionic';

describe('TaskInformationPage', () => {
  let fixture;
  let component:TaskInformationPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInformationPage],
      imports: [
        IonicModule.forRoot(TaskInformationPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock }
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskInformationPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof TaskInformationPage).toBe(true);
  });

});
