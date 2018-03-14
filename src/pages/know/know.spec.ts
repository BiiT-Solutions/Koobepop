import { async, TestBed } from '@angular/core/testing';
import { KnowPage } from './know';
import { IonicModule, NavController } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';
import { MessagesListComponent } from '../../components/messages-list/messages-list';
import { NotificationMessageComponent } from '../../components/notification-message/notification-message';
import { MessagesProvider } from '../../providers/storage/messages-provider/messages-provider';

import {  
  NavMock,
  ChangeDetectorRefMock,
  MessagesProvMock
} from '../../../test-config/mocks-ionic';

describe('KnowPage', () => {
  let fixture;
  let component: KnowPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KnowPage, MessagesListComponent, NotificationMessageComponent],
      imports: [
        IonicModule.forRoot(KnowPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: MessagesProvider, useClass: MessagesProvMock },
        { provide: ChangeDetectorRef, useClass: ChangeDetectorRefMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnowPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof KnowPage).toBe(true);
  });
});
