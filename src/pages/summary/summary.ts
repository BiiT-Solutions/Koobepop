import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { USMOTask } from '../../models/usmo-task';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserModel } from '../../models/user.model';
import { CompleteTask } from '../../models/complete-task';
import { TasksProvider } from '../../providers/storage/tasks-provider/tasks-provider';
import { UserProvider } from '../../providers/storage/user-provider/user-provider';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  actualWeek: number = 0;
  trackerPath: SafeResourceUrl;
  trackerReady;

  constructor(
    public navCtrl: NavController,
    private sanitizer: DomSanitizer,
    public tasksProv: TasksProvider,
    public userProv: UserProvider
  ) {
    this.trackerReady = false;
    this.trackerPath = this.sanitizer.bypassSecurityTrustResourceUrl('tracker-dist/index.html');
  }

  protected ionViewDidLoad() {
    this.setTrackerReadyListener();
    this.setNextWeekListener();
    this.setPrevWeekListener();
  }

  protected ionViewWillEnter() {
    this.setActualWeek();//In case there's any changes
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
      const firstWeekDay: number = moment().week(week).startOf("isoWeek").valueOf();  //monday
      tasks.forEach(task => {
        const completeTasks: CompleteTask[] = task.performedOn.get(firstWeekDay);
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
