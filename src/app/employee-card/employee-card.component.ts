import { Component, OnInit, Input } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
