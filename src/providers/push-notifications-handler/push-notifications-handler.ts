import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { MessageModel } from '../../models/message.model';
import { ServicesManager } from '../servicesManager';

/**
 * 
 */
@Injectable()
export class PushNotificationsHandlerProvider {

  constructor(public platform: Platform, 
  public push: Push, 
  @Inject(APP_CONFIG) protected config: IAppConfig,
  protected manager: ServicesManager) {
    
  }
  init(){
     if (this.platform.is('cordova')) {
      // to check if we have permission
      this.push.hasPermission()
        .then((res: any) => {
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
        });
      // to initialize push notifications
      const options: PushOptions = {
        android: {
          senderID: this.config.pushSenderID
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        },
        windows: {}
      };

      const pushObject: PushObject = this.push.init(options);

      pushObject.on('notification')
        .subscribe((notification: any) => {

          console.log('Received a notification', notification)
          this.addMessage({ text: notification.message, name: notification.title,title:'',date:'' });
        
        });

      pushObject.on('registration')
        .subscribe((registration: any) => {
          console.log('Device registered', registration)
          //registration.additionalData.foreground //Will be true if the app is open
          //TODO-register on USMO
        });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }
  }
  private addMessage(message:MessageModel){
    this.manager.getMessages().subscribe((messages:MessageModel[])=>{
      messages.unshift(message);
      this.manager.setMessages(messages).subscribe();
    });
  }

}
