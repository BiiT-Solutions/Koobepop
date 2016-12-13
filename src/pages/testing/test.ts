import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-testing',
  templateUrl: 'testing.html'
})

export class TestingPage {
  
  constructor(public navCtrl: NavController) {}
  
  isTrue(): boolean {
    return true;
  }
}

