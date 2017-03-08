import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  videoUrl:SafeResourceUrl ;
  constructor(public navCtrl: NavController, public navParams: NavParams,sanitizer: DomSanitizer) {
    if(navParams.data.videoUrl){
    this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(navParams.data.videoUrl);
    }
}
  ionViewDidLoad() {
  }
}
