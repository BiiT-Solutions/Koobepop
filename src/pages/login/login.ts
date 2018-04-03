import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';
import { Response } from '@angular/http';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';
import { AuthTokenRestService } from '../../providers/rest/authentication-token-rest-service/authentication-token-rest-service';
import { TokenProvider } from '../../providers/storage/token-provider/token-provider';
import { UserModel } from '../../models/user.model';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { ConnectivityService } from '../../providers/connectivity-service/connectivity-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public id = "";
  public pass = "";
  public showPass: boolean = false;
  public idIsSent: boolean = false;
  public smsSent: boolean = false;

  constructor(
    public navCtrl: NavController,
    public toaster: ToastIssuer,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public userProvider: UserProvider,
    public authProv: AuthTokenRestService,
    public tokenProv: TokenProvider,
    public settings: SettingsProvider,
    public connection: ConnectivityService
  ) {
    userProvider.getUser()
      .subscribe(user => {
        if (user != null) {
          this.id = user.patientId;
          this.idIsSent = true;
          this.smsSent = true;
        }
      });
    settings.load().subscribe(()=>{
      const set = settings.allSettings;
      if(set.patientId){
        this.id=set.patientId
        this.sendId();
      }
    })
  }

  ionViewWillEnter() {
  }

  public sendId(): void {
    // Request Verification code
    this.idIsSent = true;
    if(this.connection.isOnline()){
    this.authProv.requestSendAuthCodeSMS(this.id, this.translateService.currentLang)
      .subscribe((res: Response) => {
        if (res.status == 200) {
          this.smsSent = true;
          const user = new UserModel();
          user.patientId = this.id;
          this.userProvider.setUser(user).subscribe();
        } else {
          this.idIsSent = false;
          this.smsSent = false;
          this.toaster.badToast(res.status.toString());
        }
      }, error => {
        try {
          this.toaster.badToast( this.translateService.instant('LOGIN.INVALID-USER-MSG'));
        } catch (error) {
          this.toaster.badToast(this.translateService.instant('LOGIN.ERROR-SENDING-MSG'));
        }
        this.idIsSent = false;
        this.smsSent = false;
      });
    } else{
      this.toaster.badToast(this.translateService.instant('LOGIN.NO-CONNECTION'));
    }
  }

  public resendSMS(): void {
    this.idIsSent = false;
    this.smsSent = false;
    this.sendId();
  }

  public login(): void {
    //Send request for a token to USMO
    const loading = this.loadingCtrl.create({
      content: this.translateService.instant('LOGIN.WAIT-MSG')
    });

    loading.present();

    this.authProv.requestToken(this.id, this.pass)
      .subscribe((token: string) => {
        this.tokenProv.setToken(token).subscribe(() => {
          loading.dismiss();
          if (token) {
            this.toaster.goodToast(this.translateService.instant('LOGIN.SUCCESS'));
            this.navCtrl.setRoot(HomePage);
          }
        });
      }, error => {
        loading.dismiss();
        this.toaster.badToast(this.translateService.instant('LOGIN.ERROR'));
        console.error(error);
      });
  }

  public showPassword(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.showPass = input.type === 'text';
  }
}
