import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetMessagesResponse } from '../_responses/messages.response';
import { GetMeetsResponse } from '../_responses/meets.response';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMeets(): Observable<GetMeetsResponse> {
    return this.http.post<GetMeetsResponse>(this.baseUrl + "/Meets", {});
  }

  getMessages(username: string, page = 1): Observable<GetMessagesResponse> {
    return this.http.get<GetMessagesResponse>(this.baseUrl + "/Meets?receiveId=" + username + "&page=" + page);
  }
}
