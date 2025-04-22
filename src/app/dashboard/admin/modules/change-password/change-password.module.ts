import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ChangePasswordModule { }
