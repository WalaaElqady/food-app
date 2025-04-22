import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavRoutingModule } from './fav-routing.module';
import { FavComponent } from './fav.component';
import { ListFavComponent } from './components/list-fav/list-fav.component';
import { SharedModule } from 'src/app/dashboard/shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FavDialogComponent } from './components/fav-dialog/fav-dialog.component';


@NgModule({
  declarations: [
    FavComponent,
    ListFavComponent,
    FavDialogComponent
  ],
  imports: [
    CommonModule,
    FavRoutingModule,
    SharedModule,
    NgxFileDropModule
  ]
})
export class FavModule { }
