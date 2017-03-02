import { Component,} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
import {ZoomPage} from '../zoom/zoom';
import {TestPage} from '../test-page/test-page';
import {AgendaPage} from '../agenda/agenda';
import {ReportPage} from '../report/report'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  BOOK_HEIGHT=4;
  constructor(public navCtrl: NavController,public platform: Platform,private translate: TranslateService) {
  translate.use('en');  
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
    this.navCtrl.push(ReportPage);
  }
  navSummary(){
   window.open("https://m3sport.biit-solutions.com/tracker"); 
  }
}

