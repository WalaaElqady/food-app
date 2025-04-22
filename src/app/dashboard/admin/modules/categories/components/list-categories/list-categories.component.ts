import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { ICategoryData, IGetCategoryParams } from '../../models/categories';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
import { DeleteItemComponent } from 'src/app/dashboard/shared/components/delete-item/delete-item.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss']
})
export class ListCategoriesComponent {
 
  tableParams: IGetCategoryParams = {
    pageSize: 5,
    pageNumber: 1,
  }
  categoriesList!: ICategoryData[];
  tableRes:any;
  constructor(private categoriesService: CategoriesService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.getCategoriesData()
  }

  getCategoriesData() {
    this.categoriesService.getCategories(this.tableParams).subscribe({
      next: (res) => {
        this.categoriesList = res.data;
        this.tableRes = res;
  
        this.tableParams = {
          pageNumber: res.pageNumber,
          pageSize: res.pageSize
        };
        // console.log('Response from API:', res);
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }
  
  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {
        name: '',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory(result.name)
      }
    });
  }
  addCategory(categoryName: string): void {
    const payload = { name: categoryName };
    this.categoriesService.addCategory(payload).subscribe({
      next: (res) => {
        this.toastr.success('Category Added Successfully');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
      complete: () => { 
        this.getCategoriesData();
      }
    })
  }
  openEditCategoryDialog(category: ICategoryData): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {
        name: category.name,
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory(category.id, result.name);
      }
    });
  }
  updateCategory(id: number | undefined, categoryName: string): void {
    this.categoriesService.updateCategory(id ,categoryName ).subscribe({
      next: (res) => {
        this.toastr.success('Category Updated Successfully');
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
      complete: () => { 
        this.getCategoriesData();
      }
    })
  }
  openViewCategoryDialog(category:ICategoryData): void{
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {
        name: category.name,
        isReadOnly: true
      },
    });
  }
  openDeleteDialog(category: ICategoryData): void {
    const dialogRef = this.dialog.open(DeleteItemComponent , {
      data: {name: category.name},
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(category.id);
        this.deleteCategory(category.id)
      }
      });
    }
    deleteCategory(id : number | undefined): void {
      this.categoriesService.deleteCategory(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Category Deleted Successfully');
        },
        error: (err) => {
          this.toastr.error(err.error.message);
        },
        complete: () => { 
          this.getCategoriesData();
        }
      }) 
    }
    handlePageEvents(event : PageEvent):void{
      this.tableParams  ={
        pageNumber: event.pageIndex +1,
        pageSize : event.pageSize
      };
      this.getCategoriesData();
    }

}
