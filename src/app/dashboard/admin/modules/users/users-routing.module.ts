import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';

const routes: Routes = [
  {path: '', component: ListUsersComponent},
  // {path: 'view-profile/:id/:formDisabled', component: ViewProfileComponent },
  // {path: 'view-profile/:id', component: ViewProfileComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
