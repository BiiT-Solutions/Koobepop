import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'effort-selector',
  templateUrl: 'effort-selector.html'
})
export class EffortSelectorComponent {
  //Effort intensity levels
  public LIGHT: number = 1;
  public MODERATE:number = 2;
  public HEAVY:number = 3;
  public PAIN:number = 4;
  constructor(public viewCtrl: ViewController) {
  }

  close(x) {    
    this.viewCtrl.dismiss(x);
  }

}
