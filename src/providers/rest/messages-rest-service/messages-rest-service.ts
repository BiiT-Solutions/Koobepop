
import { Injectable, Inject } from '@angular/core';
import { APP_CONFIG, IAppConfig } from '../../../app/app.config';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { BasicRestService } from '../basic-rest-service/basic-rest-service';
import { TokenProvider } from '../../storage/token-provider/token-provider';
import { MessageModel } from '../../../models/message.model';
import { UserProvider } from '../../storage/user-provider/user-provider';
import { SettingsProvider } from '../../storage/settings/settings';

@Injectable()
export class MessagesRestService extends BasicRestService {
  constructor(protected http: Http,
    @Inject(APP_CONFIG) protected config: IAppConfig,
    protected tokenProvider: TokenProvider,
    protected userProvider: UserProvider,
    protected translate: TranslateService,
    protected settings: SettingsProvider
  ) {
    super(http, config, tokenProvider, userProvider, settings);
  }

  public requestMessages(from: number): Observable<MessageModel[]> {
    const requestAddres = this.config.getMessagesService;
    const body = {
      updateTime: from
    }
    return super.postWithToken(requestAddres, body)
      .map((res: Response) => this.extractData(res))
      .map((res: any[]) => this.toMessageModel(res));
  }

  private extractData(res) {
    return res.json() || [];
  }

  private toMessageModel(res: any[]): MessageModel[] {
    const messagesList = [];

    res.forEach(message => {
      messagesList.push(new MessageModel(message.title, message.body, "", message.time));
    });
    //Sort by date
    messagesList.sort((a: MessageModel, b: MessageModel) => b.time - a.time);
    return messagesList;
  }
}
