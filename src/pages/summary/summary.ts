import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavController, Platform } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { CompleteTask } from '../../models/complete-task';
import { UserModel } from '../../models/user.model';
import { USMOTask } from '../../models/usmo-task';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  actualWeek: number = 0;
  trackerPath: SafeResourceUrl;
  trackerReady;
  currentView: string = "home";
  unsubscribeBackButtonAction: Function;

  constructor(
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public tasksProv: TasksProvider,
    public userProv: UserProvider,
    public platform: Platform
  ) {
    this.trackerReady = false;
    this.trackerPath = this.sanitizer.bypassSecurityTrustResourceUrl('tracker-dist/index.html');
  }
  
  protected ionViewDidLoad() {
    this.setTrackerReadyListener();
    this.setNextWeekListener();
    this.setPrevWeekListener();
    this.setCurrentViewListener();
  }
  
  protected ionViewWillEnter() {
    this.unsubscribeBackButtonAction = this.platform.registerBackButtonAction(()=>this.backButtonAction());
    this.setActualWeek();//In case there's any changes
  }

  private backButtonAction() {
    if (this.currentView != "home") {
      const backButtonEvent = new CustomEvent("tracker-back-action", {});
      window.dispatchEvent(backButtonEvent);
    } else {
      this.unsubscribeBackButtonAction()
      this.platform.runBackButtonAction()
    }
  }

  public setActualWeek() {
    this.actualWeek = moment().week();
    //TODO- Fix code replication
    if (this.trackerReady) {
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        const event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
      this.detailsFromUser().subscribe(userDetails => {
        const userEvent = new CustomEvent("tracker-user", { detail: userDetails });
        window.dispatchEvent(userEvent);
      });
    }
  }

  protected ionViewWillLeave() {
    window.removeEventListener("tracker-ready", undefined);
    window.removeEventListener("prev-week", undefined);
    window.removeEventListener("next-week", undefined);
    window.removeEventListener("tracker-current-view", undefined);
    
    const backButtonEvent = new CustomEvent("tracker-back-action", {});
    window.dispatchEvent(backButtonEvent);
    this.currentView = "home";
    this.unsubscribeBackButtonAction && this.unsubscribeBackButtonAction();

  }

  private setCurrentViewListener() {
    window.addEventListener("tracker-current-view", (event: CustomEvent) => {
      this.currentView = event.detail + "";
    });
  }

  private setTrackerReadyListener() {
    window.addEventListener("tracker-ready", () => {
      this.trackerReady = true;
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        const event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
      this.detailsFromUser().subscribe(userDetails => {
        const userEvent = new CustomEvent("tracker-user", { detail: userDetails });
        window.dispatchEvent(userEvent);
      });

    });
  }

  private setNextWeekListener() {
    window.addEventListener("prev-week", () => {
      this.actualWeek--;
      this.detailsFromWeek(this.actualWeek).subscribe(details => {
        const event = new CustomEvent("tracker-week", { detail: details });
        window.dispatchEvent(event);
      });
    });
  }

  private setPrevWeekListener() {
    window.addEventListener("next-week", () => {
      this.actualWeek++;
      this.detailsFromWeek(this.actualWeek)
        .subscribe(details => {
          const event = new CustomEvent("tracker-week", { detail: details });
          window.dispatchEvent(event);
        });
    });
  }

  /** Observable retunring week details */
  detailsFromWeek(week: number): Observable<any> {
    return this.tasksProv.getObservableTasks().map((tasks: USMOTask[]) => {
      const workouts = []
      const firstWeekTime: number = moment().week(week).startOf("isoWeek").valueOf();  //monday
      const lastWeekTime: number = moment().week(week+1).startOf("isoWeek").valueOf();

      tasks.forEach(task => {
        const completeTasks: CompleteTask[] = task.performedOn.filter(p=>p.performedTime>=firstWeekTime && p.performedTime<lastWeekTime);

        if (completeTasks != undefined) {
          let timesPerformed = 0;
          completeTasks.forEach((completeTask) => {
            workouts.push({
              "date": completeTask.performedTime,
              "name": task.name,
              "assessment": task.type,
              "health": 0,
              "effort": completeTask.score,
              "score": timesPerformed >= task.repetitions ? 0 : 1
            });
            timesPerformed++;
          });
        }
      });
      return {
        "year":moment().year(),
        "weekNumber": week,
        "workouts": workouts
      }
    });
  }

  /** Observable retunring user details */
  private detailsFromUser(): Observable<any> {
    const weekStarts = moment().week(this.actualWeek).startOf("isoWeek").valueOf();
    const weekFinishes = moment().week(this.actualWeek).endOf("isoWeek").valueOf();

    return this.userProv.getUser().flatMap((storedUser: UserModel) => {
      return this.tasksProv.getObservableTasks().map((tasks: USMOTask[]) => {
        const taskTypesGoals: Map<string, number> = new Map();
        tasks.forEach((task: USMOTask) => {
          if (!taskTypesGoals.has(task.type)) {
            taskTypesGoals.set(task.type, 0);
          }
          if ((moment(task.startTime).startOf('day').valueOf() <= weekFinishes) ||
            (moment(task.finishTime).startOf('day').valueOf() >= weekStarts)) {
            taskTypesGoals.set(task.type, taskTypesGoals.get(task.type) + task.repetitions);
          }
        });

        const goals = [];
        taskTypesGoals.forEach((num, key) => {
          goals.push({
            "assessment": key,
            "type": "score",
            "goal": num
          })
        });
        const trackerUser = {
          "name": storedUser.name,
          "avatarUrl": "",
          "goals": goals
        };
        return trackerUser;
      });
    });
  }
}
