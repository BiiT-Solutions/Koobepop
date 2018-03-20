import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, AppConfig } from './app.config';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';
//Components
import { EffortSelectorComponent } from '../components/effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../components/unsel-confirmation/unsel-confirmation';

//Pages
import { HomePage } from '../pages/home/home';
import { WorkBookPage } from '../pages/work-book/work-book';
import { ReportPage } from '../pages/report/report';
import { TestPage } from '../pages/test-page/test-page';
import { KnowPage } from '../pages/know/know';
import { TaskInformationPage } from '../pages/work-book/task-information/task-information';
import { SummaryPage } from '../pages/summary/summary';
import { LoginPage } from '../pages/login/login';

//REST services
import { AppointmentsRestService } from '../providers/rest/appointments-rest-service/appointments-rest-service';
import { TasksRestService } from '../providers/rest/tasks-rest-service/tasks-rest-service';
import { AuthTokenRestService } from '../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { ReportsRestService } from '../providers/rest/reports-rest-service/reports-rest-service';

//Storage providers
import { AppointmentsProvider } from '../providers/storage/appointments-provider/appointments-provider';
import { TasksProvider } from '../providers/storage/tasks-provider/tasks-provider';
import { TokenProvider } from '../providers/storage/token-provider/token-provider';
import { UserProvider } from '../providers/storage/user-provider/user-provider';
import { MessagesProvider } from '../providers/storage/messages-provider/messages-provider';

//Services
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer/toastIssuer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Push } from '@ionic-native/push';
import { NotificationMessageComponent } from '../components/notification-message/notification-message';
import { MessagesListComponent } from '../components/messages-list/messages-list';
import { PushNotificationsHandlerProvider } from '../providers/push-notifications-handler/push-notifications-handler';
import { RegisterPushTokenRestService } from '../providers/rest/register-push-token-rest-service/register-push-token-rest-service';
import { TasksSlideComponent } from '../components/tasks-slide/tasks-slide';
import { TaskItemComponent } from '../components/task-item/task-item';
import { KppCheckBoxComponent } from '../components/kpp-check-box/kpp-check-box';
import { InfographicSlideComponent } from '../components/infographic-slide/infographic-slide';
import { InfographicItemComponent } from '../components/infographic-item/infographic-item';
import { KppZoomPanComponent } from '../components/kpp-zoom-pan/kpp-zoom-pan';
import { MessagesRestService } from '../providers/rest/messages-rest-service/messages-rest-service';
import { StorageServiceProvider } from '../providers/storage/storage-service/storage-service';
import { ReportsProvider } from '../providers/storage/reports-provider/reports-provider';
import { LoadingComponent } from '../components/loading/loading';
import { LandingPage } from '../pages/landing/landing';
import { FillFormPage } from '../pages/fill-form/fill-form';
import { FormRunnerModule } from 'formrunner-js';
import { SettingsProvider } from '../providers/storage/settings/settings';
import { QRConfigurationPage } from '../pages/qr-configuration/qr-configuration';
//import { QRScanner } from '@ionic-native/qr-scanner';
import { QrDecryptProvider } from '../providers/qr-decrypt/qr-decrypt';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    WorkBookPage,
    ReportPage,
    KnowPage,
    TaskInformationPage,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    SummaryPage,
    LoginPage,
    NotificationMessageComponent,
    MessagesListComponent,
    TasksSlideComponent,
    TaskItemComponent,
    KppCheckBoxComponent,
    InfographicSlideComponent,
    InfographicItemComponent,
    KppZoomPanComponent,
    LoadingComponent,
    LandingPage,
    FillFormPage,
    QRConfigurationPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      },
    }),
    FormRunnerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TestPage,
    WorkBookPage,
    ReportPage,
    KnowPage,
    TaskInformationPage,
    SummaryPage,
    LoginPage,
    LandingPage,
    FillFormPage,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    QRConfigurationPage    
  ],
  providers: [
    RegisterPushTokenRestService,
    Push,
    StatusBar,
    SplashScreen,
    Network,
    Device,
    ConnectivityService,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastIssuer,
    AppointmentsRestService,
    AppointmentsProvider,
    TasksRestService,
    TasksProvider,
    AuthTokenRestService,
    TokenProvider,
    UserProvider,
    MessagesProvider,
    MessagesRestService,
    PushNotificationsHandlerProvider,
    ReportsRestService,
    StorageServiceProvider,
    ReportsProvider,
    SettingsProvider,
   // QRScanner,
    QrDecryptProvider,
    BarcodeScanner
  ]
})
export class AppModule { }
