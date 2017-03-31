import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IAppointment } from '../models/appointmentI';
import * as localForage from 'localforage';
import { IUser } from '../models/userI';
import { ITask } from '../models/taskI';
import { IToken } from '../models/tokenI';
@Injectable()
export class StorageService {

  constructor(public storage: Storage) { }


  public getAppointments(): Promise<IAppointment[]> {
   // localForage.config({});
   
    return  this.storage.get("appointments");//localForage.getItem<IAppointment[]>("appointments");
  }
  public setAppointments(appointments: IAppointment[]): Promise<IAppointment[]> {
    console.log("Stringified Appointments: "+ JSON.stringify(appointments))
    console.log(JSON.parse(JSON.stringify(appointments)))
    return this.storage.set("appointments", appointments);
  }


  public getTasks(): Promise<ITask[]> {
    return this.storage.get("tasks");
  }
  public setTasks(tasks: ITask[]): Promise<ITask[]> {
    return this.storage.set("tasks", tasks);
  }


  public getUser(): Promise<IUser> {
    return this.storage.get("user");
  }
  // Use on login
  public setUser(user: IUser): Promise<IUser> {
    return this.storage.set("user", user);
  }

  // TODO Type this
  public getResults(): Promise<any> {
    return this.storage.get("results").then((map)=>{return new Map(JSON.parse(map))});
  }
  public setResults(results: Map<number, any[]>): Promise<any> {
     let mapSerialized =JSON.stringify(Array.from(results.entries()));
    return this.storage.set("results", mapSerialized);
  }

  public getToken(): Promise<IToken> {
    return this.storage.get("token");
  }
  public setToken(token: IToken): Promise<IToken> {
    return this.storage.set("token", token);
  }

  public resetDB() {
    this.storage.clear();
  }
}