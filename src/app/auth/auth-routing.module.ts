import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { VerifyComponent } from './components/verify/verify.component';

const routes: Routes =
[
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'forget', component: ForgetComponent},
  {path: 'reset', component: ResetComponent},
  { path: 'verify', component: VerifyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
