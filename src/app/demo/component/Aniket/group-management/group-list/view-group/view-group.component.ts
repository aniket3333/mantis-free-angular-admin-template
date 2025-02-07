import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProviderList } from 'src/app/app-provider.registrar';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';
import { GroupModel } from '../../../model/group-model';
import { ActivatedRoute } from '@angular/router';
import { OwnerModel } from '../../../model/owner-model';

@Component({
  selector: 'app-view-group',
imports:[CommonModule,HttpClientModule,FormsModule],
  providers: [ProviderList], 
  templateUrl: './view-group.component.html',
  styleUrl: './view-group.component.scss'
})
export class ViewGroupComponent implements OnInit {
  groupModelData:Array<OwnerModel>;
  memberModelData: any;
  groupId: string;

constructor(@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService,private route:ActivatedRoute){}
ngOnInit(): void {
  this.groupModelData=new Array<OwnerModel>();
  debugger
  this.route.queryParams.subscribe(params => {
    const id = params['id'];  // It should give you the ID passed in the query params.
    console.log(id);  // Logs the value of the ID, e.g., "0bc6d1b1-519d-4fa2-9933-d0692f0cf68a"
    this.getGroupOwners(id);
  });
}
getGroupOwners(id:string)
{
  debugger
this.sharePointService.getGroupOwners(id)
    .subscribe((response:any) => {
      if (response) {
        debugger
        this.groupModelData = response.value;
      } else {
        this.groupModelData = null; // Assign an empty array if DataList is null or undefined
      }
    });
}
getGroupMembers(id:string)
{
  debugger
this.sharePointService.getGroupMembers(id)
    .subscribe((response:any) => {
      if (response) {
        debugger
        this.memberModelData = response;
      } else {
        this.memberModelData = null; // Assign an empty array if DataList is null or undefined
      }
    });
}
}
