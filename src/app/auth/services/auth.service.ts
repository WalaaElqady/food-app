import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  userToken = localStorage.getItem('userToken');
  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  constructor(private httpClient: HttpClient  ) {
    if (this.userToken !== null) { 
      this.getProfile();
    }
  }
    login(data: FormGroup): Observable<any> {
      return this.httpClient.post('/Users/Login', data).pipe(
        tap((res: any) => {
          if (res.token) {
            console.log('Token received:', res.token);
            localStorage.setItem('userToken', res.token);
            this.userToken = res.token;
            this.getProfile();
          } else {
            console.error('No token received from login response');
          }
        })
      );
    }
  
    register(data: FormData): Observable<any> {
      console.log('Register Payload:', data);
      return this.httpClient.post('/Users/register', data);
    }
    forgetPassword(data: { email: string }): Observable<any> {
      return this.httpClient.post('/Users/Reset/Request', data,
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        }
      );
    }
    resetPassword(data: FormGroup):Observable<any>{
      return this.httpClient.post('/Users/Reset', data)
    }
    verifyAccount(data: FormGroup):Observable<any>{
      return this.httpClient.put('/Users/verify', data)
    }
    getProfile() {
      if (!this.userToken) {
        console.error('No token found in localStorage');
        return;
      }
      try {
        let decoded: any = jwtDecode(this.userToken);
        let userData = {
          id: decoded.userId,
          name: decoded.userName,
          role: decoded.userGroup
        };
        localStorage.setItem('role', userData.role);
        localStorage.setItem('userId', userData.id);
        localStorage.setItem('userName', userData.name);
        console.log(userData.role + ' ' + userData.id + ' ' + userData.name);

        this.userData.next(userData);

      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
}
