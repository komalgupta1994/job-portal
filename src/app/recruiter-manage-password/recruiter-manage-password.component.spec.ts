import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterManagePasswordComponent } from './recruiter-manage-password.component';

describe('RecruiterManagePasswordComponent', () => {
  let component: RecruiterManagePasswordComponent;
  let fixture: ComponentFixture<RecruiterManagePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterManagePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterManagePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
