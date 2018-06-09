import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManageUserComponent } from './recruiter-manage-user.component';

describe('RecruiterManageUserComponent', () => {
  let component: RecruiterManageUserComponent;
  let fixture: ComponentFixture<RecruiterManageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterManageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
