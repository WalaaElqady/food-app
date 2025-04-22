import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipesComponent } from './components/list-user-recipes/user-recipes.component';

const routes: Routes = [{ path: '', component: UserRecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRecipesRoutingModule { }
