import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { AppointmentsProviderMock, StorageMock, TaskSyncronizationProviderMock, TasksRestServiceMock } from '../../../../test-config/mocks-ionic';
import { CompleteTask } from '../../../models/complete-task';
import { USMOTask } from '../../../models/usmo-task';
import { TasksRestService } from '../../rest/tasks-rest-service/tasks-rest-service';
import { TaskSyncronizationProvider } from '../../task-syncronization/task-syncronization';
import { AppointmentsProvider } from '../appointments-provider/appointments-provider';
import { TasksProvider } from '../tasks-provider/tasks-provider';

describe('Service: TasksProvider', () => {
  let service: TasksProvider;
  let storage: StorageMock;
  const ONE_DAY = 24 * 60 * 60 * 1000;
  // TASK 1
  const TASK_1_COMPARATION_ID = "1"
  const TASK_1_PERFORMED_1 = [new CompleteTask(0, 0, 2)];
  const TASK_1_NAME = "Task 1"
  const TASK_1 = new USMOTask(TASK_1_COMPARATION_ID, TASK_1_NAME, 0, Date.now() + ONE_DAY, 3, 'Physical', TASK_1_PERFORMED_1)
  // TASK 2
  const TASK_2_COMPARATION_ID = "2"
  const TASK_2_PERFORMED_1 = [new CompleteTask(1, 1, 1)];
  const TASK_2_NAME = "Task 2"
  const TASK_2 = new USMOTask(TASK_2_COMPARATION_ID, TASK_2_NAME, 0, Date.now() + ONE_DAY, 3, 'Mental', TASK_2_PERFORMED_1)
  const TASKS_TO_SAVE = [
    TASK_1, TASK_2
  ]

  const TODAY = Date.now()
  const YESTERDAY = Date.now() - ONE_DAY;
  const SCORE_1 = 2;

  let SAVED_TASKS;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksProvider,
        { provide: TasksRestService, useClass: TasksRestServiceMock },
        { provide: AppointmentsProvider, useClass: AppointmentsProviderMock },
        { provide: Storage, useClass: StorageMock },
        { provide: TaskSyncronizationProvider, useClass:TaskSyncronizationProviderMock}
      ]
    })
    const testbed = getTestBed();
    service = testbed.get(TasksProvider)
    storage = testbed.get(Storage)
  }));

  it('should be created', () => {
    expect(service instanceof TasksProvider).toBe(true);
  })

  it('should save all tasks ', (done) => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });

    service.saveTasks(TASKS_TO_SAVE)
    .toPromise()
    .then(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      SAVED_TASKS = savedTasks
      done();
    });
  });

  it('should retrieve all tasks (previously saved)', (done) => {
    spyOn(storage, 'get').and.returnValue(Promise.resolve(SAVED_TASKS));
    service.getSavedTasks()
    .toPromise()
    .then(retrievedTasks => {
      expect(storage.get).toHaveBeenCalled();
      expect(retrievedTasks).toEqual(TASKS_TO_SAVE);
      done();
    });
  });

  it('should retrieve one task from task name', (done) => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });
    service.saveTasks(TASKS_TO_SAVE)
      .toPromise()
      .then(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      let task = service.getTask(TASK_1_NAME)
      expect(task).toEqual(TASK_1)
      done();
    });
  })

  it('should set the score of a task for a given day and then remove it', (done) => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });
    
    service.saveTasks(TASKS_TO_SAVE)
    .toPromise()
    .then(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      let task = service.setScore(TASK_1_COMPARATION_ID, SCORE_1, YESTERDAY, TODAY)
      expect(task.performedOn.length).toBe(2);
      const completion = task.performedOn.find(perf=>perf.performedTime == YESTERDAY)
        expect(completion.filledTime).toEqual(TODAY)
        expect(completion.score).toEqual(SCORE_1)
        let removedTask = service.removeScore(TASK_1_COMPARATION_ID, YESTERDAY)
        expect(task === removedTask).toBeTruthy();
        expect(task.performedOn.length).toBe(1)
        expect(removedTask.performedOn.length).toBe(1)
    done();
    });
  })
});
