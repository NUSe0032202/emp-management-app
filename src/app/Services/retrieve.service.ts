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
    let params = new HttpParams().set('minSalary',searchParams[0])
    .set('maxSalary',searchParams[1]).set('offset',searchParams[2]).set('limit',searchParams[3])
    .set('sort',searchParams[5] + searchParams[4]);
    return this.http.get(`${this.endPoint}/users?`,{params}).pipe(
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
