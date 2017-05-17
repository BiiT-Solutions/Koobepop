import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { ITask } from '../../models/taskI';
import { Observable } from 'rxjs/Rx';
import { IPerformance } from '../../models/performation';

@Injectable()
export class TasksProvider extends StorageServiceProvider {
    private tasks: ITask[];
    constructor(public storage: Storage) {
        super(storage);
    }

    public getTasks(): Observable<ITask[]> {
        if (this.getAllocTasks() == undefined) {
            return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
                .map(this.deserializeTasks) //Convert to ITask[]
                .map(this.setAllocTasks);   //Save locally
        } else {
            return Observable.of(this.getAllocTasks());
        }
    }

    public setTasks(tasks: ITask[]): Observable<ITask[]> {
        this.setAllocTasks(tasks);
        let serializedTasks = this.serializeTasks(tasks);
        return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks);
    }

    private getAllocTasks(): ITask[] {
        return this.tasks;
    }

    private setAllocTasks(tasks: ITask[]) {
        this.tasks = tasks==undefined?[]:tasks;
        return this.tasks;
    }

    /**We serialize and deserialize because the map object won't be stored properly if we don't do it */
    private deserializeTasks(tasks: any[]) {
        let deserializedTasks: ITask[] = [];
        if (tasks != undefined) {
            tasks.forEach(task => {
                deserializedTasks.push({
                    name: task.name,
                    startingTime: task.startingTime,
                    repetitions: task.repetitions,
                    performedOn: new Map<number, IPerformance[]>(JSON.parse(task.performedOn)), // sorted array of performation dates
                    videoUrl: task.videoUrl,
                    content: task.content,
                    type: task.type,
                    appointmentId:task.appointmentId
                });
            });
        }
        return deserializedTasks;
    }

    private serializeTasks(tasks: ITask[]) {
        let tasksList = []
        tasks.forEach(task => {
            let serializableTask = {
                name: task.name,
                startingTime: task.startingTime,
                repetitions: task.repetitions,
                performedOn: task.performedOn != undefined ? JSON.stringify(Array.from(task.performedOn.entries())) : "",
                videoUrl: task.videoUrl,
                content: task.content,
                type: task.type,
                appointmentId:task.appointmentId
            }
            tasksList.push(serializableTask);
        });
        return tasksList;
    }
}