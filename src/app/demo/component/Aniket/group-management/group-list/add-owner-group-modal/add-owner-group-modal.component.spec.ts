import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAddGroupModalComponent } from './add-owner-group-modal.component';

describe('MemberGroupModalComponent', () => {
  let component: OwnerAddGroupModalComponent;
  let fixture: ComponentFixture<OwnerAddGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerAddGroupModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerAddGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
