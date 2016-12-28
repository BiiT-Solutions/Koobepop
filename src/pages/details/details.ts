import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';
import { Contact } from '../../models/company-interfaces'
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
  contacts:Contact[] = [{name:"Daniel J",mail:"dan@test.com",phone:"661457616"}, {name:"Illian",mail:"amelcon@biit-solutions.com",phone:"625357585"}];
  constructor(public navCtrl: NavController) { }


}
