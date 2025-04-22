import { RecipesService } from './../../services/recipes.service';
import { Component, OnInit } from '@angular/core';
import { IRecipeData, IGetSearchParams, ITag} from '../../models/recipes';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { HelperService } from 'src/app/dashboard/shared/services/helper.service';
import { ICategoryData, IGetCategoryParams} from '../../../categories/models/categories';
import { DeleteItemComponent } from 'src/app/dashboard/shared/components/delete-item/delete-item.component';


@Component({
  selector: 'app-list-recipes',
  templateUrl: './list-recipes.component.html',
  styleUrls: ['./list-recipes.component.scss']
})
export class ListRecipesComponent implements OnInit {
    
  recipesList: IRecipeData[] = [];
  tableRes: any;
  searchQuery: string = '';
  searchSubject = new Subject<string>();
  tagList!: ITag[];
  tagId: number = 0;
  categoryId: number = 0;
  categoryList!: ICategoryData[];

  defaultImage = '../../../../../../../assets/images/pizza.jfif';
  baseUrl = 'https://upskilling-egypt.com:3006/';
  
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
    private helperService: HelperService
  ) {
    this.getRecipesData();
    this.getTags();
    this.getCategoriesData();
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
      clearFilters(): void {
        // Reset all filter values
        this.searchQuery = '';
        this.tagId = 0;
        this.categoryId = 0;
      
        // Reset table query params
        this.tableQueryParams = {
          name: '',
          tagId: 0,
          categoryId: 0,
          pageSize: 5,
          pageNumber: 1
        };
      
        // Get all data again
        this.getRecipesData();
      }
      getRecipeImage(imagePath: string | undefined): string {
        return imagePath ? this.baseUrl + imagePath : this.defaultImage;
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
