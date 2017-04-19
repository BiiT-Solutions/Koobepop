import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';
import { IAppointment } from '../models/appointmentI';
import { AppointmentsProvider } from './appointmentsProvider';
import { TasksRestProvider } from './tasksRestProvider';
import { StorageService } from './storageService';
import { ITask } from '../models/taskI';
import { IUser } from '../models/userI';
import { FormResult, CategoryResult, QuestionResult } from '../models/results';
import { IToken } from '../models/tokenI';
import { AuthTokenService } from './authTokenService';
import { Observable, Notification } from 'rxjs/Rx';
import { Response } from '@angular/http';
/**
 * Intended to manage the dataflow within the application and with USMO
 * Will keep the data cached for the application views.
 * Will provide the stored data to the application.
 * Will provide storage services to the application so it persists all the relevant data.
 * All this data loading is async so take it into acount before using it.
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
        private authService: AuthTokenService) {
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

    public setActualTasks(tasks: ITask[]) {
        this.actualTasks = tasks;
        this.storageService.setTasks(tasks);
    }

    //TODO server feedback + check correct behaviour
    public performTask(task, time): Observable<any> {
        return this.getToken().flatMap((token: string) => {
            return this.getActualAppointment().flatMap(appointment => {
                return this.tasksProvider.sendPerformedTask(appointment, task, time, token)
                    .map(status => {
                        //TODO - save tasks with the performed one
                        return status;
                    });
            });
        });
    }

    public removeTask(task, time): Observable<any> {
        return this.getToken().flatMap((token: string) => {
            return this.getActualAppointment().flatMap(appointment => {
                return this.tasksProvider.removePerformedTask(appointment, task, time, token)
                    .map(status => {
                        //TODO - save tasks with the removed one
                        return status;
                    });
            });
        });
    }

    /*Token*/
    public setToken(token: IToken) {
        this.token = token;
        this.storageService.setToken(this.token)
    }

    /**Get the authentication token as a string*/
    private getToken(): Observable<string> {
        if (this.token != undefined) {
            return this.parseToString(this.token);
        } else {
            return Observable.fromPromise(this.storageService.getToken()).flatMap(token => {
                this.token = token;
                return this.parseToString(token)
            });
        }
    }

    private parseToString(token: IToken): Observable<string> {
        // Beware of dragons!!
        return this.getUser().map(user => {
            let payload = btoa('{"user":"' + user.patientId + '","uuid":"' + this.getUuid() + '","exp":' + token.payload.exp + '}');
            // In case there's a necessary padding we remove it from the base64 encoded string 
            // Info: http://stackoverflow.com/questions/6916805/why-does-a-base64-encoded-string-have-an-sign-at-the-end
            //If we don't do this, the signature won't match the data.
            if (payload.endsWith("==")) payload = payload.slice(0, payload.length - 2);
            if (payload.endsWith("=")) payload = payload.slice(0, payload.length - 1);
            let realToken = token.head + "." + payload + "." + token.signature;
            return realToken;
        })
    }

    private parseToToken(token: string): IToken {
        let splitToken: string[] = token.split(".");
        let payload = JSON.parse(atob(splitToken[1]));
        //Here we lose some information of the token which will be gathered later when we rebuild it
        let finalToken: IToken = {
            head: splitToken[0],
            payload: {
                exp: payload.exp
            },
            signature: splitToken[2]
        };
        return finalToken;
    }

    private getUuid() {
        return Device.uuid == undefined ? "This device has no uuid" : Device.uuid;
    }

    public setUp() {
        this.init();
    }

    private init() {
        // First get token if there's none
        this.getToken().subscribe((token: string) => {
            if (token != undefined) {
                // Then get all patient's data
                this.getUser()
                    .subscribe(user => {
                        if (user != undefined) {
                            this.getAppointments()
                                .subscribe((appointments: IAppointment[]) => {
                                    this.setAppointments(appointments);

                                    this.getActualAppointment().subscribe((appointment: IAppointment) => {
                                        this.setActualAppointment(appointment);
                                        this.getTasks().subscribe((tasks: ITask[]) => {
                                            this.setActualTasks(tasks)
                                        });
                                    });
                                });
                        } else { console.error("User is not defined"); }
                    }, e => console.error("Storage error" + e));
            } else { console.error("Token not initialized") }
        });
    }

    public tokenStatus(): Observable<number> {
        return this.getToken().flatMap(token => this.authService.tokenStatus(token))
    }

    /**
     * Ask the server for the account confirmation SMS 
     * */
    public sendAuthCodeSMS(patientId, language): Observable<Response> {
        return this.authService.sendAuthCodeSMS(patientId, language);
    }

    /**
     * Communicates with the server to get a Token with some credentials 
     * returns an Observable with a boolean
     */
    public loginWithUserPass(id: string, code: string): Observable<any> {
        this.setUser({ patientId: id });
        return this.authService.requestToken(id, code, this.getUuid())
            .map((token) => {
                if (token != undefined && token.length > 0) {
                    this.setToken(this.parseToToken(token));
                    this.init();
                    return true;
                } else {
                    return false;
                }
            });
    }

    public startContinuousAppointmentCheck(milis: number) {
        this.finishContinuousAppointmentCheck(); //In case there's more than one invocation
        //this.updateAppointments();
        
        this.updateTimeout = setInterval(()=>{
            try{
            this.updateAppointments();
        }catch(exception){
            console.error(exception)
        }
    }, milis);
    }

    public finishContinuousAppointmentCheck() {
       if(this.updateTimeout!=undefined){ clearInterval(this.updateTimeout);}
    }

    public updateAppointments() {
        this.getUpdatedAppointments().subscribe(appointments => {
            this.setAppointments(appointments)
        })
    }

    private getUpdatedAppointments(): Observable<IAppointment[]> {
        return this.getAppointments()
            .flatMap((appointments: IAppointment[]) => {
                return this.getUser().flatMap(user => {
                    return this.getToken()
                        .flatMap(token => {
                            return this.appointmentsProvider.requestModifiedAppointments(appointments, token, user)
                                .map((updatedAppointments: IAppointment[]) => {
                                    updatedAppointments.forEach(appointment => {
                                        let index = appointments.map(a => a.appointmentId).indexOf(appointment.appointmentId)

                                        if (index >= 0) {
                                            appointments[index] = appointment;
                                            //If the appointment is known and is the actual one, set tasks again
                                            this.getActualAppointment()
                                                .subscribe(actualAppointment => {
                                                    if (appointment.appointmentId === actualAppointment.appointmentId) {
                                                        this.tasksProvider.requestTasks(appointment, token)
                                                            .subscribe(tasks => this.setActualTasks(tasks))
                                                    }
                                                });
                                        } else {
                                            appointments.push(appointment);
                                        }
                                    });
                                    return appointments;
                                });

                        });
                });

            });
    }
}
