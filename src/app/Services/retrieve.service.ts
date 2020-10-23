import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Employee } from '../employee-model';

import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEvent,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RetrieveService {
  private endPoint = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  retrieveEmployees() {
    return this.http.get(`${this.endPoint}/users`).pipe(
      map((data) => {
        const empArray: Employee[] = [];
        for(const key in data) {
            empArray.push({...data[key]});
        }
        return empArray;
      })
    );
  }
}
