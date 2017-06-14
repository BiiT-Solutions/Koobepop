import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Device } from '@ionic-native/device';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class UserProvider extends StorageServiceProvider {
    private user: UserModel;
    constructor(public storage: Storage, protected device: Device) {
        super(storage);
    }
    getUser(): Observable<UserModel> {
        if (this.getAllocUser() == undefined) {
            return super.retrieveItem(StorageServiceProvider.USER_STORAGE_ID)
                .map(this.setAllocUser);
        } else {
            return Observable.of(this.getAllocUser());
        }
    }
    
    setUser(user:UserModel):Observable<UserModel> { 
        this.setAllocUser(user);
        return super.storeItem(StorageServiceProvider.USER_STORAGE_ID,user);
    }

    getAllocUser(): UserModel {
        return this.user;
    }

    setAllocUser(user: UserModel): UserModel {
        this.user = user;
        return this.user;
    }
}