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
   //TODO Provider for the patient
    this.appointmentsProvider.requestAppointments({patientId:"21008286V"})
    .subscribe(res=>{this.appointments = res;console.log(res)});
    
    /*[
      { date: new Date("2016-07-12"), doctor: "Sam Maximus",type:"Basic" }
      , { date: new Date("2016-11-30"), doctor: "Sam Max",type:"Plus" }
      , { date: new Date("2017-02-23"), doctor: "Sam Max",type:"Basic" }]*/

  }

  ionViewDidLoad() {

  }
  openItem(item: ItemSliding) {
        this.navCtrl.push(ReportPage);
  }

}
