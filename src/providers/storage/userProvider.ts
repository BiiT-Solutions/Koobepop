import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { IUser } from '../../models/userI';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserProvider extends StorageServiceProvider {
    private user: IUser;
    constructor(public storage: Storage, protected device: Device) {
        super(storage);
    }
    getUser(): Observable<IUser> {
        if (this.getAllocUser() == undefined) {
            return super.retrieveItem(StorageServiceProvider.USER_STORAGE_ID)
                .map(this.setAllocUser);
        } else {
            return Observable.of(this.getAllocUser());
        }
    }
    
    setUser(user:IUser):Observable<IUser> { 
        this.setAllocUser(user);
        return super.storeItem(StorageServiceProvider.USER_STORAGE_ID,user);
    }

    getAllocUser(): IUser {
        return this.user;
    }

    setAllocUser(user: IUser): IUser {
        this.user = user;
        return this.user;
    }
}