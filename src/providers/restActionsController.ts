import { Injectable } from '@angular/core';
import { IAppointment } from '../models/appointmentI';
import { ITask } from '../models/taskI';

@Injectable()
export class RestActionsController {
    actions: Action[] = [];
    constructor() {
        //load Actions from DB

     }
    
    public addAction(action: Action){
        this.actions.push(action);
    }

    public removeActionIfExists(action: Action):boolean{
        let index = this.actions.indexOf(action)
        if (index>-1) {
            this.actions.splice(index,1);
            return true;
        }
        return false;
    }
    

    /* Here we check if there are any changes in USMO database related to this patient */
    public checkStatusChanged(){
        
    }


}

export interface IAction { }

export class Action implements IAction {
    content;
    constructor() { }
    
}

export class PerformTaskAction extends Action {
    constructor(appointment: IAppointment, task: ITask, time: number) {
        super();
        this.content = {
            appointmentId: appointment.appointmentId,
            name: task.name,
            time: time,
            score: task.performedOn.get(time)
        }
    }
}

export class RemovePerformedTaskAction extends Action {
    constructor(appointment: IAppointment, task: ITask, time: number) {
        super();
        this.content = {
            appointmentId: appointment.appointmentId,
            name: task.name,
            time: time,
            score: 0
        }
    }
}
