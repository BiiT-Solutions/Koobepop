import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import { ReportPage } from '../report/report';
import  {AppointmentsProvider} from '../../providers/appointments-provider';
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
  appointments;
  constructor(public navCtrl: NavController, public navParams: NavParams,public appointmentsProvider: AppointmentsProvider) {
    let callback = this.setAppointments;
    this.appointmentsProvider.requestAppointments({patientId:"21008286V"},callback);
    
    /*[
      { date: new Date("2016-07-12"), doctor: "Sam Maximus",type:"Basic" }
      , { date: new Date("2016-11-30"), doctor: "Sam Max",type:"Plus" }
      , { date: new Date("2017-02-23"), doctor: "Sam Max",type:"Basic" }]*/

  }

  ionViewDidLoad() {

  }
  setAppointments(app){
    this.appointments=app;
  }
  openItem(item: ItemSliding) {
   // for (let i = 0; i < this.appointments.length; i++) {
   //   if (this.appointments[i] == item) {
   //   }
   // }

        this.navCtrl.push(ReportPage);
  }

}
