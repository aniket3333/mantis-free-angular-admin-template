import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProviderList } from 'src/app/app-provider.registrar';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';
import { GroupModel } from '../../../model/group-model';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberModel, OwnerModel } from '../../../model/owner-model';

@Component({
  selector: 'app-view-group',
imports:[CommonModule,HttpClientModule,FormsModule],
  providers: [ProviderList], 
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.scss'
})
export class ViewGroupComponent implements OnInit {
  groupModelData:Array<OwnerModel>;
  memberModelData: Array<OwnerModel>;
  groupId: string;
  isOwner: string;
  showOwner:boolean;

constructor(private router:Router,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,private route:ActivatedRoute){}
ngOnInit(): void {
  this.showOwner=false;
  this.groupModelData=new Array<OwnerModel>();
  debugger
  this.route.queryParams.subscribe(params => {
    this.groupId = params['id'];
    this.isOwner = params['isOwner'];
    if(this.isOwner.trim() == 'owner'){
      this.showOwner = true;
this.getGroupOwners(this.groupId);
    }
    else{
      this.showOwner = false;
      this.getGroupOwners(this.groupId);
    }
  });
}
getGroupOwners(id:string)
{
  debugger
this.sharePointService.getGroupOwners(id)
    .subscribe((response:any) => {
      if (response) {
        debugger
        this.groupModelData = null;
        this.groupModelData = response.value;
      } else {
        this.groupModelData = null; // Assign an empty array if DataList is null or undefined
      }
    });
}
getGroupMembers(id:string)
{
this.sharePointService.getGroupMembers(id)
    .subscribe((response:any) => {
      if (response) {
        this.groupModelData = null;
        this.groupModelData = response.value;
      } else {
        this.groupModelData = null; // Assign an empty array if DataList is null or undefined
      }
    });
}
onLinkClick(): void {
this.router.navigate(['/pages/groups']);
}
}
