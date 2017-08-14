import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-screen',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

  @Input() text: string;

  constructor() {
  }

}
