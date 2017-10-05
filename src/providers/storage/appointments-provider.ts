import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storage-service';
import { Storage } from '@ionic/storage';
import { AppointmentModel } from '../../models/appointment.model';
import { Observable } from 'rxjs/Rx';
import { AppointmentsRestService } from '../rest/appointments-rest-service';
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

  public getLastAppointmentsByType(): Observable<AppointmentModel[]> {
    return this.getAppointments()
      .map((appointments: AppointmentModel[]) => {
        const lastAppointments: AppointmentModel[] = [];
        appointments.forEach((appointment: AppointmentModel) => {
          const index = lastAppointments.map(appointment => appointment.type).indexOf(appointment.type);
          if (index >= 0) {
            if (lastAppointments[index].startTime < appointment.startTime) {
              lastAppointments[index] = appointment;
            }
          } else {
            lastAppointments.push(appointment);
          }
        });
        return lastAppointments;
      });
  }

  public setAppointments(appointments: AppointmentModel[]): Observable<AppointmentModel[]> {
    this.setAllocAppointmnts(appointments);
    return super.storeItem(StorageServiceProvider.APPOINTMENTS_STORAGE_ID, appointments);
  }


  /**Update appointments with the data from USMO */
  public update(): Observable<AppointmentModel[]> {
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

  private getAllocAppointments(): AppointmentModel[] {
    return this.appointments;
  }

  private setAllocAppointmnts(appointments: AppointmentModel[]): AppointmentModel[] {
    this.appointments = appointments == undefined ? [] : appointments;
    return this.appointments;
  }
}
