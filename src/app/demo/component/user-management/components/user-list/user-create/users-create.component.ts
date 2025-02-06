import { Component, ElementRef, Inject, OnInit, ViewChild } from "@angular/core";
import { UserFormModel } from "../../../models/user-create-form.model";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserManagementRoutingModule } from "../../../user-management-routing.module";


@Component({
  selector: 'app-user-create',
  templateUrl: 'users-create.component.html',
  standalone:true,
  imports:[ReactiveFormsModule, CommonModule,
    FormsModule,
    ReactiveFormsModule]})
export class UserCreateComponent implements OnInit {
  userFormModel:UserFormModel;
  submitted:boolean;
  loadingButton:boolean;

  get f(){
    return this.userFormModel.controls;
  }
  ngOnInit(): void {
    this.userFormModel= new UserFormModel();

  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormModel.invalid) {
      return;
    }
    let model = this.userFormModel.getFormData();

    console.log(model);
 
  }
}