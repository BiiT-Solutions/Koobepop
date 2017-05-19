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
        this.tasks = tasks == undefined ? [] : tasks;
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
                    appointmentId: task.appointmentId
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
                appointmentId: task.appointmentId
            }
            tasksList.push(serializableTask);
        });
        return tasksList;
    }

    private stringifyMap(map: Map<number, Map<number, number>>): string {
        let arrayFromMap = [];
        map.forEach((value, key) => {
            arrayFromMap.push([key, Array.from(value.entries())])
        });
        let stringified = JSON.stringify(arrayFromMap);
        return stringified;
    }

    private parseStringifiedMap(stringifiedMap: string): Map<number, Map<number, number>> {
        let coolRebuiltMap = new Map<number, Map<number, number>>();
        if(stringifiedMap == undefined || stringifiedMap == ""){
            console.debug("TasksProvider: parseStringifiedMap: string void ")
            return coolRebuiltMap;
        }
        let reParsed = JSON.parse(stringifiedMap);
        reParsed.forEach(map => {
            coolRebuiltMap.set(map[0], new Map<number, number>(map[1]))
        });
        return coolRebuiltMap;
    }
}