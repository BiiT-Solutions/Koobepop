import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, ItemSliding, Platform } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { Push, } from '@ionic-native/push';
import { MessageModel } from '../../models/message.model';

/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector: 'test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {
  token: string;
  msg: string;

  notifications: MessageModel[] = [
    new MessageModel('Doctor Who',
      'Let me seek my sonic screwdriver and this will be solved in a moment',
      'Allmighty Doc', new Date())
  ]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public manager: ServicesManager,
    public push: Push,
    public platform: Platform,
    public changeDetRef: ChangeDetectorRef) { }

  ionViewDidLoad() {
    this.manager.getMessages().subscribe(messages => {
      this.notifications = messages;
    });

  }

  public actionTrigger() {
    this.addNotification({
      name: 'Doctor Who',
      text: 'Let me seek my sonic screwdriver and this will be solved in a moment',
      title: 'Allmighty Doc',
      time: new Date()
    });
  }
  private addNotification(notification) {
    this.notifications.unshift(notification);
    //This triggers change detection on the component below
    //TODO - remove when storage of messages is properly done
    this.notifications = this.notifications.slice();
    this.changeDetRef.detectChanges()
  }

  public open(itemSlide: ItemSliding) {
    console.log(itemSlide.getOpenAmount());
  }

  public update(item: any) {
    //this.manager.updateAppointments();
  }

  public close(itemSlide: ItemSliding) {
    itemSlide.close();
  }

  public navTaskInfo() {
  }
}
