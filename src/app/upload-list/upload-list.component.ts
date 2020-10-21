import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../Services/upload.service';

import { ModalService } from '../_modal';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css'],
})
export class UploadListComponent implements OnInit {
  uploadForm: FormGroup;

  constructor(private modalService: ModalService, private uploadService: UploadService) {}

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file : new FormControl('', Validators.required),
      fileSource: new FormControl('', Validators.required)
    });
  }

  onSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.patchValue({
        fileSource: file
      });
    }
  }

  onSubmit() {
    console.log(this.uploadForm);
    console.log(this.uploadForm.get('fileSource').value);
    const formData = new FormData();
    formData.append('file',this.uploadForm.get('fileSource').value);
    this.uploadService.uploadEmployeeList(formData).subscribe(resp => {
      console.log(resp)
    });
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
