import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MessageModel } from '../../models/message.model';

/**
 * 
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
