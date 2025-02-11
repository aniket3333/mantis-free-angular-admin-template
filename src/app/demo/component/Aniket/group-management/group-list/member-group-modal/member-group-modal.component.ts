import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';
import { ProviderList } from 'src/app/app-provider.registrar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GroupModel } from '../../../model/group-model';

@Component({
  selector: 'app-member-group-modal',
  standalone:true,
  imports:[CommonModule,HttpClientModule,FormsModule],
  providers: [ProviderList],
  templateUrl: './member-group-modal.component.html',
  styleUrl: './member-group-modal.component.scss'
})
export class MemberGroupModalComponent {
  email: string = '';
  selectedOption: string = '';
  user: GroupModel;
constructor(@Inject('initialState') public initialState: any,public activeModal:NgbActiveModal,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService){
  this.user = initialState.user;
}

addMember(email:string)
{
  debugger
this.sharePointService.addMembers(email,this.user.id)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
addOwner(email:string)
{
  debugger
this.sharePointService.addOwners(email,this.user.id)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
submitForm() {
  if (this.email && this.selectedOption) {
    console.log("Email:", this.email);
    console.log("Selected Option:", this.selectedOption);
    if(this.selectedOption=='1')
    {
this.addMember(this.email);
    }else{
      this.addOwner(this.email);

    }
    this.activeModal.close('Form submitted');
  }
}
}
