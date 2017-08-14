import { Injectable } from '@angular/core';
import { AppointmentModel } from '../models/appointment.model';
import { AppointmentsProvider } from './storage/appointments-provider';
import { USMOTask } from '../models/usmo-task';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';
import { ToastIssuer } from './toastIssuer';
import { AppointmentsRestService } from './rest/appointmentsRestService';
import { TasksRestService } from './rest/tasksRestService';
import { TasksProvider } from './storage/tasksProvider';
import { AuthTokenRestService } from './rest/authTokenRestService';
import { TokenProvider } from './storage/tokenProvider';
import { UserProvider } from './storage/userProvider';
import * as moment from 'moment';
import { IPerformance } from '../models/performation';
import { MessagesProvider } from './storage/messages-provider';
import { MessageModel } from '../models/message.model';
import { MessagesRestService } from './rest/messages-rest-service';
import { StorageServiceProvider } from './storage/storageServiceProvider';

/**
 * Intended to manage the dataflow within the application and with USMO
 * Will pass the data from the Providers to the app
 * Will pass the data from the RestServices to the Providers
 * TODO - Remove and make a better distributed architecture
 */

@Injectable()
export class ServicesManager {
  private updateTimeout;
  knowNotificationsValue: number = 0;
  public constructor(
    private toaster: ToastIssuer,
    private appointmentsRestService: AppointmentsRestService,
    private appointmentsProvider: AppointmentsProvider,
    private tasksRestService: TasksRestService,
    private tasksProvider: TasksProvider,
    private tokenRestService: AuthTokenRestService,
    private tokenProvider: TokenProvider,
    private userProvider: UserProvider,
    private messagesProvider: MessagesProvider,
    private messagesRestService: MessagesRestService,
    private storage: StorageServiceProvider
  ) { }

  public getMessages(): Observable<MessageModel[]> {
    return this.messagesProvider.getMessages();
  }
  public setMessages(messages: MessageModel[]): Observable<MessageModel[]> {
    return this.messagesProvider.setMessages(messages);
  }

  public getAppointments(): Observable<AppointmentModel[]> {
    return this.appointmentsProvider.getAppointments();
  }

  public setAppointments(appointments: AppointmentModel[]) {
    return this.appointmentsProvider.setAppointments(appointments);
  }

  /*User*/
  public getUser(): Observable<UserModel> {
    return this.userProvider.getUser();
  }

  public setUser(user: UserModel) {
    this.userProvider.setUser(user);
  }

  /*Tasks*/
  public getTasks(): Observable<USMOTask[]> {
    return this.tasksProvider.getTasks();
  }



  /**
   * Ask the server if the actual token is a valid one
   */
  public tokenStatus(): Observable<number> {
    return this.tokenRestService.tokenStatus()
      .map(status => { return status });
  }

  /**
   * Ask the server for the account confirmation SMS
   * */
  public sendAuthCodeSMS(patientId, language): Observable<Response> {
    return this.tokenRestService.requestSendAuthCodeSMS(patientId, language)
      .map((response) => {
        this.userProvider.setUser({ patientId: patientId }).subscribe();
        return response;
      });
  }

  /**
   * Communicates with the server to get a Token with some credentials
   * returns an Observable with a boolean
   */
  public loginWithUserPass(id: string, code: string): Observable<boolean> {
    this.setUser({ patientId: id });
    return this.tokenRestService.requestToken(id, code)
      .map((token) => {
        if (token != undefined && token.length > 0) {
          this.tokenProvider.setToken(token).subscribe();
          return true;
        } else {
          return false;
        }
      });
  }

  /**Starts to search for changes on the dataset */
  public startContinuousAppointmentCheck(milis: number) {
    this.finishContinuousAppointmentCheck(); //In case there's another invocation
    this.update();
    this.updateTimeout = setInterval(() => {
      try {
        this.update();
      } catch (exception) {
        console.error(exception);
      }
    }, milis);
  }

  /**Finishes the continuous search */
  public finishContinuousAppointmentCheck() {
    if (this.updateTimeout != undefined) { clearInterval(this.updateTimeout); }
  }

  /** Replace all new data from the server's data */
  public update() {

    //TODO - use request ModifiedAppointments instead
    this.appointmentsRestService.requestAppointments()
      .flatMap((appointments: AppointmentModel[]) => { return this.updateAppointments(appointments) })
      .subscribe((appointments: AppointmentModel[]) => { this.updateTasks(appointments) });
  }

  private updateAppointments(newAppointments: AppointmentModel[]): Observable<AppointmentModel[]> {
    //Get storage appointments, compare to the new appointments, add new ones and substitude the old ones
    // and keep those which don't change
    return this.appointmentsProvider.getAppointments()
      .flatMap((actualAppointments: AppointmentModel[]) => {
        if (newAppointments.length > 0) {
          newAppointments.forEach(appointment => {
            const index = actualAppointments.map(a => a.appointmentId).indexOf(appointment.appointmentId);
            if (index >= 0) {
              actualAppointments[index] = appointment;
            } else {
              actualAppointments.push(appointment);
            }
          });
        }
        return this.appointmentsProvider.setAppointments(actualAppointments);
      });
  }

  private updateTasks(appointments: AppointmentModel[]) {
    //Get the las appoinment of each 'type'
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

    //Get the tasks for those appoinments
    let tasksRequests: Observable<USMOTask[]>;
    lastAppointments.forEach(appointment => {
      if (tasksRequests == undefined) {
        tasksRequests = this.tasksRestService.requestTasks(appointment)
      } else {
        tasksRequests = tasksRequests.merge(this.tasksRestService.requestTasks(appointment));
      }
    });
    if (tasksRequests != undefined) {
      tasksRequests.bufferCount(lastAppointments.length)
        .subscribe((tasksList: USMOTask[][]) => {
          const newTasks: USMOTask[] = []
          tasksList.forEach((taskList: USMOTask[]) => {
            taskList.forEach((task: USMOTask) => {
              newTasks.push(task);
            });
          });
          //Save them
          this.tasksProvider.setTasks(newTasks).subscribe();
        });
    }
  }

  public getPendingMessages(): Observable<number> {
    return this.storage.retrieveItem(StorageServiceProvider.NEW_MESSAGES_COUNT_ID);
  }
  public setPendingMessages(pendingMessages: number) {
    this.storage.storeItem(StorageServiceProvider.NEW_MESSAGES_COUNT_ID, pendingMessages).subscribe();
  }
}
