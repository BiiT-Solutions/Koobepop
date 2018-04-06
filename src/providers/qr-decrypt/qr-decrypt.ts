import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';


@Injectable()
export class QrDecryptProvider {
  constructor(@Inject(APP_CONFIG) protected config: IAppConfig) { }

  public decrypt(string): PromiseLike<string> {
    try{
    return this.AES_CBC_decrypt(string, this.config.keyData)
      .then((decrypted) => { return atob(decrypted) }, err => {
        console.log(err); return undefined;
      })
    }catch(e){
      console.log(e); return Promise.resolve(undefined);
    }
  }

  AES_CBC_encrypt(value, key) {
    key = this.asciiToUint8Array(key);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    return crypto.subtle.digest('SHA-256', key)
    .then(keyData=>{
      //Keep just 16 bytes
      keyData = keyData.slice(0,16)
    return crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["encrypt"])
      .then((key) => {
        const plainText = value;
        return crypto.subtle.encrypt({ name: "aes-cbc", iv: iv }, key, this.asciiToUint8Array(plainText));
      }, this.failAndLog).then((cipherText) => {

        return this.uint8ArraytoHexString(iv) + this.bytesToHexString(cipherText);
      }, this.failAndLog);
    });
    }

  AES_CBC_decrypt(value, key) {
    key = this.asciiToUint8Array(key);
    const iv = this.hexStringToUint8Array(value.substring(0, 32))
    const cipherText = value.substring(32, value.length);
    return crypto.subtle.digest('SHA-256', key)
      .then(keyData => {
        keyData = keyData.slice(0,16)
        return crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["decrypt"])
          .then((key) => {
            return crypto.subtle.decrypt({ name: "aes-cbc", iv: iv }, key, this.hexStringToUint8Array(cipherText));
          }, this.failAndLog)
          .then((plainText) => {
            return this.bytesToASCIIString(plainText);
          }, this.failAndLog);
      });
  }

  hexStringToUint8Array(hexString) {
    if (hexString.length % 2 != 0)
      throw new Error("Invalid hexString");
    const arrayBuffer = new Uint8Array(hexString.length / 2);
    for (var i = 0; i < hexString.length; i += 2) {
      const byteValue = parseInt(hexString.substr(i, 2), 16);
      if (byteValue == NaN)
        throw new Error("Invalid hexString");
      arrayBuffer[i / 2] = byteValue;
    }
    return arrayBuffer;
  }

  bytesToHexString(bytes): string {
    if (!bytes)
      return null;

    return this.uint8ArraytoHexString(new Uint8Array(bytes))
  }

  uint8ArraytoHexString(bytes: Uint8Array) {
    const hexBytes = [];
    for (let i = 0; i < bytes.length; ++i) {
      let byteString = bytes[i].toString(16);
      if (byteString.length < 2)
        byteString = "0" + byteString;
      hexBytes.push(byteString);
    }
    return hexBytes.join("");
  }

  asciiToUint8Array(str) {
    const chars = [];
    for (let i = 0; i < str.length; ++i)
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
