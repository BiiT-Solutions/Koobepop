import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { AppointmentModel } from '../../models/appointment.model';
import { Observable } from 'rxjs/Rx';
import { TaskModel } from '../../models/task.model';
import * as moment from 'moment';
import { KppRestService } from './kppRestService';
import { TokenProvider } from '../storage/tokenProvider';
import { TaskAction } from '../tasksManager';

@Injectable()
export class TasksRestService extends KppRestService {

    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: TokenProvider) {
        super(http, config, tokenProvider);
    }

    public requestTasks(appointment: AppointmentModel): Observable<TaskModel[]> {
        const requestAddres = this.config.usmoServer + this.config.getTasksService;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        const body = { appointmentId: appointment.appointmentId }
        return super.request(requestAddres, body, headers)
            .map(this.extractData)
            .map((tasks) => this.formatTasks(appointment, tasks))
    }

    extractData(res: Response) {
        try {
            return res.json() || {};
        } catch (exception) {
            console.debug(exception)
            return undefined;
        }
    }

    private formatTasks(appointment: AppointmentModel, tasks: any): TaskModel[] {

        if (tasks) {
            const deserializedTasks: TaskModel[] = [];
            tasks.forEach((task) => {
                //Map of performed exercises by week
                const performedMap = new Map<number, Map<number, number>>();
                task.performedOn.forEach((performed) => {
                    const weekKey: number = moment(performed.time).startOf("isoWeek").valueOf();//Gets the start of the week (Monday)
                    if (!performedMap.has(weekKey)) {
                        const weekValue: Map<number, number> = new Map();
                        weekValue.set(performed.time, performed.score);
                        performedMap.set(weekKey, weekValue);
                    } else {
                        performedMap.get(weekKey).set(performed.time, performed.score);
                    }
                });

                deserializedTasks.push({
                    name: task.name,
                    startTime: task.startTime,
                    finishTime: task.finishTime,
                    repetitions: task.repetitions,
                    performedOn: performedMap,
                    videoUrl: task.videoUrl,
                    content: task.content,
                    type: appointment.type,
                    appointmentId: appointment.appointmentId
                });
            });
           return deserializedTasks;
        } else {
            return [];
        }
    }

    /**Enviar performed y removed tasks TODO - Utilizar una lista y enviar periódicamente */
    public sendPerformedTask(appointmentId: number, taskName: string, date: number, score: number) {
        const requestAddres = this.config.usmoServer + this.config.addPerformedExercise;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            appointmentId: appointmentId,
            name: taskName,
            time: date,
            score: score
        }
        headers.append('Authorization', this.config.password);
        return super.request(requestAddres, body, headers).map(res => res.status);
    }

    public removePerformedTask(appointmentId: number, taskName: string, date: number): Observable<number> {
        const requestAddres = this.config.usmoServer + this.config.removePerformedExercise;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const body = {
            appointmentId: appointmentId,
            name: taskName,
            time: date,
            score: 0
        }
        headers.append('Authorization', this.config.password);
        return super.request(requestAddres, body, headers).map(res => res.status);
    }

    public sendTasks(tasks: TaskAction[]): Observable<Response> {
        const requestAddres = this.config.usmoServer + this.config.performActions;
        const headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        const body = {
            taskActions: tasks
        }
        return super.request(requestAddres, body, headers);
    }
}
