import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';
import { SearchCriteria } from '../../models/search-criteria';
import { ZoomPage } from '../test/test';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  country:string = "";
  brand:string = "";
  product:string = "";
  service: string = "";
  constructor(public navCtrl: NavController,public companiesProvider: CompaniesProvider) {}

  searchCompanies(){
    //go to book page
    //there show search results
   let criteria: SearchCriteria = {
     brand: this.brand,
     country: this.country,
     product: this.product,
     service:this.service} ;
     this.companiesProvider.requestCompanies(criteria);
    //this.navCtrl.insert(this.navCtrl.indexOf(this.navCtrl.last()),OptimizedBookPage);
   // this.navBack();
   this.navCtrl.push(ZoomPage);
}
  navBack(){
    this.navCtrl.pop();
  }
}
