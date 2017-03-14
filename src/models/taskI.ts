export interface ITask {
  name: string;
  startingTime: number;
  repetitions: number
  performedOn: number[]; // sorted array of performation dates
  videoUrl?: string;
  infoUrl?: string;
}