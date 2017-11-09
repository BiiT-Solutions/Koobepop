import { Injectable } from '@angular/core';
import { StorageServiceProvider } from './storage-service';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { MessageModel } from '../../models/message.model';
import { MessagesRestService } from '../rest/messages-rest-service';
@Injectable()
export class MessagesProvider extends StorageServiceProvider {
  private messages: MessageModel[];
  private newMessagesCount: number = 0;
  
  private bsMessages:BehaviorSubject<MessageModel[]>
  private bsMessagesCount:BehaviorSubject<number>
  constructor(public storage: Storage,private messagesRestService: MessagesRestService ) {
    super(storage);

    this.bsMessages = new BehaviorSubject([]);
    this.bsMessagesCount = new BehaviorSubject(0);
    super.retrieveItem(StorageServiceProvider.MESSAGES_STORAGE_ID)
    .map((msgs) => this.sortMsgs(msgs))
    .map((msgs) => this.setAllocMessages(msgs));
  }

  public getObservableMessages():BehaviorSubject<MessageModel[]>{
    return this.bsMessages;
  }

  public getObservableMessagesCount():BehaviorSubject<number>{
    return this.bsMessagesCount;
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
    //
    this.bsMessages.next(messages);
    return this.messages;
  }

  private sortMsgs(msgs: MessageModel[]): MessageModel[] {
    if (msgs == undefined) {
      return [];
    } else {
      msgs.sort((a, b) => b.time - a.time);
      return msgs;
    }
  }

  public getNewMessagesCount():Observable<number> {
    if (this.newMessagesCount == undefined) {
      return super.retrieveItem(StorageServiceProvider.NEW_MESSAGES_COUNT_ID)
        .flatMap((count) =>count==undefined?this.setNewMessagesCount(0):this.setNewMessagesCount(count));
    } else {
      return Observable.of(this.newMessagesCount);
    }
  }

  public setNewMessagesCount(newMessagesCount):Observable<number>{
    this.newMessagesCount = newMessagesCount;
    this.bsMessagesCount.next(newMessagesCount)
    return super.storeItem(StorageServiceProvider.NEW_MESSAGES_COUNT_ID, newMessagesCount);
  }

  public update(){
     return this.getMessages()
      .flatMap((messages: MessageModel[]) => {
        let date = 0;
        if (messages != undefined && messages.length > 0) {
          date = messages[0].time;
        }
        return this.messagesRestService.requestMessages(date)
          .map((newMessages: MessageModel[]) => {
            if (newMessages != undefined && newMessages.length > 0) {
              //last messages are shown first
              const finalMessages = newMessages.concat(messages);
              this.setMessages(finalMessages).subscribe();
              this.setNewMessagesCount( this.newMessagesCount + newMessages.length);
            }
          });
      });
  }

}
