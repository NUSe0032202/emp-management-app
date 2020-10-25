import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private endPoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  deleteEmployee(id: string) {
    return this.http.delete(`${this.endPoint}/users/${id}`);
  }
}
