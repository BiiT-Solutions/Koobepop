import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Device } from '@ionic-native/device';
import { Network } from '@ionic-native/network';
import { Push } from '@ionic-native/push';
import { QRScanner } from '@ionic-native/qr-scanner';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Globalization } from '@ionic-native/globalization/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
//Components
import { EffortSelectorComponent } from '../components/effort-selector/effort-selector';
import { InfographicItemComponent } from '../components/infographic-item/infographic-item';
import { InfographicSlideComponent } from '../components/infographic-slide/infographic-slide';
import { KppCheckBoxComponent } from '../components/kpp-check-box/kpp-check-box';
import { KppZoomPanComponent } from '../components/kpp-zoom-pan/kpp-zoom-pan';
import { LoadingComponent } from '../components/loading/loading';
import { MessagesListComponent } from '../components/messages-list/messages-list';
import { NotificationMessageComponent } from '../components/notification-message/notification-message';
import { TaskItemComponent } from '../components/task-item/task-item';
import { TasksSlideComponent } from '../components/tasks-slide/tasks-slide';
import { UnselConfirmationComponent } from '../components/unsel-confirmation/unsel-confirmation';
//Pages
import { HomePage } from '../pages/home/home';
import { KnowPage } from '../pages/know/know';
import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';
import { QRConfigurationPage } from '../pages/qr-configuration/qr-configuration';
import { ReportPage } from '../pages/report/report';
import { SettingsPage } from '../pages/settings/settings';
import { SummaryPage } from '../pages/summary/summary';
import { TestPage } from '../pages/test-page/test-page';
import { UserGuardPage } from '../pages/user-guard/user-guard';
import { TaskInformationPage } from '../pages/work-book/task-information/task-information';
import { WorkBookPage } from '../pages/work-book/work-book';
//Services
import { ConnectivityService } from '../providers/connectivity-service/connectivity-service';
import { PushNotificationsHandlerProvider } from '../providers/push-notifications-handler/push-notifications-handler';
import { QrDecryptProvider } from '../providers/qr-decrypt/qr-decrypt';
//REST services
import { AppointmentsRestService } from '../providers/rest/appointments-rest-service/appointments-rest-service';
import { AuthTokenRestService } from '../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { MessagesRestService } from '../providers/rest/messages-rest-service/messages-rest-service';
import { RegisterPushTokenRestService } from '../providers/rest/register-push-token-rest-service/register-push-token-rest-service';
import { ReportsRestService } from '../providers/rest/reports-rest-service/reports-rest-service';
import { TasksRestService } from '../providers/rest/tasks-rest-service/tasks-rest-service';
//Storage providers
import { AppointmentsProvider } from '../providers/storage/appointments-provider/appointments-provider';
import { MessagesProvider } from '../providers/storage/messages-provider/messages-provider';
import { ReportsProvider } from '../providers/storage/reports-provider/reports-provider';
import { SettingsProvider } from '../providers/storage/settings/settings';
import { StorageServiceProvider } from '../providers/storage/storage-service/storage-service';
import { TasksProvider } from '../providers/storage/tasks-provider/tasks-provider';
import { TokenProvider } from '../providers/storage/token-provider/token-provider';
import { UserProvider } from '../providers/storage/user-provider/user-provider';
import { TaskSyncronizationProvider } from '../providers/task-syncronization/task-syncronization';
import { TasksManager } from '../providers/tasksManager/tasksManager';
import { ToastIssuer } from '../providers/toastIssuer/toastIssuer';
import { UserGuardProvider } from '../providers/user-guard/user-guard';
import { MyApp } from './app.component';
import { APP_CONFIG, AppConfig } from './app.config';
// Pipes
import { ALL_PIPES } from '../pipes/allPipes';
// Languages
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeNl from '@angular/common/locales/nl';
import localeEn from '@angular/common/locales/en';
//import { localeEs } from '../assets/i18n/angular-locale_es';
//import { localeNl } from '../assets/i18n/angular-locale_nl';


export function createTranslateLoader(http: HttpClient):TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeEs, 'es');
registerLocaleData(localeNl, 'nl');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    MyApp,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    NotificationMessageComponent,
    MessagesListComponent,
    TasksSlideComponent,
    TaskItemComponent,
    KppCheckBoxComponent,
    InfographicSlideComponent,
    InfographicItemComponent,
    KppZoomPanComponent,
    LoadingComponent,
    HomePage,
    TestPage,
    WorkBookPage,
    ReportPage,
    KnowPage,
    TaskInformationPage,
    PrivacyPolicyPage,
    SummaryPage,
    LoginPage,
    LandingPage,
    QRConfigurationPage,
    UserGuardPage,
    SettingsPage,
    ALL_PIPES
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    HomePage,
    TestPage,
    WorkBookPage,
    ReportPage,
    KnowPage,
    TaskInformationPage,
    SummaryPage,
    LoginPage,
    LandingPage,
    QRConfigurationPage,
    UserGuardPage,
    SettingsPage,
    PrivacyPolicyPage
  ],
  providers: [
    RegisterPushTokenRestService,
    Push,
    StatusBar,
    Globalization,
    SplashScreen,
    Network,
    Device,
    ConnectivityService,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: window.navigator.language },
    ToastIssuer,
    InAppBrowser,
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
    QRScanner,
    QrDecryptProvider,
    UserGuardProvider,
    TaskSyncronizationProvider,
    TasksManager
  ]
})
export class AppModule { }
