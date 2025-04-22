import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';
import { SharedModule } from 'src/app/dashboard/shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    ListRecipesComponent,
    AddEditRecipesComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
    NgxFileDropModule,
    
  ]
})
export class RecipesModule { }
