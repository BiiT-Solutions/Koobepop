import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { USMOTask } from '../../../models/usmo-task';
import { TasksProvider } from '../../../providers/storage/tasks-provider/tasks-provider';
import { VariablesProvider } from '../../../providers/variables/variables-provider';

@Component({
  selector: 'page-task-information',
  templateUrl: 'task-information.html',
  providers: [VariablesProvider]
})
export class TaskInformationPage {
  videoUrl: SafeResourceUrl;
  task: USMOTask;
  loading: boolean;
  hasInfo: boolean;
  externalLink: SafeResourceUrl;
  userCode = " ";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    tasksProvider: TasksProvider,
    public variablesProvider: VariablesProvider,
  ) {
    this.task = navParams.data;
    this.hasInfo = true;
    this.loading = true;
    console.log("Task info", this.task)
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
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.variablesProvider.replaceVariables(this.task.videoUrl));
      console.log('Video URL ' + this.videoUrl);
    }

    if (this.task.externalLink) {
      this.externalLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.variablesProvider.replaceVariables(this.task.externalLink));
      console.log('External URL ' + this.externalLink);
    }
  }

  ionViewWillLeave() {
  }

}
