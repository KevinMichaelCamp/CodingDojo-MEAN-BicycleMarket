import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient) { }

  loginUser(user: { email: string; password: string; }): any {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post('http://localhost:6789/users/login', user, httpHead);
  }

  registerUser(user: { firstName: string; lastName: string; email: string; password: string; pw_confirm: string; }): any {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post('http://localhost:6789/users', user, httpHead);
  }

  getUser(): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:6789/profile', httpHead);
  }

  editUser(user: any): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.patch('http://localhost:6789/users', user, httpHead);
  }

  storeUserData(token: string, user: object): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(): void {
    this.authToken = localStorage.getItem('id_token');
  }

  loggedIn(): boolean {
    return localStorage.getItem('id_token') !== null;
  }

  logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
