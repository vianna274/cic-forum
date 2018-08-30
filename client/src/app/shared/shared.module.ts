import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../alert/alert.component';


@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    AlertComponent
  ],
  declarations: [AlertComponent]
})
export class SharedModule { }
