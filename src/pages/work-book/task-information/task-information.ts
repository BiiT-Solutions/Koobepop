import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { USMOTask } from '../../../models/usmo-task';
import { TasksProvider } from '../../../providers/storage/tasks-provider/tasks-provider';
import { UserGuardProvider } from '../../../providers/user-guard/user-guard';

@Component({
  selector: 'page-task-information',
  templateUrl: 'task-information.html'
})
export class TaskInformationPage {
  videoUrl: SafeResourceUrl;
  task: USMOTask;
  loading: boolean;
  hasInfo: boolean;
  formUrl: SafeResourceUrl;
  userCode = " ";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private tasksProvider: TasksProvider,
    public userGuardService: UserGuardProvider,
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
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.task.videoUrl);

      if (this.task.formUrl) {
        if (this.userCode == " ") {
          this.getGuard().subscribe(() => {
            this.startCountdownuntdown(120)
            this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.replaceUserCode(this.userCode))
          })

        } else {
          this.formUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.replaceUserCode(this.userCode))
        }


      }
    }

  }
  replaceUserCode(params) {
    var url = this.task.formUrl.replace('${USER_CODE}', params)
    return url;
  }

  ionViewWillLeave() {
  }

  getGuard() {
    return this.userGuardService.requestUserGuard()
      .map(guard => {
        this.userCode = guard.code
        return guard;
      })
  }
  startCountdownuntdown(seconds) {
    var counter = seconds;

    var interval = setInterval(() => {
      counter--;
      //if usercode is less that 5 will consider as expired
      if (counter < 5) {
        this.userCode = " "
        clearInterval(interval);
      };
    }, 1000);
  }
}
