import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';
import { Contact, Company } from '../../models/company-interfaces'
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
//TODO: Get the data from the companies provider
  companyName:string;
  address:string;
  url:string;
  phone:string[];
  vat:string;
  established:string;
  companyIndex: number = 0;
  contacts:Contact[] = [{name:"Daniel J",mail:"dan@test.com",phone:"661457616"}, {name:"Illian",mail:"amelcon@biit-solutions.com",phone:"625357585"}];
  company: Company;
  constructor(public navCtrl: NavController,public navParams: NavParams, public compProv: CompaniesProvider) {
    if(compProv.getCompanies() != undefined){
     this.company = compProv.getCompanies()[navParams.data];
     }
    }


}
