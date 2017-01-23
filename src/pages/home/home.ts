import { Component,} from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { BookPage } from '../book/book';
import { DetailsPage } from '../details/details';
import { AboutPage } from '../about/about';
import { TranslateService } from 'ng2-translate';
import {TestPage} from '../test/test';
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
    this.navCtrl.push(BookPage);
  }
  navDetails(){
    this.navCtrl.push(DetailsPage);
  }
  navAbout(){
    this.navCtrl.push(AboutPage);
  }
  navTest(){
    this.navCtrl.push(TestPage);
  }
}

