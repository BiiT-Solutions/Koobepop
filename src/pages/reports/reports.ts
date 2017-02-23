import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import {ReportPage} from '../report/report';
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {
appointments;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.appointments=[
      {date:"07-2016",doctor:"Sammuel Maximus"}
      ,{date:"11-2016",doctor:"Sammuel Maximus"}
      ,{date:"02-2017",doctor:"Sammuel Maximus"}]
  }

  ionViewDidLoad() {
    
  }
  openItem(item: ItemSliding){
    for (let i = 0; i < this.appointments.length; i++) {
      if (this.appointments[i] == item) {
      }
    }
     this.navCtrl.push(ReportPage);
  }

}
