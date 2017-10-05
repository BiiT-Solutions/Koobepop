import * as moment from 'moment';
import { CompleteTask } from './complete-task';

/**Represents a single recurrent task*/
export class USMOTask {
  name: string;
  startTime: number;
  finishTime?: number;
  repetitions: number;
  videoUrl?: string;
  content?: string; //Some HTML content
  type: string;
  appointmentId: number;
  updateTime?: number;
  // Map<weekDate,Map<dayDate, score>>
  performedOn: Map<number, CompleteTask[]>;

  constructor(name: string, startTime: number, finishTime: number, repetitions: number,
    type: string, appointmentId: number, performedOn: Map<number, CompleteTask[]>,
    videoUrl?: string, content?: string) {
    this.name = name;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.repetitions = repetitions;
    this.videoUrl = videoUrl;
    this.content = content; //Some HTML content
    this.type = type;
    this.appointmentId = appointmentId;
    this.performedOn = performedOn;
  }

  /** Stringify map so it can be stored on the DB */
  public static stringifyPerformedTasks(map: Map<number, CompleteTask[]>): string {
    const arrayFromMap = [];
    map.forEach((value, key) => {
      arrayFromMap.push([key, value])
    });
    const stringified = JSON.stringify(arrayFromMap);
    return stringified;
  }

  /** Parse stringified map from the DB */
  public static parseStringifiedPerformedTasks(stringifiedMap: string): Map<number, CompleteTask[]> {
    //  console.log("USMOTask map to Rebuild", stringifiedMap)
    const rebuiltMap = new Map<number, CompleteTask[]>();
    if (stringifiedMap == undefined || stringifiedMap == "") {
      console.debug("TasksProvider: parseStringifiedMap: string void ");
      return rebuiltMap;
    }
    const reParsed = JSON.parse(stringifiedMap);
    reParsed.forEach(map => {
      const completions = []
      map[1].array.forEach(element => {
       completions.push(new CompleteTask(element.performedTime,element.filledTime,element.score));
      });
      rebuiltMap.set(map[0], completions)
    });
    return rebuiltMap;
  }

  public getScore(date: number): number {
    const week = moment(date).startOf('isoWeek').valueOf();
    if (this.performedOn.has(week)) {
      for (const completeTask of this.performedOn.get(week)) {
        if (completeTask.performedTime == date) {
          return completeTask.score;
        }
      };
    }
    return -1;
  }

  public setScore(completeTask: CompleteTask) {
    const week = moment(completeTask.performedTime).startOf('isoWeek').valueOf();
    if (!this.performedOn.has(week)) {
      this.performedOn.set(week, []);
    }
    this.performedOn.get(week).push(completeTask);
  }

  public removeScore(date: number) {
    const week = moment(date).startOf('isoWeek').valueOf();
    if (this.performedOn.has(week)) {
      if (this.performedOn.get(week).length <= 1) {
        this.performedOn.delete(week);
      } else {
        const index = this.performedOn.get(week).map(completeT => completeT.performedTime).indexOf(date);
        this.performedOn.get(week).splice(index, 1);
      }
    }
  }
}
