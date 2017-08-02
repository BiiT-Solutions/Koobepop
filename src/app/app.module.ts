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
import { ZoomableSlide } from '../components/zoomable-slide/zoomableSlide';
import { EffortSelectorComponent } from '../components/effort-selector/effort-selector';
import { UnselConfirmationComponent } from '../components/unsel-confirmation/unsel-confirmation';
import { TaskComponent } from '../components/task/taskItem'

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
import { AppointmentsRestService } from '../providers/rest/appointmentsRestService';
import { TasksRestService } from '../providers/rest/tasksRestService';
import { AuthTokenRestService } from '../providers/rest/authTokenRestService';
import { ReportsRestService } from '../providers/rest/reports-rest-service';

//Storage providers
import { AppointmentsProvider } from '../providers/storage/appointmentsProvider';
import { TasksProvider } from '../providers/storage/tasksProvider';
import { TokenProvider } from '../providers/storage/tokenProvider';
import { UserProvider } from '../providers/storage/userProvider';
import { MessagesProvider } from '../providers/storage/messagesProvider';

//Services
import { ServicesManager } from '../providers/servicesManager';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Push } from '@ionic-native/push';
import { NotificationMessageComponent } from '../components/notification-message/notification-message';
import { MessagesListComponent } from '../components/messages-list/messages-list';
import { PushNotificationsHandlerProvider } from '../providers/push-notifications-handler/push-notifications-handler';
import { RegisterPushTokenRestService } from '../providers/rest/register-push-token.rest-service';
import { ZoomPanDirective } from '../directives/zoom-pan/zoom-pan';
import { TasksSlideComponent } from '../components/tasks-slide/tasks-slide';
import { TaskItemComponent } from '../components/task-item/task-item';
import { KppCheckBoxComponent } from '../components/kpp-check-box/kpp-check-box';
import { InfographicSlideComponent } from '../components/infographic-slide/infographic-slide';
import { InfographicItemComponent } from '../components/infographic-item/infographic-item';
import { KppZoomPanComponent } from '../components/kpp-zoom-pan/kpp-zoom-pan';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TestPage,
    ZoomableSlide,
    WorkBookPage,
    ReportPage,
    KnowPage,
    TaskInformationPage,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    SummaryPage,
    TaskComponent,
    LoginPage,
    NotificationMessageComponent,
    MessagesListComponent,
    ZoomPanDirective,
    TasksSlideComponent,
    TaskItemComponent,
    KppCheckBoxComponent,
    InfographicSlideComponent,
    InfographicItemComponent,
    KppZoomPanComponent

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
      }
    })

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
    EffortSelectorComponent,
    UnselConfirmationComponent
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
    ServicesManager,
    AppointmentsRestService,
    AppointmentsProvider,
    TasksRestService,
    TasksProvider,
    AuthTokenRestService,
    TokenProvider,
    UserProvider,
    MessagesProvider,
    PushNotificationsHandlerProvider,
    ReportsRestService
  ]
})
export class AppModule { }
