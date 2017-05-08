import { IPerformance } from './performation';
export interface ITask {
  name: string;
  startingTime: number;
  repetitions: number
  performedOn: Map<number,IPerformance[]>; // sorted array of performation dates
  videoUrl?: string;
  content?: string; //Some HTML content
  type:string;
}