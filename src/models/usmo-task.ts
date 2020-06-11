import { CompleteTask } from './complete-task';

/**Represents a single recurrent task*/
export class USMOTask {
  comparationId: string;
  name: string;
  startTime: number;
  finishTime?: number;
  repetitions: number;
  videoUrl?: string;
  externalLink?:string;
  content?: string; //Some HTML content
  type: string;
  performedOn: CompleteTask[];

  constructor(
    comparationId: string, 
    name: string, 
    startTime: number, 
    finishTime: number, 
    repetitions: number, 
    type: string, 
    performedOn: CompleteTask[], 
    videoUrl?: string, 
    content?: string,
    externalLink?: string
  ) {
    this.comparationId = comparationId;
    this.name = name;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.repetitions = repetitions;
    this.videoUrl = videoUrl;
    this.content = content; //Some HTML content
    this.type = type;
    this.performedOn = performedOn;
    this.externalLink = externalLink;
  }

  /** Stringify map so it can be stored on the DB */
  public static stringifyPerformedTasks(map: CompleteTask[]): string {
    const arrayFromMap = [];
    map.forEach((value, key) => {
      arrayFromMap.push([key, value])
    });
    const stringified = JSON.stringify(arrayFromMap);
    return stringified;
  }

  /** Parse stringified map from the DB */
  public static parseStringifiedPerformedTasks(stringifiedMap: string): Map<number, CompleteTask[]> {
    const rebuiltMap = new Map<number, CompleteTask[]>();
    if (stringifiedMap == undefined || stringifiedMap == "") {
      console.debug("TasksProvider: parseStringifiedMap: string void ");
      return rebuiltMap;
    }
    const reParsed = JSON.parse(stringifiedMap);
    reParsed.forEach(map => {
      const completions = []
      map[1].forEach(element => {
        completions.push(new CompleteTask(element.performedTime, element.filledTime, element.score));
      });
      rebuiltMap.set(map[0], completions)
    });
    return rebuiltMap;
  }

  /**
   * Util method to update old database versions
   */
  public static parseStringifiedPerformedTasksToList(stringifiedMap: string):CompleteTask[]{
    const rebuiltList = [];
    if (stringifiedMap == undefined || stringifiedMap == "") {
      console.debug("TasksProvider: parseStringifiedMap: string void ");
      return rebuiltList;
    }
    const reParsed = JSON.parse(stringifiedMap);
    reParsed.forEach(map => {
      map[1].forEach(element => {
        rebuiltList.push(new CompleteTask(element.performedTime, element.filledTime, element.score));
      });
    });
    return rebuiltList
  }

  public getScore(date: number): number {
    const completeTask = this.performedOn.find(x => x.performedTime == date)
    return completeTask == undefined ? -1 : completeTask.score;
  }

  public setScore(completeTask: CompleteTask) {
    this.performedOn.push(completeTask)
  }

  public removeScore(date: number) {
    const completeTaskIndex = this.performedOn.findIndex(x => x.performedTime == date)
    this.performedOn.splice(completeTaskIndex, 1);
  }
}
