import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserManagementRoutingModule } from "./user-management-routing.module";
import { ProviderList } from "./user-management-provider-registrar";
import { RouterModule } from "@angular/router";
@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule,
    CommonModule,
    UserManagementRoutingModule,

    
  ],
  providers: [
    ProviderList,
  ]
})
export class UserManagementModule { }
