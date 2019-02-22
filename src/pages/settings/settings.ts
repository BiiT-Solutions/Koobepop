import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { UserGuardPage } from '../user-guard/user-guard';
import { TranslateService } from '@ngx-translate/core';
import { MessagesProvider } from '../../providers/storage/messages-provider/messages-provider';
import { MessageModel } from '../../models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  idioms: any[] = [];
  defaultLanguage: any;
  public notifications: MessageModel[];
  public subscription: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private translate: TranslateService,
    private messagesProvider: MessagesProvider, public changeDetRef: ChangeDetectorRef) {
    this.idioms = [
      {
        value: 'en',
        label: 'LANGUAGES.ENGLISH'
      },
      {
        value: 'nl',
        label: 'LANGUAGES.DUTCH'
      },
      {
        value: 'es-es',
        label: 'LANGUAGES.SPANISH'
      }
    ];
    this.defaultLanguage = this.translate.getDefaultLang();
  }

  ionViewDidLoad() {
  }

  openUserGuard() {
    this.navCtrl.push(UserGuardPage)
  }

  openAbout() {
  }

  openPrivacyPolicy() {
    this.navCtrl.push(PrivacyPolicyPage);
  }

  chooseLanguage(lang) {
    this.translate.use(lang);
    this.messagesProvider.removeMessages();
  }
}