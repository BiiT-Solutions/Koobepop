import { Component, } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { AgendaPage } from '../agenda/agenda';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import { SummaryPage } from '../summary/summary';
import { TestPage } from '../test-page/test-page';
import { ServicesManager } from '../../providers/servicesManager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController,
              public manager: ServicesManager) {  }

  ionViewDidLoad() {
    this.manager.startContinuousAppointmentCheck(30000);
  }

  navAbout() {
    this.navCtrl.push(AboutPage);
  }

  navTest() {
    this.navCtrl.push(TestPage);
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

