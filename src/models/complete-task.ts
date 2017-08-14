export class CompleteTask {
  performedTime: number;
  filledTime: number;
  score: number;
  constructor(performedTime, filledTime, score) {
    this.performedTime = performedTime;
    this.filledTime = filledTime;
    this.score = score;
  }
}
