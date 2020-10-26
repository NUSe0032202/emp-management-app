import { Component, OnDestroy, OnInit } from '@angular/core';

import { Employee } from '../employee-model';
import { ListService } from '../Services/list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  loadedEmployees: Employee[];
  renderList = false;
  private activatedSub : Subscription;
   

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.activatedSub = this.listService.activateList.subscribe(didActivate=>{
      this.loadedEmployees = didActivate;
      this.renderList = true;
    })
  }

  ngOnDestroy() : void {
    this.activatedSub.unsubscribe();
  }

}
