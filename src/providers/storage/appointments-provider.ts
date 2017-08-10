import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { AppointmentModel } from '../../models/appointment.model';
import { Observable } from 'rxjs/Rx';
import { AppointmentsRestService } from '../rest/appointmentsRestService';
@Injectable()
export class AppointmentsProvider extends StorageServiceProvider {
  private appointments: AppointmentModel[];
  constructor(public storage: Storage, protected appointmentsRestService: AppointmentsRestService) {
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
    this.appointments = appointments == undefined ? [] : appointments;
    return this.appointments;
  }

  /**Update appointments with the data from USMO */
  public update(): Observable<AppointmentModel[]> {
    // Get storage appointments, compare to the new appointments, add new ones and substitude the old ones
    // and keep those which don't change
    /*
       this.appointmentsRestService.requestAppointments()
         .subscribe((actualAppointments: AppointmentModel[]) => {
           this.getAppointments()
             .subscribe((savedAppointments: AppointmentModel[]) => {
               if (actualAppointments.length > 0) {
                 actualAppointments.forEach((appointment: AppointmentModel) => {
                   const index = savedAppointments.map(a => a.appointmentId).indexOf(appointment.appointmentId);
                   if (index >= 0) {
                     savedAppointments[index] = appointment;
                   } else {
                     savedAppointments.push(appointment);
                   }
                 });
               }
               this.setAppointments(savedAppointments).subscribe((appointments) => console.log("Saved appointments ", appointments));
             });
         });
   */
    return this.getAppointments()
      .flatMap((appointments: AppointmentModel[]) => {
        return this.appointmentsRestService.requestModifiedAppointments(appointments)
          .flatMap((updatedAppointments: AppointmentModel[]) => {
            if (updatedAppointments != undefined && updatedAppointments.length > 0) {
              updatedAppointments.forEach((updatedAppointment: AppointmentModel) => {
                const index = appointments.map(appointment => appointment.appointmentId).indexOf(updatedAppointment.appointmentId);
                if (index >= 0) {
                  appointments[index] = updatedAppointment;
                } else {
                  appointments.push(updatedAppointment);
                }
              });
              console.log("Updating appointments")
              return this.setAppointments(appointments);
            } else {
              console.log("Nothing to update")
              return Observable.of(appointments);
            }
          });
      });

  }
}
