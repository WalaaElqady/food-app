import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsersService } from '../admin/modules/users/services/users.service';
import { MatOptionModule } from '@angular/material/core';
import { ProfileComponent } from './components/profile/profile.component';






@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    DeleteItemComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    NgxFileDropModule


  ],
  exports: [
    SidebarComponent,
    NavbarComponent,
    ProfileComponent,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    DeleteItemComponent,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    NgxFileDropModule
 
  ],
  providers: [AuthService, UsersService], 

})
export class SharedModule { }
