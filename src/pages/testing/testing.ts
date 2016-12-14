import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Testing page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html'
})
export class TestingPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello TestingPage Page');
  }

}
