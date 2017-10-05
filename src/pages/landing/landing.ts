import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConnectivityService } from '../../providers/connectivity-service';
import { ToastIssuer } from '../../providers/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service';

@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(
    public navCtrl: NavController,
    private tokenRest: AuthTokenRestService,
    private connectivity: ConnectivityService,
    private translate: TranslateService,
    private toaster: ToastIssuer,
  ) { }

  ionViewDidLoad() {
    this.tokenRest.tokenStatus()
      .subscribe((status) => {

        if (status == 200) {
          this.navToHome();
        } else if (!this.connectivity.isOnline()) {
          this.navToHome();
        } else {
          this.navToLogin();
        }
      }, error => {

        if (error.status == 0) {
          this.navToHome();
        } else { //Another async call failed on the process
          this.navToLogin();
        }
        if (!this.connectivity.isOnline()) {
          this.translate.get("APP.UNABLE-TO-CONNECT-MSG")
            .subscribe((translation: string) => this.toaster.badToast(translation, 2500))
        }
      });
  }

  private navToLogin() {
    this.navCtrl.setRoot(LoginPage)
  }
  private navToHome() {
    this.navCtrl.setRoot(HomePage)
  }

}
