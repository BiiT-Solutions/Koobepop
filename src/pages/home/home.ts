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
    private storageService: StorageService) {
    translate.use('en');

    storageService.setUser({ name: "Alejandro", surname: "Melcón", id: "21008286V" })
      .then((user) =>
        storageService.getUser()
          .then(user => {
            appointmentsProvider.requestAppointments({"patientId":user.id})
              .subscribe((appointments: IAppointment[]) => {
                storageService.setAppointments(appointments);
              })
          }).catch(e=>console.log("Server error "+e))
      ).catch(e=>console.log("Data storage "+e));

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

