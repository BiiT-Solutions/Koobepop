import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
declare var Connection;//From a plugin :)

@Injectable()
export class ConnectivityService {
  onDevice: boolean; //Is this a device or is it a browser?

  constructor(public platform: Platform) {
    this.onDevice = this.platform.is('cordova');
  }

  
  isOnline(): boolean {
    if (this.onDevice && Network.type){
      return Network.type !== Connection.NONE;
    }else{
      return navigator.onLine;
    }
  }
}
