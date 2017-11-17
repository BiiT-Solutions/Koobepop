import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { MessagesProvider } from '../../providers/storage/messages-provider';
import { Push } from '@ionic-native/push';
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

  constructor(
    public navCtrl: NavController,
    public msgProv: MessagesProvider,
    public changeDetRef: ChangeDetectorRef
  ) {
    this.msgProv.getObservableMessages()
      .subscribe(msgs => this.notifications = msgs);
  }

}
