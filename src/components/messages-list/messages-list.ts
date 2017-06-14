import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessageModel } from '../../models/message.model';

/**
 * This is a container component for a notification-message list
 */
@Component({
  selector: 'messages-list',
  templateUrl: 'messages-list.html',
   changeDetection: ChangeDetectionStrategy.OnPush 
})
export class MessagesListComponent {
   @Input() messagesList:MessageModel[];
  constructor() {}
  
}
