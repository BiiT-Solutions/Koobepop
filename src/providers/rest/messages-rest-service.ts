
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../app/app.config';
import { Http, Response, Headers } from '@angular/http';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AppointmentModel } from '../../models/appointment.model';
import { TranslateService } from '@ngx-translate/core';
import { KppRestService } from './kppRestService';
import { TokenProvider } from '../storage/tokenProvider';
import { MessageModel } from '../../models/message.model';

@Injectable()
export class MessagesRestService extends KppRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected translate: TranslateService) {
    super(http, config, tokenProvider);
  }

  public requestMessages(from: number ): Observable<MessageModel[]> {
    const requestAddres = this.config.usmoServer + this.config.getMessagesService;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.config.password);
    const body = {
      fromDate: from
    }
    return super.request(requestAddres, body, headers)
      .map((res: Response) => this.extractData(res))
      .map((res:any[])=>this.toMessageModel(res));
  }
    public extractData(res){
      return res.json() || [];
    }
    public toMessageModel(res:any[]):MessageModel[]{
      const messagesList = [];
      res.forEach(message=>{
        messagesList.push(new MessageModel(message.data.title,message.data.body,"",message.data.time));
      });
      //Sort by date
      messagesList.sort((a:MessageModel,b:MessageModel)=>b.time-a.time);
      return messagesList;
    }
}
