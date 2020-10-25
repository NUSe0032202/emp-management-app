import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Employee } from '../employee-model';

import {
  HttpClient,
  HttpParams,
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

  retrieveEmployees(searchParams: string[]) {
    let sortParam;
    if (searchParams[5] === '-') {
      sortParam = searchParams[5] + searchParams[4];
    } else {
      sortParam = encodeURIComponent(searchParams[5] + searchParams[4]);
    }
    let params = new HttpParams()
      .set('minSalary', searchParams[0])
      .set('maxSalary', searchParams[1])
      .set('offset', searchParams[2])
      .set('limit', searchParams[3])
      .set('sort', sortParam);
    return this.http.get(`${this.endPoint}/users?`, { params }).pipe(
      map((data) => {
        console.log('Data received');
        console.log(data);
        const empArray: Employee[] = [];
        for (const key in data) {
          empArray.push( ...data[key] );
        }
        console.log("After data parse");
        console.log(empArray);
        return empArray;
      })
    );
  }
}
