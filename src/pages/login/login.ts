import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicesManager } from '../../providers/persistenceManager';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';
import { Response } from '@angular/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  id = "";
  pass = "";
  showPass: boolean = false;
  idIsSent:boolean = false;
  smsSent:boolean = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public translateService:TranslateService) { }

  sendId(){
    // Request Verification code
    this.idIsSent = true;
    this.manager.sendAuthCodeSMS(this.id,this.translateService.currentLang)
    .subscribe((res:Response)=>{
      if(res.status ==200){
        this.smsSent = true;
      }else{
        this.idIsSent = false;
        let toast = this.toastCtrl.create({
            message: "res.status",//TODO change 
            duration: 1500,
            cssClass: 'bad-toast'
          });
          toast.present();
      }
    },error=>{      
       let toast = this.toastCtrl.create({
            message: error.json().error,//LOGIN-SUCCESSFULL-TEXT
            duration: 1500,
            cssClass: 'bad-toast'
          });
          toast.present();
          this.idIsSent = false
    });
  }

  sendCode(){
     let loading = this.loadingCtrl.create({
      content: 'Please wait...'//WAIT-FOR-LOGIN-TEXT
    });
    loading.present();
    this.manager.loginWithUserPass(this.id, this.pass)
      .subscribe((authorized) => {
        loading.dismiss();
        if (authorized) {
          let toast = this.toastCtrl.create({
            message: "Login successfull",//LOGIN-SUCCESSFULL-TEXT
            duration: 1500,
            cssClass: 'good-toast'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.popToRoot();
        }
      }, error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "Login fail",//LOGIN-FAIL-TEXT
          duration: 1500,
          cssClass: 'bad-toast'
        });
        toast.present();
        console.error(error);
      });

  }
  changeId(){
    this.idIsSent = false;
    this.smsSent = false;
  }

  public login() {
    //Send request for a token to USMO 
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'//WAIT-FOR-LOGIN-TEXT
    });
    loading.present();
    this.manager.loginWithUserPass(this.id, this.pass)
      .subscribe((authorized) => {
        loading.dismiss();
        if (authorized) {
          let toast = this.toastCtrl.create({
            message: "Login successfull",//LOGIN-SUCCESSFULL-TEXT
            duration: 2000,
            cssClass: 'good-toast'
          });
          toast.present();
          this.navCtrl.setRoot(HomePage);
        }
      }, error => {
        loading.dismiss();
        let toast = this.toastCtrl.create({
          message: "Login fail",
          duration: 2000,
          cssClass: 'bad-toast'
        });
        toast.present();
        console.error(error);
      });
  }

  public showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.showPass = input.type === 'text';
  }
}
