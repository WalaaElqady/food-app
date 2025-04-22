import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListRecipesComponent } from './components/list-recipes/list-recipes.component';
import { AddEditRecipesComponent } from './components/add-edit-recipes/add-edit-recipes.component';

const routes: Routes = [
  {path: '', component: ListRecipesComponent},
  {path: 'addRecipe', component: AddEditRecipesComponent},
  {path: 'editRecipe/:id', component: AddEditRecipesComponent},
  {path: 'viewRecipe/:id/:formDisabled', component: AddEditRecipesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
