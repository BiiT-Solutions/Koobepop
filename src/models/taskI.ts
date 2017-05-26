
export class TaskModel {
  name: string;
  startingTime: number;
  repetitions: number
  performedOn: Map<number, Map<number, number>>; // sorted array of performation dates
  videoUrl?: string;
  content?: string; //Some HTML content
  type: string;
  appointmentId: number;
  constructor() {}

  /** */
  public static stringifyMap(map: Map<number, Map<number, number>>): string {
    let arrayFromMap = [];
    map.forEach((value, key) => {
      console.log("Tasks PerformedOn")
      console.log(map)
      arrayFromMap.push([key, Array.from(value.entries())])
    });
    let stringified = JSON.stringify(arrayFromMap);
    return stringified;
  }

  public static parseStringifiedMap(stringifiedMap: string): Map<number, Map<number, number>> {
    let coolRebuiltMap = new Map<number, Map<number, number>>();
    if (stringifiedMap == undefined || stringifiedMap == "") {
      console.debug("TasksProvider: parseStringifiedMap: string void ")
      return coolRebuiltMap;
    }
    let reParsed = JSON.parse(stringifiedMap);
    reParsed.forEach(map => {
      coolRebuiltMap.set(map[0], new Map<number, number>(map[1]))
    });
    return coolRebuiltMap;
  }
}