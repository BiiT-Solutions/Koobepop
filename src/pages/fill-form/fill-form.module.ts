import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FillFormPage } from './fill-form';

@NgModule({
  declarations: [
    FillFormPage,
  ],
  imports: [
    IonicPageModule.forChild(FillFormPage),
  ],
})
export class FillFormPageModule {}
