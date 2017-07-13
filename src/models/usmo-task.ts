import * as moment from 'moment';

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
  // Map<weekDate,Map<dayDate, score>>
  performedOn: Map<number, Map<number, number>>;

  constructor(name: string, startTime: number, finishTime: number, repetitions: number,
    type: string, appointmentId: number, performedOn: Map<number, Map<number, number>>,
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
  public static stringifyMap(map: Map<number, Map<number, number>>): string {
    const arrayFromMap = [];
    map.forEach((value, key) => {
      arrayFromMap.push([key, Array.from(value.entries())])
    });
    const stringified = JSON.stringify(arrayFromMap);
    return stringified;
  }
  /** Parse stringified map from the DB */
  public static parseStringifiedMap(stringifiedMap: string): Map<number, Map<number, number>> {
    const coolRebuiltMap = new Map<number, Map<number, number>>();
    if (stringifiedMap == undefined || stringifiedMap == "") {
      console.debug("TasksProvider: parseStringifiedMap: string void ");
      return coolRebuiltMap;
    }
    const reParsed = JSON.parse(stringifiedMap);
    reParsed.forEach(map => {
      coolRebuiltMap.set(map[0], new Map<number, number>(map[1]))
    });
    return coolRebuiltMap;
  }

  public getScore(date: number): number {
    const week = moment(date).startOf('isoWeek').valueOf();
    return this.performedOn.has(week)
      && this.performedOn.get(week).has(date) ?
      this.performedOn.get(week).get(date) :
      -1;
  }

  public setScore(date: number, score: number) {
    const week = moment(date).startOf('isoWeek').valueOf();
    if (!this.performedOn.has(week)) {
      this.performedOn.set(week, new Map());
    }
    this.performedOn.get(week).set(date, score);
  }
  public removeScore(date: number) {
    const week = moment(date).startOf('isoWeek').valueOf();
    if (this.performedOn.has(week) && this.performedOn.get(week).has(date)) {
      if(this.performedOn.get(week).size<=1){
        this.performedOn.delete(date);
      }else{
        this.performedOn.get(week).delete(date);
      }
    }
  }
}
