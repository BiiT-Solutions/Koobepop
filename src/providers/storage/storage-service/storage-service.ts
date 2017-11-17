import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';

/**Base class for defining Providers from the database*/
@Injectable()
export class StorageServiceProvider {
    public static TASKS_STORAGE_ID = "tasks";
    public static APPOINTMENTS_STORAGE_ID = "appointments";
    public static TOKEN_STORAGE_ID = "token";
    public static USER_STORAGE_ID = "user";
    public static MESSAGES_STORAGE_ID = "messages";
    public static NEW_MESSAGES_COUNT_ID = "newMessages";
    public static REPORTS_STORAGE_ID = "reports";
    constructor(public storage: Storage) { }

    public storeItem(name: string, item: any): Observable<any> {
        return Observable.fromPromise(this.storage.set(name, item)
        .then(item=>{return item;}));
    }

    public retrieveItem(name: string): Observable<any> {
        return Observable.fromPromise(this.storage.get(name)
        .then(item=>{return item}));
    }

    public resetDB() {
        this.storage.clear();
    }
}
