import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { CompleteTask } from '../../../models/complete-task';
import { USMOTask } from '../../../models/usmo-task';
import { TasksRestService } from '../../rest/tasks-rest-service/tasks-rest-service';
import { AppointmentsProvider } from '../appointments-provider/appointments-provider';
import { StorageServiceProvider } from '../storage-service/storage-service';

@Injectable()
export class TasksProvider extends StorageServiceProvider {
  private tasks: USMOTask[];
  private bsTasks: BehaviorSubject<USMOTask[]>

  constructor(
    public storage: Storage,
    protected appointmentsProvider: AppointmentsProvider,
    protected tasksRestService: TasksRestService
  ) {
    super(storage);
    this.bsTasks = new BehaviorSubject<USMOTask[]>(undefined)
  }

  public getTasks(): Observable<USMOTask[]> {
    if (this.getAllocTasks() == undefined) {
      return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
        .map((tasks) => this.deserializeTasks(tasks)) //Convert to USMOTask[]
        .map((tasks) => this.setAllocTasks(tasks));   //Save locally
    } else {
      return Observable.of(this.getAllocTasks());
    }
  }

  public setTasks(tasks: USMOTask[]): Observable<USMOTask[]> {
    this.setAllocTasks(tasks);
    return this.save();
  }

  private save(): Observable<USMOTask[]> {
    const tasks = this.getAllocTasks();
    const serializedTasks = this.serializeTasks(tasks);
    return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks)
  }

  public getTask(name: string): USMOTask {
    let tasks = this.getCurrentTaks()
    const index = tasks.map(task => task.name).indexOf(name);
    return index >= 0 ? tasks[index] : null
  }

  public setScore(name: string, score: number, performedTime: number, filledTime: number): USMOTask {
    const completeTask: CompleteTask = new CompleteTask(performedTime, filledTime, score);
    let tasks = this.getCurrentTaks()
    const index = tasks.map(task => task.name).indexOf(name);
    let task = index >= 0 ? tasks[index] : null
    if (task) {
      task.setScore(completeTask)
      this.tasksRestService.sendPerformedTask(name, score, performedTime, filledTime)
        .subscribe(() => this.saveTasks(tasks).subscribe(),
          e => { console.error('Unable to set score for task ' + name) });
    }
    return task;
  }

  public removeScore(name: string, date: number): USMOTask {
    console.log("remove task", name)
    let tasks = this.getCurrentTaks()
    const index = tasks.map(task => task.name).indexOf(name);
    let task = index >= 0 ? tasks[index] : null
    console.log(" task",task)
    if (task) {
      task.removeScore(date)
      console.log("task with removed",task)
      this.tasksRestService.removePerformedTask(name, date)
        .subscribe(() => this.saveTasks(tasks).subscribe(),
          e => { console.error('Unable to remove score for task ' + name) });
    }
    return task;
  }

  private getAllocTasks(): USMOTask[] {
    return this.tasks;
  }

  private setAllocTasks(tasks: USMOTask[]): USMOTask[] {
    this.tasks = tasks == undefined ? [] : tasks;
    return this.tasks;
  }

  /**We serialize and deserialize because the map object won't be stored properly if we don't do it */
  private deserializeTasks(tasks: any[]) {
    const deserializedTasks: USMOTask[] = [];
    if (tasks != undefined) {
      tasks.forEach(task => {
        const newTask = new USMOTask(
          task.name,
          task.startTime,
          task.finishTime,
          task.repetitions,
          task.type,
          USMOTask.parseStringifiedPerformedTasks(task.performedOn),
          task.videoUrl,
          task.content,
        );
        deserializedTasks.push(newTask);
      });
    }
    return deserializedTasks;
  }

  private serializeTasks(tasks: USMOTask[]) {
    const tasksList = []
    tasks.forEach(task => {
      const serializableTask = {
        name: task.name,
        startTime: task.startTime,
        finishTime: task.finishTime,
        repetitions: task.repetitions,
        performedOn: USMOTask.stringifyPerformedTasks(task.performedOn),
        videoUrl: task.videoUrl,
        content: task.content,
        type: task.type
      }
      tasksList.push(serializableTask);
    });
    return tasksList;
  }
  get allTasks() {
    return this.tasks;
  }

  /** */
  getObservableTasks() {
    return this.bsTasks;
  }

  getCurrentTaks() {
    return this.bsTasks.getValue();
  }

  saveTasks(tasks): Observable<USMOTask[]> {
    this.bsTasks.next(tasks);
    const serializedTasks = this.serializeTasks(tasks);
    return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks)
  }

  loadTasks() {
    return this.tasksRestService.requestTasks()
      .flatMap((finalTasks) => {
        return this.saveTasks(finalTasks)
      })
      .catch(e => {
        console.log('Error getting tasks')
        return this.getTasks()
          .flatMap(tasks => {
            return this.saveTasks(tasks)
          }).catch(e => {
            console.log('Error no saved tasks interno')
            return this.saveTasks([])
          });
      })
      .catch(e => {
        console.log('Error no saved tasks')
        return this.saveTasks([])
      })
  }

  getSavedTasks() {
    return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
      .map((tasks) => this.deserializeTasks(tasks)) //Convert to USMOTask[]
      .map((tasks) => this.setAllocTasks(tasks));   //Save locally

  }

  getTaskInfo(task){
    return this.tasksRestService.getTaskInfo(task);
  }
}
