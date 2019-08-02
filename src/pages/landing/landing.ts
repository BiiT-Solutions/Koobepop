import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { QRConfigurationPage } from '../qr-configuration/qr-configuration';

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
    private settings: SettingsProvider
  ) {

  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
    console.log('Loaded LandingPage')
    this.settings.load().subscribe(() => {
      if (this.settings.allSettings) {
        this.tokenRest.tokenStatus()
          .subscribe((status) => {
            if (status == 200 || status == 0) {
              this.navToHome();
            } else if (!this.connectivity.isOnline()) {
              this.navToHome();
            } else {
              this.navToLogin();
            }
          }, error => {
            console.log("Unable to retrieve token status:", error);
            if (error.status == 0 || error.status == 200) {
              this.navToHome();
            } else { //Another async call failed on the process
              this.navToLogin();
            }
            if (!this.connectivity.isOnline()) {
              this.translate.get("APP.UNABLE-TO-CONNECT-MSG")
                .subscribe((translation: string) => this.toaster.badToast(translation, 2500))
            }
          });
      } else {
        this.navCtrl.push(QRConfigurationPage)
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
