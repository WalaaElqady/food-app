import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { SharedModule } from 'src/app/dashboard/shared/shared.module';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';




@NgModule({
  declarations: [
    ListCategoriesComponent,
    AddEditCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
