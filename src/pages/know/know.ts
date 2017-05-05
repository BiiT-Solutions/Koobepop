import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowExerciseInfoPage } from '../show-exercise-info/show-exercise-info';

/**
 * This Page displays information from some topics 
 */
@Component({
  selector: 'page-know',
  templateUrl: 'know.html'
})
export class KnowPage {
  topics=[
    {image:'assets/icons/antropometry.svg',
      name:'anthropometry'},
    {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
      {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
      {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
      {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
      {image:'assets/icons/spirometry.svg',
      name:'spirometry'}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }
  displayInfo(topic:any){
    //Show some info
    this.navCtrl.push(ShowExerciseInfoPage)
  }

}
