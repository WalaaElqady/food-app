import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ITag } from '../../admin/modules/recipes/models/recipes';
import { ICategory, IGetCategoryParams } from '../../admin/modules/categories/models/categories';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private http: HttpClient) { }
  getTags(): Observable<ITag[]> {
    return this.http.get<ITag[]>('/tag');
  }
  getCategories(params: IGetCategoryParams): Observable<ICategory> {
    const token = localStorage.getItem('userToken');
    return this.http.get<ICategory>('/category', {
      params: { pageSize: params.pageSize, pageNumber: params.pageNumber },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  private profileImageSource = new BehaviorSubject<string>('');
  currentProfileImage = this.profileImageSource.asObservable();

  private userNameSource = new BehaviorSubject<string>('User');
  currentUserName = this.userNameSource.asObservable();

  updateProfileImage(imagePath: string) {
    if (this.profileImageSource.getValue() !== imagePath) {
      this.profileImageSource.next(imagePath);
    }
  }

  updateUserName(name: string) {
    if (this.userNameSource.getValue() !== name) {
      this.userNameSource.next(name);
    }
  }
  
}
