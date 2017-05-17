import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { IAppointment } from '../../models/appointmentI';
import { Observable } from 'rxjs/Rx';
import { ITask } from '../../models/taskI';
import { IPerformance } from '../../models/performation';
import * as moment from 'moment';
import { KppRestService } from './kppRestService';
import { TokenProvider } from '../storage/tokenProvider';

@Injectable()
export class TasksRestService extends KppRestService {

    constructor(protected http: Http,
        @Inject(APP_CONFIG) protected config: IAppConfig,
        protected tokenProvider: TokenProvider) {
        super(http, config, tokenProvider);
    }

    public requestTasks(appointment: IAppointment): Observable<ITask[]> {
        let requestAddres = this.config.usmoServer + this.config.getTasksService;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', this.config.password);
        let body = { appointmentId: appointment.appointmentId }
        return super.request(requestAddres, body, headers)
            .map(this.extractData)
            .map((tasks) => this.formatTasks(appointment, tasks))
    }

    extractData(res: Response) {
        return res.json() || {};
    }

    private formatTasks(appointment: IAppointment, tasks: any): ITask[] {
        if (tasks) {
            let deserializedTasks: ITask[] = [];
            tasks.forEach((task) => {
                //Map of performed exercises by week 
                let performedMap = new Map<number, IPerformance[]>();
                task.performedOn.forEach((performed) => {
                    let week: number = moment(performed.time).startOf("isoWeek").valueOf();//Gets the start of the week (Monday)
                    let performance: IPerformance = { date: performed.time, score: performed.score };
                    if (!performedMap.has(week)) {
                        performedMap.set(week, [performance]);
                    } else {
                        performedMap.get(week).push(performance);
                    }
                });
                deserializedTasks.push({
                    name: task.name,
                    startingTime: task.startingTime,
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
        let requestAddres = this.config.usmoServer + this.config.addPerformedExercise;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            appointmentId: appointmentId,
            name: taskName,
            time: date,
            score: score
        }
        headers.append('Authorization', this.config.password);
        return super.request(requestAddres, body, headers).map(res => res.status);
    }

    public removePerformedTask(appointmentId: number, taskName: string, date: number): Observable<number> {
        let requestAddres = this.config.usmoServer + this.config.removePerformedExercise;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = {
            appointmentId: appointmentId,
            name: taskName,
            time: date,
            score: 0
        }
        headers.append('Authorization', this.config.password);
        return super.request(requestAddres, body, headers).map(res => res.status);
    }
}