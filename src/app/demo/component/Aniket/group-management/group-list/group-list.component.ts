import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderList } from 'src/app/app-provider.registrar';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../Ishare-point.service';
import { GroupModel } from '../../model/group-model';
import { MemberGroupModalComponent } from './member-group-modal/member-group-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../loader.service';
import { HotToastService } from '@ngxpert/hot-toast';
import { HttpStatus } from '../../common/http-status';
@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
   standalone: true,
    imports: [HttpClientModule,CommonModule ],
    encapsulation: ViewEncapsulation.None,
    providers: [ProviderList]
})
export class GroupListComponent implements OnInit {

	

  groupModel:Array<GroupModel>;
  errorMessage: string|null = '';
constructor(private _loaderservice:LoaderService,private _toasterservice:HotToastService,private http: HttpClient,private _formBuilder: UntypedFormBuilder,
   private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,
   private modelService:NgbModal
) { }

ngOnInit(){
  this.errorMessage = '';
  this.groupModel = new Array<GroupModel>();
  
this.getGroupList();
}




private getGroupList() {
  this._loaderservice.isLoading.next(true);
  this.sharePointService.getAllGroups()
    .subscribe((response:any) => {
      if (response.Status = HttpStatus.Success) {
        this._loaderservice.isLoading.next(false);

        this.errorMessage ='';
        this.groupModel= response?.value;
      } else {
        this.errorMessage  = '';
        this._loaderservice.isLoading.next(false);
        this._toasterservice.error(response.message);

        this.groupModel = []; // Assign an empty array if DataList is null or undefined
      }
    },
  (error)=>{
    this.groupModel = [];
    this._loaderservice.isLoading.next(false);
this._toasterservice.error(error.message);
    this.errorMessage = error?.error?.error?.message;
  });   
}
open(user:GroupModel) {
  const modalRef = this.modelService.open(MemberGroupModalComponent);
 
}
group() {
  const modalRef = this.modelService.open(MemberGroupModalComponent);
}
members() {
  const modalRef = this.modelService.open(MemberGroupModalComponent);
}
navigateToCreateGroup()
{
  this._router.navigate(['/pages/create-user']);
}
navigateToViewGroup(user:GroupModel,isOwner:string)
{
  this._router.navigate(['/pages/view-group'], { queryParams: { id: user.id,isOwner: isOwner} });
}
logOut()
{
  localStorage.removeItem('accesstoken');
  localStorage.removeItem('name');
  this._router.navigate(['/Test/Callback']);
}
}


