import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';

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

//Providers REST services
import { AppointmentsProvider } from '../providers/appointmentsProvider';
import { TasksRestProvider } from '../providers/tasksProvider';
import { ResultsProvider } from '../providers/resultsProvider';
import { CompaniesProvider } from '../providers/companies';

//Services
import { StorageService } from '../providers/storageService';
import { PersistenceManager } from '../providers/persistenceManager';


export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
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
    HttpModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
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
    PersistenceManager,
    TasksRestProvider,
    CompaniesProvider,
    AppointmentsProvider,
    ResultsProvider,
    StorageService,
    { provide: APP_CONFIG, useValue: AppConfig },
    { provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule { }
