import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/storage/messages-provider/messages-provider';
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
    
  }

  ionViewWillEnter() {
    this.msgProv.getObservableMessages()
      .subscribe(msgs => {
        console.log("Know ",msgs)
        this.notifications = msgs;
        this.changeDetRef.detectChanges();
      });
  }

}
