import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {
  authToken: any;

  constructor(
    private http: HttpClient
  ) { }

  getBikes(): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:6789/bikes', httpHead);
  }

  getBikesByUser(): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.get('http://localhost:6789/bikes/user', httpHead);
  }

  addBike(bike: { title: string; description: string; price: number; imgurl: string; location: string; }): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.post('http://localhost:6789/bikes', bike, httpHead);
  }

  getBikeByID(id: string): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.get(`http://localhost:6789/bikes/${id}`, httpHead);
  }

  updateBike(id: string, bike: { title: string; description: string; price: number; imgurl: string; location: string; }): any {
    this.loadToken();
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': this.authToken
      })
    };
    return this.http.patch(`http://localhost:6789/bikes/${id}`, bike, httpHead);
  }

  loadToken(): void {
    this.authToken = localStorage.getItem('id_token');
  }
}
