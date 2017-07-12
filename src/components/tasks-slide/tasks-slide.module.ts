import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TasksSlideComponent } from './tasks-slide';

@NgModule({
  declarations: [
    TasksSlideComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    TasksSlideComponent
  ]
})
export class TasksSlideComponentModule {}
