import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'effort-selector',
  templateUrl: 'effort-selector.html'
})
export class EffortSelectorComponent {
  //Effort intensity levels
  public LIGHT_LOW: number = 1;
  public LIGHT_HIGH:number = 2;
  public MODERATE_LOW:number = 3;
  public MODERATE_HIGH:number = 4;
  public HEAVY_LOW:number = 5;
  public HEAVY_HIGH:number = 6;
  constructor(public viewCtrl: ViewController) {
  }

  close(x) {    
    this.viewCtrl.dismiss(x);
  }

}
