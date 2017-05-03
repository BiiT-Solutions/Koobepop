import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesManager } from '../../providers/servicesManager';
import { ITask } from '../../models/taskI';

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html'
})
export class SummaryPage {
  week = 0;
  isFirst = false
  constructor(public navCtrl: NavController, public navParams: NavParams, public manager: ServicesManager) {

    window.addEventListener("tracker-ready", () => {
      console.log("TrackerReady")
      let detail = this.detailsFromWeek(this.week);
      let event = new CustomEvent("tracker-week", { detail: detail });
      window.dispatchEvent(event);
      let userDetails = this.detailsFromUser();
      let userEvent = new CustomEvent("tracker-user", { detail: userDetails });
      window.dispatchEvent(userEvent);
    });

    window.addEventListener("prev-week", () => {
      this.week--;
      let detail = this.detailsFromWeek(this.week);
      let event = new CustomEvent("tracker-week", { detail: detail });
      window.dispatchEvent(event);
    });

    window.addEventListener("next-week", () => {
      this.week++;
      let detail = this.detailsFromWeek(this.week);
      let event = new CustomEvent("tracker-week", { detail: detail });
      window.dispatchEvent(event);
    });
  }

  ionViewDidLeave(){
    window.removeEventListener("tracker-ready");
    window.removeEventListener("prev-week");
    window.removeEventListener("next-week");
  }
  ionViewDidLoad() {}

  detailsFromWeek(week: number) {

    console.log("Detais From week: "+week);
    /*this.manager.getTasks().subscribe((tasks: ITask[]) => {
      let weekTasks = [];
      //TODO - fix this0
      let firstWeekDay: number = week;
      let lastWeekDay: number = week;
      tasks.forEach(task => {
        let iterable: IterableIterator<number> = task.performedOn.keys();
        let result = iterable.next();
        while (!result.done) {
          if (result.value > firstWeekDay && result.value < lastWeekDay) {//If the date is enclosed into the week
            weekTasks.push({ name: task.name, date: result.value, score: task.performedOn.get(result.value) });
          }
        }

      });
    });*/
    return {
      "year": "2017",
      "weekNumber": week,
      "workouts": [
        //TODO - For each day of the week, look for the performed exercises and it's score
        { "date": "2017-01-15T14:58:52.810Z", "assessment": "body health", "health": 8, "sleep": 8, "score": 8 },
        { "date": "2017-01-15T17:08:32.429Z", "assessment": "body health", "health": 8, "sleep": 9, "score": 8.5 },
        { "date": "2017-01-13T10:17:51.456Z", "assessment": "body health", "health": 8, "sleep": 10, "score": 9 },
        { "date": "2017-01-12T05:14:52.755Z", "assessment": "body health", "health": 8, "sleep": 10, "score": 9 },
        { "date": "2017-01-10T12:18:48.218Z", "assessment": "body health", "health": 9, "sleep": 7, "score": 8 },
        { "date": "2017-01-12T12:20:40.767Z", "assessment": "body health", "health": 8, "sleep": 8, "score": 8 },

        { "date": "2017-01-15T12:28:36.689Z", "assessment": "mental health", "memory": 8, "happiness": 3, "score": 5.5 },
        { "date": "2017-01-15T12:01:29.277Z", "assessment": "mental health", "memory": 7, "happiness": 9, "score": 8 },
        { "date": "2017-01-14T00:54:49.847Z", "assessment": "mental health", "memory": 8, "happiness": 3, "score": 5.5 },
        { "date": "2017-01-14T16:25:41.325Z", "assessment": "mental health", "memory": 8, "happiness": 4, "score": 6 },
        { "date": "2017-01-12T00:18:59.654Z", "assessment": "mental health", "memory": 7, "happiness": 3, "score": 5 },
        { "date": "2017-01-11T22:41:23.699Z", "assessment": "mental health", "memory": 7, "happiness": 3, "score": 5 },
        { "date": "2017-01-15T04:55:23.561Z", "assessment": "food style", "fruit": 2, "vegetables": 1, "water": 1, "score": 4 },
        { "date": "2017-01-14T22:56:04.601Z", "assessment": "food style", "fruit": 2, "vegetables": 3, "water": 2, "score": 7 },
        { "date": "2017-01-15T07:55:52.659Z", "assessment": "food style", "fruit": 1, "vegetables": 2, "water": 2, "score": 5 },
        { "date": "2017-01-14T00:23:17.725Z", "assessment": "food style", "fruit": 1, "vegetables": 3, "water": 2, "score": 6 },
        { "date": "2017-01-15T01:16:40.036Z", "assessment": "food style", "fruit": 3, "vegetables": 2, "water": 1, "score": 6 },
        { "date": "2017-01-16T11:15:07.497Z", "assessment": "food style", "fruit": 2, "vegetables": 1, "water": 1, "score": 4 },
        { "date": "2017-01-14T16:42:03.253Z", "assessment": "food style", "fruit": 1, "vegetables": 2, "water": 2, "score": 5 },
        { "date": "2017-01-16T14:52:46.211Z", "assessment": "food style", "fruit": 3, "vegetables": 3, "water": 4, "score": 10 }]
    }
  }

  detailsFromUser() {
    let user = {
      "name": "Henny van Doorn",
      "avatarUrl": "",
      "goals": [{
        "assessment": "body health",
        "type": "score",
        "goal": 70
      }, {
        "assessment": "mental health",
        "type": "score",
        "goal": 60
      }, {
        "assessment": "food style",
        "type": "score",
        "goal": 50
      }]
    }
    return user;
  }
  
}
