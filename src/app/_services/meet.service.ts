import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMeets(): Observable<Object> {
    return this.http.post(this.baseUrl + "/Meets", {});
  }
}
