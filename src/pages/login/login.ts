import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  id="";
  pass="";
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {}

  login(){
    //Send request for a token to USMO 

      // If we recieve the token, save the user and the token
      // From this we can load the appointments data and so on.

      // Else show loggin error msg
  }

}
