import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IAppointment } from '../models/appointmentI';
import { IUser } from '../models/userI';
import { ITask } from '../models/taskI';
import { IToken } from '../models/tokenI';
import { IPerformance } from '../models/performation';
@Injectable()
export class StorageService {

  constructor(public storage: Storage) { }


  public getAppointments(): Promise<IAppointment[]> {
    return this.storage.get("appointments");//localForage.getItem<IAppointment[]>("appointments");
  }
  public setAppointments(appointments: IAppointment[]): Promise<IAppointment[]> {
    return this.storage.set("appointments", appointments);
  }

  public getTasks(): Promise<ITask[]> {
    return this.storage.get("tasks").then((tasks) => {
      if (tasks!=undefined){
      let deserializedTasks: ITask[] = [];
      tasks.forEach(task => {
        deserializedTasks.push({
          name: task.name,
          startingTime: task.startingTime,
          repetitions: task.repetitions,
          performedOn: new Map<number,IPerformance[]>(JSON.parse(task.performedOn)), // sorted array of performation dates
          videoUrl: task.videoUrl,
          content: task.content
        });
      });
      return deserializedTasks
    }else {
      return undefined
    }
    });
  }

  public setTasks(tasks: ITask[]): Promise<ITask[]> {
    let tasksList = []
    tasks.forEach(task => {
      let serializableTask = {
        name: task.name,
        startingTime: task.startingTime,
        repetitions: task.repetitions,
        performedOn: task.performedOn!=undefined ? JSON.stringify(Array.from(task.performedOn.entries())):"", 
        videoUrl: task.videoUrl,
        content: task.content
      }
      tasksList.push(serializableTask)
    })
    return this.storage.set("tasks", tasksList);
  }


  public getUser(): Promise<IUser> {
    return this.storage.get("user");
  }

  // Use on login
  public setUser(user: IUser): Promise<IUser> {
    return this.storage.set("user", user);
  }

  public getToken(): Promise<IToken> {
    return this.storage.get("token");
  }

  public setToken(token: IToken): Promise<IToken> {
    return this.storage.set("token", token);
  }

  public getActions():Promise<any>{
    return this.storage.get("actions")
  }

  public setActions(actions):Promise<any>{
    return this.storage.set("actions",actions)
  }

  public resetDB() {
    this.storage.clear();
  }
}