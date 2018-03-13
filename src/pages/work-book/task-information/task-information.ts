import { Component, ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { USMOTask } from '../../../models/usmo-task';

@Component({
  selector: 'page-task-information',
  templateUrl: 'task-information.html'
})
export class TaskInformationPage {
  videoUrl: SafeResourceUrl;
  task: USMOTask;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer) {
    this.task = navParams.data;
  }
  ionViewDidLoad() {
    if (this.task.videoUrl) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.task.videoUrl);
    }
  }
}
