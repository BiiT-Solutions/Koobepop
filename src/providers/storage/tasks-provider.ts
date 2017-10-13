import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storage-service';
import { Storage } from '@ionic/storage';
import { USMOTask } from '../../models/usmo-task';
import { Observable } from 'rxjs/Rx';
import { TaskModel } from '../../models/task.model';
import { AppointmentsProvider } from './appointments-provider';
import { AppointmentModel } from '../../models/appointment.model';
import { TasksRestService } from '../rest/tasks-rest-service';
import { CompleteTask } from '../../models/complete-task';

@Injectable()
export class TasksProvider extends StorageServiceProvider {
  private tasks: USMOTask[];

  constructor(
    public storage: Storage,
    protected appointmentsProvider: AppointmentsProvider,
    protected tasksRestService: TasksRestService
  ) {
    super(storage);
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

  private save(): Observable<USMOTask[]>{
    const tasks = this.getAllocTasks();
    const serializedTasks = this.serializeTasks(tasks);
    return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks)
  }

  public getTask(name: string): Observable<USMOTask> {
    return this.getTasks().map(tasks => {
      const index = tasks.map(task => task.name).indexOf(name);
      return index >= 0 ? tasks[index] : null
    });
  }

  public setScore(name: string, score: number, performedTime: number, filledTime: number): Observable<USMOTask> {
    const completeTask: CompleteTask = new CompleteTask(performedTime, filledTime, score);
    console.log("Set task:",name)
    return this.getTask(name)
      .map(task => {
        task.setScore(completeTask)
        this.save().subscribe(tasks=>console.log("Saved Tasks:",tasks))
        return task;
      });
  }

  public removeScore(name: string, date: number): Observable<USMOTask> {
    console.log("Remove task", name, date)
    return this.getTask(name)
      .map(task => {
        task.removeScore(date);
        this.save().subscribe(tasks=>console.log("Saved Tasks:",tasks));
        return task;
      });
  }

  public update(): Observable<USMOTask[]> {
    return this.appointmentsProvider.getLastAppointmentsByType()
      .flatMap((lastAppointments: AppointmentModel[]) => {
        return this.getTasks().flatMap((actualTasks: USMOTask[]) => {
          const updatedAppointments: AppointmentModel[] = [];
          const updatedTasks: USMOTask[] = [];

          actualTasks.forEach((task: USMOTask) => {
            const index = lastAppointments.map(appointment => appointment.appointmentId).indexOf(task.appointmentId);
            if (index >= 0) {
              if (task.updateTime >= lastAppointments[index].updateTime) {
                updatedTasks.push(task);
                if (updatedAppointments.map(appointment => appointment.appointmentId).indexOf(task.appointmentId) < 0) {
                  updatedAppointments.push(lastAppointments[index]);
                }
              }
            }

          });

          updatedAppointments.forEach(updatedAppointment => {
            const index = lastAppointments.map(appointment => appointment.appointmentId).indexOf(updatedAppointment.appointmentId);
            if (index >= 0) {
              lastAppointments.splice(index);
            }
          });

          //getAppoinmentsNotUpdated()

          return Observable.combineLatest(
            lastAppointments.map((appointment: AppointmentModel) => {
              return this.tasksRestService.requestTasks(appointment)
            })).take(1).flatMap((tasksMat: USMOTask[][]) => {
              let finalTasks: USMOTask[] = [];
              if (updatedTasks != undefined) {
                finalTasks = finalTasks.concat(updatedTasks)
              }
              tasksMat.forEach((tasks: USMOTask[]) => { finalTasks = finalTasks.concat(tasks) })
              return this.setTasks(finalTasks);
            });
        });
      });
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
          task.appointmentId,
          USMOTask.parseStringifiedPerformedTasks(task.performedOn),
          task.videoUrl,
          task.content,
        );
        newTask.updateTime = task.updateTime;
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
        type: task.type,
        appointmentId: task.appointmentId,
        updateTime: task.updateTime
      }
      tasksList.push(serializableTask);
    });
    return tasksList;
  }
}
