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
export class TranslateServiceMock{
  //This is a dummy mock for testing
  public use(str:string): any {
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

  public viewDidLoad(): any{
    return true;
  }
}

export class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

export class MenuMock {
  public close(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

  export class AppointmentsProviderMock{
    public getAppointments(){}
    public requestAppointments(criteria,callback?){}
  }
  export class TaskProviderMock{

  }
  export class StorageServiceMock{
    
  }
  export class ManagerMock{
    
  }