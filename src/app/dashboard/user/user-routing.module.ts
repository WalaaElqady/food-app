import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { DashboardComponent } from '../dashboard.component';

const routes: Routes = [
    { path: '', component: UserComponent },
   {path: 'user-recipes',
    loadChildren: () => import('./modules/user-recipes/user-recipes.module')
      .then(m => m.UserRecipesModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./modules/fav/fav.module')
      .then(m => m.FavModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
