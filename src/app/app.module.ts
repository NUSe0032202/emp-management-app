import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { UploadListComponent } from './upload-list/upload-list.component';
import { ModalModule } from './_modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    EmployeeListComponent,
    UploadListComponent
  ],
  imports: [
    BrowserModule,
    ModalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
