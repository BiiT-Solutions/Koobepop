import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TaskItemComponent } from './task-item';

@NgModule({
  declarations: [
    TaskItemComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TaskItemComponent
  ]
})
export class TaskItemComponentModule {}
