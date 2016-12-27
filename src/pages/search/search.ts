import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  country:string = "";
  brand:string = "";
  product:string = "";
  service: string = "";
  myInput="";
  items = ["item1","item2","item3","item4","item5","item6"];
  constructor(public navCtrl: NavController) {}

  searchCompanies(){
    
  }
}
