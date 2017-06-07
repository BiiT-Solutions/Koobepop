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
import { TaskItemComponent } from '../components/task/taskItem'

//Pages
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { AgendaPage } from '../pages/agenda/agenda';
import { ReportPage } from '../pages/report/report';
import { TestPage } from '../pages/test-page/test-page';
import { KnowPage } from '../pages/know/know';
import { VideoPage } from '../pages/video/video';
import { ShowExerciseInfoPage } from '../pages/show-exercise-info/show-exercise-info';
import { SummaryPage } from '../pages/summary/summary';
import { LoginPage } from '../pages/login/login';

//REST services
import { AppointmentsRestService } from '../providers/rest/appointmentsRestService';
import { TasksRestService } from '../providers/rest/tasksRestService';
import { AuthTokenRestService } from '../providers/rest/authTokenRestService';

//Storage providers
import { AppointmentsProvider } from '../providers/storage/appointmentsProvider';
import { TasksProvider } from '../providers/storage/tasksProvider';
import { TokenProvider } from '../providers/storage/tokenProvider';
import { UserProvider } from '../providers/storage/userProvider';
import {MessagesProvider} from '../providers/storage/messagesProvider';

//Services
import { ServicesManager } from '../providers/servicesManager';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {Push} from '@ionic-native/push';
import { NotificationMessageComponent } from '../components/notification-message/notification-message';
import { MessagesListComponent } from '../components/messages-list/messages-list';
import { PushNotificationsHandlerProvider } from '../providers/push-notifications-handler/push-notifications-handler';

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const cloudSettings: CloudSettings = {
  'core': { 'app_id': '  4a963128' },
  'push':{
    'sender_id':'489751559671',
    'pluginConfig':{
      'ios':{
        'badge':true,
        'sound':true
      },
      'android':{
        'iconColor':'#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    TestPage,
    ZoomableSlide,
    AgendaPage,
    ReportPage,
    KnowPage,
    VideoPage,
    EffortSelectorComponent,
    UnselConfirmationComponent,
    ShowExerciseInfoPage,
    SummaryPage,
    TaskItemComponent,
    LoginPage,
    NotificationMessageComponent,
    MessagesListComponent

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
    AboutPage,
    TestPage,
    AgendaPage,
    ReportPage,
    KnowPage,
    VideoPage,
    ShowExerciseInfoPage,
    SummaryPage,
    LoginPage,
    EffortSelectorComponent,
    UnselConfirmationComponent
  ],
  providers: [
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
    PushNotificationsHandlerProvider
  ]
})
export class AppModule { }
