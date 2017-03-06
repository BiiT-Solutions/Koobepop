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
  topics=
    [
    {image:'assets/images/antropometry.svg',
      name:'antropometry'},
    {image:'assets/images/spirometry.svg',
      name:'spirometry'}]
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }
  displayInfo(topic:any){
    //Show some info
  }

}
