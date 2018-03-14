import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import {   TranslateModule } from '@ngx-translate/core';
import { TaskInformationPage } from './task-information';

import {
  NavMock,
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
