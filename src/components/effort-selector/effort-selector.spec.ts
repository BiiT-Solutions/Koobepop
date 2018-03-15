
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffortSelectorComponent } from './effort-selector';
import { App, Form, Keyboard, Platform, ViewController } from 'ionic-angular';
import { TranslateServiceMock, ViewControllerMock } from '../../../test-config/mocks-ionic';
import { MockPlatform } from 'ionic-angular/util/mock-providers';

describe('EffortSelectorComponent:', () => {

    let comp: EffortSelectorComponent;
    let fixture: ComponentFixture<EffortSelectorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [EffortSelectorComponent],
            providers: [
                App,
                Form,
                Keyboard,
                { provide: Platform, useClass: MockPlatform },
                { provide: TranslateService, useClass: TranslateServiceMock },
                { provide: ViewController, useClass: ViewControllerMock }
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                TranslateModule.forRoot()
            ],
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EffortSelectorComponent);
        comp = fixture.componentInstance;
    })


    it('Should be defined', () => {
        expect(comp).toBeDefined();
    });

});
