import { Component, } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ZoomPage } from '../zoom/zoom';
import { AgendaPage } from '../agenda/agenda';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import { SummaryPage } from '../summary/summary';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Legacy TODO remove
  BOOK_HEIGHT = 4;

  constructor(public navCtrl: NavController) {  }

  ionViewDidLoad() {

  }
  navAbout() {
    this.navCtrl.push(AboutPage);
  }
  navBook() {
    this.navCtrl.push(ZoomPage);
  }
  navTest() {
    
    this.navCtrl.push(LoginPage);
  }
  navAgendaView() {
    this.navCtrl.push(AgendaPage);
  }
  navReportView() {
    this.navCtrl.push(ReportPage);
  }
  navKnow() {
    this.navCtrl.push(KnowPage);
  }
  navSummary() {
    this.navCtrl.push(SummaryPage);
  }

}

