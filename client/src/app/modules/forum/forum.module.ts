import { CustomMaterialModule } from './../custom-material/custom-material.module';
import { DataService } from 'src/app/services/data.service';
import { AuthGuardService } from './../../auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumHomeComponent } from './forum-home/forum-home.component';
import { ForumCategoryComponent } from './forum-category/forum-category.component';
import { ForumSubCategoryComponent } from './forum-sub-category/forum-sub-category.component';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  entryComponents: [ForumCategoryComponent],
  declarations: [ForumHomeComponent, ForumCategoryComponent, ForumSubCategoryComponent],
  exports: [ForumHomeComponent],
  bootstrap: [ForumHomeComponent, ForumCategoryComponent]
})
export class ForumModule { }
