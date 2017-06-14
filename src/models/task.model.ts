/**Represents a single recurrent task*/
export class TaskModel {
  name: string;
  startingTime: number;
  repetitions: number;
  
  //{MAP:
  //  [{week:[
  //   {day:score},
  //    ...
  //    ]},
  //    ...
  //  ]}
  performedOn: Map<number, Map<number, number>>;

  videoUrl?: string;
  content?: string; //Some HTML content
  type: string;
  appointmentId: number;
  constructor() {}

  /** Stringify map so it can be stored on the DB */
  public static stringifyMap(map: Map<number, Map<number, number>>): string {
    let arrayFromMap = [];
    map.forEach((value, key) => {
      arrayFromMap.push([key, Array.from(value.entries())])
    });
    let stringified = JSON.stringify(arrayFromMap);
    return stringified;
  }
  /** Parse stringified map from the DB */
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