import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserGuardPage } from '../user-guard/user-guard';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  openUserGuard() {
    this.navCtrl.push(UserGuardPage)
  }
  openAbout(){}
  openPrivacyPolicy(){}
}
