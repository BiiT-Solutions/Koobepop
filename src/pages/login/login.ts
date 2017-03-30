import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PersistenceManager } from '../../providers/persistenceManager';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  id = "";
  pass = "";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: PersistenceManager,
    public loadingCtrl: LoadingController) { }

  ionViewDidLoad() { }

  login() {
    //Send request for a token to USMO 
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    this.manager.loginWithUserPass(this.id,this.pass)
    .subscribe((authorized)=>{
      loading.dismiss();
      console.log("Authorized: "+authorized);
      if(authorized){
        this.navCtrl.push(HomePage)
      }    
  },error=>{
    loading.dismiss();
    console.error(error);
    }
   );
    // If we recieve the token, save the user and the token
    // From this we can load the appointments data and so on.

    // Else show loggin error msg
  }
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }
  loadData() {
    
    this.manager.setUp();
  }

}
