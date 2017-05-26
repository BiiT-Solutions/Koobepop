import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { TaskModel } from '../../models/taskI';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TasksProvider extends StorageServiceProvider {
    private tasks: TaskModel[];
    constructor(public storage: Storage) {
        super(storage);
    }

    public getTasks(): Observable<TaskModel[]> {
        if (this.getAllocTasks() == undefined) {
            return super.retrieveItem(StorageServiceProvider.TASKS_STORAGE_ID)
                .map(this.deserializeTasks) //Convert to ITask[]
                .map(this.setAllocTasks);   //Save locally
        } else {
            return Observable.of(this.getAllocTasks());
        }
    }

    public setTasks(tasks: TaskModel[]): Observable<TaskModel[]> {
        this.setAllocTasks(tasks);
        let serializedTasks = this.serializeTasks(tasks);
        return super.storeItem(StorageServiceProvider.TASKS_STORAGE_ID, serializedTasks);
    }

    private getAllocTasks(): TaskModel[] {
        return this.tasks;
    }

    private setAllocTasks(tasks: TaskModel[]) {
        this.tasks = tasks == undefined ? [] : tasks;
        return this.tasks;
    }

    /**We serialize and deserialize because the map object won't be stored properly if we don't do it */
    private deserializeTasks(tasks: any[]) {
        let deserializedTasks: TaskModel[] = [];
        if (tasks != undefined) {
            tasks.forEach(task => {
                deserializedTasks.push({
                    name: task.name,
                    startingTime: task.startingTime,
                    repetitions: task.repetitions,
                    performedOn: TaskModel.parseStringifiedMap(task.performedOn), // sorted array of performation dates
                    videoUrl: task.videoUrl,
                    content: task.content,
                    type: task.type,
                    appointmentId: task.appointmentId
                });
            });
        }
        return deserializedTasks;
    }

    private serializeTasks(tasks: TaskModel[]) {
        let tasksList = []
        tasks.forEach(task => {
            let serializableTask = {
                name: task.name,
                startingTime: task.startingTime,
                repetitions: task.repetitions,
                performedOn: TaskModel.stringifyMap(task.performedOn),
                videoUrl: task.videoUrl,
                content: task.content,
                type: task.type,
                appointmentId: task.appointmentId
            }
            tasksList.push(serializableTask);
        });
        return tasksList;
    }
}