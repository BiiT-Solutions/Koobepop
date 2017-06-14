import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { AppointmentModel } from '../../models/appointment.model';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class AppointmentsProvider extends StorageServiceProvider {
    private appointments: AppointmentModel[];
    constructor(public storage: Storage) {
        super(storage);
    }

    public getAppointments(): Observable<AppointmentModel[]> {
        if (this.getAllocAppointments() == undefined) {
            return super.retrieveItem(StorageServiceProvider.APPOINTMENTS_STORAGE_ID)
                .map(this.setAllocAppointmnts);
        } else {
            return Observable.of(this.getAllocAppointments());
        }
    }

    public setAppointments(appointments: AppointmentModel[]): Observable<AppointmentModel[]> {
        this.setAllocAppointmnts(appointments);
        return super.storeItem(StorageServiceProvider.APPOINTMENTS_STORAGE_ID, appointments);
    }

    private getAllocAppointments(): AppointmentModel[] {
        return this.appointments;
    }

    private setAllocAppointmnts(appointments: AppointmentModel[]): AppointmentModel[] {
        this.appointments = appointments==undefined?[]:appointments;
        return this.appointments;
    }
}