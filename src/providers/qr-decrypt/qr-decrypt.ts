import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';


@Injectable()
export class QrDecryptProvider {
  constructor(public http: HttpClient, @Inject(APP_CONFIG) protected config: IAppConfig) {
  }

  public decrypt(string): PromiseLike<string> {
    return this.AES_CBC_decrypt(string)
      .then((decrypted) => { console.log(decrypted); return atob(decrypted) })
  }


  AES_CBC_encrypt(value) {
    let keyData = this.hexStringToUint8Array(this.config.keyData);
    let iv = this.hexStringToUint8Array(this.config.iv);

    crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["encrypt"]).then((key) => {
      var plainText = value;
      return crypto.subtle.encrypt({ name: "aes-cbc", iv: iv }, key, this.asciiToUint8Array(plainText));
    }, this.failAndLog).then( (cipherText) => {
      let encryptedValue = this.bytesToHexString(cipherText);
      console.log(encryptedValue)
    }, this.failAndLog);
  }

  AES_CBC_decrypt(value) {
    let keyData = this.hexStringToUint8Array(this.config.keyData);
    let iv = this.hexStringToUint8Array(this.config.iv);

    return crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["decrypt"])
      .then((key) => {
        var cipherText = value;
        return crypto.subtle.decrypt({ name: "aes-cbc", iv: iv }, key, this.hexStringToUint8Array(cipherText));
      }, this.failAndLog)
      .then((plainText) => {
        return this.bytesToASCIIString(plainText);
      }, this.failAndLog);
  }

  hexStringToUint8Array(hexString) {
    if (hexString.length % 2 != 0)
      throw "Invalid hexString";
    var arrayBuffer = new Uint8Array(hexString.length / 2);

    for (var i = 0; i < hexString.length; i += 2) {
      var byteValue = parseInt(hexString.substr(i, 2), 16);
      if (byteValue == NaN)
        throw "Invalid hexString";
      arrayBuffer[i / 2] = byteValue;
    }

    return arrayBuffer;
  }

  bytesToHexString(bytes): string {
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

  asciiToUint8Array(str) {
    var chars = [];
    for (var i = 0; i < str.length; ++i)
      chars.push(str.charCodeAt(i));
    return new Uint8Array(chars);
  }

  bytesToASCIIString(bytes) {
    return String.fromCharCode.apply(null, new Uint8Array(bytes));
  }

  failAndLog(error) {
    console.log(error);
  }
}
