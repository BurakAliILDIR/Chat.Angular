import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = "https://localhost:7208/api"

  constructor(private http: HttpClient) { }

  login(data: object): Observable<Object> {
    return this.http.post(this.baseUrl + "/Login", data);
  }

}
