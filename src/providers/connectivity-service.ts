import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
declare var Connection; //From a plugin :)

@Injectable()
export class ConnectivityService {
  onDevice: boolean; //Is this a device or is it a browser?

  constructor(public platform: Platform,
              private network:Network) {
    this.onDevice = this.platform.is('cordova');
  }

  
  isOnline(): boolean {
    if (this.onDevice && this.network.type){
      return this.network.type !== Connection.NONE;
    }else{
      return navigator.onLine;
    }
  }
}
