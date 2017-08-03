import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storageServiceProvider';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx';
import { MessageModel } from '../../models/message.model';
@Injectable()
export class MessagesProvider extends StorageServiceProvider {
  private messages: MessageModel[];

  constructor(public storage: Storage) {
    super(storage);
  }

  public getMessages(): Observable<MessageModel[]> {
    if (this.getAllocMessages() == undefined) {
      return super.retrieveItem(StorageServiceProvider.MESSAGES_STORAGE_ID)
        .map((msgs) => this.sortMsgs(msgs))
        .map((msgs) => this.setAllocMessages(msgs));
    } else {
      return Observable.of(this.getAllocMessages());
    }
  }

  public setMessages(messages: MessageModel[]): Observable<MessageModel[]> {
    this.setAllocMessages(messages);
    return super.storeItem(StorageServiceProvider.MESSAGES_STORAGE_ID, messages);
  }

  private getAllocMessages(): MessageModel[] {
    return this.messages;
  }

  private setAllocMessages(messages: MessageModel[]): MessageModel[] {
    this.messages = messages == undefined ? [] : messages;
    return this.messages;
  }

  private sortMsgs(msgs: MessageModel[]): MessageModel[] {
    if (msgs == undefined) {
      return [];
    } else {
      msgs.sort((a, b) => b.time-a.time);
      return msgs;
    }
  }
}
