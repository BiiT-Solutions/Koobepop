import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SettingsProvider } from '../../providers/storage/settings/settings';
import { QrDecryptProvider } from '../../providers/qr-decrypt/qr-decrypt';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-qr-configuration',
  templateUrl: 'qr-configuration.html',
})
export class QRConfigurationPage {
  manualInput
  hash = "";
  inputMethod = "scan";
  scanSub;

  options;
  scanData;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //public qrScanner: QRScanner,
    public settings: SettingsProvider,
    public qrDecrypt: QrDecryptProvider,
    public toast: ToastIssuer,
    public translate: TranslateService,
    private barcodeScanner: BarcodeScanner
  ) {
    this.manualInput = false;
    settings.load()
      .subscribe();
  }

  ionViewDidLoad() {
    this.scan();
  }

 /* scan2() {
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
                  }, e => {
                    console.warn("Error parsing configuration hash");
                    this.showError(this.translate.instant('QR-CONFIGURATION.MANUAL.ERROR-PARSING-HASH'));
                    this.scan();
                  });
              } catch (e) {
                console.warn('Error parsing data ', e)
              }
            });
          window.document.querySelector('ion-app').classList.add('transparentBody')
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
  }*/

  scan() {
    this.options = {
      prompt: "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options)
      .then((barcodeData) => {
        this.hash = barcodeData.text;
        this.saveSettings()
        console.log(barcodeData);
        this.scanData = barcodeData;
      }, (err) => {
        console.log("Error occured : " + err);
      });
  }

  /*stopScan() {
    window.document.querySelector('ion-app').classList.remove('transparentBody')
    this.qrScanner.hide(); // hide camera preview
    if (this.scanSub) {
      this.scanSub.unsubscribe();
    }
  }*/

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
}
