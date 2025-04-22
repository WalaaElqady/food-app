import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'categories',
    loadChildren: () => import('./modules/categories/categories.module')
      .then(m => m.CategoriesModule)
  },
  {
    path: 'recipes',
    loadChildren: () => import('./modules/recipes/recipes.module')
      .then(m => m.RecipesModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module')
      .then(m => m.UsersModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./modules/change-password/change-password.module')
      .then(m => m.ChangePasswordModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
