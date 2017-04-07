import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServicesManager } from '../../providers/persistenceManager';
import { HomePage } from '../home/home';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from 'ng2-translate';
import { Response } from '@angular/http';
import { ToastIssuer } from '../../providers/toastIssuer';

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
    public toaster: ToastIssuer,
    public loadingCtrl: LoadingController,
    public translateService:TranslateService) { 
      manager.getUser().subscribe(user=>{
        console.log(user)
        if(user!=null){
        this.id=user.patientId
        this.idIsSent = true;
        this.smsSent = true; 
      }
    });
    }

  sendId(){
    // Request Verification code
    this.idIsSent = true;
    this.manager.sendAuthCodeSMS(this.id,this.translateService.currentLang)
    .subscribe((res:Response)=>{
      
      if(res.status ==200){
        this.manager.setUser({patientId:this.id})
        this.smsSent = true;
      }else{
        this.idIsSent = false;
         this.toaster.badToast( res.status.toString());
      }
    },error=>{   
      this.toaster.badToast(error.json().error);
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
          this.toaster.goodToast("Login successfull");//LOGIN-SUCCESSFULL-TEXT
         
          this.navCtrl.setRoot(HomePage);
          this.navCtrl.popToRoot();
        }
      }, error => {
        loading.dismiss();
        let toast = this.toaster.badToast("Login fail")//LOGIN-FAIL-TEXT
    
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
          let toast = this.toaster.goodToast("Login successfull");
          this.navCtrl.setRoot(HomePage);
        }
      }, error => {
        loading.dismiss();
        this.toaster.badToast("Login error");
        console.error(error);
      });
  }

  public showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.showPass = input.type === 'text';
  }
}
