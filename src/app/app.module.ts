import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CompaniesProvider } from '../providers/companies';
import { AppointmentsProvider } from '../providers/appointments-provider';
import { BookPage } from '../pages/zoom/book';
import { TranslateModule,TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule,Http } from '@angular/http';
import {AboutPage} from '../pages/about/about';
import {ZoomPage} from '../pages/zoom/zoom';
import { AgendaPage } from '../pages/agenda/agenda';
import {ReportPage} from '../pages/report/report';
import {TestPage} from '../pages/test-page/test-page';
import {ZoomableSlide} from '../components/zoomable-slide/zoomableSlide';
import {APP_CONFIG, AppConfig} from './app.config';
import { KnowPage } from '../pages/know/know';
import { VideoPage } from '../pages/video/video';
import { EffortSelectorComponent } from '../components/effort-selector/effort-selector';


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
    EffortSelectorComponent
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
    EffortSelectorComponent
  ],
  providers: [
    CompaniesProvider,
    AppointmentsProvider,
    {provide:APP_CONFIG, useValue: AppConfig},
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
