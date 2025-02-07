import { Component, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ISharePointService, SHARE_POINTS_SERVICE } from '../../../Ishare-point.service';

@Component({
  selector: 'app-member-group-modal',
  imports: [],
  templateUrl: './member-group-modal.component.html',
  styleUrl: './member-group-modal.component.scss'
})
export class MemberGroupModalComponent {
  @Input() name:string;
constructor(public activeModal:NgbActiveModal,@Inject(SHARE_POINTS_SERVICE) private sharePointService: ISharePointService){}

addMember(email:string)
{
  debugger
this.sharePointService.addMembers(email)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
addOwner(email:string)
{
  debugger
this.sharePointService.addOwners(email)
    .subscribe((response:any) => {
      if (response) {
      } else {
      }
    });
}
}
