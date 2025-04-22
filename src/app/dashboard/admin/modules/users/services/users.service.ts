import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IGetSearchParams, IUpdateUserData, IUser, User } from '../../users/models/users';
import { Observable, tap } from 'rxjs';
import {HelperService} from '../../../../shared/services/helper.service'


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private helperService: HelperService

  ) { }
  getUsers(params: IGetSearchParams): Observable<IUser> {
    const token = localStorage.getItem('userToken');
    let queryParams: IGetSearchParams = {
      userName: params.userName,
      pageSize: params.pageSize, 
      pageNumber: params.pageNumber
    };
  
    if (params.groups && params.groups !== 0) {
      queryParams.groups = params.groups;
    }
    return this.http.get<IUser>('/users/', {
      params: queryParams as any,
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  updateUser(data:FormData):Observable<IUpdateUserData>{
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<IUpdateUserData>(`/Users`, data , {headers});
  }
  getCurrentUser(): Observable<User> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<User>(`/Users/currentUser`, { headers });
  }
}

