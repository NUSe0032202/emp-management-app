import { Component, OnInit, Input } from '@angular/core';
import { Employee } from '../employee-model';
import { CrudService } from '../Services/crud.service';
import { ListService } from '../Services/list.service';
import { RetrieveService } from '../Services/retrieve.service';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() id: string;
  @Input() login: string;
  @Input() name: string;
  @Input() salary: number;

  constructor(
    private crudService: CrudService,
    private listService: ListService,
    private retrieveService: RetrieveService
  ) {}

  ngOnInit(): void {}
  searchParams: string[] = ['0', '999999', '0', '50', 'ID', '+'];
  loadedEmployees: Employee[] = [];

  delete() {
    let cnfm = confirm('Please confirm that you want to delete this employee');
    if (cnfm) {
      this.crudService.deleteEmployee(this.id).subscribe((resp) => {
        this.retrieveService
          .retrieveEmployees(this.searchParams)
          .subscribe((data) => {
            this.loadedEmployees = data;
            this.listService.activateList.next(this.loadedEmployees);
          });
      });
    }
  }
}
