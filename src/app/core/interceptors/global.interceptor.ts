import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
  private baseUrl = 'https://upskilling-egypt.com:3006/api/v1';
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
  
    const apiReq = req.url.startsWith('http') ? req : req.clone({ 
      url: `${this.baseUrl}${req.url}`,
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    return next.handle(apiReq);
  }
}
