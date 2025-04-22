import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from 'src/app/dashboard/admin/modules/recipes/models/recipes';

@Injectable({
  providedIn: 'root'
})
export class FavService {

  constructor(private http: HttpClient) { }
    getFav(): Observable<IRecipe> {
      const token = localStorage.getItem('userToken');
      return this.http.get<IRecipe>('/userRecipe/',
        {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    removeFav(favId:number):Observable<any>{
      const token = localStorage.getItem('userToken');
      return this.http.delete(`/userRecipe/${favId}`,
        {
          headers: { Authorization: `Bearer ${token}` }

        }
      )
    }
}
