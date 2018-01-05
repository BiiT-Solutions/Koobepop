import { Injectable } from '@angular/core';
import { StorageServiceProvider } from '../storage-service/storage-service';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { MessageModel } from '../../../models/message.model';
import { MessagesRestService } from '../../rest/messages-rest-service/messages-rest-service';


//TODO -TEST this
@Injectable()
export class MessagesProvider extends StorageServiceProvider {
  private bsMessages: BehaviorSubject<MessageModel[]>
  private bsMessagesCount: BehaviorSubject<number>

  constructor(public storage: Storage, private messagesRestService: MessagesRestService) {
    super(storage);
    this.bsMessages = new BehaviorSubject([]);
    this.bsMessagesCount = new BehaviorSubject(0);
    this.loadMessages()
      .subscribe(() => this.update());
  }

  private sortMsgs(msgs: MessageModel[]): MessageModel[] {
    if (msgs == undefined) {
      return [];
    } else {
      msgs.sort((a, b) => b.time - a.time);
      return msgs;
    }
  }

  public update(): void {
    const messages = this.getCurrentMessages();
    let date = 0;
    if (messages != undefined && messages.length > 0) {
      //Take last message date (inverse sort)
      date = messages[0].time;
    }
    this.messagesRestService.requestMessages(date)
      .subscribe(newMessages => {
        if (newMessages != undefined && newMessages.length > 0) {
          //last messages are shown first
          const finalMessages = newMessages.concat(messages);
          this.getObservableMessages().next(finalMessages);
          const messagesLeft = this.getCurrentMessagesCount() + newMessages.length;
          this.getObservableMessagesCount().next(messagesLeft);
          this.saveMessages()
        }
      });
  }

  /** Load msgs from database */
  public loadMessages(): Observable<MessageModel[]> {
    return super.retrieveItem(StorageServiceProvider.MESSAGES_STORAGE_ID)
      .map(msgs => this.sortMsgs(msgs))
      .map(messages => { this.bsMessages.next(messages); return messages });
  }

  public saveMessages(): void {
    let complete;
    super.storeItem(StorageServiceProvider.MESSAGES_STORAGE_ID, this.getCurrentMessages())
      .subscribe();
  }

  public getObservableMessages(): BehaviorSubject<MessageModel[]> {
    return this.bsMessages
  }
  public getObservableMessagesCount(): BehaviorSubject<number> {
    return this.bsMessagesCount;
  }

  //Don't use these to show in the view
  public getCurrentMessages(): MessageModel[] {
    return this.bsMessages.getValue();
  }
  public getCurrentMessagesCount(): number {
    return this.bsMessagesCount.getValue();
  }
  public setMessagesCount(messagesLeft: number) {
    this.getObservableMessagesCount().next(messagesLeft);
  }
}
