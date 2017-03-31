import { Injectable } from '@angular/core';
import { Device } from 'ionic-native';
import { IAppointment } from '../models/appointmentI';
import { AppointmentsProvider } from './appointmentsProvider';
import { TasksRestProvider } from './tasksRestProvider';
import { StorageService } from './storageService';
import { ResultsProvider } from './resultsProvider';
import { ITask } from '../models/taskI';
import { IUser } from '../models/userI';
import { FormResult, CategoryResult, QuestionResult } from '../models/results';
import { IToken } from '../models/tokenI';
import { AuthTokenService } from './authTokenService';
import { Observable, Notification } from 'rxjs/Rx';
/**
 * Intended to manage the communication with USMO and data base access.
 * Will keep the data cached for the application views.
 * Will provide the stored data to the application.
 * Will provide storage services to the application so it saves all the relevant data.
 * All this data loading is async so take it into acount before using it.
 */
@Injectable()
export class PersistenceManager {
    private appointmentsList: IAppointment[];
    private actualAppointment: IAppointment;
    private actualTasks: ITask[];
    private actualResults: Map<number, FormResult[]>;
    private user: IUser;
    private token: IToken;

    public constructor(
        private appointmentsProvider: AppointmentsProvider,
        private tasksProvider: TasksRestProvider,
        private storageService: StorageService,
        private resultsProvider: ResultsProvider,
        private authService: AuthTokenService) {
    }

    public loginWithUserPass(id: string, code: string): Observable<any> {
        this.setUser({ patientId: id });
        //console.log("Getting a new token with params: " + id + code + this.getUuid());
        return this.authService.requestToken(id, code, this.getUuid())
            .map((token) => {
                console.log("The token is: " + token)
                if (token != undefined && token.length > 0) {
                    this.setToken(this.parseToToken(token));
                    this.initFirstPhase();
                    return true;
                } else {
                    return false;
                }
            });

    }

    public getActualAppointment(): Observable<IAppointment> {
        return Observable.of(this.actualAppointment)
            .flatMap((appointment) => {
                if (appointment == undefined) {
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
                    return Observable.of(appointment);
                }
            });
    }

    public setActualAppointment(appointment: IAppointment) { this.actualAppointment = appointment; }

    public setResults(results: Map<number, FormResult[]>) {
        this.storageService.setResults(results);
        this.actualResults = results;
    }
    public getResults(): Observable<Map<number, FormResult[]>> {
        return Observable.of(this.actualResults)
            .flatMap((results) => {
                if (results == undefined) {
                    return this.storageService.getResults()
                        .then((results: Map<number, FormResult[]>) => {
                            this.setResults(results);
                            return results;
                        });
                } else {
                    return Observable.of(results);
                }
            })
            .flatMap((results) => {
                if (results == undefined) {
                    return this.getToken()
                        .flatMap((token) => {
                            return this.getAppointments()
                                .map((appointments: IAppointment[]) => {
                                    Observable.from(appointments)
                                    .flatMap(appointment=>{
                                        return this.resultsProvider.requestResults(appointment, token)
                                    })
                                    let resultsMap: Map<number, FormResult[]>
                                    //We need to get The results forEach appoinment:
                                    appointments.forEach((appointment: IAppointment) => {
                                        console.log("foreach")

                                        this.resultsProvider.requestResults(appointment, token)
                                            .map((result: FormResult[]) => {
                                                 console.log("set Result")
                                                resultsMap.set(appointment.appointmentId, result);
                                            });
                                    });
                                    return resultsMap

                                });
                        });
                } else {
                    return Observable.of(results);
                }
            });
    }

    public getAppointments(): Observable<IAppointment[]> {
        let observable: Observable<IAppointment[]> = Observable.of(this.appointmentsList);

        return observable.flatMap((appointments) => {
            if (appointments == undefined || appointments.length <= 0) {
                return this.storageService.getAppointments();
            } else {
                return Observable.of(appointments);
            }
        }).flatMap(appointments => {
            if (appointments == undefined || appointments.length <= 0) {
                return this.getUser().flatMap(user => {
                    return this.getToken().flatMap(token => {
                        return this.appointmentsProvider.requestAppointments(user, token);
                    });
                });
            } else {
                return Observable.of(appointments);
            }
        });

    }
    public setAppointments(appointments: IAppointment[]) {
        this.storageService.setAppointments(appointments);
        this.appointmentsList = appointments;
    }

    public getUser(): Observable<IUser> {
        if (this.user != undefined) {
            let observable: Observable<IUser> = Observable.of(this.user);
            return observable//this.user;
        } else {
            return Observable.fromPromise(this.storageService.getUser()).map((user) => { this.user = user; return user });
        }
    }
    public setUser(user: IUser) {
        this.user = user;
        this.storageService.setUser(user);
    }



    public getActualTasks(): ITask[] { return this.actualTasks; }
    public setActualTasks(tasks: ITask[]) { this.actualTasks = tasks; }

    //TODO server feedback + check correct behaviour
    public performTask(task, time) {

        this.getToken().subscribe((token: string) =>
            this.tasksProvider.sendPerformedTask(this.actualAppointment, task, time, token));
    }
    public removeTask(task, time) {

        this.getToken().subscribe((token: string) =>
            this.tasksProvider.removePerformedTask(this.actualAppointment, task, time, token));
    }
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
            if (payload.endsWith("==")) payload = payload.slice(0, payload.length - 2);
            if (payload.endsWith("=")) payload = payload.slice(0, payload.length - 1);
            let realToken = token.head + "." + payload + "." + token.signature;
            return realToken;
        })
    }

    private parseToToken(token: string): IToken {
        let splitToken: string[] = token.split(".");
        let payload = JSON.parse(atob(splitToken[1]));
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
        this.initFirstPhase();
    }

    private initFirstPhase() {
        // First get token if there's none
        this.getToken().map(token => {
            console.log("Mapeando, Token: " + token)
            return token;
        })
            .subscribe((token: string) => {
                if (token != undefined) {
                    // Then get all patient's data
                    this.getUser().subscribe(user => {
                        if (user != undefined) {
                            this.getAppointments()
                                .subscribe((appointments: IAppointment[]) => {
                                    console.log("Appointments: ")
                                    console.log(appointments)
                                    this.setAppointments(appointments);
                                    this.initSecondPhase(appointments);
                                });
                        } else { console.error("User is not defined"); }
                    }, e => console.error("Storage error" + e));
                } else { console.error("Token not initialized") }
            });
    }

    private initSecondPhase(appointments: IAppointment[]) {
        let lastAppointment: IAppointment;
        let resultsMap: Map<number, FormResult[]> = new Map<number, FormResult[]>();
        //
        let resultsBarrier = 0;
        appointments.forEach(appointment => {

            resultsBarrier++;
            this.storageService.getResults()
                .then((results: Map<number, FormResult[]>) => {
                    if (results == undefined) {
                        this.getToken().subscribe((token) => {
                            this.resultsProvider.requestResults(appointment, token)
                                .subscribe((results: FormResult[]) => {
                                    resultsMap.set(appointment.appointmentId, results);
                                    resultsBarrier--;
                                    console.log("Barrier " + resultsBarrier)
                                    console.log(resultsMap)
                                    if (resultsBarrier == 0) {
                                        this.actualResults = resultsMap;
                                        this.storageService.setResults(this.actualResults);
                                    }
                                });
                        });
                    } else {
                        this.actualResults = results;
                    }

                    //console.log(results);
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
                this.getToken().subscribe(token => {
                    this.tasksProvider.requestTasks(this.actualAppointment, token)
                        .subscribe((tasks: ITask[]) => {
                            this.storageService.setTasks(tasks)
                            this.setActualTasks(tasks);
                        });
                });
            } else {
                this.setActualTasks(tasks);
            }
        });
    }

    private formatResults(results): FormResult[] {
        let formResults: FormResult[] = [];
        results.forEach(result =>
            formResults.push(this.formatForm(result.formResult))
        );
        return formResults;
    }
    private formatForm(form): FormResult {
        let formChildren: CategoryResult[] = [];
        form.children.forEach(category => {
            formChildren.push(this.formatCategory(category));
        });
        return {
            name: form.label,
            children: formChildren
        }
    }
    private formatCategory(category): CategoryResult {
        let categoryChildren: any[] = [];
        category.children.forEach(child => {
            if (child.class == "com.biit.form.result.RepeatableGroupResult") {
                categoryChildren.push(this.formatCategory(child));
            }
            else if (child.class == "com.biit.form.result.QuestionWithValueResult") {
                categoryChildren.push(this.formatQuestion(child));
            }
        })
        return { name: category.name, children: categoryChildren }
    }

    private formatQuestion(question): QuestionResult {
        return { name: question.name, values: question.values }
    }
    public tokenStatus(): Observable<number> {
        return this.getToken().flatMap(token => this.authService.tokenStatus(token))
    }
}
