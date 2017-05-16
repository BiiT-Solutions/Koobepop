import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { IAppointment } from '../models/appointmentI';
import { AppointmentsProvider } from './appointmentsProvider';
import { TasksRestProvider } from './tasksRestProvider';
import { StorageService } from './storageService';
import { ITask } from '../models/taskI';
import { IUser } from '../models/userI';

import { IToken } from '../models/tokenI';
import { AuthTokenService } from './authTokenService';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ToastIssuer } from './toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { AppointmentsRestService } from './rest/appointmentsRestService';
import { TasksRestService } from './rest/tasksRestService';
import { TaskProvider } from './storage/taskProvider';
import { AuthTokenRestService } from './rest/authTokenRestService';
import { TokenProvider } from './storage/tokenProvider';
import { UserProvider } from './storage/userProvider';
import * as moment from 'moment';
import { IPerformance } from '../models/performation';
/**
 * Intended to manage the dataflow within the application and with USMO
 * Will pass the data from the Providers to the app
 * Will pass the data from the RestServices to the Providers
 * 
 */

@Injectable()
export class ServicesManager {
    private appointmentsList: IAppointment[];
    private actualAppointment: IAppointment;
    private actualTasks: ITask[];
    private user: IUser;
    private token: IToken;
    private updateTimeout;
    public constructor(
        private appointmentsProvider: AppointmentsProvider,
        private tasksProvider: TasksRestProvider,
        private storageService: StorageService,
        private authService: AuthTokenService,
        private device: Device,
        private toaster: ToastIssuer,
        private translate: TranslateService,

        private appointmentsRestService: AppointmentsRestService,
        private tasksRestService: TasksRestService,
        private taskProvider: TaskProvider,
        private tokenRestService: AuthTokenRestService,
        private tokenProvider: TokenProvider,
        private userProvider: UserProvider,
    ) {
    }

    /**
     * Returns an observable with the actual appointment
     * If there's none loaded, it looks for it on the appointments list
     * TODO - Remove this implementation to get all the appointments of different type
     */
    public getActualAppointment(): Observable<IAppointment> {
        if (this.actualAppointment == undefined) {
            return this.getAppointments().map((appointments: IAppointment[]) => {
                let lastAppointment: IAppointment;
                appointments.forEach((appointment: IAppointment) => {
                    if (lastAppointment == undefined || lastAppointment.startTime < appointment.startTime) {
                        lastAppointment = appointment;
                    }
                });
                this.actualAppointment = lastAppointment;
                return lastAppointment;
            });
        } else {
            return Observable.of(this.actualAppointment);
        }
    }

    public setActualAppointment(appointment: IAppointment) {
        this.actualAppointment = appointment;
    }

    /*Appointments*/
    public getAppointmentsFromServer(): Observable<IAppointment[]> {
        return this.getUser().flatMap(user => {
            return this.getToken().flatMap(token => {
                return this.appointmentsProvider.requestAppointments(user, token);
            });
        });
    }

    public getAppointmentsFromDB(): Observable<IAppointment[]> {
        return Observable.fromPromise(this.storageService.getAppointments())
    }

    //After calling this we should save it 
    public getAppointments(): Observable<IAppointment[]> {
        if (this.appointmentsList == undefined || this.appointmentsList.length <= 0) {
            return this.getAppointmentsFromDB()
                .flatMap((appointments: IAppointment[]) => {
                    if (appointments == undefined || appointments.length <= 0) {
                        return this.getAppointmentsFromServer();
                    } else {
                        return Observable.of(appointments);
                    }
                });
        } else {
            return Observable.of(this.appointmentsList);
        }
    }

    public setAppointments(appointments: IAppointment[]) {
        this.appointmentsList = appointments;
        this.storageService.setAppointments(appointments).then(appointments => {
        });

    }

    /*User*/
    public getUser(): Observable<IUser> {
        if (this.user != undefined) {
            let observable: Observable<IUser> = Observable.of(this.user);
            return observable//this.user;
        } else {
            return Observable.fromPromise(this.storageService.getUser())
                .map((user) => { this.user = user; return user });
        }
    }

    public setUser(user: IUser) {
        this.user = user;
        this.storageService.setUser(user);
    }

    /*Tasks*/
    public getTasks(): Observable<ITask[]> {
        if (this.actualTasks == undefined || this.actualTasks.length <= 0) {
            return Observable.fromPromise(this.storageService.getTasks())
                .flatMap((tasks: ITask[]) => {
                    if (tasks == undefined || tasks.length <= 0) {
                        return this.getToken().flatMap((token) => {
                            return this.getActualAppointment().flatMap((appointment) => {
                                return this.tasksProvider.requestTasks(appointment, token);
                            });
                        });
                    } else { return Observable.of(tasks); }
                });
        } else { return Observable.of(this.actualTasks); }
    }

   

    public performTask(task: ITask, perf: IPerformance): Observable<any> {
        //perform = save performation on the week with the tasks
        this.taskProvider.getTasks()
            .subscribe((tasks: ITask[]) => {
                let taskIndex = tasks.map(task => task.name).indexOf(task.name);
                if (taskIndex >= 0) {
                    let weekStart = moment(perf.date).startOf('isoWeek').valueOf();
                    if (task.performedOn.has(weekStart)) {
                        task.performedOn.get(weekStart).push(perf);
                    } else {
                        task.performedOn.set(weekStart, [perf]);
                    }
                    //TODO - remove if not necessary
                    console.log(tasks[taskIndex] === task);
                    tasks[taskIndex] = task
                    this.taskProvider.setTasks(tasks).subscribe();
                }
            });
        return this.tasksRestService.sendPerformedTask(task.appointmentId, task.name, perf.date, perf.score);
    }

    //TODO - Remove from storage
    public removeTask(task: ITask, time): Observable<any> {
        return this.tasksRestService.removePerformedTask(task.appointmentId, task.name, time);
    }

    /*Token*/
    public setToken(token: IToken) {
        this.token = token;
        this.storageService.setToken(this.token)
    }



    /** 
     * Ask the server if the actual token is a valid one
     */
    public tokenStatus(): Observable<number> {
        return this.tokenRestService.tokenStatus();
    }

    /**
     * Ask the server for the account confirmation SMS 
     * */
    public sendAuthCodeSMS(patientId, language): Observable<Response> {
        return this.tokenRestService.requestSendAuthCodeSMS(patientId, language)
            .map((response) => {
                this.userProvider.setUser({ patientId: patientId });
                return response;
            });
    }

    /**
     * Communicates with the server to get a Token with some credentials 
     * returns an Observable with a boolean
     */
    public loginWithUserPass(id: string, code: string): Observable<boolean> {
        this.setUser({ patientId: id });
        return this.tokenRestService.requestToken(id, code)
            .map((token) => {
                if (token != undefined && token.length > 0) {
                    this.tokenProvider.setToken(token);
                    return true;
                } else {
                    return false;
                }
            });
    }

    /**Starts to search for changes on the dataset */
    public startContinuousAppointmentCheck(milis: number) {
        this.finishContinuousAppointmentCheck(); //In case there's another invocation
        this.update();
        this.updateTimeout = setInterval(() => {
            try {
                this.update();
            } catch (exception) {
                console.error(exception);
            }
        }, milis);
    }

    /**Finishes the continuous search */
    public finishContinuousAppointmentCheck() {
        if (this.updateTimeout != undefined) { clearInterval(this.updateTimeout); }
    }

    /** Replace all data from the server's data */
    update() {
        this.appointmentsRestService.getAppointments()
            .map(this.updateAppointments)
            .map(this.updateTasks);
    }

    updateAppointments(newAppointments: IAppointment[]): Observable<IAppointment[]> {
        //Get storage appointments, compare to the new appointments, add new ones substitute the old ones
        // and keep those which don't change
        return this.appointmentsProvider.getAppointments()
            .map((actualAppointments: IAppointment[]) => {
                if (newAppointments.length > 0) {
                    newAppointments.forEach(appointment => {
                        let index = actualAppointments.map(a => a.appointmentId).indexOf(appointment.appointmentId);
                        if (index >= 0) {
                            actualAppointments[index] = appointment;
                        } else {
                            actualAppointments.push(appointment);
                        }
                    });
                }
                return actualAppointments;
            });
    }

    updateTasks(appointments: IAppointment[]) {
        //Get the las appoinment of each 'type'
        let lastAppointments: IAppointment[] = [];
        appointments.forEach((appointment: IAppointment) => {
            let index = lastAppointments.map(appoinment => appointment.type).indexOf(appointment.type)
            if (index > 0) {
                if (lastAppointments[index].startTime < appointment.startTime) {
                    lastAppointments[index] = appointment;
                }
            } else {
                lastAppointments.push(appointment);
            }
        });

        //Get the tasks for those appoinments
        let tasksRequests: Observable<ITask[]> = Observable.create();
        lastAppointments.forEach(appointment => {
            //We have an observable that will emit the result of the request
            //And we merge it with the others into one Observable
            tasksRequests.merge(this.tasksRestService.requestTasks(appointment));
        });

        tasksRequests.bufferCount(lastAppointments.length)
            .map((tasksList: ITask[][]) => {
                let newTasks: ITask[] = []
                tasksList.forEach((taskList: ITask[]) => {
                    taskList.forEach((task: ITask) => {
                        newTasks.push(task);
                    });
                });
                //Save them
                this.taskProvider.setTasks(newTasks)
            });
    }
}
