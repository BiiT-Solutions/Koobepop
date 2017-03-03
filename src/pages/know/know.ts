import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * This Page displays information from some topics 
 */
@Component({
  selector: 'page-know',
  templateUrl: 'know.html'
})
export class KnowPage {
  topics=[
    ['Anthropometry','100 FMS',' Basic Test'],
    ['1','2','3'],
    ['4','5','6']
    ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }

}
