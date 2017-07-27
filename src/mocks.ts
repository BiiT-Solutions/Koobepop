import { Observable } from 'rxjs/Observable';
import { Loading } from 'ionic-angular';
/**This file is intended to generate Mock classes to emulate real classes for our testing environment */
/** */
export class ConfigMock {

  public get(): any {
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
}

/** Mocks Platform service provided by Ionic*/
export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
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
/** */
export class StatusBarMock {
  public styleDefault(): void { }
}
/** */
export class SplashScreenMock {
  public hide(): void { }
  public show(): void { }
}

export class TranslateServiceMock{
  public setDefaultLang(lang:string){}
  public get(string):Observable<string> {
    return Observable.of("text");
  }
}
export  class ServicesManagerMock{
  public tokenStatus():Observable<number>{
    return Observable.of(200)
  }
}
export class ConnectivityServiceMock {
  public isOnline():boolean{
    return true;
  }
}
export class ToastIssuerMock{
  public badToast(s:string,t:number):void{}
  public goodToast(s:string,t:number):void{}
}
export class LoadingControllerMock{
    public create():Loading{
      return null;
    }
}
