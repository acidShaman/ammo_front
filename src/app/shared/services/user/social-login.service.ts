import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialLoginService {
  url: string;

  constructor(private httpClient: HttpClient) {}

  saveResponse(resp): Observable<any> {
    this.url = 'http://localhost:64726/Api/Login/Savesresponse';
    return this.httpClient.post(this.url, resp);
  }
}
