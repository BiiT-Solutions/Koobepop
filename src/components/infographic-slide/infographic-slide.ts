import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ReportModel } from '../../models/report.model';

@Component({
  selector: 'infographic-slide',
  templateUrl: 'infographic-slide.html'
})
export class InfographicSlideComponent {
  @Input() report: ReportModel;
  @Output() zoom: EventEmitter<boolean> = new EventEmitter();
  constructor() {  }

  public isZoom(zoomActive:boolean){
    this.zoom.emit(zoomActive);
  }

  public reportInfographics():any[]{
   if(this.report!=undefined){
    return this.report.infographicsList;
  }else{
    return []
  }
  }
}
