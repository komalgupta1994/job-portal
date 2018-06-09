import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManageProfileComponent } from './recruiter-manage-profile.component';

describe('RecruiterManageProfileComponent', () => {
  let component: RecruiterManageProfileComponent;
  let fixture: ComponentFixture<RecruiterManageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterManageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterManageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
