import { HttpClient } from '@angular/common/http';
import { RecipesService } from '../../services/recipes.service';
import { HelperService } from 'src/app/dashboard/shared/services/helper.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from '../../models/recipes';
import { ICategoryData, IGetCategoryParams } from '../../../categories/models/categories';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileDropEntry } from 'ngx-file-drop';


@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.scss']
})
export class AddEditRecipesComponent implements OnInit  {
  selectedFile: File | null = null;
  imagePreview: string | null = null;
  defaultImage = '../../../../../../../assets/images/pizza.jfif';
  baseUrl = 'https://upskilling-egypt.com:3006/';
  tagList!: ITag[];
  tagId: number = 0;
  categoryId: number = 0;
  categoryList!: ICategoryData[];
  categoryParams: IGetCategoryParams = {
    pageSize: 100,
    pageNumber: 1,
  }
  recipesForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    tagId: new FormControl(null, [Validators.required]),
    categoriesIds: new FormControl([], [Validators.required]),
  });
  
  isEditMode:boolean = false;
  recipeId! : string | null;
  isViewMode!:string | null ;
  pageTitle: string = 'Add Recipe';
  buttonText: string = 'Save';

  constructor(private recipesService: RecipesService,
    private toastr: ToastrService,
    private helperService: HelperService,
    private activatedRouted: ActivatedRoute,
    private http: HttpClient,
  private router:Router)
   {
      this.getCategoriesData();
      this.getTags();
      this.recipeId = this.activatedRouted.snapshot.paramMap.get('id');
      this.isViewMode = (this.activatedRouted.snapshot.paramMap.get('formDisabled'))
   } 
   ngOnInit(): void {
    if (this.recipeId){
      this.isEditMode = true;
      this.getRecipeById(this.recipeId);
      this.pageTitle = 'Edit Recipe';
      this.buttonText = 'Update';
    }
    if (this.isViewMode){
      this.recipesForm.disable();
      this.pageTitle = 'View Recipe';

      
    }
       
   }
  getTags(): void {
    this.helperService.getTags().subscribe({
      next: (res) => {
        this.tagList = res;
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
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  sendData(data: any) {
    if (this.recipesForm.invalid) {
      this.toastr.error('Please fill in all required fields!', 'Validation Error');
      return;
    }
    let newData = new FormData();
    Object.keys(data.value).forEach(key => {
      newData.append(key, data.value[key]);
    })
    if (this.selectedFile) {
      newData.append('recipeImage', this.selectedFile);
    }
    if(!this.recipeId && !this.isViewMode){
      this.addRecipe(newData)
    }
    else{
      this.updateRecipe(newData)

    }
  }
  addRecipe(data : FormData):void{
    this.recipesService.addRecipe(data).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Recipe Added Successfully');

      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error(err.error.message);
      },
      complete: () => {
        this.router.navigate(['dashboard/admin/recipes']);

      }
    });
    console.log('Form Data:');
    data.forEach((value, key) => {
      console.log(key, value);
    });
  }
  updateRecipe(data : FormData):void{
    this.recipesService.updateRecipe(this.recipeId , data).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success('Recipe updated Successfully');
      },
      error: (err) => {
        console.log(err.error);
        this.toastr.error(err.error.message);
      },
      complete: () => {
        this.router.navigate(['dashboard/admin/recipes']);

      }
    });
  }
  getRecipeById(recipeId: string):void{
    this.recipesService.getRecipeById(recipeId).subscribe({
      next: (res) => {
        console.log(res);
        this.recipesForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          tagId: res.tag ? res.tag.id : null,
          categoriesIds: res.category.map((cat:any)=>cat.id)

        })
        if (res.imagePath) {
          this.imagePreview = this.baseUrl + res.imagePath; // Add baseUrl if needed
        }
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  
  }
  cancel(): void {
      this.router.navigate(['dashboard/admin/recipes']);
  }
dropped(files: NgxFileDropEntry[]) {
  if (files.length > 0) {
    const droppedFile = files[0];

    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      });
    }
  }
}

deleteImage() {
  this.imagePreview = null;
  this.selectedFile = null;
}

uploadImage() {
  if (!this.selectedFile) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile);

  this.http.post('/Recipe', formData).subscribe(response => {
    console.log('Image uploaded successfully', response);
  });
}

  
}
