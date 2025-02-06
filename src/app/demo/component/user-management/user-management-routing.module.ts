import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserCreateComponent } from './components/user-list/user-create/users-create.component';
const routes: Routes = [
  {
    path: "",
    redirectTo: "user-list",
    pathMatch: "full",
  },
  {
    path: "user-list",
    component: UserListComponent,
  },
  {
    path: "create-user",
    component: UserCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
