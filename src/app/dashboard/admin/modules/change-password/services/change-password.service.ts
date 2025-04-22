import { ChangePasswordComponent } from './../components/change-password/change-password.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private http: HttpClient) { }
  changePassword(data: FormData): Observable<any> {
      const token = localStorage.getItem('userToken');
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
      return this.http.put('/Users/ChangePassword', data , { headers });
    } 
}
