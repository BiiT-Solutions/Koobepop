import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { IAppointment } from '../../models/appointmentI';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AppointmentsProvider extends StorageServiceProvider {
    private appointments: IAppointment[];
    constructor(public storage: Storage) {
        super(storage);
    }

    public getAppointments(): Observable<IAppointment[]> {
        if (this.getAllocAppointments() == undefined) {
            return super.retrieveItem(StorageServiceProvider.APPOINTMENTS_STORAGE_ID)
                .map(this.setAllocAppointmnts);
        } else {
            return Observable.of(this.getAllocAppointments());
        }
    }

    public setAppointments(appointments: IAppointment[]): Observable<IAppointment[]> {
        this.setAllocAppointmnts(appointments);
        return super.storeItem(StorageServiceProvider.APPOINTMENTS_STORAGE_ID, appointments);
    }

    private getAllocAppointments(): IAppointment[] {
        return this.appointments;
    }

    private setAllocAppointmnts(appointments: IAppointment[]): IAppointment[] {
        this.appointments = appointments==undefined?[]:appointments;
        return this.appointments;
    }
}