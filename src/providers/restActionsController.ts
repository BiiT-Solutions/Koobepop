import { Injectable } from '@angular/core';
import { IAppointment } from '../models/appointmentI';
import { ITask } from '../models/taskI';
import { StorageService } from './storageService';

@Injectable()
export class RestActionsController {
    actions: Action[] = [];
    constructor(storageService: StorageService) {
        //load Actions from DB
        storageService.getActions().then(actions => {
            actions.forEach((action: Action) => {
                this.addAction(action);
            })
        })
    }

    public addAction(action: Action) {
        //Check if the action is already in the list
        let actionInTheList: number = -1;
        for (let i = 0; i < this.actions.length; i++) {
            let arrayAction = this.actions[i];
            if (arrayAction.content.appointmentId === action.content.appointmentId &&
                arrayAction.content.name === action.content.name &&
                arrayAction.content.time >= action.content.time &&
                new Date(arrayAction.content.time).setHours(0, 0, 0, 0) === new Date(action.content.time).setHours(0, 0, 0, 0)
            ) {
                actionInTheList = i;
            }
        }
        if (actionInTheList > -1) {

            this.actions.splice(actionInTheList, 1);
            this.actions.push(action);
        } else {
            this.actions.push(action);
        }
    }

    public removeActionIfExists(action: Action): boolean {
        let actionInTheList: number = -1;
        for (let i = 0; i < this.actions.length; i++) {
            let arrayAction = this.actions[i];
            if (arrayAction.content.appointmentId === action.content.appointmentId &&
                arrayAction.content.name === action.content.name &&
                arrayAction.content.time === action.content.time) {
                actionInTheList = i;
            }
        }

        if (actionInTheList > -1) {
            this.actions.splice(actionInTheList, 1);
            return true;
        }
        return false;
    }


    /* Here we check if there are any changes in USMO database related to this patient */
    public checkStatusChanged() {

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
