import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { USMOTask } from '../../../models/usmo-task';
import { TasksProvider } from '../../../providers/storage/tasks-provider/tasks-provider';

@Component({
  selector: 'page-task-information',
  templateUrl: 'task-information.html'
})
export class TaskInformationPage {
  videoUrl: SafeResourceUrl;
  task: USMOTask;
  loading: boolean;
  hasInfo: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private tasksProvider: TasksProvider) {
    this.task = navParams.data;
    this.hasInfo = true;
    this.loading = true;
    console.log("Task info",this.task)
    if (this.task.content && this.task.content.length > 0) {
      this.loading = false;
      this.hasInfo = this.task.content != undefined && this.task.content.length > 0;
    } else {
      tasksProvider.getTaskInfo(this.task)
        .subscribe(task => {
          this.task = task
          this.loading = false;
          this.hasInfo = task.content != undefined && task.content.length > 0;
        });
    }
  }

  ionViewDidLoad() {
    if (this.task.videoUrl) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.task.videoUrl);
    }
  }
}
