import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { VerifyComponent } from './components/verify/verify.component';
import { SharedModule } from '../dashboard/shared/shared.module';


@NgModule({
  declarations: [
    AuthComponent,
    RegisterComponent,
    ForgetComponent,
    ResetComponent,
    VerifyComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    SharedModule
  ],
  providers:[AuthService],
  // exports: [RegisterComponent]

})
export class AuthModule { }
