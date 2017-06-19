import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";

/** This is a component to select the effort from a task */
@Component({
  selector: 'effort-selector',
  templateUrl: 'effort-selector.html'
})
export class EffortSelectorComponent {
  //Effort intensity levels
  public static LIGHT: number = 3;
  public static MODERATE:number = 2;
  public static HEAVY:number = 1;
  public static PAIN:number = 0;
  
  public constructor(public viewCtrl: ViewController) {}

  public close(x) {    
    this.viewCtrl.dismiss(x);
  }

}
