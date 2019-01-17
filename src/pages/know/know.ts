import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/storage/messages-provider/messages-provider';
import { MessageModel } from '../../models/message.model';
import { Subscription } from 'rxjs';

/**
 *
 */
@Component({
  selector: 'page-know',
  templateUrl: 'know.html'
})
export class KnowPage {
  public notifications: MessageModel[];
  public subscription: Subscription
  constructor(
    public navCtrl: NavController,
    public messagesProvider: MessagesProvider,
    public changeDetRef: ChangeDetectorRef
  ) {  }
  
  ionViewWillEnter() {
    this.subscription = this.messagesProvider.getObservableMessages()
      .subscribe((messages: MessageModel[]) => {
        console.log("Know ", messages)
        this.notifications = messages;
        if (messages.length > 0) {
          this.changeDetRef.detectChanges();
        }
      });
    this.restartMessageCount();
  }

  ionViewWillLeave() {
    this.restartMessageCount();
    this.unsubscribeMessageProvider();
  }

  public restartMessageCount() {
    this.messagesProvider.setMessagesCount(0);
  }

  unsubscribeMessageProvider() {
    this.subscription.unsubscribe();
  }

}
