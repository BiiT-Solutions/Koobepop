import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { USMOTask } from '../../models/usmo-task';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TasksProvider extends StorageServiceProvider {
  private tasks: USMOTask[];
  constructor(public storage: Storage) {
    super(storage);
  }

  public getTasks(): Observable<USMOTask[]> {
    if (this.getAllocTasks() == undefined) {
      return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
        .map(this.deserializeTasks) //Convert to ITask[]
        .map(this.setAllocTasks);   //Save locally
    } else {
      return Observable.of(this.getAllocTasks());
    }
  }
  public getTask(name: string): Observable<USMOTask> {
    return this.getTasks().map(tasks => {
      const index = tasks.map(task => task.name).indexOf(name);
      return index >= 0 ? tasks[index] : null
    });
  }

  public setTasks(tasks: USMOTask[]): Observable<USMOTask[]> {
    this.setAllocTasks(tasks);
    const serializedTasks = this.serializeTasks(tasks);
    return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks);
  }

  private getAllocTasks(): USMOTask[] {
    return this.tasks;
  }

  private setAllocTasks(tasks: USMOTask[]) {
    this.tasks = tasks == undefined ? [] : tasks;
    return this.tasks;
  }

  /**We serialize and deserialize because the map object won't be stored properly if we don't do it */
  private deserializeTasks(tasks: any[]) {
    const deserializedTasks: USMOTask[] = [];
    if (tasks != undefined) {
      tasks.forEach(task => {
        deserializedTasks.push(
          new USMOTask(
            task.name,
            task.startTime,
            task.finishTime,
            task.repetitions,
            task.type,
            task.appointmentId,
            USMOTask.parseStringifiedMap(task.performedOn), // sorted array of performation dates
            task.videoUrl,
            task.content,
          ));
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
        performedOn: USMOTask.stringifyMap(task.performedOn),
        videoUrl: task.videoUrl,
        content: task.content,
        type: task.type,
        appointmentId: task.appointmentId
      }
      tasksList.push(serializableTask);
    });
    return tasksList;
  }
}
