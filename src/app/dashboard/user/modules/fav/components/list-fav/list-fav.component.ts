import { Component } from '@angular/core';
import { IRecipeData } from 'src/app/dashboard/admin/modules/recipes/models/recipes';
import { FavService } from 'src/app/dashboard/user/modules/fav/services/fav.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-fav',
  templateUrl: './list-fav.component.html',
  styleUrls: ['./list-fav.component.scss']
})
export class ListFavComponent {
  constructor(private favService: FavService,
    private toastr: ToastrService
  ) { 
    this.getFavData();
  }
  favList: { id: number;
    recipe: IRecipeData 
  }[] = [];
  tableRes: any;
    defaultImage = '../../../../../assets/images/pizza.jfif';
    getFavData() {
      this.favService.getFav().subscribe({
        next: (res) => {
          if (res?.data?.length) { 
            this.favList = res.data
              .filter(item => item.id !== undefined) 
              .map(item => ({
                id: item.id as number,  
                recipe: item.recipe ?? {} as IRecipeData
              }));
            console.log("Fav List:", this.favList);
          } else {
            this.favList = [];
            console.log("No recipes found.");
          }
        },
        error: (err) => {
          console.error('Error fetching recipes:', err);
        }
      });
    }
    
    
    removeFav(favId?: number) {
      if (favId === undefined) {
        console.error('Error: favId is undefined');
        return;
      }    
      this.favService.removeFav(favId).subscribe({
        next: () => {
          this.toastr.success(`Recipe removed from favorites.`);
          console.log(`Recipe ${favId} removed from favorites.`);
          
          this.getFavData(); 
        },
        error: (err) => {
          console.error(`Error removing recipe ${favId}:`, err);
        }
      });
    }
    
}
