import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  summaryUrl: SafeResourceUrl
  constructor(public navCtrl: NavController, public navParams: NavParams, sanitizer: DomSanitizer) {
    this.summaryUrl = sanitizer.bypassSecurityTrustResourceUrl("https://m3sport.biit-solutions.com/tracker");
  }
  ionViewDidLoad() {
  }

}
