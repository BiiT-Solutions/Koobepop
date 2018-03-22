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
    public qrScanner: QRScanner,
    public settings: SettingsProvider,
    public qrDecrypt: QrDecryptProvider,
    public toast: ToastIssuer,
    public translate: TranslateService
  ) {
    this.manualInput = false;
    settings.load()
      .subscribe();
  }

  ionViewDidLoad() {
    this.scan();
  }

  scan() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.scanSub = this.qrScanner.scan()
            .subscribe((encryptedSettings: string) => {
              try {
                this.hash = encryptedSettings;
                this.saveSettings()
                  .then(() => {
                    this.stopScan();
                    this.navCtrl.pop();
                  },e => {
                      console.warn("Error parsing configuration hash");
                      this.showError(this.translate.instant('QR-CONFIGURATION.MANUAL.ERROR-PARSING-HASH'));
                      this.scan();
                    });
              } catch (e) {
                console.warn('Error parsing data ', e)
              }
            });
         this.setTransparentBackground();
          this.qrScanner.show();
        } else if (status.denied) {       
          this.qrScanner.openSettings();
        } else {
          this.showManualInput();
        }
      })
      .catch((e: any) => {
        console.error(e);
        this.showManualInput();
      });
  }

  stopScan() {
    this.setOpaqueBackground();
    this.qrScanner.hide(); // hide camera preview
    if (this.scanSub) {
      this.scanSub.unsubscribe();
    }
  }

  showManualInput() {
    this.inputMethod = "manual";
  }

  onAccept() {
    this.saveSettings()
      .then(() => { this.navCtrl.pop(); },
        e => {
          console.warn("Error parsing configuration hash");
          this.showError(this.translate.instant('QR-CONFIGURATION.MANUAL.ERROR-PARSING-HASH'));
        });
  }

  saveSettings() {
    return this.qrDecrypt.decrypt(this.hash)
      .then((settings) => {
        this.settings.setAll(JSON.parse(settings))
      });
  }

  showError(msg) {
    this.toast.badToast(msg)
  }


  setTransparentBackground(){
    window.document.querySelector('ion-app').classList.add('transparentBody')
    window.document.querySelector('.can-be-transparent').classList.add('transparentBody')
    window.document.querySelector('.nav-decor').classList.add('transparentBody')
  }
  setOpaqueBackground(){
    window.document.querySelector('ion-app').classList.remove('transparentBody')
    window.document.querySelector('.can-be-transparent').classList.remove('transparentBody')
    window.document.querySelector('.nav-decor').classList.remove('transparentBody')
  }
}
