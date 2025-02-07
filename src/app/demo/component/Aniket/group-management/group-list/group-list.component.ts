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

	@Input() name: string;
  groupModel:Array<GroupModel>;
  groupModelData:GroupModel;
constructor(private http: HttpClient,private _formBuilder: UntypedFormBuilder,
   private _router: Router,private _route: ActivatedRoute,private route: ActivatedRoute,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,
   private modelService:NgbModal
) { }

ngOnInit(){
  this.groupModel = new Array<GroupModel>();
  this.groupModelData=new GroupModel();

this.getGroupList();
}




private getGroupList() {
  debugger
  this.sharePointService.getAllGroups()
    .subscribe((response:any) => {
      if (response) {
        this.groupModel= response?.value
        
      } else {
        this.groupModel = []; // Assign an empty array if DataList is null or undefined
      }
    });
    
}

getGroupById(group:GroupModel)
{
  debugger
this.sharePointService.getGroupById(group.id)
    .subscribe((response:any) => {
      if (response) {
        this.groupModelData = response;
        this.open();
      } else {
        this.groupModelData = null; // Assign an empty array if DataList is null or undefined
      }
    });
}
open() {
  const modalRef = this.modelService.open(MemberGroupModalComponent);
  modalRef.componentInstance.name = 'World';
}
navigateToCreateGroup()
{
  this._router.navigate(['/pages/create-user']);
}
}


