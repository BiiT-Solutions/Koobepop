import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Company } from '../models/company-interfaces';
import { APP_CONFIG, IAppConfig } from '../app/app.config';

@Injectable()
export class CompaniesProvider {
  companiesList: Array<Company> = [];
  imagesList: string[];
  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig) {
    this.imagesList = [
      "assets/infografies/commomfojmddoekd.png",
      "assets/infografies/publi1_m.jpg",
      "assets/infografies/commomfojmddoekd.png",
      "assets/infografies/publi1_m.jpg"
    ];

  }
  //TODO Remove when infographicsJS is integrated
  getImages() {
    return this.imagesList;
  }
  getCompanies(): Company[] {
    return this.companiesList;
  }
  setCompanies() { }
  addCompany() { }

  requestCompanies(criteria:any) {
    //TODO not working ATM further investigation is needed also needed to get this data from a config file

    let requestAddres = this.config.koobepopServer + this.config.getCompaniesService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    let response = this.http
      .post(requestAddres, criteria, { headers: headers })
      .map(this.extractData);
    response.forEach(el => this.companiesList = el);
  }
  extractData(res: Response) {
    return res.json() || {};
  }
}
