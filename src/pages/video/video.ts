import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  videoUrl: SafeResourceUrl;
  @ViewChild("content") content: ElementRef;
  task: TaskModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.task = navParams.data;
  }
  ionViewDidLoad() {
    if (this.task.videoUrl) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.task.videoUrl);
    }
  }
}
