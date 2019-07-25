import { Injectable } from '@angular/core';
import { StorageServiceProvider } from '../storage-service/storage-service';
import { Device } from '@ionic-native/device/ngx';
import { Storage } from '@ionic/storage';
import { UserModel } from '../../../models/user.model';
import { Observable } from 'rxjs';
import { of } from "rxjs";
@Injectable()
export class UserProvider extends StorageServiceProvider {
    private user: UserModel;
    constructor(public storage: Storage, protected device: Device) {
        super(storage);
    }
    public getUser(): Observable<UserModel> {
        if (this.getAllocUser() == undefined) {
            return super.retrieveItem(StorageServiceProvider.USER_STORAGE_ID)
                .map(this.setAllocUser);
        } else {
            return of(this.getAllocUser());
        }
    }

    public setUser(user:UserModel):Observable<UserModel> {
        this.setAllocUser(user);
        return super.storeItem(StorageServiceProvider.USER_STORAGE_ID,user);
    }

    private getAllocUser(): UserModel {
        return this.user;
    }

    private setAllocUser(user: UserModel): UserModel {
        this.user = user;
        return this.user;
    }
}
