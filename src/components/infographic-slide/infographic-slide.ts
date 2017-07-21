import { Component, Input } from '@angular/core';

@Component({
  selector: 'infographic-slide',
  templateUrl: 'infographic-slide.html'
})
export class InfographicSlideComponent {
  @Input() infographic:any[]=[];
  constructor() {  }
}
