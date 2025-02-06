// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { AddUserComponent } from './demo/component/Aniket/user-management/add-user/add-user.component';
const routes: Routes = [
 
  {path:'',redirectTo:'Test/Callback',pathMatch:'full'},
  {
    path: 'Test/Callback',
    loadComponent: () => import('./demo/component/Aniket/login/login/login.component').then((c) => c.LoginComponent)
  },
  {
    path: 'pages',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'all-sites',
        pathMatch: 'full'
      },
      {
        path: 'all-sites',
        loadComponent: () => import('./demo/component/Aniket/all-sites-list/all-sites-list.component').then((c) => c.AllSitesListComponent)
      },    
      {
        path: 'drive-list/:siteId',
        loadComponent: () => import('./demo/component/Aniket/drives-sites-list/drives-sites-list.component').then((c) => c.DrivesSitesListComponent)
      },      
      {
        path: 'drive-item/:DriveId',
        loadComponent: () => import('./demo/component/Aniket/drive-item-list/drive-item-list.component').then((c) => c.DriveItemListComponent)
      },
      {
        path: 'drive-view-file/:fileUrl',
        loadComponent: () => import('./demo/component/Aniket/finance-example/finance-example.component').then((c) => c.FinanceExample)
      },
      {
        path: 'users',
        loadComponent: () => import('./demo/component/Aniket/user-management/user-list/user-list.component').then((c) => c.UserListComponent)
      },
      {
        path:'create-user',
        component:AddUserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
