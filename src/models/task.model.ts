export class TaskModel {
  name: string;
  hasInfo: boolean;
  score: number;

  public constructor(name: string, hasInfo: boolean, score: number) {
    this.name = name;
    this.hasInfo = hasInfo;
    this.score = score;
  }
}
