import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';
import { ProviderList } from 'src/app/app-provider.registrar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupModel } from '../../../model/group-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-member-group-modal',
  standalone:true,
  imports:[CommonModule,HttpClientModule,FormsModule],
  providers: [ProviderList],
  templateUrl: './add-member-group-modal.component.html',
  styleUrl: './add-member-group-modal.component.scss'
})
export class MemberAddGroupModalComponent implements OnInit {
  email: string = '';
  selectedOption: string = '';
  user: GroupModel;
  groupId: any;
constructor(public route:ActivatedRoute,public activeModal:NgbActiveModal,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService){}
ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.groupId = params['id'];
  })
}
addMember(email:string)
{
  debugger
this.sharePointService.addMembers(email,this.groupId)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
addOwner(email:string)
{
  debugger
this.sharePointService.addOwners(email,this.groupId)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
submitForm() {
  if (this.email) {
this.addMember(this.email);
  
    this.activeModal.close('Form submitted');
  }
}

}
