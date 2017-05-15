import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";
@Component({
  selector: 'unsel-confirmation',
  templateUrl: 'unsel-confirmation.html'
})
export class UnselConfirmationComponent {
 
  constructor(public viewCtrl: ViewController) {
  }

  close(x) {    
    this.viewCtrl.dismiss(x);
  }

}
