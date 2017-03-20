import { Component, } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
import { ZoomPage } from '../zoom/zoom';
import { TestPage } from '../test-page/test-page';
import { AgendaPage } from '../agenda/agenda';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import { AppointmentsProvider } from '../../providers/appointmentsProvider';
import { IAppointment } from '../../models/appointmentI';
import { StorageService } from '../../providers/storageService';
import { SummaryPage } from '../summary/summary';
import { TasksRestProvider } from '../../providers/tasksProvider';
import { ITask } from '../../models/taskI';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //Legacy TODO remove
  BOOK_HEIGHT = 4;

  constructor(public navCtrl: NavController,
    public platform: Platform,
    private translate: TranslateService,
    private appointmentsProvider: AppointmentsProvider,
    private tasksProvider: TasksRestProvider,
    private storageService: StorageService) {  }

  ionViewDidLoad() {

  }
  navAbout() {
    this.navCtrl.push(AboutPage);
  }
  navBook() {
    this.navCtrl.push(ZoomPage);
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

