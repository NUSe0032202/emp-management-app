import { Component, OnInit, OnDestroy, HostListener  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../Services/upload.service';

import { ModalService } from '../_modal';
import { RetrieveService } from '../Services/retrieve.service';
import { ListService } from '../Services/list.service';
import { Employee } from '../employee-model';


@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css'],
})
export class UploadListComponent implements OnInit, OnDestroy  {
  uploadForm: FormGroup;
  feedbackMsgs: String[];
  respError = false;
  respOk = false;
  spinner = false;
  searchParams: string[] = ['0','999999','0','50','ID','+'];
  loadedEmployees: Employee[] = [];

  constructor(
    private modalService: ModalService,
    private uploadService: UploadService,
    private retrieveService: RetrieveService,
    private listService: ListService
  ) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file: new FormControl('', Validators.required),
      fileSource: new FormControl('', Validators.required),
    });
  }

  onSelect(event) {
    this.respError = false;
    this.respOk = false;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file,
      });
    }
  }

  onSubmit() {
    console.log(this.uploadForm);
    console.log(this.uploadForm.get('fileSource').value);
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('fileSource').value);
    this.spinner = true;
    this.uploadService.uploadEmployeeList(formData).subscribe(
      (resp) => {
        this.feedbackMsgs = resp;
        this.respOk = true;
        this.spinner = false;
      },
      (errorresp) => {
        this.feedbackMsgs = errorresp.error;
        this.respError = true;
        this.spinner = false;
        if(this.feedbackMsgs[0] === 'Duplicate ID/Login detected') {
          console.log('after if block');
          this.retrieveService.retrieveEmployees(this.searchParams).subscribe(
            data => {
              this.loadedEmployees = data;
              this.listService.activateList.next(this.loadedEmployees);
            }
          );
        }
      },
      () => {
        if(!this.respError) {
          this.retrieveService.retrieveEmployees(this.searchParams).subscribe(
            data => {
              this.loadedEmployees = data;
              this.listService.activateList.next(this.loadedEmployees);
            }
          );
        }
      }
    );
  }

  closeModal(id: string) {
    this.modalService.close(id);
    this.respOk = false;
    this.respError = false;
  }
  
  
  ngOnDestroy() {

  }
}
