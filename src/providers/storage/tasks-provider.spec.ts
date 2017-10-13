import { async, TestBed, getTestBed } from '@angular/core/testing';
import { TasksProvider } from './tasks-provider';
import { AppointmentsProvider } from './appointments-provider';
import { TasksRestService } from '../rest/tasks-rest-service';
import { Storage } from '@ionic/storage';
import { StorageMock, AppointmentsProviderMock, TasksRestServiceMock } from '../../../test-config/mocks-ionic';
import { USMOTask } from '../../models/usmo-task';
import { CompleteTask } from '../../models/complete-task';
import { Observable } from 'rxjs/Rx';
//TODO Test this component
describe('Service: TasksProvider', () => {
  let service: TasksProvider;
  let storage: StorageMock;
  const ONE_DAY = 24 * 60 * 60 * 1000;
  // TASK 1
  const TASK_1_PERFORMED_1 = new Map<number, CompleteTask[]>();
  TASK_1_PERFORMED_1.set(0, [new CompleteTask(0, 0, 2)])
  const TASK_1_NAME = "Task 1"
  const TASK_1 = new USMOTask(TASK_1_NAME, 0, Date.now() + ONE_DAY, 3, 'Physical', 1, TASK_1_PERFORMED_1)
  TASK_1.updateTime = 0;
  // TASK 2
  const TASK_2_PERFORMED_1 = new Map<number, CompleteTask[]>();
  TASK_2_PERFORMED_1.set(0, [new CompleteTask(1, 1, 1)])
  const TASK_2_NAME = "Task 2"
  const TASK_2 = new USMOTask(TASK_2_NAME, 0, Date.now() + ONE_DAY, 3, 'Mental', 1, TASK_2_PERFORMED_1)
  TASK_2.updateTime = 0;
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
        { provide: Storage, useClass: StorageMock }
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

    service.setTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      SAVED_TASKS = savedTasks
    });
  });

  it('should retrieve all tasks (previously saved)', () => {
    spyOn(storage, 'get').and.returnValue(Promise.resolve(SAVED_TASKS));
    service.getTasks().subscribe(retrievedTasks => {
      expect(storage.get).toHaveBeenCalled();
      expect(retrievedTasks).toEqual(TASKS_TO_SAVE)
    });
  });

  it('should retrieve one task from task name', () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });
    service.setTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      service.getTask(TASK_1_NAME)
        .subscribe(task => expect(task).toEqual(TASK_1))
    });
  })

  it('should set the score of a task for a given day and then remove it', () => {
    spyOn(storage, 'set').and.callFake(function (key, value) {
      return Promise.resolve(value);
    });
    service.setTasks(TASKS_TO_SAVE).subscribe(savedTasks => {
      expect(storage.set).toHaveBeenCalled();
      service.setScore(TASK_1_NAME, SCORE_1,YESTERDAY,TODAY)
      .subscribe(task=>{
        expect(task.performedOn.size).toEqual(2)
        const indexOfCompletion = task.performedOn.get(task.performedOn.keys[1])
        .map(completed=>completed.filledTime).indexOf(TODAY)
        const completion = task.performedOn.get(task.performedOn.keys[1])[indexOfCompletion]
        expect(completion.performedTime).toEqual(YESTERDAY)
        expect(completion.score).toEqual(SCORE_1)
        service.removeScore(TASK_1_NAME,YESTERDAY).subscribe(task=>expect(task.performedOn.size).toBe(1));
      });
    });
  })

  it('should update the actual tasks //TODO')
});
