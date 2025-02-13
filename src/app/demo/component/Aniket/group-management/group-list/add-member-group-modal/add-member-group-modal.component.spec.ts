import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddGroupModalComponent } from './add-member-group-modal.component';

describe('MemberGroupModalComponent', () => {
  let component: MemberAddGroupModalComponent;
  let fixture: ComponentFixture<MemberAddGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberAddGroupModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAddGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
