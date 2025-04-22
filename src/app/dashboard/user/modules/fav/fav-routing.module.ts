import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFavComponent } from './components/list-fav/list-fav.component';

const routes: Routes = [{ path: '', component: ListFavComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavRoutingModule { }
