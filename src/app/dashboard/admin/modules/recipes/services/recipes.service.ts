import { IRecipe, IGetSearchParams } from './../models/recipes';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }
  
  getRecipes(params: IGetSearchParams): Observable<IRecipe> {
    const token = localStorage.getItem('userToken');
    return this.http.get<IRecipe>('/Recipe/', {
      params: { 
        name: params.name,
        tagId: params.tagId,
        categoryId: params.categoryId,
        pageSize: params.pageSize, 
        pageNumber: params.pageNumber
      },
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  addRecipe(data: FormData): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post('/recipe/', data , { headers });
  }  
  getRecipeById(recipeId: string ): Observable<any> {
    return this.http.get(`/Recipe/${recipeId}`);
  }
  updateRecipe(id:string | null , data:FormData):Observable<any>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put(`/Recipe/${id}`, data , {headers})
  }
  deleteRecipe(id: number | undefined): Observable<any> {
    if (!id) {
      console.log('Category ID is required to delete.');
    }
    const token = localStorage.getItem('userToken');
    if (!token) {
      console.error('Token not found');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete(`/recipe/${id}` , { headers });
  }
  addToFav(id:number|undefined):Observable<any>{
    
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post('/userRecipe', {recipeId: id} , {headers})
  }
}
