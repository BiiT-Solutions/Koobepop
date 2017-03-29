import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as localForage from 'localforage';
import { AuthTokenService } from '../../providers/authTokenService';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  id = "";
  pass = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public tokenService: AuthTokenService) { }

  ionViewDidLoad() { }

  login() {
    //Send request for a token to USMO 
    this.tokenService.requestToken("21008286V","XXXXYYYY");
      // If we recieve the token, save the user and the token
      // From this we can load the appointments data and so on.

      // Else show loggin error msg
  }
  getToken(){
    this.tokenService.getToken();
  }

}
