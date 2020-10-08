import { tap, catchError } from 'rxjs/operators';
import { Login } from './../store/auth.action';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginResponse {
  jwtToken: string;
  username: string;
  email: string;
  roles: string[];
}

const API_URL = 'http://localhost:8081';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public login(authData: { username: string; password: string }): Observable<LoginResponse>{ 
        return this.httpClient.post<LoginResponse>(`${API_URL}/api/auth/login`, authData, httpOptions)
            .pipe(tap((response)=>console.log(response)), catchError(this.handleError));
  }


  private handleError(err):Observable<LoginResponse>{
    console.error(err);
    return of({ jwtToken: '', username: '', email: '', roles: []});
  }
}
