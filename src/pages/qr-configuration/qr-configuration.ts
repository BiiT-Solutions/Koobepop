import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { QrDecryptProvider } from '../../providers/qr-decrypt/qr-decrypt';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-qr-configuration',
  templateUrl: 'qr-configuration.html',
})
export class QRConfigurationPage {
  manualInput
  hash = "";
  inputMethod = "scan";
  scanSub;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private qrScanner: QRScanner,
    private settings: SettingsProvider,
    private qrDecrypt: QrDecryptProvider,
    private toast: ToastIssuer,
    private translate: TranslateService
  ) {
    this.manualInput = false;
    settings.load()
      .subscribe();
    // this.text="constructor"
  }

  ionViewDidLoad() {
    this.scan();
  }

  scan() {
    //this.text="scan"
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          //this.text="scanning"
          // camera permission was granted
          // start scanning
          this.scanSub = this.qrScanner.scan()
            .subscribe((encryptedSettings: string) => {
              //this.text=settings;         
              try {
                this.qrDecrypt.decrypt(encryptedSettings).then((settings) => {
                  this.stopScan();
                  this.settings.setAll(JSON.parse(settings))
                  this.navCtrl.pop(); // get out
                });
              } catch (e) {
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

          //Show text-input where to paste settings hash
          this.showManualInput();
        }
      })
      .catch((e: any) => {
        console.error(e);
        this.showManualInput();
      });
  }

  stopScan(){
    window.document.querySelector('ion-app').classList.remove('transparentBody')
    this.qrScanner.hide(); // hide camera preview
    if (this.scanSub) {
      this.scanSub.unsubscribe();
    }
  }

  showManualInput() {
    this.inputMethod = "manual";  
  }

  saveSettings() {
    this.qrDecrypt.decrypt(this.hash)
      .then((settings) => {
        this.settings.setAll(JSON.parse(settings))
        this.navCtrl.pop(); // get out
      }, e => {
        console.warn("Error parsing configuration hash");
        this.showError(this.translate.instant('QR-CONFIGURATION.MANUAL.ERROR-PARSING-HASH'));
      });
  }

  showError(msg) {
    this.toast.badToast(msg)
  }
}
