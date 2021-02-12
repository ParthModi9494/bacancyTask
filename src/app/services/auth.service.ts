import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
export interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  baseUrl = "https://reqres.in";
  isLoggedIn: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  // login the user using fake api
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/api/login`, { email, password }).pipe(
      map((loginResponse: LoginResponse) => {
        this.isLoggedIn = true;
        localStorage.setItem("token", loginResponse.token);
        return loginResponse;
      }), catchError(err => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        return throwError(err);
      })
    );
  }

  // remove token from localstorage and navigate to login page
  logout() {
    this.isLoggedIn = false;
    localStorage.removeItem("token");
    this.router.navigateByUrl("login");
  }
}
