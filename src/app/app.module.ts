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


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HorizonalBookPage,
    VerticalBookPage,
    SearchPage,
    OptimizedBookPage,
    DetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HorizonalBookPage,
    VerticalBookPage,
    SearchPage,
    OptimizedBookPage,
    DetailsPage
  ],
  providers: [
    CompaniesProvider,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
