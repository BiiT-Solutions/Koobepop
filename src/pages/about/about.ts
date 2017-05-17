import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController,
   private translate: TranslateService) {
      //TODO change this according with the locale if possible
      //Add options to the app
      translate.use('en');
  }

}
