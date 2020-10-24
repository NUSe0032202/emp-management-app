import { Component, OnInit, OnDestroy, HostListener  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../Services/upload.service';

import { ModalService } from '../_modal';

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

  constructor(
    private modalService: ModalService,
    private uploadService: UploadService
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
    this.uploadService.uploadEmployeeList(formData).subscribe(
      (resp) => {
        this.feedbackMsgs = resp;
        this.respOk = true;
      },
      (errorresp) => {
        this.feedbackMsgs = errorresp.error;
        this.respError = true;
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
