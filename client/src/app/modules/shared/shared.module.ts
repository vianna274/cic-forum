import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';


@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [
    CommonModule
  ],
  declarations: []
})
export class SharedModule { }
