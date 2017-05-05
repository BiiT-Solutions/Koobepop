//TODO Do this right :)
export class Todea {
  public name: string;
  public age: number;
  constructor(newName: string, newAge: number) {
    this.name = newName;
    this.age = newAge;
  }
  public getAge(): number {
    return this.age
  }
}
export class AppMock {

}
export class TranslateServiceMock {
  //This is a dummy mock for testing
  public use(str: string): any {
    return '';
  }
}

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
  public setTransition(): void {
    return;
  }
}

export class FormMock {
  public register(): any {
    return true;
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

  public viewDidLoad(): any {
    return true;
  }
}

export class PlatformMock {
  public ready(): Promise<{ String }> {
    return new Promise((resolve) => {
      resolve('READY');
    });
    
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
  public lang(){
      return 'en';//default for testing
    }
}

export class DeviceMock { }

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}
export class TaskProviderMock { }

export class LoadingControllerMock {
  create(opts?): LoadingMock {
    return new LoadingMock();
  }
}
export class LoadingMock {
  constructor() { }
  present() { }
  dismiss() { }
}
export class ConnectivityServiceMock { }
export class ToastControllerMock { }
export class SplashScreenMock { }
export class StatusBarMock { }
export class HttpMock { }
export class StorageMock {
  get(any) { }
}
declare var Connection; //From plugin :/
export class NetworkMock {
 }
export class KeyboardMock { }
export class PopoverControllerMock{}