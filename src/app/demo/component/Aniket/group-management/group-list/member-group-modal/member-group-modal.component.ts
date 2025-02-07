import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-group-modal',
  imports: [],
  templateUrl: './member-group-modal.component.html',
  styleUrl: './member-group-modal.component.scss'
})
export class MemberGroupModalComponent {
  @Input() name:string;
constructor(public activeModal:NgbActiveModal){}
}
