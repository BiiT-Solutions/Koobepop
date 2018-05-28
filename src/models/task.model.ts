export class TaskModel {
  comparationId: string
  name: string;
  hasInfo: boolean;
  score: number;

  public constructor(comparationId:string, name: string, hasInfo: boolean, score: number) {
    this.comparationId = comparationId;
    this.name = name;
    this.hasInfo = hasInfo;
    this.score = score;
  }
}
