import { TestBed, async } from '@angular/core/testing';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { IonicModule, Platform } from 'ionic-angular';
import { PlatformMock, SplashScreenMock, StatusBarMock, TranslateServiceMock } from '../../test-config/mocks-ionic';
import { LandingPage } from '../pages/landing/landing';
import { MyApp } from './app.component';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyApp],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        { provide: StatusBar, useClass: StatusBarMock },
        { provide: SplashScreen, useClass: SplashScreenMock },
        { provide: Platform, useClass: PlatformMock },
        { provide: TranslateService, useClass: TranslateServiceMock },
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component instanceof MyApp).toBe(true);
  });

  it('should initialize with a root page of LandingPage', () => {
    expect(component['rootPage']).toBe(LandingPage);
  });
});
