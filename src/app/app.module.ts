import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { APP_CONFIG, AppConfig } from './app.config';

//Components
import { ZoomableSlide } from '../components/zoomable-slide/zoomableSlide';
import { EffortSelectorComponent } from '../components/effort-selector/effort-selector';
import { TaskComponent } from '../components/task/task'

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

import { ZoomPage } from '../pages/zoom/zoom';
import { BookPage } from '../pages/zoom/book';
//
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { Device } from '@ionic-native/device';

//Providers REST services
import { AppointmentsProvider } from '../providers/appointmentsProvider';
import { TasksRestProvider } from '../providers/tasksRestProvider';
import { CompaniesProvider } from '../providers/companies';

//Services
import { StorageService } from '../providers/storageService';
import { ServicesManager } from '../providers/servicesManager';
import { AuthTokenService } from '../providers/authTokenService';
import { ConnectivityService } from '../providers/connectivity-service';
import { ToastIssuer } from '../providers/toastIssuer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BookPage,
    AboutPage,
    ZoomPage,
    TestPage,
    ZoomableSlide,
    AgendaPage,
    ReportPage,
    KnowPage,
    VideoPage,
    EffortSelectorComponent,
    ShowExerciseInfoPage,
    SummaryPage,
    TaskComponent,
    LoginPage

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
    BookPage,
    AboutPage,
    ZoomPage,
    TestPage,
    AgendaPage,
    ReportPage,
    KnowPage,
    VideoPage,
    ShowExerciseInfoPage,
    SummaryPage,
    LoginPage,
    EffortSelectorComponent
  ],
  providers: [
   // Storage,
   StatusBar,
   SplashScreen,
   Network,
    Device,
    ConnectivityService,
    ServicesManager,
    TasksRestProvider,
    CompaniesProvider,
    AppointmentsProvider,
    StorageService,
    AuthTokenService,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastIssuer
  ]
})
export class AppModule { }
