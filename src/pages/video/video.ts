import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  navBarHidden;
  videoUrl:SafeResourceUrl ;
  constructor(public navCtrl: NavController, public navParams: NavParams,sanitizer: DomSanitizer) {
    this.videoUrl = sanitizer.bypassSecurityTrustResourceUrl(navParams.data.videoUrl);
  }
  ionViewDidLoad() {
    this.navBarHidden = true;
  }
openMenu(event){
  console.log(event);

    this.navBarHidden = !this.navBarHidden;
}
}
