import { Component} from '@angular/core';
import { ViewController } from "ionic-angular";

/**Component to accept or decline*/
@Component({
  selector: 'unsel-confirmation',
  templateUrl: 'unsel-confirmation.html'
})
export class UnselConfirmationComponent {
 
  constructor(public viewCtrl: ViewController) {
  }

  close(x:boolean) {    
    this.viewCtrl.dismiss(x);
  }

}
