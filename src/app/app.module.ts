import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HorizonalBookPage } from '../pages/horizontal-book/horizontal-book';
import { VerticalBookPage } from '../pages/vertical-book/vertical-book';
import { SearchPage } from '../pages/search/search';
import { CompaniesProvider } from '../providers/companies';
import { OptimizedBookPage } from '../pages/optimized-book/optimized-book';
import { DetailsPage } from '../pages/details/details';
import { TranslateModule,TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { HttpModule,Http } from '@angular/http';
import {AboutPage} from '../pages/about/about';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HorizonalBookPage,
    VerticalBookPage,
    SearchPage,
    OptimizedBookPage,
    DetailsPage,
    AboutPage
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
    HorizonalBookPage,
    VerticalBookPage,
    SearchPage,
    OptimizedBookPage,
    DetailsPage,
    AboutPage
  ],
  providers: [
    CompaniesProvider,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
