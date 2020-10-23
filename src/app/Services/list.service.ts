import { Injectable } from '@angular/core';

import {Subject} from 'rxjs';
import { Employee } from '../employee-model';

@Injectable({
    providedIn: 'root',
  })
export class ListService {
   activateList = new Subject<Employee[]>();
}