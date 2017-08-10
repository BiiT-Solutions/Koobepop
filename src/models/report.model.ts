
export class ReportModel {

  appointmentId: number;
  updateTime: number;
  infographicsList: any[];

  constructor(appointmentId: number, updateTime: number, infographicsList: any[]) {
    this.appointmentId = appointmentId;
    this.updateTime = updateTime;
    this.infographicsList = infographicsList;
  }
  public addInfographic(infographic: any) {
    this.infographicsList.push(infographic);
  }
  public getInfographics(): any[] {
    return this.infographicsList;
  }

}
