import { Injectable } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {SearchCriteria} from '../models/search-criteria';
import {Company} from '../models/company-interfaces';

@Injectable()
export class CompaniesProvider {
  companiesList: Array<Company> =[];
  imagesList: string[];
  constructor(public http: Http) {
   this.imagesList = [
      "assets/infografies/commomfojmddoekd.png",
      "assets/infografies/publi1_m.jpg",
      "assets/infografies/commomfojmddoekd.png",
      "assets/infografies/publi1_m.jpg"

    ];
  
  }
  //TODO Remove when infographicsJS is integrated
  getImages(){
    return this.imagesList;
  }
  getCompanies(): Company[] {
    return this.companiesList;
  }
  setCompanies(){}
  addCompany(){}

  requestCompanies(criteria: SearchCriteria){
    //TODO not working ATM further investigation is needed also needed to get this data from a config file
    
    let server ="https://testing.biit-solutions.com:8443/koobepop-server-0.0.25/rest/getCompanies";
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Authorization', 'Basic d2Vic2VydmljZUB0ZXN0LmNvbTp1M2YyZVRIOTFWb0JpTmU=');
    //console.log("Requesting...",criteria);
    let response = this.http
    .post(server,criteria,{headers: headers})
    .map(this.extractData);
    response.forEach(el=>this.companiesList=el);
   }
    extractData(res: Response){
      return res.json() || { };
    }
}
