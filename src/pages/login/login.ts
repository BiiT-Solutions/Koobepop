import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { HomePage } from '../home/home';
import { TranslateService } from '@ngx-translate/core';
import { Response } from '@angular/http';
import { ToastIssuer } from '../../providers/toastIssuer';
import { UserProvider } from '../../providers/storage/userProvider';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private id = "";
  private pass = "";
  private showPass: boolean = false;
  private idIsSent: boolean = false;
  private smsSent: boolean = false;

  constructor(public navCtrl: NavController,
    public manager: ServicesManager,
    public toaster: ToastIssuer,
    public loadingCtrl: LoadingController,
    public translateService: TranslateService,
    public userProvider: UserProvider) {

    userProvider.getUser().subscribe(user => {
      if (user != null) {
        this.id = user.patientId
        this.idIsSent = true;
        this.smsSent = true;
      }
    });
  }

  public sendId(): void {
    // Request Verification code
    this.idIsSent = true;
    this.manager.sendAuthCodeSMS(this.id, this.translateService.currentLang)
      .subscribe((res: Response) => {
        if (res.status == 200) {
          this.smsSent = true;
        } else {
          this.idIsSent = false;
          this.smsSent = false;
          this.toaster.badToast(res.status.toString());
        }
      }, error => {
        this.toaster.badToast(error.json().error);
        this.idIsSent = false;
        this.smsSent = false;
      });
  }

  public changeId(): void {
    this.idIsSent = false;
    this.smsSent = false;
  }

  public login(): void {
    //Send request for a token to USMO 
    let loading = this.loadingCtrl.create({
      content: this.translateService.instant('LOGIN.WAIT-MSG')
    });
    loading.present();

    this.manager.loginWithUserPass(this.id, this.pass)
      .subscribe((authorized) => {
        loading.dismiss();
        if (authorized) {
          this.toaster.goodToast("Login successfull");
          this.navCtrl.setRoot(HomePage);
        }
      }, error => {
        loading.dismiss();
        this.toaster.badToast("Login error");
        console.error(error);
      });
  }


  public showPassword(input: any): void {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.showPass = input.type === 'text';
  }
}
