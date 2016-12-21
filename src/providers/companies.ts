import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Companies {
  companiesList;
  constructor(public http: Http) {
    this.companiesList = [
  "assets/infografies/commomfojmddoekd.png",
  "assets/infografies/red_graph.jpg",
  "assets/infografies/red_graph.jpg",
  "assets/infografies/blue_graph.jpg",
  "assets/infografies/blue_graph.jpg",
  "assets/infografies/publi1_m.jpg",  
  "assets/infografies/commomfojmddoekd.png",
  "assets/infografies/publi1_m.jpg",
  "assets/infografies/green_orange_graph.jpg",
  "assets/infografies/commomfojmddoekd.png"]
  }
  getCompanies(): any {
    return this.companiesList;
  }
  setCompanies(){}
  addCompany(){}
  
}
