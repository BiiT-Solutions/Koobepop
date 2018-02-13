import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { SettingsProvider } from '../../providers/storage/settings/settings';

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
    private settings:SettingsProvider
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
       .subscribe((settings: string) => {
         console.log('Scanned something', settings);
         //this.text=settings;
         
         try{
         console.log('from base64', atob(settings));
         //this.text=atob(settings)
         console.log('As json', JSON.parse(atob(settings)));
         //this.text=JSON.parse(atob(settings))
         this.settings.setAll(JSON.parse(atob(settings)));
         window.document.querySelector('ion-app').classList.remove('transparentBody')
         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
         this.navCtrl.pop(); // get out
         }catch(e){
             console.error('Error parsing data ', e)
           //this.text = this.text+'-> Diferent error '+ e;
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
  if(e=='cordova_not_available'){
    this.settings.setAll({
        "organization":"Centrum voor Bewegen",
        "backend":"https://preventiecentra.biit-solutions.com/usmo",
        "pushSenderId":"137133737832",
        "access":"d2Vic2VydmljZXNAYmlpdC1zb2x1dGlvbnMuY29tOjk4MWViN2Y5NjA1NzFhNjQ5OQ=="});
    this.navCtrl.pop();
    }
});
}




  /* TODO - USE THIS (Yet to be usable)
AES_CBC_encrypt()
{
  let keyData = hexStringToUint8Array("2b7e151628aed2a6abf7158809cf4f3c2b7e151628aed2a6abf7158809cf4f3c");
  let iv = hexStringToUint8Array("000102030405060708090a0b0c0d0e0f");

    crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["encrypt"]).then(function(key) {
        var plainText = document.getElementById("plainTextGCM").value;
        return crypto.subtle.encrypt({name: "aes-cbc", iv: iv}, key, asciiToUint8Array(plainText));
    }, failAndLog).then(function(cipherText) {
        document.getElementById("cipherTextGCM").value = bytesToHexString(cipherText);
    }, failAndLog);
}
function AES_CBC_decrypt()
{
    crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["decrypt"]).then(function(key) {
        var cipherText = document.getElementById("cipherTextGCM").value;
        return crypto.subtle.decrypt({name: "aes-cbc", iv: iv}, key, hexStringToUint8Array(cipherText));
    }, failAndLog).then(function(plainText) {
        document.getElementById("resultGCM").innerHTML = "Result: " + bytesToASCIIString(plainText);
    }, failAndLog);
}
function hexStringToUint8Array(hexString)
{
    if (hexString.length % 2 != 0)
        throw "Invalid hexString";
    var arrayBuffer = new Uint8Array(hexString.length / 2);

    for (var i = 0; i < hexString.length; i += 2) {
        var byteValue = parseInt(hexString.substr(i, 2), 16);
        if (byteValue == NaN)
            throw "Invalid hexString";
        arrayBuffer[i/2] = byteValue;
    }

    return arrayBuffer;
}
function bytesToHexString(bytes)
{
    if (!bytes)
        return null;

    bytes = new Uint8Array(bytes);
    var hexBytes = [];

    for (var i = 0; i < bytes.length; ++i) {
        var byteString = bytes[i].toString(16);
        if (byteString.length < 2)
            byteString = "0" + byteString;
        hexBytes.push(byteString);
    }

    return hexBytes.join("");
}
function asciiToUint8Array(str)
{
    var chars = [];
    for (var i = 0; i < str.length; ++i)
        chars.push(str.charCodeAt(i));
    return new Uint8Array(chars);
}
function bytesToASCIIString(bytes)
{
    return String.fromCharCode.apply(null, new Uint8Array(bytes));
}
function failAndLog(error)
{
    console.log(error);
}
*/
}
