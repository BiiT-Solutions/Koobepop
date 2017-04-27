import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ITask } from '../../models/taskI';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  videoUrl: SafeResourceUrl;
  @ViewChild("content") content: ElementRef;
  task: ITask;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.task = navParams.data;
  }
  ionViewDidLoad() {
    if (this.task.videoUrl) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.task.videoUrl);
    }
    if (this.task.content) {
      console.log("Content exists")
     
    }
  }
}
