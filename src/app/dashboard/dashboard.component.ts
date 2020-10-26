import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RetrieveService } from '../Services/retrieve.service';

import { ModalService } from '../_modal';
import { Employee } from '../employee-model';
import { ListService } from '../Services/list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  loadedEmployees: Employee[] = [];
  searchForm: FormGroup;
  searchParams: string[] = [];

  constructor(
    private modalService: ModalService,
    private retrieveService: RetrieveService,
    private listService: ListService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      minSalary: new FormControl(null, Validators.required),
      maxSalary: new FormControl(null, Validators.required),
      offset: new FormControl(null, Validators.required),
      maxNumber: new FormControl(null, Validators.required),
      sort: new FormControl(null),
      ascDsc: new FormControl(null),
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getEmployees() {
    this.retrieveService.retrieveEmployees(this.searchParams).subscribe(
      (respData) => {
        this.loadedEmployees = respData;
        this.listService.activateList.next(this.loadedEmployees);
      },
      (error) => {},
      () => {
        this.searchParams.length = 0;
      }
    );
  }

  onSubmit() {
    this.searchParams.push(
      this.searchForm.get('minSalary').value,
      this.searchForm.get('maxSalary').value,
      this.searchForm.get('offset').value,
      this.searchForm.get('maxNumber').value,
      this.searchForm.get('sort').value,
      this.searchForm.get('ascDsc').value
    );

    this.getEmployees();
  }

  ngOnDestroy() {
    console.log('destroy dashboard');
  }
}
