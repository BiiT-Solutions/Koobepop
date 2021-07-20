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
  public hasInfo: boolean;
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
      this.hasInfo = (this.task.content != undefined && this.task.content.length > 0) 
      || (this.task.externalLink != undefined && this.task.externalLink != null && this.task.externalLink != "");
    } else {
      tasksProvider.getTaskInfo(this.task)
        .subscribe(task => {
          this.task = task
          // this.task.content = sanitizer.bypassSecurityTrustHtml(this.task.content).toString();;
          this.loading = false;
          this.hasInfo = (task.content != undefined && task.content.length > 0) 
          || (this.task.externalLink != undefined && this.task.externalLink != null && this.task.externalLink != "") 
          || (this.task.videoUrl != undefined && this.task.videoUrl != null && this.task.videoUrl != "");
        });
    }

    this.replaceVariables();
  }

  private replaceVariables() {
    let value: Promise<string>;
    if (this.task.videoUrl) {
      value = this.variablesProvider.replaceVariables(this.task.videoUrl);
      value.then(resolve => {
        this.hasInfo = true;
        // this.videoUrl = this.sanitizer.sanitize(SecurityContext.HTML, this.sanitizer.bypassSecurityTrustResourceUrl(resolve));
        this.videoUrl = resolve;
        console.log('Video URL ' + this.videoUrl);
        this.showVideoFrame = true;
      });
    }

    if (this.task.externalLink) {
      console.log("replace external link " , this.task.externalLink)
      value = this.variablesProvider.replaceVariables(this.task.externalLink);
      value.then(resolve => {
        console.log('Resolve URL ' + resolve);
        this.externalLink = resolve;
        console.log('External URL ' + this.externalLink);
        this.showExternalLinkFrame = true;
        console.log('showExternalLinkFrame URL ' + this.showExternalLinkFrame);
      });
    }
  }


  ionViewWillEnter() {

  }

  ionViewWillLeave() {
  }

}
