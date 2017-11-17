import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
import { IAppConfig, APP_CONFIG } from '../../app/app.config';
import { ServicesManager } from '../servicesManager';
import { RegisterPushTokenRestService } from '../rest/register-push-token.rest-service';


/**
 *
 */
@Injectable()
export class PushNotificationsHandlerProvider {
  pushObject: PushObject
  constructor(public platform: Platform,
    public push: Push,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected registerPushService: RegisterPushTokenRestService) {
  }

  init() {
    if (this.platform.is('cordova')) {
      // to check if we have permission
      /*this.push.hasPermission()
        .then((res: any) => {
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
        });
        */
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

      pushObject.on('registration')
        .subscribe((registration: any) => {
          console.debug('Device registered', registration)
          this.registerPushService.setPushToken(registration.registrationId)
            .subscribe(response => console.debug("Set Push token status: ", response.status));
        });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      this.pushObject = pushObject;
    }
  }

  public getPushObject(): PushObject {
    return this.pushObject;
  }
}
