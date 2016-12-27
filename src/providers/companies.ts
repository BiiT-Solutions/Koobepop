import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SearchCriteria} from '../models/search-criteria';
import {Company} from '../models/company-interfaces';

@Injectable()
export class Companies {
  companiesList: Company[] =[];
  imagesList: string[];
  constructor(public http: Http) {
   this.imagesList = [
      "assets/infografies/commomfojmddoekd.png",
      "assets/infografies/commomfojmddoekd.png",
  "assets/infografies/red_graph.jpg",  
  "assets/infografies/blue_graph.jpg",
  "assets/infografies/red_graph.jpg",
  "assets/infografies/blue_graph.jpg",
  "assets/infografies/publi1_m.jpg",  
  "assets/infografies/commomfojmddoekd.png",
  "assets/infografies/publi1_m.jpg",
  "assets/infografies/green_orange_graph.jpg",
  "assets/infografies/commomfojmddoekd.png"
    ];
  
  }
  getCompanies() {
    return this.imagesList;
    //return this.companiesList;
  }
  setCompanies(){}
  addCompany(){}
  requestCompanies(criteria: SearchCriteria){
    let response = this.http.post("",criteria);
     response.forEach(el=>{
       this.companiesList.push(el.json());
     });
  }
}
