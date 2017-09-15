import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storage-service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { ReportModel } from '../../models/report.model';
import { ReportsRestService } from '../rest/reports-rest-service';
import { IAppointment, AppointmentModel } from '../../models/appointment.model';
import { AppointmentsProvider } from './appointments-provider';
@Injectable()
export class ReportsProvider extends StorageServiceProvider {
  private reports: ReportModel[];

  constructor(public storage: Storage,
    protected reportRestService: ReportsRestService,
    protected appointmentsProvider: AppointmentsProvider) {
    super(storage);
  }

  public getReports(): Observable<ReportModel[]> {
    if (this.reports == undefined) {
      return super.retrieveItem(StorageServiceProvider.REPORTS_STORAGE_ID)
        .map((reports) => this.setAllocReports(reports));
    } else {
      return Observable.of(this.getAllocReports());
    }
  }
  public getAllocReports(): ReportModel[] {
    return this.reports;
  }

  public setReports(reports: ReportModel[]): Observable<ReportModel[]> {
    reports = reports.sort((r1,r2)=>{return r1.updateTime-r2.updateTime});
    this.setAllocReports(reports);
    return super.storeItem(StorageServiceProvider.REPORTS_STORAGE_ID, reports);
  }

  public setAllocReports(reports): ReportModel[] {
    this.reports = reports;
    return reports;
  }

  public update(): Observable<any> {
    return this.appointmentsProvider.getAppointments()
      .flatMap((appointments: AppointmentModel[]) => {
        const updatedAppointments = [];
        return this.getReports().flatMap((savedReports: ReportModel[]) => {
          if (savedReports == undefined) {
            savedReports = [];
          }
          appointments.forEach((appointment: AppointmentModel) => {
            const index = savedReports.map((report: ReportModel) => report.appointmentId).indexOf(appointment.appointmentId);
            if (index >= 0) {
              if (appointment.updateTime > savedReports[index].updateTime) {
                updatedAppointments.push(appointment);
              } else if (savedReports[index].updateTime == undefined) {
                updatedAppointments.push(appointment);
              }
            } else {
              updatedAppointments.push(appointment);
            }
          });
          return Observable.combineLatest(updatedAppointments.map((appointment: AppointmentModel) => {
            return this.reportRestService.requestReports(appointment)
          }))
            .take(1).flatMap((reports) => {
              reports.forEach((report: ReportModel) => {
                const index = savedReports.map((savedReport: ReportModel) => savedReport.appointmentId).indexOf(report.appointmentId);
                if (index >= 0) {
                  savedReports[index] = report;
                } else {
                  savedReports.push(report);
                }
              });
              savedReports.sort((a,b)=>a.updateTime-b.updateTime)
              return this.setReports(savedReports);
            });
        });
      });
  }

  public isLoaded(): boolean {
    return this.reports != undefined && this.reports.length > 0;
  }

}
