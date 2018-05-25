import { TestBed, async, getTestBed } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { AppointmentsProviderMock, StorageMock, TaskSyncronizationProviderMock, TasksRestServiceMock } from '../../../../test-config/mocks-ionic';
import { CompleteTask } from '../../../models/complete-task';
import { USMOTask } from '../../../models/usmo-task';
import { TasksRestService } from '../../rest/tasks-rest-service/tasks-rest-service';
import { TaskSyncronizationProvider } from '../../task-syncronization/task-syncronization';
import { AppointmentsProvider } from '../appointments-provider/appointments-provider';
import { TasksProvider } from '../tasks-provider/tasks-provider';
//TODO Test this component
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

  it('should save all tasks ', () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });

    service.saveTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      SAVED_TASKS = savedTasks
    });
  });

  it('should retrieve all tasks (previously saved)', () => {
    spyOn(storage, 'get').and.returnValue(Promise.resolve(SAVED_TASKS));
    service.getSavedTasks().subscribe(retrievedTasks => {
      expect(storage.get).toHaveBeenCalled();
      expect(retrievedTasks).toEqual(TASKS_TO_SAVE)
    });
  });

  it('should retrieve one task from task name', () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });
    service.saveTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      let task = service.getTask(TASK_1_NAME)
      expect(task).toEqual(TASK_1)
    });
  })

  it('should set the score of a task for a given day and then remove it //TODO Fix');/*, () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });

    service.saveTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      let task = service.setScore(TASK_1_NAME, SCORE_1, YESTERDAY, TODAY)
      expect(task.performedOn.length).toBe(2);
      const indexOfCompletion = task.performedOn.get(moment(YESTERDAY).startOf('isoWeek').valueOf())
        .map(completed => completed.filledTime).indexOf(TODAY)
        const completion = task.performedOn.get(moment(YESTERDAY).startOf('isoWeek').valueOf())[indexOfCompletion]
        expect(completion.performedTime).toEqual(YESTERDAY)
        expect(completion.score).toEqual(SCORE_1)
        let removedTask = service.removeScore(TASK_1_NAME, YESTERDAY)
        expect(task === removedTask).toBeTruthy();
        expect(task.performedOn.size).toBe(1)
        expect(removedTask.performedOn.size).toBe(1)
    });
  })*/

  it('should update the actual tasks //TODO')
});
