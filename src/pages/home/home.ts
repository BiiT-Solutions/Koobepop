import { Component, } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
import { ZoomPage } from '../zoom/zoom';
import { TestPage } from '../test-page/test-page';
import { AgendaPage } from '../agenda/agenda';
import { ReportPage } from '../report/report';
import { KnowPage } from '../know/know';
import * as localForage from 'localforage';
import { AppointmentsProvider } from '../../providers/appointments-provider';
import { IAppointment } from '../../models/appointmentI';
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
    private appointmentsProvider: AppointmentsProvider) {
    translate.use('en');
    localForage.config({});
    localForage.setItem('userName', 'Alejandro');
    // Initialize with the user's data
    // Just in case something has changed
    localForage.setItem('userId', '21008286V')
      .then(event => {
        localForage.getItem("userId")
          .then((id: string) => {
            this.appointmentsProvider.requestAppointments({ patientId: id })
              .subscribe((res: IAppointment[]) => {
                localForage.setItem("appointments", res);
              
            });
          }).catch(e => console.log(e))
      });
  }
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
    window.open("https://m3sport.biit-solutions.com/tracker");
  }

}

