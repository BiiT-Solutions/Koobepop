
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
  token: string;
  msg: string;

  notifications: MessageModel[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager,
    public push: Push,
    public platform: Platform,
    public changeDetRef: ChangeDetectorRef) { }

  ionViewDidLoad() {

  }
  ionViweWillEnter(){

  }
  ionViewDidEnter() {
    this.manager.getMessages().subscribe(messages => {
      this.notifications = messages;
    });
  }

  private addNotification(notification) {
    this.notifications.unshift(notification);
    //This triggers change detection on the component below
    this.notifications = this.notifications.slice();
    this.changeDetRef.detectChanges();
  }
}
