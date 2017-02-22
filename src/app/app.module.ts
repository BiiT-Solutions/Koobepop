import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { CompaniesProvider } from '../providers/companies';
import { BookPage } from '../pages/zoom/book';
import { DetailsPage } from '../pages/details/details';
import { TranslateModule,TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule,Http } from '@angular/http';
import {AboutPage} from '../pages/about/about';
import {ZoomPage} from '../pages/zoom/zoom';
import {TestPage} from '../pages/test-page/test-page';
import {APP_CONFIG, AppConfig} from './app.config'

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    BookPage,
    DetailsPage,
    AboutPage,
    ZoomPage,
    TestPage
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
    SearchPage,
    BookPage,
    DetailsPage,
    AboutPage,
    ZoomPage,
    TestPage
  ],
  providers: [
    CompaniesProvider,
    {provide:APP_CONFIG, useValue: AppConfig},
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
