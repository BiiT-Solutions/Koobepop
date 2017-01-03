import { Component,} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { OptimizedBookPage } from '../optimized-book/optimized-book';
import { DetailsPage } from '../details/details';
import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  BOOK_HEIGHT=4;
  constructor(public navCtrl: NavController,public platform: Platform,private translate: TranslateService) {
  translate.use('en');  
  }
  navSearchView(){
    this.navCtrl.push(SearchPage);
  }
  navOptimizedBook(){
    this.navCtrl.push(OptimizedBookPage);
  }
  navDetails(){
    this.navCtrl.push(DetailsPage);
  }
  navAbout(){
    this.navCtrl.push(AboutPage)
  }
}

