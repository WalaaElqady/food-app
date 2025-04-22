import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FavService } from 'src/app/dashboard/user/modules/fav/services/fav.service';
import { ToastrService } from 'ngx-toastr';
import { RecipesService } from 'src/app/dashboard/admin/modules/recipes/services/recipes.service';

@Component({
  selector: 'app-fav-dialog',
  templateUrl: './fav-dialog.component.html',
  styleUrls: ['./fav-dialog.component.scss']
})
export class FavDialogComponent {
  defaultImage = '../../../../../assets/images/pizza.jfif';

  constructor( @Inject(MAT_DIALOG_DATA,) public data: any,
  private recipesService: RecipesService,
  private toastr: ToastrService,
  private favService:FavService,
  public dialogRef: MatDialogRef<FavDialogComponent>) { }
   closeDialog():void{
     this.dialogRef.close()
   }
   onClose() {
    this.dialogRef.close();
  }
  addToFav(id: number | undefined): void {
    if (id === undefined) {
      this.toastr.error('Invalid Recipe ID');
      return;
    }
        this.favService.getFav().subscribe({
      next: (res) => {
        const favList = res.data.map(item => item.recipe);
  
        const isAlreadyFav = favList.some(fav => fav?.id === id);
  
        if (isAlreadyFav) {
          this.toastr.warning('Recipe Already Added To Favorites');
          return;
        }
          this.recipesService.addToFav(id).subscribe({
          next: (response) => {
            console.log(response);
            this.toastr.success('Recipe Added To Favorites Successfully');
            this.favService.getFav();
          },
          error: (err) => {
            this.toastr.error(err.error.message);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching favorite recipes:', err);
      }
    });
  }
}
