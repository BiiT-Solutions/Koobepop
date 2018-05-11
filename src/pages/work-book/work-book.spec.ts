import { async, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { WorkBookPage } from './work-book';
import { TasksSlideComponent } from '../../components/tasks-slide/tasks-slide';
import { TaskItemComponent } from '../../components/task-item/task-item';
import { LoadingComponent } from '../../components/loading/loading';
import { KppCheckBoxComponent } from '../../components/kpp-check-box/kpp-check-box';

import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { NavMock, TasksProviderMock } from '../../../test-config/mocks-ionic';

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
        { provide: NavController, useClass: NavMock },
        {provide:TasksProvider, useClass: TasksProviderMock}
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
