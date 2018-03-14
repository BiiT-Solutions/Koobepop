import { async, TestBed } from '@angular/core/testing';
import { IonicModule,  NavController } from 'ionic-angular';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ToastIssuer } from '../../providers/toastIssuer/toastIssuer';
import { ReportPage } from './report';
import { InfographicSlideComponent } from '../../components/infographic-slide/infographic-slide';
import { ReportsProvider } from '../../providers/storage/reports-provider/reports-provider';
import { LoadingComponent } from '../../components/loading/loading';
import { InfographicItemComponent } from '../../components/infographic-item/infographic-item';
import { KppZoomPanComponent } from '../../components/kpp-zoom-pan/kpp-zoom-pan';


import {
  TranslateServiceMock,  
  ToastIssuerMock,
  NavMock,
  ReportsProvMock
} from '../../../test-config/mocks-ionic';

describe('ReportPage', () => {
  let fixture;
  let component:ReportPage;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportPage,
        InfographicSlideComponent,
        InfographicItemComponent,
        KppZoomPanComponent,
        LoadingComponent],
      imports: [
        IonicModule.forRoot(ReportPage),
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: NavController, useClass: NavMock },
        { provide: ToastIssuer, useClass: ToastIssuerMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: ReportsProvider, useClass: ReportsProvMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPage);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof ReportPage).toBe(true);
  });

});
