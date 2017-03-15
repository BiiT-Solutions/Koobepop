import { Injectable } from '@angular/core';
import { IAppointment } from '../models/appointmentI';
import * as localForage from 'localforage';
import { IUser } from '../models/userI';
import { ITask } from '../models/taskI';
@Injectable()
export class StorageService {

  constructor() { }
  

  public getAppointments():Promise<IAppointment[]>{
    localForage.config({});
    return localForage.getItem<IAppointment[]>("appointments");
  }

  public setAppointments(appointments:IAppointment[]):Promise<IAppointment[]>{
    localForage.config({});
    return localForage.setItem("appointments",appointments);
  }


  public getTasks():Promise<ITask[]>{
    localForage.config({});
    return localForage.getItem("tasks");
  }
  public setTasks(tasks: ITask[]):Promise<ITask[]>{
    localForage.config({});
    return localForage.setItem("tasks",tasks);
  }
  
  
  public getUser():Promise<IUser>{
    localForage.config({});
    return localForage.getItem<IUser>("user");
  }
  // Use on login
  public setUser(user:IUser):Promise<IUser>{
     localForage.config({});
    return localForage.setItem("user",user);
  }

}
