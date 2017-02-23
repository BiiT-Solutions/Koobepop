import { Component,} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { DetailsPage } from '../details/details';
import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
import {ZoomPage} from '../zoom/zoom';
import {TestPage} from '../test-page/test-page';
import {AgendaPage} from '../agenda/agenda';
import {ReportsPage} from '../reports/reports'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  BOOK_HEIGHT=4;
  constructor(public navCtrl: NavController,public platform: Platform,private translate: TranslateService) {
  translate.use('en');  
  }
  navSearchView(){
    this.navCtrl.push(SearchPage);
  }
  navDetails(){
    this.navCtrl.push(DetailsPage);
  }
  navAbout(){
    this.navCtrl.push(AboutPage);
  }
  navBook(){
    this.navCtrl.push(ZoomPage);
  }
  navTest(){
    this.navCtrl.push(TestPage);
  }
  navAgendaView(){
    this.navCtrl.push(AgendaPage);
  }
  navReportView(){
    this.navCtrl.push(ReportsPage);
  }
  navSummary(){
   window.open("https://m3sport.biit-solutions.com/tracker"); 
  }
}

