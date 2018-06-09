import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterResetPasswordComponent } from './recruiter-reset-password.component';

describe('RecruiterResetPasswordComponent', () => {
  let component: RecruiterResetPasswordComponent;
  let fixture: ComponentFixture<RecruiterResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
