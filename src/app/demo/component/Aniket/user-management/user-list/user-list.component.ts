import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearch } from '../../model/user.search.model';
import { DataTableModel } from '../../common/datatable.model';
import { UserModel } from '../../model/user.model';
// import { SweetAlertService } from '../../services/sweat-alert.service';
import { HttpStatus } from '../../common/http-status';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../Ishare-point.service';
import { ProviderList } from 'src/app/app-provider.registrar';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule,CommonModule ],
  encapsulation: ViewEncapsulation.None,
  providers: [ProviderList]
})
export class UserListComponent implements OnInit {
  model:UserSearch;
  password: string = "P@ssword123";
  leadTableDataList: DataTableModel<UserModel>;
    users = [
    { name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', statusClass: 'bg-success' },
    { name: 'Bob Smith', email: 'bob@example.com', status: 'Inactive', statusClass: 'bg-danger' },
    { name: 'Charlie Brown', email: 'charlie@example.com', status: 'Pending', statusClass: 'bg-warning' }
  ];
constructor(private http: HttpClient,private _formBuilder: UntypedFormBuilder,
   private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService
) { }

ngOnInit(){
  alert('correct');
  this.model=new UserSearch();
  this.leadTableDataList = new DataTableModel<UserModel>();

  this.model.page=1;
  this.model.pageSize=10;
  this.model.searchText='';

this.getUserList();
}




private getUserList() {
  this.sharePointService.getUserList(this.model)
    .subscribe((response) => {
      if (response.Status == HttpStatus.Success && response.Data.DataList) {
        this.leadTableDataList.DataList = response.Data.DataList
        
      } else {
        this.leadTableDataList.DataList = []; // Assign an empty array if DataList is null or undefined
      }
    });
    
}

// deleteUser(id: number) {
//   if (!id) {
//     return;
//   }
//   this._sweetAlertService.deleteConfirmationAlert().then((result) => {
//     if (!result.value) {
//       return;
//     }
//     this.sharePointService.deleteByIdUser(id).subscribe(
//       (response) => {
//         if (response.Status == HttpStatus.Success) {
//           this._sweetAlertService.deleteConfirmationSuccessAlert();
//           this.model.page=1;
//   this.model.pageSize=10;
//   this.model.searchText='';
//           this.getUserList();
//         } else {
//           this._sweetAlertService.deleteConfirmationFailedAlert();
//         }
//       },
//       (error) => {
//         this._sweetAlertService.deleteConfirmationFailedAlert(null, error);
//       }
//     );
//   });
// }
navigateToCreateUser()
{
  this._router.navigate(['/pages/create-user']);
}
}
