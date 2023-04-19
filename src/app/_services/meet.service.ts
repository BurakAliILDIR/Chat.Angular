import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMessagesResponse } from '../_responses/messages.response';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMeets(): Observable<Object> {
    return this.http.post(this.baseUrl + "/Meets", {});
  }

  getMessages(username: string): Observable<GetMessagesResponse> {
    return this.http.post<GetMessagesResponse>(this.baseUrl + "/Meets/Get/Messages", {
      receiverId: username
    });
  }
}
