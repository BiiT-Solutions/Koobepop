import { Component, Input } from '@angular/core';
import { MessageModel } from '../../models/message.model';

/**
 * This is a component to show messages in a friendly manner
 */
@Component({
  selector: 'notification-message',
  templateUrl: 'notification-message.html'
})
export class NotificationMessageComponent {
  @Input() message:MessageModel;
  constructor() {}
}
