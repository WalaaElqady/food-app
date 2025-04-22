import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory, IGetCategoryParams, ICategoryData } from '../models/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  getCategories(params: IGetCategoryParams): Observable<ICategory> {
    const token = localStorage.getItem('userToken');
    return this.http.get<ICategory>('/category', {
      params: { pageSize: params.pageSize, pageNumber: params.pageNumber },
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  addCategory(data: any): Observable<ICategoryData> {
    return this.http.post<ICategoryData>('/category/', data);
  }
  updateCategory(id: number | undefined, categoryName: string): Observable<ICategoryData> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<ICategoryData>(`/category/${id}`, { name: categoryName }, { headers });
  }
  deleteCategory(id: number | undefined): Observable<any> {
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
    return this.http.delete(`/category/${id}` , { headers });
  }
}
