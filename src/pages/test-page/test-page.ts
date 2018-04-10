import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Push } from '@ionic-native/push';
import { NavController, NavParams, Platform, Slides } from 'ionic-angular';

/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone. Beware of dragons!
 *
 */
@Component({
  selector: 'test-page',
  templateUrl: 'test-page.html'
})
export class TestPage {
  today: number = (new Date()).setHours(0, 0, 0, 0);
  actualDay: number;
  days: number[] = [];
  oldIndex = 1
  @ViewChild('slider') slider: Slides;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public push: Push,
    public platform: Platform,
    public changeDetRef: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
  }


}
