import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorForgotPasswordComponent } from './contractor-forgot-password.component';

describe('ContractorForgotPasswordComponent', () => {
  let component: ContractorForgotPasswordComponent;
  let fixture: ComponentFixture<ContractorForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
