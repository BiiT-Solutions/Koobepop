import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceProvider } from '../storage-service/storage-service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsProvider extends StorageServiceProvider {
  settings: any;

  constructor(public storage: Storage) {
    super(storage);
  }

  load() {
    if(!this.settings){
    return super.retrieveItem(StorageServiceProvider.SETTINGS_STORAGE_ID)
    .map((settings)=>{this.settings = settings; return this.settings;});
    }else{
      return Observable.of(this.settings);
    }
  }

  setValue(key: string, value) {
    this.settings[key] = value;
    this.save();
  }

  setAll(settings) {
    this.settings=settings;
    this.save();
  }

  save() {
    super.storeItem(StorageServiceProvider.SETTINGS_STORAGE_ID, this.settings)
  }

  get allSettings() {
    return this.settings;
  }
}
