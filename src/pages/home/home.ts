import { Component,} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {VerticalBookPage} from '../vertical-book/vertical-book';
import { HorizonalBookPage } from '../horizontal-book/horizontal-book';
import { SearchPage } from '../search/search';
import { OptimizedBookPage } from '../optimized-book/optimized-book';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  BOOK_HEIGHT=4;
  constructor(public navCtrl: NavController,public platform: Platform) {
    }
  navHorizontalBook(){
    this.navCtrl.push(HorizonalBookPage);
  }
  
  navVerticalBook(){
	  this.navCtrl.push(VerticalBookPage);
	  
  }
  navSearchView(){
    this.navCtrl.push(SearchPage);
  }
  navOptimizedBook(){
    this.navCtrl.push(OptimizedBookPage);
  }
  
}

