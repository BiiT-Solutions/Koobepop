import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { QrDecryptProvider } from '../../providers/qr-decrypt/qr-decrypt';

@Component({
  selector: 'page-qr-configuration',
  templateUrl: 'qr-configuration.html',
})
export class QRConfigurationPage {
//text:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private qrScanner: QRScanner, 
    private settings:SettingsProvider,
    private qrDecrypt: QrDecryptProvider
  ) {
    settings.load().subscribe(()=>console.log('settings are loaded'));
   // this.text="constructor"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrConfigurationPage');
    this.scan();
  }

  scan(){
    //this.text="scan"
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
      //this.text="scanning"
       // camera permission was granted
       // start scanning
       let scanSub = this.qrScanner.scan()
       .subscribe((encryptedSettings: string) => {
         console.log('Scanned something', encryptedSettings);
         //this.text=settings;         
         try{
            this.qrDecrypt.decrypt(encryptedSettings).then((settings)=>{
                this.settings.setAll(settings)
                window.document.querySelector('ion-app').classList.remove('transparentBody')
                this.qrScanner.hide(); // hide camera preview
                scanSub.unsubscribe(); // stop scanning
                this.navCtrl.pop(); // get out
            });
         }catch(e){
             console.error('Error parsing data ', e)
         }         
       });

       window.document.querySelector('ion-app').classList.add('transparentBody')
       // show camera preview
       this.qrScanner.show();

       // wait for user to scan something, then the observable callback will be called

     } else if (status.denied) {
       //this.text="Scan :("
       this.qrScanner.openSettings();
     } else {
      //this.text="Scan?"
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => {
      console.error(e); 
  //this.text = 'Error ' + e;
  // TODO - This is a testing feature and should be removed before releasing
  if(e=='cordova_not_available'){
        let encryptedSettings ="fce49af8bb8bb9965913f678388fe43ac3ab6ac2f04b951ad6af54fbb2edf92e045958dd872ed746bb2e1ac8a004170d3cdf5cb6d04f8627c1105a7d10cd880da4f52a2422bc27291d7cb00419eefaacb8ef8f8fca89163730b8daa6e5510b4a7a27facd9be76814c49bc605a28980f338a6fa7c081695dd636c5788b86a9a5b281e2c5683d326b5d73edce2b139df8097ff1553c5b1e7a1215c936e96d6592ae973dd329a11db295150b7c4b56a7a388b89cecf98abe5847ca1d6d693ae261059374b4ff689eb2cd46380f7fd21633d1448c79e9cbdcc477175b84be91e2a8b5e8893c8f4614cd5441a84d63861fc7906b286a332755d275f33ee934fb70a57fb07fe969ca48c2d17cdf1c6e0602f1964122735b3e4b4632082e96e9451ef0c";
        
        this.qrDecrypt.decrypt(encryptedSettings).then((settings)=>{
            console.log(settings)
            this.settings.setAll(JSON.parse(settings))
            this.navCtrl.pop(); // get out
        });
    }
});
}

}
