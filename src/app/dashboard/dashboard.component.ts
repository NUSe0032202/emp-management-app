import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../Services/retrieve.service';

import { ModalService } from '../_modal';
import { Employee } from '../employee-model';
import { ListService } from '../Services/list.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loadedEmployees: Employee[] = [];

  constructor(private modalService: ModalService, private retrieveService: RetrieveService,
    private listService: ListService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getEmployees() {
    this.retrieveService.retrieveEmployees().subscribe(
      respData => {
        console.log("respdata:" + respData);
        this.loadedEmployees = respData;
        console.log("Data after pipe:" + this.loadedEmployees);
        this.listService.activateList.next(this.loadedEmployees);}
    );
  }

}
