import { FavService } from 'src/app/dashboard/user/modules/fav/services/fav.service';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { ICategoryData, IGetCategoryParams } from 'src/app/dashboard/admin/modules/categories/models/categories';
import { IGetSearchParams, IRecipeData, ITag } from 'src/app/dashboard/admin/modules/recipes/models/recipes';
import { RecipesService } from 'src/app/dashboard/admin/modules/recipes/services/recipes.service';
import { DeleteItemComponent } from 'src/app/dashboard/shared/components/delete-item/delete-item.component';
import { HelperService } from 'src/app/dashboard/shared/services/helper.service';
import { FavDialogComponent } from '../../../fav/components/fav-dialog/fav-dialog.component';


@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.scss']
})
export class UserRecipesComponent {
  defaultImage = '../../../../../assets/images/pizza.jfif';
  baseUrl = 'https://upskilling-egypt.com:3006/';
  recipesList: IRecipeData[] = [];
    favList: { id: number;
      recipe: IRecipeData 
    }[] = [];

  tableRes: any;
  searchQuery: string = '';
  searchSubject = new Subject<string>();
  tagList!: ITag[];
  tagId: number = 0;
  categoryId: number = 0;
  categoryList!: ICategoryData[];
  
  categoryParams: IGetCategoryParams = {
    pageSize: 100,
    pageNumber: 1,
  }
  tableQueryParams: IGetSearchParams = {
    name: '',
    tagId: this.tagId,
    categoryId: this.categoryId,
    pageSize: 5,
    pageNumber: 1,
  
  };


  constructor(
    private recipesService: RecipesService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private helperService: HelperService,
    private favService:FavService
  ) {
    this.getRecipesData();
    this.getTags();
    this.getCategoriesData();
    this.favService.getFav();
  }


  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => {
        this.tableQueryParams = {
          ...this.tableQueryParams,
          name: query,
          pageNumber: 1
        };
        console.log(this.tableQueryParams);
        return this.recipesService.getRecipes(this.tableQueryParams);
      })

    ).subscribe({
      next: (res) => {
        this.recipesList = res.data;
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    });
    }
  onSearchInputChange() {
    this.searchSubject.next(this.searchQuery);
  }
  getRecipesData() {
    this.recipesService.getRecipes(this.tableQueryParams).subscribe({
      next: (res) => {
        if (res?.data?.length) { 
          this.recipesList = res.data;
          console.log("Recipes List:", this.recipesList);
          this.tableRes = res;
        } else {
          this.recipesList = [];
          console.log("No recipes found.");
        }
      },
      error: (err) => {
        console.error('Error fetching recipes:', err);
      }
    });
  }
  getTags(): void {
    this.helperService.getTags().subscribe({
      next: (res) => {
        this.tagList = res;
        console.log('Tag List:', this.tagList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  getCategoriesData() {
    this.helperService.getCategories(this.categoryParams).subscribe({
      next: (res) => {
        this.categoryList = res.data;
        console.log('Category List:', this.categoryList);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
    openDeleteDialog(recipe: IRecipeData): void {
      const dialogRef = this.dialog.open(DeleteItemComponent , {
        data: {name: recipe.name},
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log(recipe.id);
          this.deleteRecipe(recipe.id)
        }
        });
      }
      deleteRecipe(id : number | undefined): void {
        this.recipesService.deleteRecipe(id).subscribe({
          next: (res) => {
            console.log(res);
            this.toastr.success('Recipe Deleted Successfully');
          },
          error: (err) => {
            this.toastr.error(err.error.message);
          },
          complete: () => { 
            this.getRecipesData();
          }
        }) 
      }
      getRecipeImage(imagePath: string | undefined): string {
        return imagePath ? this.baseUrl + imagePath : this.defaultImage;
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
        openViewFavDialog(recipe:IRecipeData): void{
          const dialogRef = this.dialog.open(FavDialogComponent, {
            width: '500px',
            data: {
              id: recipe.id,
              imagePath: recipe.imagePath,
              description: recipe.description,
              name: recipe.name
            }
          });
        }
        clearFilters(): void {
          this.searchQuery = '';
          this.tagId = 0;
          this.categoryId = 0;
        
          this.tableQueryParams = {
            ...this.tableQueryParams,
            name: '',
            tagId: 0,
            categoryId: 0,
            pageNumber: 1 
          };
        
          this.getRecipesData();
        }
  handlePageEvents(event: PageEvent): void {
    if (
      this.tableQueryParams.pageNumber !== event.pageIndex + 1 ||
      this.tableQueryParams.pageSize !== event.pageSize
    ) {
      this.tableQueryParams = {
        ...this.tableQueryParams, 
        pageNumber: event.pageIndex + 1,
        pageSize: event.pageSize
      };
      this.getRecipesData();
    }
  }
}
