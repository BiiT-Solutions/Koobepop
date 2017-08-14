import { Component, Input } from '@angular/core';

/**
 * Generated class for the LoadingComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'loading-screen',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

  @Input() text: string;

  constructor() {
    this.text = '';
  }

}
