import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Observable } from 'rxjs';
import { UserModel } from '../src/models/user.model';
/**This file is intended to generate Mock classes to emulate real classes for our testing environment */
/** TODO - Separate this file*/

export class PlatformMock {
  public ready(): Promise<string> {
    return new Promise((resolve) => {
      resolve('READY');
    });
  }

  public getQueryParam() {
    return true;
  }

  public registerBackButtonAction(fn: Function, priority?: number): Function {
    return (() => true);
  }

  public hasFocus(ele: HTMLElement): boolean {
    return true;
  }

  public doc(): HTMLDocument {
    return document;
  }

  public is(): boolean {
    return true;
  }

  public getElementComputedStyle(container: any): any {
    return {
      paddingLeft: '10',
      paddingTop: '10',
      paddingRight: '10',
      paddingBottom: '10',
    };
  }

  public onResize(callback: any) {
    return callback;
  }

  public registerListener(ele: any, eventName: string, callback: any): Function {
    return (() => true);
  }

  public win(): Window {
    return window;
  }

  public raf(callback: any): number {
    return 1;
  }

  public timeout(callback: any, timer: number): any {
    return setTimeout(callback, timer);
  }

  public cancelTimeout(id: any) {
    // do nothing
  }

  public getActiveElement(): any {
    return document['activeElement'];
  }
  public lang(): any {
    return "en"
  }
}

export class StatusBarMock extends StatusBar {
  styleDefault() {
    return;
  }
}

export class SplashScreenMock extends SplashScreen {
  hide() {
    return;
  }
}

export class NavMock {

  public pop(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public push(): any {
    return new Promise(function (resolve: Function): void {
      resolve();
    });
  }

  public getActive(): any {
    return {
      'instance': {
        'model': 'something',
      },
    };
  }

  public setRoot(): any {
    return true;
  }

  public registerChildNav(nav: any): void {
    return;
  }

}

export class DeepLinkerMock {

}

export class ConfigMock {

  public get(mode?:string): any {
    return '';
  }

  public getBoolean(): boolean {
    return true;
  }

  public getNumber(): number {
    return 1;
  }
}
/** */
export class FormMock {
  public register(): any {
    return true;
  }
}

/** */
export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class TranslateServiceMock {
  public setDefaultLang(lang: string) { }
  public get(string): Observable<string> {
    return Observable.from(["text"]);
  }
  public use(string) { }
}
export class ServicesManagerMock {
  public tokenStatus(): Observable<number> {
    return Observable.from([200]);
  }
}
export class ConnectivityServiceMock {
  public isOnline(): boolean {
    return true;
  }
}
export class ToastIssuerMock {
  public badToast(s: string, t: number): void { }
  public goodToast(s: string, t: number): void { }
}

export class LoaderMock {
  constructor() { }
  public present() { }
  public dismiss() { }
}

export class LoadingControllerMock {
  public create(): LoaderMock {
    return new LoaderMock();
  }
}

export class UserProvMock {
  public getUser(): Observable<any> {
    return Observable.from([{ patientId: "" }])
  }
}

export class ChangeDetectorRefMock {
  public detectChanges() { }
}

export class ReportsProvMock {
  public getReports() {
    return Observable.from([{}])
  }
}
export class NavParamsMock {
  data = {};
}
export class DomSanitizerMock {
  public bypassSecurityTrustResourceUrl(string) {
    return string;
  }
}
export class StorageMock {
  public set(name, item) { }
  public get(name) { }
  public clear() {

  }
}

export class AppointmentsProviderMock {
  public getAppointments() { }
  public setAppointments(appointments) { }
  public update() { }
}

export class TasksRestServiceMock {
  public requestTasks() { }
  public extractData(res) { }
  public sendPerformedTask( taskName, score, performedTime, filledTime) {
    return Observable.of({});
   }
  public removePerformedTask( taskName: string, date: number) { 
    return Observable.of({});
  }
  public sendTasksActions(tasks) { }
}

export class TasksProviderMock {
  public getTasks() { }
  public setTasks(tasks) { }
  public getTask(name: string) { }
  public getTaskInfo(task){ return Observable.of([])}
}

export class TokenProviderMock {
  public getToken() {
    return Observable.of('AU7H.T0K3N')
  }
  public setToken(token) {
   }
}
export class UserProviderMock{
  public getUser(): Observable<UserModel> {
    const user = new UserModel()
    user.patientId = "00000000A"
    return Observable.of(user)
  }
  public setUser(){}
}

export class AuthTokenRestServiceMock{
  public requestToken(id,code){
    return Observable.of('AU7H.T0K3N.M0CK')
  }
  public requestSendAuthCodeSMS(patientId,languageId){

  }
}

export class DeviceMock{
}

export class AppointmentsRestServiceMock{

}
export class ViewControllerMock{
  dismiss(x:any){

  }
}

export class MessagesProvMock{
  getObservableMessages(){
    return Observable.of(undefined);
  }
}

export class InfographicJSMock{
  infographicFromtemplate(template,content){
    return "<svg></svg>"
  }
}
export class SettingsProviderMock{
  load(){
    return Observable.of({})
  }
  get allSettings(){
    return {
      organization: "",
      backend:"/",
      webservicesUser:"",
      webservicesPassword:"",
      pushSenderId:""
    }
  }
}
export class TaskSyncronizationProviderMock{
  syncTaskList(requestedTasks, savedTasks){
    return Observable.of(savedTasks)
  }
  syncServerTasks(requestedTasks, tasks){}
}