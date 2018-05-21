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

  public loadTasks(): Observable<USMOTask[]> {
    return this.tasksRestService.requestTasks()
      .flatMap((requestedTasks) => {
        //Check if the tasks have already been loaded and the information is been downloaded
        return this.getSavedTasks().flatMap(savedTasks => {
          for (let savedTask of savedTasks) {
            for (let requestedTask of requestedTasks) {
              if (savedTask.name == requestedTask.name) {
                requestedTask.content = savedTask.content
                requestedTask.videoUrl = savedTask.videoUrl
              }
            }
          }
          return this.saveTasks(requestedTasks)
        });
      })
      .catch(e => {
        console.log('Error getting tasks')
        return this.getSavedTasks()
          .catch(e => {
            console.log('Error: there are no saved tasks ')
            return this.saveTasks([])
          });
      })
      .catch(e => {
        console.log('Error: there are no saved tasks')
        return this.saveTasks([])
      })
  }

  public getSavedTasks(): Observable<USMOTask[]> {
    return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
      .map((tasks) => this.deserializeTasks(tasks)) //Convert to USMOTask[]
      .map((tasks) => {
        this.bsTasks.next(tasks)
        return this.getCurrentTaks();
      });   //Save locally
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
    let tasks = this.getCurrentTaks()
    const index = tasks.map(task => task.name).indexOf(name);
    let task = index >= 0 ? tasks[index] : null
    if (task) {
      task.removeScore(date)
      this.tasksRestService.removePerformedTask(name, date)
        .subscribe(() => this.saveTasks(tasks).subscribe(),
          e => { console.error('Unable to remove score for task ' + name) });
    }
    return task;
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

  getObservableTasks() {
    return this.bsTasks;
  }

  getCurrentTaks() {
    return this.bsTasks.getValue();
  }

  setTasks(tasks) {
    this.bsTasks.next(tasks);
  }

  saveTasks(tasks): Observable<USMOTask[]> {
    this.setTasks(tasks);
    const serializedTasks = this.serializeTasks(tasks);
    return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks)
  }

  getTaskInfo(task): Observable<USMOTask> {
    // Search in DB
    return this.getSavedTasks()
      .flatMap(tasks => {
        let savedTask = tasks.find(savedTask => savedTask.name == task.name)
        if (savedTask && savedTask.content && savedTask.content.length > 0) {
          return Observable.of(savedTask);
        } else {
          return this.tasksRestService.getTaskInfo(task)
            .map(task => {
              this.saveTask(task)
                .subscribe(tasks => console.log("task saved"));
              return task
            });
        }
      });
  }

  saveTask(task: USMOTask): Observable<USMOTask[]> {
    let tasks = this.getCurrentTaks();
    if (tasks != undefined && tasks.length > 0) {
      let savedTaskIndex = tasks.findIndex((currentTask) => currentTask.name == task.name)
      if (savedTaskIndex >= 0) {
        tasks[savedTaskIndex] = task;
        return this.saveTasks(tasks)
      }
    } else {
      return this.getSavedTasks()
        .flatMap((tasks) => {
          let savedTaskIndex = tasks.findIndex((currentTask) => currentTask.name == task.name)
          if (savedTaskIndex >= 0) {
            tasks[savedTaskIndex] = task;
            return this.saveTasks(tasks)
          } else {
            tasks.push(task)
            return this.saveTasks(tasks)
          }
        });
    }
  }

}
