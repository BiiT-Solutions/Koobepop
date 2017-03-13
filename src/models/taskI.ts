export interface ITask {
  name: string;
  startDate: number;
  dueDate: number;
  performTimes: number
  performedOn: number[]; // sorted array of performation dates
  videoUrl?: string;
  infoUrl?: string;
}