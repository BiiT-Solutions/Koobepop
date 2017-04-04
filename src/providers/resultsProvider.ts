import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { IAppConfig, APP_CONFIG } from '../app/app.config';
import { IAppointment } from '../models/appointmentI';
import { AuthTokenService } from './authTokenService';
import { Observable } from 'rxjs/Observable';
import { FormResult, CategoryResult, QuestionResult } from '../models/results';

@Injectable()
export class ResultsProvider {

  constructor(public http: Http, @Inject(APP_CONFIG) private config: IAppConfig, private authService: AuthTokenService) {
  }

  requestResults(appointment: IAppointment,token:string): Observable<any> {
    let requestAddres = this.config.usmoServer + this.config.getResultsService;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);

    let criteria = {
      token: token,
      appointmentId: appointment.appointmentId
    }

    return this.http.post(requestAddres, criteria, { headers: headers })
      .map(this.extractData).map((results) => {
        return results ? this.extractData(results) : [];
      });
  }

  extractData(res: Response) {
    return res.json() || {};
  }

    private formatResults(results): FormResult[] {
        let formResults: FormResult[] = [];
        results.forEach(result =>
            formResults.push(this.formatForm(result.formResult))
        );
        return formResults;
    }    
    private formatForm(form): FormResult {
        let formChildren: CategoryResult[] = [];
        form.children.forEach(category => {
            formChildren.push(this.formatCategory(category));
        });
        return {
            name: form.label,
            children: formChildren
        }
    }
    private formatCategory(category): CategoryResult {
        let categoryChildren: any[] = [];
        category.children.forEach(child => {
            if (child.class == "com.biit.form.result.RepeatableGroupResult") {
                categoryChildren.push(this.formatCategory(child));
            }
            else if (child.class == "com.biit.form.result.QuestionWithValueResult") {
                categoryChildren.push(this.formatQuestion(child));
            }
        })
        return { name: category.name, children: categoryChildren }
    }

    private formatQuestion(question): QuestionResult {
        return { name: question.name, values: question.values }
    }
}
