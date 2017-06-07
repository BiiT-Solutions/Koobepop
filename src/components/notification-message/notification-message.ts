import { Component, Input } from '@angular/core';
import { MessageModel } from '../../models/message.model';

/**
 * 
 */
@Component({
  selector: 'notification-message',
  templateUrl: 'notification-message.html'
})
export class NotificationMessageComponent {
  @Input() message:MessageModel;
  constructor() {}
}
