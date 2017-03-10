import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'effort-selector',
  templateUrl: 'effort-selector.html'
})
export class EffortSelectorComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
  }

}
