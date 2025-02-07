import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGroupModalComponent } from './member-group-modal.component';

describe('MemberGroupModalComponent', () => {
  let component: MemberGroupModalComponent;
  let fixture: ComponentFixture<MemberGroupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberGroupModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberGroupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
