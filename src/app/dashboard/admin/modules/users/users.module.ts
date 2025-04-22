import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { SharedModule } from 'src/app/dashboard/shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { AuthService } from '../../../../auth/services/auth.service';



@NgModule({
  declarations: [
    ListUsersComponent,
    ViewProfileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    NgxFileDropModule
  ],
  providers: [AuthService]
})
export class UsersModule { }
