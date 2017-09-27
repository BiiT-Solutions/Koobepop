
import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { Push, } from '@ionic-native/push';
import { MessageModel } from '../../models/message.model';

/**
 *
 */
@Component({
  selector: 'page-know',
  templateUrl: 'know.html'
})
export class KnowPage {

  public notifications: MessageModel[];

  constructor(public navCtrl: NavController,
    public manager: ServicesManager,
    public changeDetRef: ChangeDetectorRef) { }
  ionViewDidEnter() {
    this.manager.getMessages().subscribe(messages => {
      this.notifications = messages;
    });
  }
}
