import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  
  private endPoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  uploadEmployeeList (data: FormData) {
    return this.http.post(`${this.endPoint}/users/upload`,data);
  }
}
