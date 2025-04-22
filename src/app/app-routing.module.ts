import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';

const routes: Routes = [
{path: '', redirectTo: 'auth', pathMatch: 'full'},
{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'dashboard',
  canActivate: [authGuard],
   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: 'fav', loadChildren: () => import('./dashboard/user/modules/fav/fav.module').then(m => m.FavModule) },
{ path: 'user-recipes', loadChildren: () => import('./dashboard/user/modules/user-recipes/user-recipes.module').then(m => m.UserRecipesModule) },
// { path: '**', redirectTo: 'auth' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
