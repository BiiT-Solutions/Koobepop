// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { App, Config, Form, IonicModule, Keyboard, DomController, MenuController, NavController, Platform, LoadingController, ToastController, PopoverController } from 'ionic-angular';
import { StorageMock, ConfigMock, PlatformMock, TranslateServiceMock, LoadingControllerMock, ToastControllerMock, SplashScreenMock, StatusBarMock, HttpMock, DeviceMock, NetworkMock, PopoverControllerMock } from './mocks';
import { ServicesManager } from './providers/persistenceManager';
import { Http } from '@angular/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { StorageService } from './providers/storageService';
import { ConnectivityService } from './providers/connectivity-service';
import { ToastIssuer } from './providers/toastIssuer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AppointmentsProvider } from './providers/appointmentsProvider';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { APP_CONFIG, AppConfig } from './app/app.config';
import { AuthTokenService } from './providers/authTokenService';
import { TasksRestProvider } from './providers/tasksRestProvider';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';

// Unfortunately there's no typing for the `__karma__` variable. Just declare it as any.
declare var __karma__: any;
declare var require: any;

// Prevent Karma from running prematurely.
__karma__.loaded = function (): void {
    // noop
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
);
// Then we find all the tests.
const context: any = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
// Finally, start Karma to run the tests.
__karma__.start();

export class TestUtils {

    public static beforeEachCompiler(components: Array<any>): Promise<{ fixture: any, instance: any }> {
        return TestUtils.configureIonicTestingModule(components)
            .compileComponents().then(() => {
                let fixture: any = TestBed.createComponent(components[0]);
                return {
                    fixture: fixture,
                    instance: fixture.debugElement.componentInstance,
                };
            });
    }

    //TODO - Change settings
    public static configureIonicTestingModule(components: Array<any>): typeof TestBed {
        return TestBed.configureTestingModule({
            declarations: [
                ...components,
            ],
            providers: [
                App,
                Form,
                Keyboard,
                DomController,
                MenuController,
                NavController,
                { provide: PopoverController, useClass: PopoverControllerMock },
                { provide: Platform, useClass: PlatformMock },
                { provide: Config, useClass: ConfigMock },
                { provide: APP_CONFIG, useValue: AppConfig },
                ServicesManager,
                AppointmentsProvider,
                TasksRestProvider,
                StorageService,
                ToastIssuer,
                AuthTokenService,
                ConnectivityService,
                { provide: Storage, useClass: StorageMock },
                { provide: Network, useClass: NetworkMock },
                { provide: Http, useClass: HttpMock },
                { provide: TranslateService, useClass: TranslateServiceMock },
                { provide: LoadingController, useClass: LoadingControllerMock },
                { provide: ToastController, useClass: ToastControllerMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: Device, useClass: DeviceMock },
                { provide: StatusBar, useClass: StatusBarMock }
            ],
            imports: [
                TranslateModule,
                FormsModule,
                IonicModule,
                IonicStorageModule,
                ReactiveFormsModule,
            ],
        });
    }

    // http://stackoverflow.com/questions/2705583/how-to-simulate-a-click-with-javascript
    public static eventFire(el: any, etype: string): void {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            let evObj: any = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }
}