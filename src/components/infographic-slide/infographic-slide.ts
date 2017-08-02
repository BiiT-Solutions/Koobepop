import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'infographic-slide',
  templateUrl: 'infographic-slide.html'
})
export class InfographicSlideComponent {
  @Input() infographic:any[]=[];
  @Output() zoom: EventEmitter<boolean> = new EventEmitter();
  constructor() {  }

  public isZoom(zoomActive:boolean){
    this.zoom.emit(zoomActive);
  }
}
