import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { USMOTask } from '../../../models/usmo-task';
import { TasksProvider } from '../../../providers/storage/tasks-provider/tasks-provider';
import { VariablesProvider } from '../../../providers/variables/variables-provider';
import { resolve } from 'url';

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
  showExternalLinkFrame: boolean = false;
  showVideoFrame: boolean = false;
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

    this.replaceVariables();
  }

  private replaceVariables() {
    let value: Promise<string>;
    if (this.task.videoUrl) {
      value = this.variablesProvider.replaceVariables(this.task.videoUrl);
      value.then(resolve => {
        this.videoUrl = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustResourceUrl(resolve));
        console.log('Video URL ' + this.videoUrl);
        this.showVideoFrame = true;
      });
    }

    if (this.task.externalLink) {
      value = this.variablesProvider.replaceVariables(this.task.externalLink);
      value.then(resolve => {
        console.log('Resolve URL ' + resolve);
        this.externalLink = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustResourceUrl(resolve));
        console.log('External URL ' + this.externalLink);
        this.showExternalLinkFrame = true;
        console.log('showExternalLinkFrame URL ' + this.showExternalLinkFrame);
      });
      console.log('THEN URL ' + this.externalLink);
    }
  }


  ionViewWillEnter() {

  }

  ionViewWillLeave() {
  }

}
