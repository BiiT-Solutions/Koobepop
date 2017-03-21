import { Injectable } from '@angular/core';
import { IAppointment } from '../models/appointmentI';
import { AppointmentsProvider } from './appointmentsProvider';
import { TasksRestProvider } from './tasksProvider';
import { StorageService } from './storageService';
import { ResultsProvider } from './resultsProvider';
import { ITask } from '../models/taskI';
import { IUser } from '../models/userI';
/**
 * Intended to manage the comunication with usmo and data base access.
 * Will keep the data cached for the application views.
 * Will provide the stored data to the application.
 * Will provide storage services to the application so it saves all the relevant data.
 * All this data loading is async so...
 */
@Injectable()
export class PersistenceManager {
    private appointmentsList: IAppointment[];
    private actualAppointment: IAppointment;
    private actualTasks: ITask[];
    private actualResults: any;
    private user: IUser;


    public constructor(
        private appointmentsProvider: AppointmentsProvider,
        private tasksProvider: TasksRestProvider,
        private storageService: StorageService,
        private resultsProvider: ResultsProvider) {
        this.initFirstPhase()
    }

    public getActualAppointment(): IAppointment { return this.actualAppointment; }
    public setActualAppointment(appointment: IAppointment) { this.actualAppointment = appointment; }
    public getAppointments() { return this.appointmentsList; }
    public setAppointments(appointments: IAppointment[]) { this.appointmentsList = appointments; }
    public getUser() { return this.user; }
    public setUser(user: IUser) { this.user = user; }
    public getActualTasks() { return this.actualTasks; }
    public setActualTasks(tasks: ITask[]) { this.actualTasks = tasks; }

    public performTask(task,time){
        this.tasksProvider.sendPerformedTask(this.actualAppointment,task,time);        
    }
    public removeTask(task,time){
         this.tasksProvider.removePerformedTask(this.actualAppointment,task,time); 
    }
    private initFirstPhase() {
        this.storageService.getUser().then(user => {
            if (user != undefined) {
                this.setUser(user);
                this.storageService.getAppointments().then((appointments: IAppointment[]) => {
                    
                    if (appointments == undefined || appointments.length == 0) {
                        this.appointmentsProvider.requestAppointments(user)
                            .subscribe((appointments: IAppointment[]) => {
                                this.storageService.setAppointments(appointments);
                                this.setAppointments(appointments);
                                this.initSecondPhase(appointments);
                            });
                    } else {
                        this.setAppointments(appointments);
                        this.initSecondPhase(appointments);
                    }
                });
            } else { console.log("User is not defined"); }
        }).catch(e => console.log("Storage error" + e));
    }

    private initSecondPhase(appointments: IAppointment[]) {
        let lastAppointment: IAppointment;
        appointments.forEach(appointment => {
            let resultsMap: Map<number, any[]> = new Map<number, any[]>();
            let resultsBarrier = 0;
            resultsBarrier++;
            this.storageService.getResults().then((results: any[]) => {
                if (results == undefined) {
                    this.resultsProvider.requestResults(appointment)
                        .subscribe((results: any[]) => {
                            resultsMap.set(appointment.appointmentId, results);
                            resultsBarrier--;
                            if (resultsBarrier == 0) {
                                this.storageService.setResults(resultsMap)
                                this.actualResults = resultsMap;
                            }
                        });
                } else {
                    this.actualResults = results;
                }
            }).catch(e => console.log("Error getting the examination results" + e));

            if (lastAppointment == undefined || lastAppointment.startTime < appointment.startTime) {
                lastAppointment = appointment;
            }
        });
        this.setActualAppointment(lastAppointment);
        this.initActualTasks();
    }
    private initActualTasks() {
        this.storageService.getTasks().then((tasks: ITask[]) => {
            if (tasks == undefined) {
                this.tasksProvider.requestTasks(this.actualAppointment)
                    .subscribe((tasks: ITask[]) => {
                        this.storageService.setTasks(tasks)
                        this.setActualTasks(tasks);
                    })
            } else {
                this.setActualTasks(tasks);
            }
        })

    }

}
