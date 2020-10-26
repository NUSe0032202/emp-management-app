import { Component, OnInit } from '@angular/core';

import { ModalService } from '../_modal';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal(id: string) {
    this.modalService.open(id);
  }

  
}
