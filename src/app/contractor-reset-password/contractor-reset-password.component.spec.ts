import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorResetPasswordComponent } from './contractor-reset-password.component';

describe('ContractorResetPasswordComponent', () => {
  let component: ContractorResetPasswordComponent;
  let fixture: ComponentFixture<ContractorResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
