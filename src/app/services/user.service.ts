import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  isLogIn = false
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(obj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, obj)
  }
  registerUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, user);
  }

}
