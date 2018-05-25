import { TestBed, async } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule, NavController, NavParams } from 'ionic-angular';
import { NavMock, NavParamsMock, TasksProviderMock } from '../../../../test-config/mocks-ionic';
import { LoadingComponent } from '../../../components/loading/loading';
import { TasksProvider } from '../../../providers/storage/tasks-provider/tasks-provider';
import { TaskInformationPage } from './task-information';


describe('TaskInformationPage', () => {
  let fixture;
  let component:TaskInformationPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskInformationPage,LoadingComponent],
      imports: [
        IonicModule.forRoot(TaskInformationPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: NavParams, useClass: NavParamsMock },
        {provide:TasksProvider, useClass: TasksProviderMock}
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
