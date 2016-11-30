import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

//BOOK_WIDTH = dispositive.width*2
//BOOK_HEIGHT = dispositive.height

//PAGE_WIDTH = dispositive.width -10%
//PAGE_HEIGHT = dispositive.height -10%


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

}
